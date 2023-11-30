import { createApi } from "@reduxjs/toolkit/query/react";
import { commonApi } from "./commonApi";
import {
  AllCompaniesType,
  CompanyDetailsType,
  CompanyType,
  CreateCompanyType,
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
      providesTags: () => [{ type: "Company" }],
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
      invalidatesTags: ["Company", "Companies"],
    }),
    deleteCompany: build.mutation<CompanyType, number | undefined>({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Companies" }],
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
} = companyApi;
