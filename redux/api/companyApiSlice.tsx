import { createApi } from "@reduxjs/toolkit/query/react";
import { commonApi } from "./commonApi";
import {
  AllCompaniesType,
  CompanyDetailsType,
  CompanyType,
  CreateCompanyType,
} from "@/types/types";

export type CompanyApi = ReturnType<typeof createApi>;

export const companyApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    createCompany: build.mutation<CompanyType, CreateCompanyType>({
      query: (body: { name: string; description: string }) => ({
        url: "/companies",
        method: "POST",
        body,
      }),
    }),
    getAllCompanies: build.query<AllCompaniesType, void>({
      query: () => ({
        url: "/companies",
        method: "GET",
      }),
    }),
    getOneCompany: build.query<CompanyDetailsType, number>({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "GET",
      }),
    }),
    updateCompany: build.mutation<CompanyType, any>({
      query: ({ id, ...body }) => ({
        url: `/companies/${id}`,
        method: "PUT",
        body: body,
      }),
    }),
    deleteCompany: build.mutation<CompanyType, number | undefined>({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "DELETE",
      }),
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
