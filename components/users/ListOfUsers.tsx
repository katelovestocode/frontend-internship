"use client";
import React from "react";
import { useGetAllUsersQuery } from "../../redux/api/userApiSlice";
import ListOfUsersItem from "./ListOfUsersItem";
import { UserType } from "@/types/types";

export default function ListOfUsers() {
  const { data, error } = useGetAllUsersQuery();

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data?.users &&
          data?.users.map((user: UserType, index) => (
            <ListOfUsersItem user={user} key={index} />
          ))}
      </ul>
    </>
  );
}
