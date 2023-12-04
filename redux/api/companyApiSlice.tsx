import { createApi } from "@reduxjs/toolkit/query/react";
import { commonApi } from "./commonApi";
import {
  AllCompaniesType,
  CompanyDetailsType,
  CompanyType,
  CreateCompanyType,
  IdTypes,
  UpdateCompanyIdType,
} from "@/types/types";

export type CompanyApi = ReturnType<typeof createApi>;

export const companyApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCompanies: build.query<AllCompaniesType, void>({
      query: () => ({
        url: "/companies",
        method: "GET",
      }),
      providesTags: () => [{ type: "Companies" }],
    }),
    getOneCompany: build.query<CompanyDetailsType, number>({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "Company", id: arg }],
    }),
    createCompany: build.mutation<CompanyType, CreateCompanyType>({
      query: (body: { name: string; description: string }) => ({
        url: "/companies",
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Companies" }],
    }),
    updateCompany: build.mutation<CompanyType, UpdateCompanyIdType>({
      query: ({ id, ...body }) => ({
        url: `/companies/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Company", id: arg.id },
        { type: "Companies" },
      ],
    }),
    deleteCompany: build.mutation<CompanyType, number | undefined>({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Companies" }],
    }),
    ownerRemovesUser: build.mutation<CompanyType, IdTypes>({
      query: ({ companyId, userId }) => ({
        url: `/companies/${companyId}/members/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Company", id: arg.companyId },
        { type: "Companies" },
      ],
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useDeleteCompanyMutation,
  useGetAllCompaniesQuery,
  useGetOneCompanyQuery,
  useLazyGetAllCompaniesQuery,
  useLazyGetOneCompanyQuery,
  useUpdateCompanyMutation,
  useOwnerRemovesUserMutation,
} = companyApi;