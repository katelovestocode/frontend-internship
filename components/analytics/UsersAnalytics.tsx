"use client";
import { FaRegUser } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import {
  useLazyGetUserAvarAllQuizAnalyticsQuery,
  useLazyGetUserAvarageQuizAnalyticsQuery,
} from "@/redux/api/analyticsApiSlice";
import LineChart from "./LineChart";
import { useGetAllQuizAttemptsQuery } from "@/redux/api/quizAttempt";
import { AttemptType, GetOneQuizType } from "@/types/types";
import { useAppSelector } from "@/redux/store";
import moment from "moment";

export default function UsersAnalytics({ id }: { id: number }) {
  const userId = useAppSelector((state) => state.authReducer.user?.id);
  const [userAvarageByQuiz, { data: userAvarageByQuizData }] =
    useLazyGetUserAvarageQuizAnalyticsQuery();

  const [userAvarageAllQuizzes, { data: userAvarageAllQuizzesData }] =
    useLazyGetUserAvarAllQuizAnalyticsQuery();

  const { data, error } = useGetAllQuizAttemptsQuery(id);

  const uniqueQuizIds = Array.from(
    new Set(data?.quizAttempts?.map((quiz: GetOneQuizType) => quiz.quiz.id))
  );

  const [isQuizSelected, setIsQuizSelected] = useState(false);
  const [isAllQuizzesAttempts, setIsAllQuizzesAttempts] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const changeFieldStatus = () => {
    setIsQuizSelected(true);
    setIsAllQuizzesAttempts(false);
  };

  const handleGetUsersAvarageByQuiz = async (
    id: number,
    selectedQuiz: number
  ) => {
    setSelectedQuiz(selectedQuiz);
    try {
      await userAvarageByQuiz({ userId: id, quizId: selectedQuiz });
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleGetAllQuizAttempts = async () => {
    setIsQuizSelected(false);
    setIsAllQuizzesAttempts(true);
    try {
      await userAvarageAllQuizzes(id);
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <>
      <div className="w-full">
        {id && userId === Number(id) && (
          <>
            <div className="mb-4">
              <div className="flex gap-4 flex-row">
                <div className="flex gap-2 flex-row">
                  <button
                    className="btn btn-outline"
                    onClick={() => changeFieldStatus()}
                  >
                    <FaRegUser /> One Quizz Attempts
                  </button>
                </div>
                <div className="flex gap-2 flex-row">
                  <button
                    className="btn btn-outline"
                    onClick={() => handleGetAllQuizAttempts()}
                  >
                    <FaRegUser /> All Quiz Attempts
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {isQuizSelected && (
          <>
            <div className="flex flex-row gap-4 pt-4 place-items-center">
              <div className="flex flex-col place-content-center gap-6 border-2 p-2 rounded-md shadow-md">
                <h2 className="font-bold text-2xl"> Quizzes: </h2>
                <ul className="grid gap-4 grid-cols-2">
                  {uniqueQuizIds?.map((quizId: any, index: number) => (
                    <li
                      key={index}
                      onClick={() => handleGetUsersAvarageByQuiz(id, quizId)}
                      className={`flex place-content-start text-lg font-medium border-2 p-2 rounded-md shadow-md  ${
                        selectedQuiz === quizId
                          ? "border-2 border-amber-700"
                          : "text-xl"
                      } `}
                    >
                      {quizId}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full">
                {userAvarageByQuizData && (
                  <LineChart
                    data={userAvarageByQuizData}
                    name={`Quiz #${selectedQuiz} Analytics`}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {userAvarageAllQuizzesData && isAllQuizzesAttempts && (
        <div className="flex flex-col gap-6 p-2 ">
          <h2 className="font-bold text-2xl"> Last Attempts: </h2>
          <ul className="grid gap-4 grid-cols-3">
            {userAvarageAllQuizzesData?.analytics?.map(
              (attempt: AttemptType, index: number) => (
                <li
                  key={index}
                  className="border-solid border-gray-700 border-1 rounded-xl p-4 flex gap-2 bg-white flex-col shadow-lg"
                >
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
              )
            )}
          </ul>
        </div>
      )}
    </>
  );
}
