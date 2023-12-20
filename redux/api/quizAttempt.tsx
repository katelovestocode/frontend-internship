import { createApi } from "@reduxjs/toolkit/query/react";
import { commonApi } from "./commonApi";
import { QuizAttemptResType, QuizAttemptType } from "@/types/types";

export type QuizAttemptApi = ReturnType<typeof createApi>;

export const quizAttemptApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    attemptAQuiz: build.mutation<QuizAttemptResType, QuizAttemptType>({
      query: ({ userId, quizId, ...body }) => ({
        url: `/users/${userId}/quizzes/${quizId}/submit`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useAttemptAQuizMutation } = quizAttemptApi;
