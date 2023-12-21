import { useEffect, useState } from "react";
import React from "react";
import { useDeleteQuizMutation } from "@/redux/api/quizApiSlice";
import CommonModal from "../common/CommonModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateQuiz from "./UpdateQuiz";
import { QuizAndCompIdType } from "@/types/types";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import { useGetOneCompanyQuery } from "@/redux/api/companyApiSlice";

export default function ListOfCompanyQuizzesItem({
  quiz,
  companyId,
}: QuizAndCompIdType) {
  const [disabledFields, setDisabledFields] = useState(true);
  const [showDeleteQuizModal, setShowDeleteQuizModal] = useState(false);
  const [showUpdateQuizModal, setShowUpdateQuizModal] = useState(false);
  const userId = useAppSelector((state) => state.authReducer.user?.id);

  const { data } = useGetOneCompanyQuery(companyId);
  const { company } = data || {};

  // DELETE QUIZ
  const [
    deleteQuiz,
    { error: deleteQuizError, isSuccess: isDeleteQuizSuccess },
  ] = useDeleteQuizMutation();

  const toggleDeleteQuizModal = () => {
    setShowDeleteQuizModal((prev) => !prev);
  };

  const handleDeleteQuiz = async (ids: any[]) => {
    try {
      await deleteQuiz({
        quizId: ids[0],
        companyId: ids[1],
      });
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    if (isDeleteQuizSuccess) {
      toggleDeleteQuizModal();
      toast.success("Quiz has been successfully deleted", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [isDeleteQuizSuccess]);

  // UPDATE QUIZ
  const toggleUpdateQuizModal = () => {
    setShowUpdateQuizModal((prev) => !prev);
    setDisabledFields(false);
  };

  return (
    <>
      <li className="flex flex-col gap-2 justify-between border-solid border-gray-700 border-1 rounded-xl p-6 bg-white shadow-lg">
        <div className="flex gap-2 flex-col">
          <p className="text-amber-800">
            Quiz ID #:{" "}
            <span className="font-medium text-gray-950">{quiz.id}</span>
          </p>
          <p className="text-amber-800">
            Title: <span className="font-bold text-gray-950">{quiz.title}</span>
          </p>
          <p className="text-amber-800">
            Description:{" "}
            <span className="font-medium text-gray-950">
              {quiz.description}
            </span>
          </p>
          <p className="text-amber-800">
            Frequency:{" "}
            <span className="font-medium text-gray-950">
              {quiz.frequencyInDays}
            </span>
          </p>
        </div>
        {company?.owner?.id === userId ? (
          <div className="w-full flex gap-2 flex-col">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => toggleUpdateQuizModal()}
            >
              Update Quiz
            </button>
            <button
              type="button"
              className="btn-error btn btn-outline"
              onClick={() => toggleDeleteQuizModal()}
            >
              Delete
            </button>
          </div>
        ) : (
          <Link href={`/companies/${companyId}/quizzes/${quiz.id}`} passHref>
            <button type="button" className="btn btn-outline w-full">
              Take a Quiz
            </button>
          </Link>
        )}
      </li>

      <CommonModal
        ids={[quiz.id, companyId]}
        showModal={showDeleteQuizModal}
        toggleModal={toggleDeleteQuizModal}
        handleOnClick={handleDeleteQuiz}
        titleText="Are you sure you want to delete this quiz?"
        yesText="Yes, I made my mind"
        noText="No, I changed my mind"
        error={deleteQuizError}
      />

      <UpdateQuiz
        id={companyId}
        quiz={quiz}
        showModal={showUpdateQuizModal}
        toggleModal={toggleUpdateQuizModal}
        disabledFields={disabledFields}
        setDisabledFields={setDisabledFields}
      />
    </>
  );
}
