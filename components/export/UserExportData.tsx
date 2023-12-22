"use client";
import React, { useEffect, useState } from "react";
import { useLazyGetUsersQuizResultsQuery } from "@/redux/api/exportDataApiSlice";
import { FaRegUser } from "react-icons/fa";
import { toast } from "react-toastify";
import SelectedButton from "../common/SelectedButton";
import { downloadFile } from "./exportFileHelper";

export default function UserExportData({ id }: { id: number }) {
  const [
    getUsersResults,
    { data: getUsersResultsData, isSuccess: getUsersResultsSuccess },
  ] = useLazyGetUsersQuizResultsQuery();

  const [isSelected, setIsSelected] = useState(false);
  const [isLoadingGetUserData, setIsLoadingGetUserData] = useState(false);
  const [selectedType, setSelectedType] = useState("csv");
  const csvHeader =
    "id,questionResponses,totalQuestions,totalCorrect,averageScoreWithinCompany,overallRatingAcrossSystem,timestamp";
  const csvLineType = "user";

  useEffect(() => {
    if (isSelected) {
      handleGetUserQuizResults();
    }
  }, [isSelected]);

  const handleGetUserQuizResults = async () => {
    try {
      setIsLoadingGetUserData(true);
      await getUsersResults({ userId: id, type: selectedType });
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setIsLoadingGetUserData(false);
    }
  };

  useEffect(() => {
    if (getUsersResultsSuccess && !isLoadingGetUserData) {
      downloadFile(
        getUsersResultsData?.data,
        selectedType,
        csvHeader,
        csvLineType
      );
    }
  }, [
    getUsersResultsData,
    getUsersResultsSuccess,
    isLoadingGetUserData,
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
              onClick={() => setIsSelected(true)}
            >
              <FaRegUser /> Get Your Quiz Data
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
