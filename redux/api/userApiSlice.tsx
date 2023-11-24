import { createApi } from "@reduxjs/toolkit/query/react";
// import {} from "@/types/types";
import { commonApi } from "./commonApi";

export type UserApi = ReturnType<typeof createApi>;

export const userApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: (token) => ({
        url: "/users",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getOneUser: build.query({
      query: (options: { token: string; id: number }) => ({
        url: `/users/${options.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${options.token}`,
        },
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
} = userApi;
