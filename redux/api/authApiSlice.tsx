import { createApi } from "@reduxjs/toolkit/query/react";
import {
  InitialState,
  LoginState,
  LoginUserType,
  RegisterState,
} from "@/types/types";
import { commonApi } from "./commonApi";

export type AuthApi = ReturnType<typeof createApi>;

export const authApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<InitialState, RegisterState>({
      query: (body: { name: string; email: string; password: string }) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    loginUser: build.mutation<LoginUserType, LoginState>({
      query: (body: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
    }),
    currentUser: build.query<InitialState, string>({
      query: (token) => ({
        url: "/auth/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    refreshUser: build.query<InitialState, string>({
      query: (token) => ({
        url: "/auth/refresh",
        method: "GET",
        headers: {
          Authorization: `Refresh ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useLazyCurrentUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useCurrentUserQuery,
  useRefreshUserQuery,
  useLazyRefreshUserQuery,
} = authApi;
