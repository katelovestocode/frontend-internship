import UserExportData from "@/components/export/UserExportData";
import { IdParamsProps } from "@/types/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "User export quiz data",
};

export default function Export({ params: { id } }: IdParamsProps) {
  return (
    <>
      <UserExportData id={id} />
    </>
  );
}
