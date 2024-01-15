import { createApi } from "@reduxjs/toolkit/query/react";
import { commonApi } from "./commonApi";
import {
  AddQuestionReqProps,
  AddQuestionResType,
  CreateQuizType,
  DeleteQuestReqType,
  DeleteQuestResType,
  DeleteQuizResType,
  GetAllQuizzesType,
  GetOneQuizType,
  QuizIdAndCompIdType,
  UpdateFormikType,
  UpdateQuestReqType,
  UpdateQuestResponse,
} from "@/types/types";

export type QuizApi = ReturnType<typeof createApi>;

export const quizApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getAllQuizzes: build.query<GetAllQuizzesType, number>({
      query: (companyId) => ({
        url: `/quizzes/companies/${companyId}`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Quizzes" }],
    }),
    getOneQuiz: build.query<GetOneQuizType, QuizIdAndCompIdType>({
      query: ({ quizId, companyId }) => ({
        url: `/quizzes/${quizId}/companies/${companyId}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "Quiz", id: arg.quizId }],
    }),
    createQuiz: build.mutation<GetOneQuizType, CreateQuizType>({
      query: ({ companyId, ...body }) => ({
        url: `/quizzes/companies/${companyId}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: () => [{ type: "Quizzes" }],
    }),
    updateQuiz: build.mutation<UpdateFormikType, QuizIdAndCompIdType>({
      query: ({ quizId, companyId, ...body }) => ({
        url: `/quizzes/${quizId}/companies/${companyId}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Quizzes" }],
    }),
    deleteQuiz: build.mutation<DeleteQuizResType, QuizIdAndCompIdType>({
      query: ({ quizId, companyId }) => ({
        url: `/quizzes/${quizId}/companies/${companyId}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Quizzes" }],
    }),
    addQuestion: build.mutation<AddQuestionResType, AddQuestionReqProps>({
      query: ({ quizId, companyId, ...body }) => ({
        url: `/questions/quizzes/${quizId}/companies/${companyId}/add`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Quiz", id: arg.quizId },
        { type: "Quizzes" },
      ],
    }),
    updateQuestion: build.mutation<UpdateQuestResponse, UpdateQuestReqType>({
      query: ({ questionId, quizId, companyId, ...body }) => ({
        url: `/questions/${questionId}/quizzes/${quizId}/companies/${companyId}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Quiz", id: arg.quizId },
        { type: "Quizzes" },
      ],
    }),
    deleteQuestion: build.mutation<DeleteQuestResType, DeleteQuestReqType>({
      query: ({ questionId, quizId, companyId }) => ({
        url: `/questions/${questionId}/quizzes/${quizId}/companies/${companyId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Quiz", id: arg.quizId },
        { type: "Quizzes" },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateQuizMutation,
  useDeleteQuizMutation,
  useGetAllQuizzesQuery,
  useGetOneQuizQuery,
  useLazyGetAllQuizzesQuery,
  useLazyGetOneQuizQuery,
  useUpdateQuizMutation,
  useAddQuestionMutation,
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,
} = quizApi;
