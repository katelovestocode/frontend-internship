import { createApi } from "@reduxjs/toolkit/query/react";
import { commonApi } from "./commonApi";
import { GetAllUsersType, GetOneUserType, UpdateUserType } from "@/types/types";

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
      providesTags: () => [{ type: "User" }],
    }),
    updateUser: build.mutation<GetOneUserType, UpdateUserType>({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["User", "Users"],
    }),
    deleteUser: build.mutation<GetOneUserType, number | undefined>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetOneUserQuery,
  useLazyGetAllUsersQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
