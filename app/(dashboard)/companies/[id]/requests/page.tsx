import ListOfAllCompanyRequests from "@/components/requests/company/ListOfAllCompanyRequests";
import { IdParamsProps } from "@/types/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "List of Companies Requests",
};

export default function Requests({ params: { id } }: IdParamsProps) {
  return (
    <>
      <ListOfAllCompanyRequests id={id} />
    </>
  );
}
