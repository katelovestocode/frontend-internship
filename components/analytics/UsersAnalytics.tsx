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
import { useLazyGetOneQuizQuery } from "@/redux/api/quizApiSlice";

export default function UsersAnalytics({ id }: { id: number }) {
  const [
    userAvarageByQuiz,
    { data: userAvarageByQuizData, error: userAvarageByQuizError },
  ] = useLazyGetUserAvarageQuizAnalyticsQuery();

  const [
    userAvarageAllQuizzes,
    { data: userAvarageAllQuizzesData, error: userAvarageAllQuizzesError },
  ] = useLazyGetUserAvarAllQuizAnalyticsQuery();

  //   const { data, error: getOneUserError } = useGetOneUserQuery(id);
  //   const { user } = data || {};

  //   const [getOneQuiz, { data: getOneQuizData, error: getOneQuizError }] =
  //     useLazyGetOneQuizQuery();

  //   useEffect(() => {
  //     getOneQuiz({ quizId: isQuizSelected, companyId: companyId });
  //   }, [companyId, quizId]);

  const [isQuizSelected, setIsQuizSelected] = useState(false);
  const [isAllQuizzesAttempts, setIsAllQuizzesAttempts] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const changeFieldStatus = () => {
    setIsQuizSelected(true);
    setIsAllQuizzesAttempts(false);
  };

  const getUserAvaragebyQuiz = (selectedQuiz: number) => {
    setSelectedQuiz(selectedQuiz);
    handleGetUsersAvarageByQuiz(id, selectedQuiz);
  };

  const handleGetUsersAvarageByQuiz = async (
    id: number,
    selectedQuiz: number
  ) => {
    try {
      await userAvarageByQuiz({ userId: id, quizId: selectedQuiz });
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const getAllQuizAttempts = async () => {
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
        {id && (
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
                    onClick={() => getAllQuizAttempts()}
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
            <div className="flex flex-row">
              <div className="flex flex-col w-32 gap-6 border-2 p-2 rounded-md shadow-md">
                <h2 className="font-bold text-2xl"> Quizzes: </h2>
                {/* <ul className="flex flex-col gap-6">
                {company?.members?.map((member: any, index: number) => (
                  <li
                    key={index}
                    onClick={() => getUserAvaragebyQuiz(member.id, member.name)}
                    className={`w-24 flex place-content-start text-lg font-medium border-2 p-2 rounded-md shadow-md  ${
                      selectedUser === member.id
                        ? "border-2 border-amber-700"
                        : "text-xl"
                    } `}
                  >
                    {member.name}
                  </li>
                ))}
              </ul> */}
              </div>

              {/* {userAvarageAllQuizzesData && (
              <LineChart
                data={userAvarageAllQuizzesData}
                name={`${userAvarageAllQuizzesData.userName}'s Analytics`}
              />
            )} */}
            </div>
          </>
        )}
      </div>
      {userAvarageAllQuizzesData && isAllQuizzesAttempts && (
        <LineChart
          data={userAvarageAllQuizzesData}
          name={`${userAvarageAllQuizzesData?.analytics?.[0]?.userName}'s Analytics`}
        />
      )}
    </>
  );
}
