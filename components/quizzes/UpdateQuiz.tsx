"use client";
import React, { useEffect, useState } from "react";
import ModalWindow from "../common/Modal";
import UpdateFormInput from "../users/UpdateFormInput";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { UpdateFieldsQuizType } from "@/types/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { updateFormikFields } from "@/utils/helpers";
import RefreshToken from "../auth/RefreshToken";
import { useUpdateQuizMutation } from "@/redux/api/quizApiSlice";
import { updateQuizSchema } from "./QuizValidation";

export default function UpdateQuiz({
  id,
  quiz,
  showModal,
  toggleModal,
  disabledFields,
  setDisabledFields,
}) {
  const [isActive, setIsActive] = useState({
    title: false,
    description: false,
    frequencyInDays: false,
  });
  //   const [disabledFields, setDisabledFields] = useState({
  //     title: true,
  //     description: true,
  //     frequencyInDays: true,
  //   });

  const [
    updateQuiz,
    { error: updateQuizError, isSuccess: isUpdateQuizSuccess },
  ] = useUpdateQuizMutation();

  const handleUpdateQuiz = async (data: any) => {
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
      //   toggleModal();
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

  return (
    <>
      <ModalWindow
        showModal={showModal}
        toggleModal={toggleModal}
        minWidth="min-w-[80%]"
      >
        <div className="flex flex-row">
          <div className="flex flex-col place-items-center border-solid border-gray-700 border-1 rounded-xl p-4 flex gap-2 bg-white ">
            <h2 className="text-center font-bold text-2xl mb-4">Update Quiz</h2>

            <form
              autoComplete="off"
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-5 justify-center items-center w-52 md:w-80 "
            >
              <div>
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
                  {formik.touched.description && formik.errors.description && (
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
                  <button type="submit" className="btn btn-outline mt-4 w-full">
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-2">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {quiz?.questions.map((question, index) => (
                <li
                  key={index}
                  className="flex flex-col gap-2 sm:text-sm lg:text-base justify-between border-solid border-gray-700 border-1 rounded-xl p-4 bg-white shadow-lg"
                >
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
                  <div className="w-full flex gap-2 flex-col">
                    <button
                      type="button"
                      className="btn-error btn btn-outline"
                      onClick={() => console.log("click")}
                    >
                      Delete Question
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => console.log("click")}
            >
              Add question
            </button>
          </div>
        </div>
      </ModalWindow>
      <RefreshToken error={updateQuizError} />
    </>
  );
}
