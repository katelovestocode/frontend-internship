"use client";
import React from "react";
import RefreshToken from "../auth/RefreshToken";
import { IdProps } from "@/types/types";
import { useGetOneCompanyQuery } from "@/redux/api/companyApiSlice";
import UpdateOneCompany from "./UpdateOneCompany";

export default function GetOneCompany({ id }: IdProps) {
  const { data, error: getOneCompanyError } = useGetOneCompanyQuery(id);

  const { company } = data || {};
  return (
    <>
      {company && <UpdateOneCompany id={id} company={company} />}
      <RefreshToken error={getOneCompanyError} />
    </>
  );
}
