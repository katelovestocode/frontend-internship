import { createApi } from "@reduxjs/toolkit/query/react";
import { commonApi } from "./commonApi";

export type AnalyticsApi = ReturnType<typeof createApi>;

export const analyticsApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getUsersAvarageRating: build.query<any, number>({
      query: (userId) => ({
        url: `/analytics/users/${userId}`,
        method: "GET",
      }),
    }),
    getUserAvarageQuizAnalytics: build.query<any, any>({
      query: ({ userId, quizId }) => ({
        url: `/analytics/users/${userId}/quizzes/${quizId}`,
        method: "GET",
      }),
    }),
    getUserAvarAllQuizAnalytics: build.query<any, number>({
      query: (userId) => ({
        url: `/analytics/users/${userId}/quizzes`,
        method: "GET",
      }),
    }),
    getCompanyAllUsersAnalytics: build.query<any, number>({
      query: (companyId) => ({
        url: `/analytics/companies/${companyId}/users`,
        method: "GET",
      }),
    }),
    getOneUserInCompanyAnalytics: build.query<any, any>({
      query: ({ companyId, userId }) => ({
        url: `/analytics/companies/${companyId}/users/${userId}`,
        method: "GET",
      }),
    }),
    getUsersAttemptsInCompany: build.query<any, number>({
      query: (companyId) => ({
        url: `/analytics/companies/${companyId}/latest`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetCompanyAllUsersAnalyticsQuery,
  useGetOneUserInCompanyAnalyticsQuery,
  useGetUserAvarAllQuizAnalyticsQuery,
  useGetUserAvarageQuizAnalyticsQuery,
  useGetUsersAttemptsInCompanyQuery,
  useGetUsersAvarageRatingQuery,
  useLazyGetCompanyAllUsersAnalyticsQuery,
  useLazyGetOneUserInCompanyAnalyticsQuery,
  useLazyGetUserAvarAllQuizAnalyticsQuery,
  useLazyGetUserAvarageQuizAnalyticsQuery,
  useLazyGetUsersAttemptsInCompanyQuery,
  useLazyGetUsersAvarageRatingQuery,
} = analyticsApi;
