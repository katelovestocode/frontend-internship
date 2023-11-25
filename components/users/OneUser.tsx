"use client";
import React from "react";
import { useGetOneUserQuery } from "../../redux/api/userApiSlice";
import Link from "next/link";
import RefreshToken from "../auth/RefreshToken";

type Props = {
  id: number;
};

export default function OneUser({ id }: Props) {
  const { data, isLoading, error } = useGetOneUserQuery(id);

  return (
    <>
      <ul className="grid grid-cols-3 gap-4">
        {data && (
          <li
            key={data?.user.id}
            className="border-solid border-gray-700 border-1 rounded-xl p-4 flex gap-2 bg-white xl:gap-3 flex-col xl:flex-row shadow-lg"
          >
            <p>{data?.user.name} </p>
            <p>{data?.user.email} </p>
          </li>
        )}
      </ul>
      <RefreshToken error={error} />
    </>
  );
}
