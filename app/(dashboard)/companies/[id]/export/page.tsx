import CompanyExportsData from "@/components/export/CompanyExportsData";
import { IdParamsProps } from "@/types/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Company owner or admin export quiz data",
};

export default function Export({ params: { id } }: IdParamsProps) {
  return (
    <>
      <CompanyExportsData id={id} />
    </>
  );
}
