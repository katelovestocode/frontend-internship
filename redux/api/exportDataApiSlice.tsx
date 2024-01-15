import { createApi } from "@reduxjs/toolkit/query/react";
import { commonApi } from "./commonApi";
import {
  ExportDatQuizReq,
  ExportDataCompanyReq,
  ExportDataReq,
  ExportDataRes,
  ExportDataUserReq,
} from "@/types/types";

export type ExportDataApi = ReturnType<typeof createApi>;

export const exportDataApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getUsersQuizResults: build.query<ExportDataRes, ExportDataUserReq>({
      query: ({ userId, type }) => ({
        url: `export/users/${userId}?type=${type}`,
        method: "GET",
      }),
    }),
    companyGetsOneUserQuizResults: build.query<
      ExportDataRes,
      ExportDataCompanyReq
    >({
      query: ({ companyId, userId, type }) => ({
        url: `export/companies/${companyId}/users/${userId}?type=${type}`,
        method: "GET",
      }),
    }),
    companyGetsAllUsersQuizResults: build.query<ExportDataRes, ExportDataReq>({
      query: ({ companyId, type }) => ({
        url: `export/companies/${companyId}/users?type=${type}`,
        method: "GET",
      }),
    }),
    companyGetsOneQuizResult: build.query<ExportDataRes, ExportDatQuizReq>({
      query: ({ companyId, userId, quizId, type }) => ({
        url: `export/companies/${companyId}/users/${userId}/quiz/${quizId}?type=${type}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useCompanyGetsAllUsersQuizResultsQuery,
  useCompanyGetsOneQuizResultQuery,
  useCompanyGetsOneUserQuizResultsQuery,
  useGetUsersQuizResultsQuery,
  useLazyCompanyGetsAllUsersQuizResultsQuery,
  useLazyCompanyGetsOneQuizResultQuery,
  useLazyCompanyGetsOneUserQuizResultsQuery,
  useLazyGetUsersQuizResultsQuery,
} = exportDataApi;
