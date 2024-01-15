import * as Yup from "yup";

export const quizAttemptValidSchema = Yup.object().shape({
  questions: Yup.array().of(
    Yup.object().shape({
      answer: Yup.string().required("Please select an answer"),
    })
  ),
});
