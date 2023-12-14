"use client";
import React, { useEffect, useState } from "react";
import UpdateFormInput from "../users/UpdateFormInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { updateFormikFields } from "@/utils/helpers";
import RefreshToken from "../auth/RefreshToken";
import { updateQuestionSchema } from "./QuizValidation";
import { useUpdateQuestionMutation } from "@/redux/api/quizApiSlice";
import { UpdateQuestReqType, UpdateQuestType } from "@/types/types";
import EditButton from "../common/EditButton";

export default function UpdateQuestion({
  id,
  quizId,
  question,
  questionId,
  setQuestionDisabledFields,
  questionDisabledFields,
  handleEditClick,
  index,
}: UpdateQuestType) {
  const [isActive, setIsActive] = useState({
    question: false,
    correctAnswer: false,
  });
  const toggleActiveState = (field: keyof typeof isActive) => {
    setIsActive((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  const [isActiveQuestions, setIsActiveQuestions] = useState(
    new Array(question?.answers.length).fill(false)
  );

  const toggleIsActiveAnswers = (index: number) => {
    setIsActiveQuestions((prev) => {
      const updatedIsActive = [...prev];
      updatedIsActive[index] = !updatedIsActive[index];
      return updatedIsActive;
    });
  };

  // UPDATE QUESTION
  const [
    updateQuestion,
    { error: updateQuestionError, isSuccess: isUpdateQuestionSuccess },
  ] = useUpdateQuestionMutation();

  const handleUpdateQuestion = async (data: UpdateQuestReqType) => {
    try {
      await updateQuestion(data);
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    if (isUpdateQuestionSuccess || updateQuestionError) {
      toast.success("Question has been successfully updated", {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsActive({
        question: false,
        correctAnswer: false,
      });
      setIsActiveQuestions(new Array(question?.answers.length).fill(false));
      formik.resetForm();
      setQuestionDisabledFields(false);
      handleEditClick(index);
    }
  }, [isUpdateQuestionSuccess, updateQuestionError]);

  const formik = useFormik({
    initialValues: {
      question: question?.question,
      answers: question?.answers,
      correctAnswer: question?.correctAnswer,
    },
    validationSchema: updateQuestionSchema,
    onSubmit: (values: any) => {
      const updatedFields = updateFormikFields(
        values,
        formik,
        formik.initialValues
      );
      if (formik.dirty) {
        handleUpdateQuestion({
          questionId: questionId,
          quizId: quizId,
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

  return (
    <>
      <div className="flex flex-col">
        <form
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          className="flex w-full flex-col gap-2"
        >
          <div className="w-full flex flex-col justify-between ">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="question" className="font-semibold">
                Question
              </label>
              <div className="flex flex-row items-center gap-1">
                <UpdateFormInput
                  type="text"
                  name="question"
                  placeholder={`${question?.question}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.question}
                  isActive={isActive.question}
                  disabled={questionDisabledFields}
                />
                {!questionDisabledFields && (
                  <EditButton
                    toggleActiveState={() => toggleActiveState("question")}
                    field="question"
                    isActive={isActive.question}
                  />
                )}
              </div>
              {formik.touched.question && formik.errors.question && (
                <p className="text-xs text-red-600">
                  {formik.errors.question as string}
                </p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="correctAnswer" className="font-semibold">
                Correct Answer
              </label>
              <div className="flex flex-row items-center gap-1">
                <UpdateFormInput
                  type="text"
                  name="correctAnswer"
                  placeholder={`${question?.correctAnswer}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.correctAnswer}
                  isActive={isActive.correctAnswer}
                  disabled={questionDisabledFields}
                />
                {!questionDisabledFields && (
                  <EditButton
                    toggleActiveState={() => toggleActiveState("correctAnswer")}
                    field="correctAnswer"
                    isActive={isActive.correctAnswer}
                  />
                )}
              </div>
              {formik.touched.correctAnswer && formik.errors.correctAnswer && (
                <p className="text-xs text-red-600">
                  {formik.errors.correctAnswer as string}
                </p>
              )}
            </div>

            <div className="w-full flex flex-col gap-1">
              <label htmlFor="answers" className="font-semibold">
                Answers
              </label>
              {question?.answers.map((answer, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex flex-row items-center gap-1">
                    <UpdateFormInput
                      type="text"
                      name={`answers[${index}]`}
                      placeholder={`${answer}`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.answers[index]}
                      isActive={isActiveQuestions[index]}
                      disabled={questionDisabledFields}
                    />
                    {!questionDisabledFields && (
                      <EditButton
                        toggleActiveState={() => toggleIsActiveAnswers(index)}
                        isActive={isActiveQuestions[index]}
                        field=""
                      />
                    )}
                  </div>
                  {formik.touched.answers &&
                    typeof formik.errors.answers === "string" && (
                      <p className="text-xs text-red-600">
                        {formik.errors.answers}
                      </p>
                    )}
                </div>
              ))}
            </div>
            {formik.errors.answers && formik.values.answers.length < 2 && (
              <p className="text-xs text-red-600">
                Please add at least two answers
              </p>
            )}

            <button type="submit" className="btn btn-neutral w-full mt-6">
              Update
            </button>
          </div>
        </form>
      </div>
      <RefreshToken error={updateQuestionError} />
    </>
  );
}
