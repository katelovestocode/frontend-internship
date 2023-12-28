"use client";
import React, { useState } from "react";
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

  const [memberId, setMemberId] = useState<number | null>(null);
  const [selectUser, setSelectUser] = useState(false);
  const [selectedType, setSelectedType] = useState("csv");
  const csvHeader =
    "id,questionResponses,totalQuestions,totalCorrect,averageScoreWithinCompany,overallRatingAcrossSystem,userId,userEmail,userName,timestamp";
  const csvLineType = "company";

  const handleGetAllUsersQuizResults = async () => {
    try {
      setSelectUser(false);
      const result = await getAllUsersResults({
        companyId: id,
        type: selectedType,
      });
      downloadFile(result?.data?.data, selectedType, csvHeader, csvLineType);
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleGetOneUserQuizResults = async (memberId: number) => {
    try {
      setMemberId(memberId);
      const result = await getOneUserResults({
        companyId: id,
        userId: memberId,
        type: selectedType,
      });
      downloadFile(result?.data?.data, selectedType, csvHeader, csvLineType);
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

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
              onClick={() => handleGetAllUsersQuizResults()}
            >
              <GrGroup /> Get All Users Data
            </button>
          </div>
          <div className="flex gap-2 flex-row">
            <button
              className="btn btn-outline"
              onClick={() => setSelectUser(true)}
            >
              <FaRegUser /> One User Results
            </button>
          </div>
        </div>
      </div>

      {selectUser && (
        <div className="flex flex-col gap-6 p-2 ">
          <h2 className="font-bold text-2xl"> Choose a Company Member: </h2>
          <ul className="grid gap-4 grid-cols-2">
            {company?.members &&
              company.members.map((member: UserType, index: number) => (
                <li
                  key={index}
                  className={`flex flex-col gap-2 place-items-center border-solid border rounded-xl p-2.5 bg-white shadow-lg ${
                    memberId === member.id
                      ? "border-amber-800 border-4"
                      : "border-zinc-200"
                  } `}
                  onClick={() => {
                    handleGetOneUserQuizResults(member.id!);
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
