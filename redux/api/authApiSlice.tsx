import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { InitialState, LoginState, RegisterState } from "@/types/types";

export type AuthApi = ReturnType<typeof createApi>;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    responseHandler: async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.details || "An error occurred");
      }
      return data.details;
    },
  }),
  endpoints: (build) => ({
    registerUser: build.mutation<InitialState, RegisterState>({
      query: (body: { name: string; email: string; password: string }) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    loginUser: build.mutation<InitialState, LoginState>({
      query: (body: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
    }),
    currentUser: build.query<InitialState, any>({
      query: (token) => ({
        url: "/auth/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    refreshUser: build.query<InitialState, any>({
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
} = authApi;
