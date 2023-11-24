"use client";
import React, { useEffect } from "react";
import {
  useGetAllUsersQuery,
  useGetOneUserQuery,
} from "../../redux/api/userApiSlice";
import Cookies from "js-cookie";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";

type Props = {
  id: number;
};

export default function OneUser({ id }: Props) {
  const accessToken = Cookies.get("accessToken") as string;
  const { data, isLoading, error } = useGetOneUserQuery({ accessToken, id });

  console.log(data, "data");
  console.log(typeof id, "id");
  return (
    // <ul className="grid grid-cols-3 gap-4">
    //   {data &&
    //     data.map((user) => (
    //       <li
    //         key={user?.id}
    //         className="border-solid border-gray-700 border-1 rounded-xl p-4 flex gap-2 bg-white xl:gap-3 flex-col xl:flex-row shadow-lg"
    //       >
    //         <Link href={`/users/${user?.id}`}>
    //           <p>{user?.name} </p>
    //           <p>{user?.email} </p>
    //         </Link>
    //       </li>
    //     ))}
    // </ul>
    <></>
  );
}
