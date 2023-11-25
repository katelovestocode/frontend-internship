"use client";
import React from "react";
import { useGetAllUsersQuery } from "../../redux/api/userApiSlice";
import Link from "next/link";
import RefreshToken from "../auth/RefreshToken";

export default function ListOfUsers() {
  const { data, isLoading, isError, error } = useGetAllUsersQuery();

  return (
    <>
      <ul className="grid grid-cols-3 gap-4">
        {data?.users &&
          data?.users.map((user: any) => (
            <li
              key={user?.id}
              className="border-solid border-gray-700 border-1 rounded-xl p-4 flex gap-2 bg-white xl:gap-3 flex-col xl:flex-row shadow-lg"
            >
              <Link href={`/users/${user?.id}`}>
                <p>{user?.name} </p>
                <p>{user?.email} </p>
              </Link>
            </li>
          ))}
      </ul>
      <RefreshToken error={error} />
    </>
  );
}
