"use client";
import { useLazyGetOneQuizQuery } from "@/redux/api/quizApiSlice";
import { useEffect, useState } from "react";
import RefreshToken from "../auth/RefreshToken";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormikProvider, useFormik } from "formik";
import { useAppSelector } from "@/redux/store";
import { useAttemptAQuizMutation } from "@/redux/api/quizAttempt";
import { quizAttemptValidSchema } from "./QuizAttemptValidation";
import Button from "../common/Button";
import { QuizAttemptType, QuizIdAndCompIdType } from "@/types/types";

export default function QuizAttempt({
  quizId,
  companyId,
}: QuizIdAndCompIdType) {
  const userId = useAppSelector((state) => state.authReducer.user?.id);
  const [finishedQuiz, setFinishedQuiz] = useState(false);
  const [getOneQuiz, { data, error: getOneQuizError }] =
    useLazyGetOneQuizQuery();

  const [
    sendQuizAttempt,
    {
      data: sendQuizAttemptData,
      error: sendQuizAttemptError,
      isSuccess: isQuizAttepmtSuccess,
    },
  ] = useAttemptAQuizMutation();

  const { quiz } = data || {};

  useEffect(() => {
    getOneQuiz({ quizId: quizId, companyId: companyId });
  }, [getOneQuiz, companyId, quizId]);

  const handleQuizAttempt = async (quiz: QuizAttemptType) => {
    try {
      await sendQuizAttempt(quiz);
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    if (isQuizAttepmtSuccess) {
      setFinishedQuiz(true);
      toast.error((isQuizAttepmtSuccess as any).message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (isQuizAttepmtSuccess) {
      toast.success("Quiz has been submitted", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [isQuizAttepmtSuccess, isQuizAttepmtSuccess]);

  const formik = useFormik({
    initialValues: {
      questions: quiz?.questions?.map((question) => ({
        answer: "",
        id: question.id,
      })),
    },
    validationSchema: quizAttemptValidSchema,
    onSubmit: async (values) => {
      const questionIds = quiz?.questions?.map((question) => question.id) || [];
      const questionsWithIds = values.questions?.map((question, index) => ({
        ...question,
        id: questionIds[index] || null,
      }));
      handleQuizAttempt({
        userId: userId!,
        quizId: quizId,
        questions: questionsWithIds,
      });
    },
  });

  console.log(
    quiz?.questions?.map((question) => ({
      answer: "",
      id: question.id,
    }))
  );
  console.log(formik.initialValues, "initialValues");

  return (
    <>
      {!finishedQuiz ? (
        <div className="p-4 xl:p-6 flex gap-7 flex-row">
          <div className="flex flex-col justify-between border-solid border-gray-700 border-1 rounded-xl p-8 gap-7 bg-white shadow-2xl">
            <div className="flex flex-col gap-7">
              <FormikProvider value={formik}>
                <form
                  autoComplete="off"
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <p className="flex gap-4 font-bold text-xl text-amber-800">
                    Name:{" "}
                    <span className="font-bold text-gray-950">
                      {quiz?.title}
                    </span>
                  </p>
                  <p className="flex gap-4 flex-wrap font-bold text-lg text-amber-800">
                    Description:{" "}
                    <span className="font-medium text-gray-950 max-w-xs">
                      {quiz?.description}
                    </span>
                  </p>
                  <p className="flex gap-4 font-bold text-lg text-amber-800">
                    Frequency In Days:{" "}
                    <span className="font-medium text-gray-950">
                      {quiz?.frequencyInDays}
                    </span>
                  </p>

                  <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {quiz?.questions &&
                      quiz?.questions.map((question, index) => (
                        <li
                          key={index}
                          className="flex flex-col gap-2 justify-between border-solid border-gray-700 border-1 rounded-xl p-6 bg-white shadow-lg"
                        >
                          <div className="flex gap-2 flex-col">
                            <p className="text-amber-800">
                              Question:{" "}
                              <span className="font-medium text-gray-950">
                                {question.question}
                              </span>
                            </p>
                            <ul className="text-amber-800">
                              Answers:
                              {question.answers.map((answer, answerIndex) => (
                                <li
                                  key={answerIndex}
                                  className="flex gap-2 flex-row font-bold text-gray-950"
                                >
                                  <label
                                    className="flex gap-4 flex-row"
                                    htmlFor={answer}
                                  >
                                    <input
                                      type="radio"
                                      id={answer}
                                      value={answer}
                                      name={`questions[${index}].answer`}
                                      onChange={formik.handleChange}
                                      checked={
                                        formik.values.questions?.[index]
                                          ?.answer === answer
                                      }
                                    />
                                    {answer}
                                  </label>
                                  {/* {formik.errors.questions?.[index]?.answer &&
                                    formik.touched.questions?.[index]
                                      ?.answer && (
                                      <p className="text-xs text-red-600 pt-1">
                                        {
                                          formik.errors.questions?.[index]
                                            ?.answer
                                        }
                                      </p>
                                    )} */}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      ))}
                  </ul>
                  <Button title="Submit" />
                </form>
              </FormikProvider>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between border-solid border-gray-700 border-1 rounded-xl p-8 gap-7 bg-white shadow-2xl">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-7">
              <p className="flex gap-4 font-bold text-xl text-amber-800">
                Tottal Correct Answers:
                <span className="font-bold text-gray-950">
                  {sendQuizAttemptData?.quiz?.totalCorrect}
                </span>
              </p>
              <p className="flex gap-4 flex-wrap font-bold text-lg text-amber-800">
                Overall Rating Accross the System:
                <span className="font-bold text-gray-950">
                  {sendQuizAttemptData?.quiz?.overallRatingAcrossSystem}
                </span>
              </p>
              <p className="flex gap-4 font-bold text-lg text-amber-800">
                Average Score Accross the System:
                <span className="font-bold text-gray-950">
                  {sendQuizAttemptData?.quiz?.averageScoreWithinCompany}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      <RefreshToken error={getOneQuizError || sendQuizAttemptError} />
    </>
  );
}
