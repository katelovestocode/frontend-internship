"use client";
import React from "react";
import { useGetAllUsersQuery } from "../../redux/api/userApiSlice";
import Link from "next/link";
import RefreshToken from "../auth/RefreshToken";

export default function ListOfUsers() {
  const { data, isLoading, isError, error } = useGetAllUsersQuery();

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data?.users &&
          data?.users.map((user: any) => (
            <li
              key={user?.id}
              className="border-solid border-gray-700 border-1 rounded-xl p-4 flex gap-2 bg-white xl:gap-3 flex-col xl:flex-row shadow-lg"
            >
              <Link href={`/users/${user?.id}`} className="flex gap-4 flex-col">
                <p className="font-bold">
                  Name:{" "}
                  <span className="text-amber-800 font-normal">
                    {user?.name}
                  </span>
                </p>

                <p className="font-bold">
                  Email:{" "}
                  <span className="text-amber-800 font-normal">
                    {user?.email}
                  </span>
                </p>
              </Link>
            </li>
          ))}
      </ul>
      <RefreshToken error={error} />
    </>
  );
}
