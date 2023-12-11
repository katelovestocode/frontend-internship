import { createApi } from "@reduxjs/toolkit/query/react";
import { commonApi } from "./commonApi";
import {} from "@/types/types";

export type QuizApi = ReturnType<typeof createApi>;

export const quizApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getAllQuizzes: build.query<any, number>({
      query: (companyId) => ({
        url: `/quizzes/companies/${companyId}`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Quizzes" }],
    }),
    getOneQuiz: build.query<any, any>({
      query: ({ quizId, companyId }) => ({
        url: `/quizzes/${quizId}/companies/${companyId}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "Quiz", id: arg.quizId }],
    }),
    createQuiz: build.mutation<any, any>({
      query: ({ companyId, ...body }) => ({
        url: `/quizzes/companies/${companyId}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => [{ type: "Quizzes" }],
    }),
    updateQuiz: build.mutation<any, any>({
      query: ({ quizId, companyId, ...body }) => ({
        url: `/quizzes/${quizId}/companies/${companyId}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [
        // { type: "Quiz", id: arg.quizId },
        // { type: "Quiz", id: arg.companyId },
        { type: "Quizzes" },
      ],
    }),
    deleteQuiz: build.mutation<any, any>({
      query: ({ quizId, companyId }) => ({
        url: `/quizzes/${quizId}/companies/${companyId}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Quizzes" }],
    }),
    addQuestion: build.mutation<any, any>({
      query: ({ quizId, companyId, ...body }) => ({
        url: `/questions/quizzes/${quizId}/companies/${companyId}/add`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Quiz", id: arg.quizId },
      ],
    }),
    updateQuestion: build.mutation<any, any>({
      query: ({ questionId, quizId, companyId, ...body }) => ({
        url: `/questions/${questionId}/quizzes/${quizId}/companies/${companyId}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Quiz", id: arg.quizId },
      ],
    }),
    deleteQuestion: build.mutation<any, any>({
      query: ({ questionId, quizId, companyId }) => ({
        url: `/questions/${questionId}/quizzes/${quizId}/companies/${companyId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Quiz", id: arg.quizId },
      ],
    }),
  }),
});

export const {
  useCreateQuizMutation,
  useDeleteQuizMutation,
  useGetAllQuizzesQuery,
  useGetOneQuizQuery,
  useLazyGetAllQuizzesQuery,
  useLazyGetOneQuizQuery,
  useUpdateQuizMutation,
} = quizApi;
