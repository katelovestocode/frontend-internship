"use client";
import React from "react";
import Link from "next/link";
import { ListOfUsersItemType } from "@/types/types";

export default function ListOfUsersItem({ user, key }: ListOfUsersItemType) {
  return (
    <>
      <li
        key={key}
        className="border-solid border-gray-700 border-1 rounded-xl p-4 flex gap-2 bg-white xl:gap-3 flex-col xl:flex-row shadow-lg"
      >
        <Link href={`/users/${user?.id}`} className="flex gap-4 flex-col">
          <p className="font-bold text-amber-800">
            Name: <span className="font-bold text-gray-950">{user?.name}</span>
          </p>

          <p className="font-bold text-amber-800">
            Email:{" "}
            <span className="font-bold text-gray-950">{user?.email}</span>
          </p>
        </Link>
      </li>
    </>
  );
}
