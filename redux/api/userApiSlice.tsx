import { createApi } from "@reduxjs/toolkit/query/react";
import { commonApi } from "./commonApi";
import {
  AllUserCompaniesType,
  CompanyType,
  GetAllUsersType,
  GetOneUserType,
  IdTypes,
  UpdateUserType,
} from "@/types/types";

export type UserApi = ReturnType<typeof createApi>;

export const userApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<GetAllUsersType, void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: () => [{ type: "Users" }],
    }),
    getOneUser: build.query<GetOneUserType, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "User", id: arg }],
    }),
    updateUser: build.mutation<GetOneUserType, UpdateUserType>({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "User", id: arg.id },
        { type: "Users" },
      ],
    }),
    deleteUser: build.mutation<GetOneUserType, number | undefined>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
    userLeavesCompany: build.mutation<CompanyType, IdTypes>({
      query: ({ userId, companyId }) => ({
        url: `/users/${userId}/companies/${companyId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Company", id: arg.companyId },
        { type: "User-Companies" },
      ],
    }),
    getAllUserCompanies: build.query<AllUserCompaniesType, number>({
      query: (userId) => ({
        url: `/users/${userId}/companies`,
        method: "GET",
      }),
      providesTags: () => [{ type: "User-Companies" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetOneUserQuery,
  useLazyGetAllUsersQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUserLeavesCompanyMutation,
  useLazyGetAllUserCompaniesQuery,
  useGetAllUserCompaniesQuery,
} = userApi;
