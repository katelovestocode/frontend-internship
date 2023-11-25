import { createApi } from "@reduxjs/toolkit/query/react";
import { commonApi } from "./commonApi";
import {
  GetAllUsersType,
  GetOneUserType,
  InitialState,
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
    }),
    getOneUser: build.query<GetOneUserType, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    updateUser: build.mutation<GetOneUserType, UpdateUserType>({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: body,
      }),
    }),
    deleteUser: build.mutation<GetOneUserType, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
    //   registerUser: build.mutation<InitialState, RegisterState>({
    //     query: (body: { name: string; email: string; password: string }) => ({
    //       url: "/auth/register",
    //       method: "POST",
    //       body,
    //     }),
    //   }),
    //   loginUser: build.mutation<LoginUserType, LoginState>({
    //     query: (body: { email: string; password: string }) => ({
    //       url: "/auth/login",
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body,
    //     }),
    //   }),
  }),
});

export const {
  // useLazyCurrentUserQuery,
  // useRegisterUserMutation,
  // useLoginUserMutation,
  // useCurrentUserQuery,
  // useLazyRefreshUserQuery,
  useGetOneUserQuery,
  useLazyGetAllUsersQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
