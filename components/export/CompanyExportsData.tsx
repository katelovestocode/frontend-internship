"use client";
import React, { useEffect, useState } from "react";
import {
  useLazyCompanyGetsAllUsersQuizResultsQuery,
  useLazyCompanyGetsOneUserQuizResultsQuery,
} from "@/redux/api/exportDataApiSlice";
import { FaRegUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { UserType } from "@/types/types";
import { useGetOneCompanyQuery } from "@/redux/api/companyApiSlice";
import SelectedButton from "../common/SelectedButton";
import { GrGroup } from "react-icons/gr";
import { downloadFile } from "./exportFileHelper";

export default function CompanyExportsData({ id }: { id: number }) {
  const [
    getAllUsersResults,
    { data: getAllUsersResultsData, isSuccess: getAllUsersDataIsSuccess },
  ] = useLazyCompanyGetsAllUsersQuizResultsQuery();

  const [
    getOneUserResults,
    { data: oneUserResultsData, isSuccess: getOneUserDataIsSuccess },
  ] = useLazyCompanyGetsOneUserQuizResultsQuery();

  const { data } = useGetOneCompanyQuery(id);
  const { company } = data || {};

  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [isSelectedUser, setIsSelectedUser] = useState(false);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [isLoadingAllUsers, setIsLoadingAllUsers] = useState(false);
  const [isLoadingOneUser, setIsLoadingOneUser] = useState(false);
  const [selectedType, setSelectedType] = useState("csv");
  const csvHeader =
    "id,questionResponses,totalQuestions,totalCorrect,averageScoreWithinCompany,overallRatingAcrossSystem,userId,userEmail,userName,timestamp";
  const csvLineType = "company";

  const selectedAllChange = () => {
    setIsSelectedAll(true);
    setIsSelectedUser(false);
    setSelectedUser(null);
  };
  console.log(getAllUsersResultsData, "getAllUsersResultsData");
  useEffect(() => {
    if (isSelectedAll) {
      handleGetAllUsersQuizResults();
    }
  }, [isSelectedAll]);

  const handleGetAllUsersQuizResults = async () => {
    try {
      setIsLoadingAllUsers(true);
      await getAllUsersResults({ companyId: id, type: selectedType });
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setIsLoadingAllUsers(false);
    }
  };

  useEffect(() => {
    if (getAllUsersDataIsSuccess && !isLoadingAllUsers) {
      downloadFile(
        getAllUsersResultsData?.data,
        selectedType,
        csvHeader,
        csvLineType
      );
    }
  }, [
    getAllUsersDataIsSuccess,
    getAllUsersResultsData?.data,
    isLoadingAllUsers,
    selectedType,
  ]);

  useEffect(() => {
    if (selectedUser !== null) {
      handleGetOneUserQuizResults();
    }
  }, [selectedUser]);

  const handleGetOneUserQuizResults = async () => {
    try {
      setIsLoadingOneUser(true);
      if (selectedUser !== null)
        await getOneUserResults({
          companyId: id,
          userId: selectedUser,
          type: selectedType,
        });
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setIsLoadingOneUser(false);
    }
  };

  useEffect(() => {
    if (getOneUserDataIsSuccess && !isLoadingOneUser) {
      downloadFile(
        oneUserResultsData?.data,
        selectedType,
        csvHeader,
        csvLineType
      );
    }
  }, [
    getOneUserDataIsSuccess,
    isLoadingOneUser,
    oneUserResultsData?.data,
    selectedType,
  ]);

  return (
    <>
      <div className="flex place-items-center gap-4">
        <div className="grid grid-cols-2 place-items-center">
          <SelectedButton
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            type="csv"
            name="CSV"
          />
          <SelectedButton
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            type="json"
            name="JSON"
          />
        </div>

        <div className="flex gap-2 flex-row">
          <div className="flex gap-2 flex-row place-items-center ">
            <button
              className="btn btn-outline"
              onClick={() => selectedAllChange()}
            >
              <GrGroup /> Get All Users Data
            </button>
          </div>
          <div className="flex gap-2 flex-row">
            <button
              className="btn btn-outline"
              onClick={() => setIsSelectedUser(true)}
            >
              <FaRegUser /> One User Results
            </button>
          </div>
        </div>
      </div>

      {isSelectedUser && (
        <div className="flex flex-col gap-6 p-2 ">
          <h2 className="font-bold text-2xl"> Choose a Company Member: </h2>
          <ul className="grid gap-4 grid-cols-2">
            {company?.members?.map((member: UserType, index: number) => (
              <li
                key={index}
                className={`flex flex-col gap-2 place-items-center border-solid border rounded-xl p-2.5 bg-white shadow-lg ${
                  selectedUser === member.id
                    ? "border-amber-800 border-4"
                    : "border-zinc-200"
                } `}
                onClick={() => {
                  setSelectedUser(member.id!);
                }}
              >
                <p className="text-amber-800">
                  Name:{" "}
                  <span className="font-medium text-gray-950">
                    {member.name}
                  </span>
                </p>
                <p className="text-amber-800">
                  Email:{" "}
                  <span className="font-medium text-gray-950">
                    {member.email}
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
