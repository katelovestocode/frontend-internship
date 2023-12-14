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
          .min(2, "Please provide at least two answers")
          .test("is-unique", "Answers must be unique", function (value) {
            return new Set(value).size === value?.length;
          }),
        correctAnswer: Yup.string()
          .trim()
          .required("Please specify the correct answer")
          .test(
            "is-valid-answer",
            "Correct answer must be one of the provided answers",
            function (value) {
              const { answers } = this.parent;
              return answers && answers.includes(value);
            }
          ),
      })
    )
    .test("is-unique-questions", "Questions must be unique", function (value) {
      const questions = value?.map((q) => q.question);
      const isUnique = new Set(questions).size === questions?.length;
      console.log("isUnique:", isUnique);
      return isUnique;
    }),
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
  correctAnswer: Yup.string()
    .trim()
    .required("Please specify the correct answer")
    .test(
      "is-valid-answer",
      "Correct answer must be one of the provided answers",
      function (value) {
        const { answers } = this.parent;
        return answers && answers.includes(value);
      }
    ),
  answers: Yup.array()
    .of(Yup.string().trim().required("Please enter an answer"))
    .min(2, "Please provide at least two answers")
    .test("is-unique", "Answers must be unique", function (value) {
      return new Set(value).size === value?.length;
    }),
});

export const updateQuestionSchema = Yup.object({
  question: Yup.string().trim().min(5, "Please enter at least 5 characters"),
  correctAnswer: Yup.string()
    .trim()
    .test(
      "is-valid-answer",
      "Correct answer must be one of the provided answers",
      function (value) {
        const { answers } = this.parent;
        return answers && answers.includes(value);
      }
    ),
  answers: Yup.array()
    .of(Yup.string().trim())
    .test("is-unique", "Answers must be unique", function (value) {
      return new Set(value).size === value?.length;
    })
    .test(
      "is-consistent",
      "Correct answer must be one of the provided answers",
      function (value) {
        const { correctAnswer } = this.parent;
        if (!correctAnswer || !value || value.length === 0) {
          return true;
        }
        return value.includes(correctAnswer);
      }
    ),
});
