"use client";
import { useGetAllUserCompaniesQuery } from "@/redux/api/userApiSlice";
import { CompanyType } from "@/types/types";
import React, { useState } from "react";
import ListOfAllUsersCompaniesItem from "./ListOfAllUsersCompaniesItem";

export default function ListOfAllUsersMemberships({ id }: { id: number }) {
  const { data, error } = useGetAllUserCompaniesQuery(id);
  const [userIsMember, setUserIsMember] = useState(true);
  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data?.list &&
          data?.list?.reqCompanies?.map((company: CompanyType) => (
            <ListOfAllUsersCompaniesItem
              company={company}
              key={company?.id}
              userId={id}
              userIsMember={userIsMember}
            />
          ))}
      </ul>
    </>
  );
}
