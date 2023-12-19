"use client";
import { GrGroup } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import {
  useLazyGetCompanyAllUsersAnalyticsQuery,
  useLazyGetOneUserInCompanyAnalyticsQuery,
  useLazyGetUsersLastAttemptsInCompanyQuery,
} from "@/redux/api/analyticsApiSlice";
import LineChart from "./LineChart";
import { useGetOneCompanyQuery } from "@/redux/api/companyApiSlice";
import moment from "moment";

export default function CompanyAnalytics({ id }: { id: number }) {
  const [
    allCompanyAnalytics,
    { data: allCompanyAnalyticsData, error: allCompanyAnalyticsError },
  ] = useLazyGetCompanyAllUsersAnalyticsQuery();

  const [
    oneUserAnalytics,
    { data: oneUserAnalyticsData, error: oneUserAnalyticsError },
  ] = useLazyGetOneUserInCompanyAnalyticsQuery();

  const [
    getLastAttemptsInCompany,
    { data: lastAttemptsData, error: getLastAttemptsInCompanyError },
  ] = useLazyGetUsersLastAttemptsInCompanyQuery();

  const { data } = useGetOneCompanyQuery(id);
  const { company } = data || {};

  const [isAllQuizAttempts, setIsAllQuizAttempts] = useState(false);
  const [isOneUser, setIsOneUser] = useState(false);
  const [isLastAttempts, seIsLastAttempts] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);

  const getCompanyAllUsersAttempts = async () => {
    try {
      await allCompanyAnalytics(id);
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setIsAllQuizAttempts(true);
    setIsOneUser(false);
    seIsLastAttempts(false);
  };

  const changeFieldStatus = () => {
    setIsAllQuizAttempts(false);
    setIsOneUser(true);
    seIsLastAttempts(false);
  };

  const getOneUserAttempts = (selectedUser: number, selectedName: string) => {
    setSelectedUser(selectedUser);
    setSelectedUserName(selectedName);
    handleGetOneUserAttempt(id, selectedUser);
  };

  const handleGetOneUserAttempt = async (id: number, selectedUser: number) => {
    try {
      await oneUserAnalytics({ companyId: id, userId: selectedUser });
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const getLastAttempts = async () => {
    setIsAllQuizAttempts(false);
    setIsOneUser(false);
    seIsLastAttempts(true);
    try {
      await getLastAttemptsInCompany(id);
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <>
      {id && (
        <>
          <div className="mt-4">
            <div className="flex gap-4 flex-row">
              <div className="flex gap-2 flex-row">
                <button
                  className="btn btn-outline"
                  onClick={() => getCompanyAllUsersAttempts()}
                >
                  <GrGroup /> All Quizz Attempts
                </button>
              </div>
              <div className="flex gap-2 flex-row">
                <button
                  className="btn btn-outline"
                  onClick={() => changeFieldStatus()}
                >
                  <FaRegUser /> One User Attempts
                </button>
              </div>
              <div className="flex gap-2 flex-row">
                <button
                  className="btn btn-outline"
                  onClick={() => getLastAttempts()}
                >
                  <GrGroup />
                  Last Attempts
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {isAllQuizAttempts && (
        <LineChart data={allCompanyAnalyticsData} name="All Users Analytics" />
      )}

      {isOneUser && (
        <>
          <div className="flex flex-row">
            <div className="flex flex-col w-32 gap-6 border-2 p-2 rounded-md shadow-md">
              <h2 className="font-bold text-2xl"> Users: </h2>
              <ul className="flex flex-col gap-6">
                {company?.members?.map((member: any, index: number) => (
                  <li
                    key={index}
                    onClick={() => getOneUserAttempts(member.id, member.name)}
                    className={`w-24 flex place-content-start text-lg font-medium border-2 p-2 rounded-md shadow-md  ${
                      selectedUser === member.id
                        ? "border-2 border-amber-700"
                        : "text-xl"
                    } `}
                  >
                    {member.name}
                  </li>
                ))}
              </ul>
            </div>

            {oneUserAnalyticsData && !oneUserAnalyticsError && (
              <LineChart
                data={oneUserAnalyticsData}
                name={`${selectedUserName}'s Analytics`}
              />
            )}
          </div>
        </>
      )}

      {isLastAttempts && (
        <div className="flex flex-col gap-6 p-2 ">
          <h2 className="font-bold text-2xl"> Last Users Attempts: </h2>
          <ul className="flex flex-row gap-6">
            {lastAttemptsData?.analytics?.map((attempt: any, index: number) => (
              <li key={index}>
                <p className="text-amber-800">
                  User Name:{" "}
                  <span className="font-medium text-gray-950">
                    {attempt.userName}
                  </span>
                </p>
                <p className="text-amber-800">
                  Quiz ID:{" "}
                  <span className="font-medium text-gray-950">
                    {attempt.quizAttemptId}
                  </span>
                </p>
                <p className="text-amber-800">
                  Quiz Avarage:{" "}
                  <span className="font-medium text-gray-950">
                    {attempt.quizAvarage}
                  </span>
                </p>
                <p className="text-amber-800">
                  Quiz Time:{" "}
                  <span className="font-medium text-gray-950">
                    {moment(attempt.quizTime).format("YYYY-MM-DD HH:mm:ss")}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
