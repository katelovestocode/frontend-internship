import * as Yup from "yup";

export const createAQuizSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("Please enter title")
    .min(5, "Please enter at least 5 characters"),
  description: Yup.string()
    .trim()
    .required("Please enter description")
    .min(15, "Please enter at least 15 characters"),
  frequencyInDays: Yup.number()
    .required("Please enter frequency in days")
    .typeError("Frequency must be a valid number"),
  questions: Yup.array()
    .min(2, "Please add at least two questions")
    .of(
      Yup.object({
        question: Yup.string()
          .trim()
          .required("Please enter a question")
          .min(5, "Please enter at least 5 characters"),
        answers: Yup.array()
          .of(Yup.string().trim().required("Please enter an answer"))
          .min(2, "Please provide at least two answers"),
        correctAnswer: Yup.string()
          .trim()
          .required("Please specify the correct answer"),
      })
    ),
});

export const updateQuizSchema = Yup.object({
  title: Yup.string().trim().min(5, "Please enter at least 5 characters"),
  description: Yup.string()
    .trim()
    .min(15, "Please enter at least 15 characters"),
  frequencyInDays: Yup.number().typeError("Frequency must be a valid number"),
});

export const addQuestionSchema = Yup.object({
  question: Yup.string()
    .trim()
    .required("Please enter a question")
    .min(5, "Please enter at least 5 characters"),
  answers: Yup.array()
    .of(Yup.string().trim().required("Please enter an answer"))
    .min(2, "Please add at least two answers"),
  correctAnswer: Yup.string()
    .trim()
    .required("Please specify the correct answer"),
});
