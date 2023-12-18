import CompanyAnalytics from "@/components/analytics/CompanyAnalytics";
import ListOfAllCompanyInvitations from "@/components/invitations/company/ListOfAllCompanyInvitations";
import { IdParamsProps } from "@/types/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "List of Companies Analytics",
};

export default function Analytics({ params: { id } }: IdParamsProps) {
  return (
    <>
      <CompanyAnalytics id={id} />{" "}
    </>
  );
}
