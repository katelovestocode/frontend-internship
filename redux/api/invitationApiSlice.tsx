import { createApi } from "@reduxjs/toolkit/query/react";
import { commonApi } from "./commonApi";
import {
  InvitationType,
  InviteType,
  UserInviteIdsType,
  CompInviteIdsType,
  CompIdsType,
} from "@/types/types";

export type InvitationApi = ReturnType<typeof createApi>;

export const invitationApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCompanyInvitations: build.query<InvitationType, number>({
      query: (companyId) => ({
        url: `/companies/${companyId}/invitations`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Company-Invitations" }],
    }),
    companySendsInvitation: build.mutation<InvitationType, CompIdsType>({
      query: ({ companyId, inviteeId }) => ({
        url: `/companies/${companyId}/invitations/${inviteeId}`,
        method: "POST",
      }),
      invalidatesTags: () => [{ type: "Company-Invitations" }],
    }),
    companyCancelInvitation: build.mutation<InviteType, CompInviteIdsType>({
      query: ({ companyId, invitationId }) => ({
        url: `/companies/${companyId}/invitations/${invitationId}`,
        method: "PUT",
      }),
      invalidatesTags: () => [{ type: "Company-Invitations" }],
    }),

    getAllUsersInvitations: build.query<InvitationType, number>({
      query: (userId) => ({
        url: `/users/${userId}/invitations`,
        method: "GET",
      }),
      providesTags: () => [{ type: "User-Invitations" }],
    }),
    userAcceptsInvitation: build.mutation<InvitationType, UserInviteIdsType>({
      query: ({ userId, invitationId }) => ({
        url: `/users/${userId}/invitations/${invitationId}/accept`,
        method: "PUT",
      }),
      invalidatesTags: () => [{ type: "User-Invitations" }],
    }),
    userDeclineInvitation: build.mutation<InvitationType, UserInviteIdsType>({
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
