import { createApi } from "@reduxjs/toolkit/query/react";
import { commonApi } from "./commonApi";
import {
  GetUserRatingType,
  IdTypes,
  UserAllQuizAttemptsType,
  UserAndQuizIdsTypes,
} from "@/types/types";

export type AnalyticsApi = ReturnType<typeof createApi>;

export const analyticsApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getUsersAvarageRating: build.query<GetUserRatingType, number>({
      query: (userId) => ({
        url: `/analytics/users/${userId}`,
        method: "GET",
      }),
    }),
    getUserAvarageQuizAnalytics: build.query<any, UserAndQuizIdsTypes>({
      query: ({ userId, quizId }) => ({
        url: `/analytics/users/${userId}/quizzes/${quizId}`,
        method: "GET",
      }),
    }),
    getUserAvarAllQuizAnalytics: build.query<UserAllQuizAttemptsType, number>({
      query: (userId) => ({
        url: `/analytics/users/${userId}/quizzes`,
        method: "GET",
      }),
    }),
    getCompanyAllUsersAnalytics: build.query<UserAllQuizAttemptsType, number>({
      query: (companyId) => ({
        url: `/analytics/companies/${companyId}/users`,
        method: "GET",
      }),
    }),
    getOneUserInCompanyAnalytics: build.query<UserAllQuizAttemptsType, IdTypes>(
      {
        query: ({ companyId, userId }) => ({
          url: `/analytics/companies/${companyId}/users/${userId}`,
          method: "GET",
        }),
      }
    ),
    getUsersLastAttemptsInCompany: build.query<UserAllQuizAttemptsType, number>(
      {
        query: (companyId) => ({
          url: `/analytics/companies/${companyId}/latest`,
          method: "GET",
        }),
      }
    ),
  }),
});

export const {
  useGetCompanyAllUsersAnalyticsQuery,
  useGetOneUserInCompanyAnalyticsQuery,
  useGetUserAvarAllQuizAnalyticsQuery,
  useGetUserAvarageQuizAnalyticsQuery,
  useGetUsersLastAttemptsInCompanyQuery,
  useLazyGetUsersLastAttemptsInCompanyQuery,
  useGetUsersAvarageRatingQuery,
  useLazyGetCompanyAllUsersAnalyticsQuery,
  useLazyGetOneUserInCompanyAnalyticsQuery,
  useLazyGetUserAvarAllQuizAnalyticsQuery,
  useLazyGetUserAvarageQuizAnalyticsQuery,
  useLazyGetUsersAvarageRatingQuery,
} = analyticsApi;
