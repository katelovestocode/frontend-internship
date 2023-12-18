"use client";
import { GrGroup } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import {
  useLazyGetCompanyAllUsersAnalyticsQuery,
  useLazyGetOneUserInCompanyAnalyticsQuery,
} from "@/redux/api/analyticsApiSlice";
import LineChart from "./LineChart";
import { useLazyGetOneCompanyQuery } from "@/redux/api/companyApiSlice";

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
    getOneCompany,
    { data, error: getOneCompanyError, isLoading: getOneCompanyLoading },
  ] = useLazyGetOneCompanyQuery();

  const { company } = data || {};

  useEffect(() => {
    getOneCompany(id);
  }, []);

  const [chosenField, setChosenField] = useState(false);
  const [oneUser, setOneUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState(null);

  const getCompanyAllUsersAttempts = async () => {
    await allCompanyAnalytics(id);
    setChosenField(true);
    setOneUser(false);
  };

  const getOneUserAttempt = () => {
    setChosenField(false);
    setOneUser(true);
  };
  const getOneUserAttempts = (selected, selectedName) => {
    setSelectedUser(selected);
    setSelectedUserName(selectedName);
    handleGetOneUserAttempt({ id, selected });
  };

  const handleGetOneUserAttempt = async ({ id, selected }) => {
    try {
      await oneUserAnalytics({ companyId: id, userId: selected });
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
                  onClick={() => getOneUserAttempt()}
                >
                  <FaRegUser /> One User Attempts
                </button>
              </div>
              <div className="flex gap-2 flex-row">
                <button
                  className="btn btn-outline"
                  onClick={() => console.log("click")}
                >
                  <GrGroup />
                  Last Attempts
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {chosenField && (
        <LineChart data={allCompanyAnalyticsData} name="All Users Analytics" />
      )}

      {oneUser && (
        <>
          {" "}
          {/* <div className="flex flex-col border-solid border-gray-700 border-1 rounded-xl p-2 bg-white shadow-2xl"> */}
          <div className="flex flex-row">
            <div className="flex flex-col w-32 gap-6 border-2 p-2 rounded-md shadow-md">
              <h2 className="font-bold text-2xl"> Users: </h2>
              <ul className="flex flex-col gap-6">
                {" "}
                {company?.members?.map((member, index) => (
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
                ))}{" "}
              </ul>
            </div>
            {/* </div> */}
            {oneUserAnalyticsData && !oneUserAnalyticsError && (
              <LineChart
                data={oneUserAnalyticsData}
                name={`${selectedUserName}'s Analytics`}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
