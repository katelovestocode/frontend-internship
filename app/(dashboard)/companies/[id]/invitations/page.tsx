import ListOfAllCompanyInvitations from "@/components/invitations/company/ListOfAllCompanyInvitations";
import { IdParamsProps } from "@/types/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "List of Companies Invitations",
};

export default function Invitations({ params: { id } }: IdParamsProps) {
  return (
    <>
      <ListOfAllCompanyInvitations id={id} />
    </>
  );
}
