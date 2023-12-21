import { createApi } from "@reduxjs/toolkit/query/react";
import { commonApi } from "./commonApi";
import {
  FilterQuizAttemptsType,
  QuizAttemptResType,
  QuizAttemptType,
} from "@/types/types";

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
    getAllQuizAttempts: build.query<FilterQuizAttemptsType, number>({
      query: (userId) => ({
        url: `/users/${userId}/quizzes/attempts`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});
export const { useAttemptAQuizMutation, useGetAllQuizAttemptsQuery } =
  quizAttemptApi;
