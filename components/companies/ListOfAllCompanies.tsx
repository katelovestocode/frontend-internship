"use client";
import React from "react";
import RefreshToken from "../auth/RefreshToken";
import ListOfCompaniesItem from "./ListOfCompaniesItem";
import { useGetAllCompaniesQuery } from "@/redux/api/companyApiSlice";
import { CompanyType } from "@/types/types";

export default function ListOfAllCompanies() {
  const { data, error } = useGetAllCompaniesQuery();

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {data?.companies &&
          data?.companies.map((company: CompanyType) => (
            <ListOfCompaniesItem company={company} key={company?.id} />
          ))}
      </ul>
      <RefreshToken error={error} />
    </>
  );
}
