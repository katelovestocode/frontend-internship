"use client";
import { useGetCompanyAllRequestsQuery } from "@/redux/api/requestApiSlice";
import RefreshToken from "../../auth/RefreshToken";
import ListOfCompanyRequestsItem from "./ListOfCompanyRequestsItem";
import React from "react";

export default function ListOfAllCompanyRequests({ id }: { id: number }) {
  const { data, error } = useGetCompanyAllRequestsQuery(id);
  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data?.requests &&
          data?.requests?.map((request: any) => (
            <ListOfCompanyRequestsItem
              request={request}
              key={request?.id}
              companyId={id}
            />
          ))}
      </ul>
      <RefreshToken error={error} />
    </>
  );
}
