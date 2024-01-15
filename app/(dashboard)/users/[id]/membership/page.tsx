import ListOfAllUsersMemberships from "@/components/users/ListOfAllUsersMemberships";
import { IdParamsProps } from "@/types/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "List of User's Memberships",
};

export default function Member({ params: { id } }: IdParamsProps) {
  return (
    <>
      <ListOfAllUsersMemberships id={id} />
    </>
  );
}
