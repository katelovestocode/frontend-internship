"use client";
import React, { useEffect } from "react";
import {
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
} from "../../redux/api/userApiSlice";
import Cookies from "js-cookie";
import Link from "next/link";

export default function ListOfUsers() {
  const accessToken = Cookies.get("accessToken") as string;
  const { data, isLoading, error } = useGetAllUsersQuery(accessToken);

  return (
    <ul className="grid grid-cols-3 gap-4">
      {data?.users &&
        data?.users.map((user) => (
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
  );
}
