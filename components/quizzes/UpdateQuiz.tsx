"use client";
import React, { useEffect, useState } from "react";
import ModalWindow from "../common/Modal";
import UpdateFormInput from "../users/UpdateFormInput";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { updateFormikFields } from "@/utils/helpers";
import RefreshToken from "../auth/RefreshToken";
import { updateQuizSchema } from "./QuizValidation";
import AddQuestion from "./AddQuestion";
import {
  useUpdateQuizMutation,
  useDeleteQuestionMutation,
} from "@/redux/api/quizApiSlice";
import {
  DeleteQuestReqType,
  UpdateFieldsQuizType,
  UpdateQuizBodyType,
  UpdateQuizType,
} from "@/types/types";
import UpdateQuestion from "./UpdateQuestion";

export default function UpdateQuiz({
  id,
  quiz,
  showModal,
  toggleModal,
  disabledFields,
  setDisabledFields,
}: UpdateQuizType) {
  const [isActive, setIsActive] = useState({
    title: false,
    description: false,
    frequencyInDays: false,
  });
  const [addedQuestion, setAddedQuestion] = useState(false);
  const [editQuestions, setEditQuestions] = useState(
    new Array(quiz?.questions.length).fill(false)
  );
  const [questionDisabledFields, setQuestionDisabledFields] = useState(true);
  const handleEditQuestionClick = (index: number) => {
    const updatedEditQuestions = [...editQuestions];
    updatedEditQuestions[index] = !updatedEditQuestions[index];
    setEditQuestions(updatedEditQuestions);
    setQuestionDisabledFields((prev) => !prev);
  };

  // UPDATE QUIZ
  const [
    updateQuiz,
    { error: updateQuizError, isSuccess: isUpdateQuizSuccess },
  ] = useUpdateQuizMutation();

  const handleUpdateQuiz = async (data: UpdateQuizBodyType) => {
    try {
      await updateQuiz(data);
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    if (isUpdateQuizSuccess) {
      toast.success("Quiz has been successfully updated", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (updateQuizError) {
      setDisabledFields(true);
      setIsActive({
        title: false,
        description: false,
        frequencyInDays: false,
      });
      formik.resetForm();
    }
  }, [isUpdateQuizSuccess]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      frequencyInDays: 1,
    },
    validationSchema: updateQuizSchema,
    onSubmit: (values: any) => {
      const updatedFields = updateFormikFields(
        values,
        formik,
        formik.initialValues
      );
      if (formik.dirty) {
        handleUpdateQuiz({
          quizId: quiz.id,
          companyId: id,
          ...updatedFields,
        });
      } else {
        toast.error("No changes were made!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    },
  });

  useEffect(() => {
    if (showModal) formik.resetForm();
    setDisabledFields(false);
    setIsActive({
      title: false,
      description: false,
      frequencyInDays: false,
    });
  }, [formik.resetForm, showModal]);

  const toggleActiveState = (field: keyof UpdateFieldsQuizType) => {
    setIsActive((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // DELETE QUESTION
  const [
    deleteQuestion,
    { error: deleteQuestionError, isSuccess: isDeleteQuestionSuccess },
  ] = useDeleteQuestionMutation();

  const handleDeleteQuestion = async (data: DeleteQuestReqType) => {
    try {
      await deleteQuestion(data);
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    if (isDeleteQuestionSuccess) {
      toast.success("Question has been successfully deleted", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [isDeleteQuestionSuccess]);

  const toggleAddQuestion = () => {
    setAddedQuestion(true);
  };

  return (
    <>
      <ModalWindow
        showModal={showModal}
        toggleModal={toggleModal}
        minWidth="min-w-[80%]"
      >
        <div className="flex flex-col place-items-center">
          <h2 className="text-center font-bold text-2xl mb-2">Update Quiz</h2>
          <div className="flex gap-2">
            <div className="flex w-1/2 flex-col gap-4 place-items-center border-solid border-gray-700 border-1 rounded-xl p-2 flex bg-white">
              <h3 className="text-center font-bold text-xl">Quiz Info</h3>
              <form
                autoComplete="off"
                onSubmit={formik.handleSubmit}
                className="flex w-full flex-col gap-5 p-2 justify-center items-center rounded-xl shadow-xl"
              >
                <div className="w-full">
                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="title" className="font-semibold">
                      Title
                    </label>
                    <div className="flex flex-row pt-2 items-center gap-2">
                      <UpdateFormInput
                        type="text"
                        name="title"
                        placeholder={`${quiz?.title}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                        isActive={isActive.title}
                        disabled={disabledFields}
                      />
                      {!disabledFields && (
                        <button
                          type="button"
                          onClick={() => toggleActiveState("title")}
                        >
                          {!isActive.title ? <MdEdit /> : <FaCheck />}
                        </button>
                      )}
                    </div>
                    {formik.touched.title && formik.errors.title && (
                      <p className="text-xs text-red-600 pt-1">
                        {formik.errors.title as string}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="description" className="font-semibold">
                      Description
                    </label>
                    <div className="flex flex-row pt-2 items-center gap-2">
                      <UpdateFormInput
                        type="text"
                        name="description"
                        placeholder={`${quiz?.description}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                        isActive={isActive.description}
                        disabled={disabledFields}
                      />

                      {!disabledFields && (
                        <button
                          type="button"
                          onClick={() => toggleActiveState("description")}
                        >
                          {!isActive.description ? <MdEdit /> : <FaCheck />}
                        </button>
                      )}
                    </div>
                    {formik.touched.description &&
                      formik.errors.description && (
                        <p className="text-xs text-red-600 pt-1">
                          {formik.errors.description as string}
                        </p>
                      )}
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="frequencyInDays" className="font-semibold">
                      Frequency In Days
                    </label>
                    <div className="flex flex-row pt-2 items-center gap-2">
                      <UpdateFormInput
                        type="text"
                        name="frequencyInDays"
                        placeholder={`${quiz?.frequencyInDays}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.frequencyInDays}
                        isActive={isActive.frequencyInDays}
                        disabled={disabledFields}
                      />

                      {!disabledFields && (
                        <button
                          type="button"
                          onClick={() => toggleActiveState("frequencyInDays")}
                        >
                          {!isActive.frequencyInDays ? <MdEdit /> : <FaCheck />}
                        </button>
                      )}
                    </div>
                    {formik.touched.frequencyInDays &&
                      formik.errors.frequencyInDays && (
                        <p className="text-xs text-red-600 pt-1">
                          {formik.errors.frequencyInDays as string}
                        </p>
                      )}
                  </div>

                  {!disabledFields && (
                    <button
                      type="submit"
                      className="btn btn-neutral mt-4 w-full"
                    >
                      Update Quiz Info
                    </button>
                  )}
                </div>
              </form>
              {/* ADD QUESTION */}
              <AddQuestion
                quizId={quiz.id}
                companyId={id}
                addedQuestion={addedQuestion}
                setAddedQuestion={setAddedQuestion}
                showModal={showModal}
              />
            </div>
            <div className="flex flex-row gap-2">
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {quiz?.questions.map((question, index: number) => (
                  <li
                    key={index}
                    className="flex flex-col gap-2 h-80 lg:text-sm justify-between border-solid border-gray-700 border-1 rounded-xl p-4 bg-white shadow-lg"
                  >
                    {/*  UPDATE QUESTION */}
                    {editQuestions[index] ? (
                      <UpdateQuestion
                        id={id}
                        question={question}
                        questionId={question.id}
                        quizId={quiz.id}
                        setQuestionDisabledFields={setQuestionDisabledFields}
                        questionDisabledFields={questionDisabledFields}
                        handleEditClick={handleEditQuestionClick}
                        index={index}
                      />
                    ) : (
                      <div className="flex gap-2 flex-col">
                        <p className="text-amber-800">
                          Question:{" "}
                          <span className="font-medium text-gray-950">
                            {question.question}
                          </span>
                        </p>
                        <p className="text-amber-800">
                          Answers:{" "}
                          <span className="font-bold text-gray-950">
                            {question.answers.map((answer, index) => (
                              <p key={index}>{answer} </p>
                            ))}
                          </span>
                        </p>
                        <p className="text-amber-800">
                          Correct Answer:{" "}
                          <span className="font-medium text-gray-950">
                            {question.correctAnswer}
                          </span>
                        </p>
                      </div>
                    )}
                    {questionDisabledFields ? (
                      <div className=" flex gap-2 flex-row place-content-center">
                        <button
                          type="button"
                          className="btn btn-outline"
                          onClick={() => handleEditQuestionClick(index)}
                        >
                          ✔
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline btn-error text-2xl text-bold"
                          onClick={() =>
                            handleDeleteQuestion({
                              questionId: question.id,
                              quizId: quiz.id,
                              companyId: id,
                            })
                          }
                        >
                          -
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="btn btn-neutral"
                onClick={() => toggleAddQuestion()}
              >
                +Question
              </button>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-neutral w-80 mt-2"
            onClick={() => toggleModal()}
          >
            Ok, I am done
          </button>
        </div>
      </ModalWindow>
      <RefreshToken error={updateQuizError || deleteQuestionError} />
    </>
  );
}
