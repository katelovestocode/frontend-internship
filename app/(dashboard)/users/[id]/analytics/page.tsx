import UsersAnalytics from "@/components/analytics/UsersAnalytics";
import { IdParamsProps } from "@/types/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "List of Users Analytics",
};

export default function Analytics({ params: { id } }: IdParamsProps) {
  return (
    <>
      <UsersAnalytics id={id} />
    </>
  );
}
