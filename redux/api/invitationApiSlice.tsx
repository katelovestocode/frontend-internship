import { createApi } from "@reduxjs/toolkit/query/react";
import { commonApi } from "./commonApi";

export type InvitationApi = ReturnType<typeof createApi>;

export const invitationApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCompanyInvitations: build.query<any, number>({
      query: (companyId) => ({
        url: `/companies/${companyId}/invitations`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Company-Invitations" }],
    }),
    companySendsInvitation: build.mutation<any, any>({
      query: ({ companyId, inviteeId }) => ({
        url: `/companies/${companyId}/invitations/${inviteeId}`,
        method: "POST",
      }),
      invalidatesTags: () => [{ type: "Company-Invitations" }],
    }),
    companyCancelInvitation: build.mutation<any, any>({
      query: ({ companyId, invitationId }) => ({
        url: `/companies/${companyId}/invitations/${invitationId}`,
        method: "PUT",
      }),
      invalidatesTags: () => [{ type: "Company-Invitations" }],
    }),

    getAllUsersInvitations: build.query<any, number>({
      query: (userId) => ({
        url: `/users/${userId}/invitations`,
        method: "GET",
      }),
      providesTags: () => [{ type: "User-Invitations" }],
    }),
    userAcceptsInvitation: build.mutation<any, any>({
      query: ({ userId, invitationId }) => ({
        url: `/users/${userId}/invitations/${invitationId}/accept`,
        method: "PUT",
      }),
      invalidatesTags: () => [{ type: "User-Invitations" }],
    }),
    userDeclineInvitation: build.mutation<any, any>({
      query: ({ invitationId, userId }) => ({
        url: `/users/${userId}/invitations/${invitationId}/decline`,
        method: "PUT",
      }),
      invalidatesTags: () => [{ type: "User-Invitations" }],
    }),
  }),
});

export const {
  useCompanyCancelInvitationMutation,
  useCompanySendsInvitationMutation,
  useGetAllCompanyInvitationsQuery,
  useGetAllUsersInvitationsQuery,
  useLazyGetAllCompanyInvitationsQuery,
  useLazyGetAllUsersInvitationsQuery,
  useUserAcceptsInvitationMutation,
  useUserDeclineInvitationMutation,
} = invitationApi;
