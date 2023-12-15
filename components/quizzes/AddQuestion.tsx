import { Field, FieldArray, FormikProvider, useFormik } from "formik";
import { addQuestionSchema } from "./QuizValidation";
import { useAddQuestionMutation } from "@/redux/api/quizApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import RefreshToken from "../auth/RefreshToken";
import { AddQuestionReqProps, AddQuestionType } from "@/types/types";

export default function AddQuestion({
  quizId,
  companyId,
  addedQuestion,
  setAddedQuestion,
  showModal,
}: AddQuestionType) {
  const [
    addQuestion,
    { error: addQuestionError, isSuccess: isAddQuestionSuccess },
  ] = useAddQuestionMutation();

  const handleAddQuestion = async (data: AddQuestionReqProps) => {
    try {
      await addQuestion(data);
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    if (isAddQuestionSuccess) {
      setAddedQuestion(false);
      formik.resetForm();
      toast.success("Question has been successfully added", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [isAddQuestionSuccess, setAddedQuestion]);

  const formik = useFormik({
    initialValues: {
      question: "",
      answers: ["", ""],
      correctAnswer: "",
    },
    validationSchema: addQuestionSchema,
    onSubmit: async (values) => {
      const body = {
        question: values.question,
        answers: values.answers,
        correctAnswer: values.correctAnswer,
      };
      handleAddQuestion({
        quizId: quizId,
        companyId: companyId,
        ...body,
      });
    },
  });

  useEffect(() => {
    if (showModal) formik.resetForm();
    setAddedQuestion(false);
  }, [formik.resetForm, showModal]);

  return (
    <>
      {addedQuestion && (
        <div className="flex flex-col border-solid border-gray-700 border-1 rounded-xl p-2 flex gap-2 bg-white shadow-xl">
          <h3 className="text-center font-bold text-xl ">Add a new Question</h3>
          <FormikProvider value={formik}>
            <form
              autoComplete="off"
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-2 justify-center items-center"
            >
              <div className="flex flex-row gap-4 justify-start items-start">
                {" "}
                <div>
                  <div className="w-full">
                    <label htmlFor="question" className="font-semibold">
                      Question
                    </label>
                    <div className="flex flex-row pt-2 items-center gap-2">
                      <Field
                        type="text"
                        name="question"
                        placeholder="Question"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-2 border-solid border-gray-400 border rounded-md text-zinc-800"
                        value={formik.values.question}
                      />
                    </div>
                    {formik.touched.question && formik.errors.question && (
                      <p className="text-xs text-red-600 pt-1">
                        {formik.errors.question as string}
                      </p>
                    )}
                  </div>

                  <div className="w-full">
                    <label htmlFor="correctAnswer" className="font-semibold">
                      Correct Answer
                    </label>
                    <Field
                      type="text"
                      name="correctAnswer"
                      placeholder="Correct Answer"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.correctAnswer}
                      className="w-full p-2 border-solid border-gray-400 border rounded-md text-zinc-800"
                    />
                  </div>
                  {formik.touched.correctAnswer &&
                    formik.errors.correctAnswer && (
                      <p className="text-xs text-red-600 pt-1">
                        {formik.errors.correctAnswer as string}
                      </p>
                    )}
                </div>
                <div className="flex flex-col pt-2 items-start">
                  <label htmlFor="answers" className="font-semibold">
                    Answers
                  </label>
                  <FieldArray
                    name="answers"
                    render={(arrayHelpers) => (
                      <div className="flex flex-col gap-2">
                        {formik.values?.answers?.length > 0 &&
                          formik.values?.answers?.map((answer, answerIndex) => (
                            <div key={answerIndex} className="flex flex-col">
                              <div className="flex flex-row gap-2">
                                <Field
                                  type="text"
                                  name={`answers.${answerIndex}`}
                                  placeholder={`Answer ${answerIndex + 1}`}
                                  className="w-full p-2 border-solid border-gray-400 border rounded-md text-zinc-800"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.answers?.[answerIndex]}
                                />

                                <button
                                  type="button"
                                  className="btn btn-outline btn-error text-2xl remove-answer"
                                  onClick={() =>
                                    arrayHelpers.remove(answerIndex)
                                  }
                                >
                                  -
                                </button>
                              </div>

                              {formik.touched.answers &&
                                formik.errors.answers?.[answerIndex] && (
                                  <p className="text-xs text-red-600 pt-1">
                                    {formik.errors.answers}
                                  </p>
                                )}
                            </div>
                          ))}
                        {formik.errors.answers &&
                          formik.values.answers.length < 2 && (
                            <p className="text-xs text-red-600">
                              Please add at least two answers
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
              </div>
              <button type="submit" className="btn btn-neutral w-full">
                Add Question
              </button>
            </form>
          </FormikProvider>
        </div>
      )}
      <RefreshToken error={addQuestionError} />
    </>
  );
}
