"use client";
import { useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik, FormikProvider, FieldArray, Field } from "formik";
import RefreshToken from "../auth/RefreshToken";
import ModalWindow from "../common/Modal";
import Button from "../common/Button";
import { useCreateQuizMutation } from "@/redux/api/quizApiSlice";
import { createAQuizSchema } from "./QuizValidation";
import {
  CreateQuizType,
  IdProps,
  MyFormValues,
  QuestionsWithNoIDType,
} from "@/types/types";

export default function CreateQuiz({ id }: IdProps) {
  const [
    createAQuiz,
    {
      data: createAQuizData,
      isSuccess: isCreateAQuizSuccess,
      isError: isCreateAQuizError,
      error: createError,
    },
  ] = useCreateQuizMutation();

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
    formik.resetForm();
  };

  useEffect(() => {
    if (isCreateAQuizError) {
      toast.error((isCreateAQuizError as any).message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (isCreateAQuizSuccess) {
      toggleModal();
      toast.success("New Quiz has been created", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [isCreateAQuizSuccess, isCreateAQuizError]);

  const handleCreateQuiz = async (quiz: CreateQuizType) => {
    try {
      await createAQuiz(quiz);
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const formik = useFormik<MyFormValues>({
    initialValues: {
      title: "",
      description: "",
      frequencyInDays: null,
      questions: [{ question: "", answers: ["", ""], correctAnswer: "" }],
    },
    validationSchema: createAQuizSchema,
    onSubmit: async (values) => {
      const body = {
        title: values.title,
        description: values.description,
        frequencyInDays: Number(values.frequencyInDays),
        questions: values.questions,
      };
      handleCreateQuiz({
        companyId: id,
        ...body,
      });
    },
  });

  return (
    <>
      <div className="w-60">
        <Button onClick={toggleModal} title={"Add Quiz"} />
      </div>
      <ModalWindow
        showModal={showModal}
        toggleModal={toggleModal}
        minWidth="min-w-[80%]"
      >
        <div className="flex flex-col border-solid mb-6 border-gray-700 border-1 rounded-xl p-10 flex gap-2 bg-white shadow-2xl ">
          <h2 className="text-center font-bold text-2xl mb-4">
            Add a new Quiz
          </h2>
          <FormikProvider value={formik}>
            <form
              autoComplete="off"
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-5 justify-center items-center"
            >
              <div className="flex flex-row gap-5 justify-start items-start">
                {" "}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-full">
                    <label htmlFor="name" className="font-semibold">
                      Title
                    </label>
                    <div className="flex flex-row pt-2 items-center gap-2">
                      <Field
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                        className="w-full p-2 border-solid border-gray-400 border rounded-md text-zinc-800"
                      />
                    </div>
                    {formik.touched.title && formik.errors.title && (
                      <p className="text-xs text-red-600 pt-1">
                        {formik.errors.title as string}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <label htmlFor="description" className="font-semibold">
                      Description
                    </label>
                    <div className="flex flex-row pt-2 items-center gap-2">
                      <Field
                        type="text"
                        name="description"
                        placeholder="Description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                        className="w-full p-2 border-solid border-gray-400 border rounded-md text-zinc-800"
                      />
                    </div>
                    {formik.touched.description &&
                      formik.errors.description && (
                        <p className="text-xs text-red-600 pt-1">
                          {formik.errors.description as string}
                        </p>
                      )}
                  </div>
                  <div className="w-full">
                    <label htmlFor="frequencyInDays" className="font-semibold">
                      Frequency In Days
                    </label>
                    <div className="flex flex-row pt-2 items-center gap-2">
                      <Field
                        type="text"
                        name="frequencyInDays"
                        placeholder="Frequency In Days"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.frequencyInDays}
                        className="w-full p-2 border-solid border-gray-400 border rounded-md text-zinc-800"
                      />
                    </div>
                    {formik.touched.frequencyInDays &&
                      formik.errors.frequencyInDays && (
                        <p className="text-xs text-red-600 pt-1">
                          {formik.errors.frequencyInDays as string}
                        </p>
                      )}
                  </div>
                </div>
                <FieldArray name="questions">
                  {({ insert, remove, push }) => (
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-2">
                        {formik.values?.questions?.length > 0 &&
                          formik.values?.questions?.map((question, index) => (
                            <div className="flex flex-col gap-2" key={index}>
                              <div className="flex flex-col pt-2 items-start">
                                <label
                                  htmlFor={`questions.${index}.question`}
                                  className="font-semibold"
                                >
                                  Question
                                </label>
                                <Field
                                  type="text"
                                  name={`questions.${index}.question`}
                                  placeholder="Question"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  className="w-full p-2 border-solid border-gray-400 border rounded-md text-zinc-800"
                                  value={
                                    formik.values.questions?.[index].question
                                  }
                                />
                                {formik.touched.questions?.[index]?.question &&
                                formik.errors.questions &&
                                formik.errors.questions?.[index] ? (
                                  <p className="text-xs text-red-600 pt-1">
                                    {
                                      (
                                        formik.errors.questions?.[
                                          index
                                        ] as QuestionsWithNoIDType
                                      ).question
                                    }
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>

                              <div className="flex flex-col pt-2 items-start">
                                <label
                                  htmlFor={`questions.${index}.correctAnswer`}
                                  className="font-semibold"
                                >
                                  Correct Answer
                                </label>
                                <Field
                                  type="text"
                                  name={`questions.${index}.correctAnswer`}
                                  placeholder="Correct Answer"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={
                                    formik.values.questions?.[index]
                                      .correctAnswer
                                  }
                                  className="w-full p-2 border-solid border-gray-400 border rounded-md text-zinc-800"
                                />
                                {formik.touched.questions?.[index]
                                  ?.correctAnswer &&
                                formik.errors.questions &&
                                formik.errors.questions?.[index] ? (
                                  <p className="text-xs text-red-600 pt-1">
                                    {
                                      (
                                        formik.errors.questions?.[
                                          index
                                        ] as QuestionsWithNoIDType
                                      ).correctAnswer
                                    }
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>

                              <div className="flex flex-col pt-2 items-start">
                                <label
                                  htmlFor={`questions.${index}.answers`}
                                  className="font-semibold"
                                >
                                  Answers
                                </label>
                                <FieldArray
                                  name={`questions.${index}.answers`}
                                  render={(arrayHelpers) => (
                                    <div className="flex flex-col gap-2">
                                      {question.answers &&
                                        question.answers.map(
                                          (answer, answerIndex) => (
                                            <div
                                              key={answerIndex}
                                              className="flex flex-col"
                                            >
                                              <div className="flex flex-row gap-2">
                                                <Field
                                                  type="text"
                                                  name={`questions.${index}.answers.${answerIndex}`}
                                                  placeholder={`Answer ${
                                                    answerIndex + 1
                                                  }`}
                                                  className="w-full p-2 border-solid border-gray-400 border rounded-md text-zinc-800"
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  value={
                                                    formik.values.questions?.[
                                                      index
                                                    ].answers?.[answerIndex]
                                                  }
                                                />

                                                <button
                                                  type="button"
                                                  className="btn btn-outline btn-error text-2xl remove-answer"
                                                  onClick={() =>
                                                    arrayHelpers.remove(
                                                      answerIndex
                                                    )
                                                  }
                                                >
                                                  -
                                                </button>
                                              </div>
                                              {formik.touched.questions?.[index]
                                                ?.answers &&
                                              formik.errors.questions?.[
                                                index
                                              ] &&
                                              (
                                                formik.errors.questions[
                                                  index
                                                ] as QuestionsWithNoIDType
                                              ).answers &&
                                              (
                                                formik.errors.questions[
                                                  index
                                                ] as QuestionsWithNoIDType
                                              ).answers[answerIndex] ? (
                                                <p className="text-xs text-red-600 pt-1">
                                                  {
                                                    (
                                                      formik.errors.questions[
                                                        index
                                                      ] as QuestionsWithNoIDType
                                                    ).answers[answerIndex]
                                                  }
                                                </p>
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                          )
                                        )}
                                      {formik.errors.questions &&
                                        formik.values.questions.length < 2 && (
                                          <p className="text-xs text-red-600">
                                            Please add at least two questions
                                          </p>
                                        )}
                                      <button
                                        type="button"
                                        className="secondary btn btn-outline w-full"
                                        onClick={() => arrayHelpers.push("")}
                                      >
                                        Add Answer
                                      </button>
                                    </div>
                                  )}
                                />
                              </div>

                              <button
                                type="button"
                                className="secondary btn btn-outline"
                                onClick={() => remove(index)}
                              >
                                REMOVE Question
                              </button>
                            </div>
                          ))}
                      </div>
                      <button
                        type="button"
                        className="secondary btn btn-outline"
                        onClick={() =>
                          push({
                            question: "",
                            answers: ["", ""],
                            correctAnswer: "",
                          })
                        }
                      >
                        Add Question
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>
              <Button title="Submit" />
            </form>
          </FormikProvider>
        </div>
      </ModalWindow>
      <RefreshToken error={createError} />
    </>
  );
}
