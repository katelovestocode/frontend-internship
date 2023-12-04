"use client";
import React from "react";
import Link from "next/link";
import { CompanyDetailsType, UserType } from "@/types/types";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "@/redux/store";

export default function ListOfCompaniesItem({ company }: CompanyDetailsType) {
  const userId = useAppSelector((state) => state.authReducer.user?.id);
  return (
    <>
      <li className="border-solid border-gray-700 border-1 rounded-xl p-6 flex flex-col place-content-between gap-4 bg-white shadow-lg">
        <Link
          href={`/companies/${company?.id}`}
          className="flex gap-4 flex-col"
        >
          <p className="font-bold text-amber-800">
            Name:{" "}
            <span className="font-bold text-gray-950">{company?.name}</span>
          </p>
          <p className="text-amber-800 font-bold">
            Description:{" "}
            <span className="font-medium text-gray-950">
              {company?.description}
            </span>
          </p>
          <p className="flex gap-2 place-items-center text-amber-800 font-bold">
            Owner:
            <span
              className={
                userId === company.owner.id
                  ? "font-bold text-red-500 text-sm bg-white rounded-sm border border-solid border-red-400 p-1 shadow-lg"
                  : "font-medium text-gray-950 text-sm bg-white rounded-sm shadow-lg p-1 border-solid border-zinc-400 border"
              }
            >
              {company?.owner?.name}
            </span>
          </p>

          <ul className="flex gap-2 font-bold text-md text-amber-800">
            Members:{" "}
            {company?.members.map((member: UserType, index: number) => (
              <li
                className={
                  userId === member.id
                    ? "flex place-items-center bg-white rounded-sm border border-solid border-red-400 p-1 shadow-lg"
                    : "flex place-items-center bg-white rounded-sm shadow-lg p-1 border-solid border-zinc-400 border"
                }
                key={index}
              >
                {userId === member.id ? (
                  <p className="text-sm font-bold text-red-500">
                    {member.name}{" "}
                  </p>
                ) : (
                  <p className="text-sm font-medium text-gray-950">
                    {member.name}{" "}
                  </p>
                )}
              </li>
            ))}
          </ul>

          <ul className="flex gap-2 font-bold text-md text-amber-800">
            Admins:{" "}
            {company?.admins.map((admin: UserType, index: number) => (
              <li
                className={
                  userId === admin.id
                    ? "flex place-items-center bg-white rounded-sm border border-solid border-red-400 p-1 shadow-lg"
                    : "flex place-items-center bg-white rounded-sm shadow-lg p-1 border-solid border-zinc-400 border"
                }
                key={index}
              >
                {userId === admin.id ? (
                  <p className="text-sm font-bold text-red-500">
                    {admin.name}{" "}
                  </p>
                ) : (
                  <p className="text-sm font-medium text-gray-950">
                    {admin.name}{" "}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Link>
      </li>
    </>
  );
}
