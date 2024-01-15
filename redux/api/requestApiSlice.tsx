import { createApi } from "@reduxjs/toolkit/query/react";
import { commonApi } from "./commonApi";
import {
  UserReqIdsType,
  RequestType,
  ReqIdsType,
  CompReqIdsType,
  OneRequestType,
  CancelRequestType,
} from "@/types/types";

export type RequestApi = ReturnType<typeof createApi>;

export const requestApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getUsersAllRequests: build.query<RequestType, number>({
      query: (userId) => ({
        url: `/users/${userId}/requests`,
        method: "GET",
      }),
      providesTags: () => [{ type: "User-Requests" }],
    }),
    sendUserRequest: build.mutation<OneRequestType, UserReqIdsType>({
      query: ({ companyId, userId }) => ({
        url: `/users/${userId}/requests/${companyId}`,
        method: "POST",
      }),
      invalidatesTags: () => [{ type: "User-Requests" }],
    }),
    userCancelRequest: build.mutation<CancelRequestType, ReqIdsType>({
      query: ({ requestId, userId }) => ({
        url: `/users/${userId}/requests/${requestId}`,
        method: "PUT",
      }),
      invalidatesTags: () => [{ type: "User-Requests" }],
    }),

    getCompanyAllRequests: build.query<RequestType, number>({
      query: (companyId) => ({
        url: `/companies/${companyId}/requests`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Company-Requests" }],
    }),
    companyAcceptsRequest: build.mutation<RequestType, CompReqIdsType>({
      query: ({ companyId, requestId }) => ({
        url: `/companies/${companyId}/requests/${requestId}/accept`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Company-Requests" },
        { type: "Company", id: arg.companyId },
        { type: "Companies" },
      ],
    }),
    companyDeclinesRequest: build.mutation<RequestType, CompReqIdsType>({
      query: ({ companyId, requestId }) => ({
        url: `/companies/${companyId}/requests/${requestId}/decline`,
        method: "PUT",
      }),
      invalidatesTags: () => [{ type: "Company-Requests" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCompanyAcceptsRequestMutation,
  useCompanyDeclinesRequestMutation,
  useGetCompanyAllRequestsQuery,
  useGetUsersAllRequestsQuery,
  useLazyGetCompanyAllRequestsQuery,
  useLazyGetUsersAllRequestsQuery,
  useSendUserRequestMutation,
  useUserCancelRequestMutation,
} = requestApi;
