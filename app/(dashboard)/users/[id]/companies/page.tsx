import ListOfAllUsersOwnedCompanies from "@/components/users/ListOfAllUsersOwnedCompanies";
import { IdParamsProps } from "@/types/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "List of User's Own Companies",
};

export default function Owner({ params: { id } }: IdParamsProps) {
  return (
    <>
      <ListOfAllUsersOwnedCompanies id={id} />{" "}
    </>
  );
}
