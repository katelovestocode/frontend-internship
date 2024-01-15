import ListOfAllUserRequests from "@/components/requests/users/ListOfAllUserRequests";
import { IdParamsProps } from "@/types/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "List of Users Requests",
};

export default function Requests({ params: { id } }: IdParamsProps) {
  return (
    <>
      <ListOfAllUserRequests id={id} />
    </>
  );
}
