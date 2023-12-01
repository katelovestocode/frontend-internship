"use client";
import React from "react";
import Link from "next/link";
import { CompanyDetailsType } from "@/types/types";

export default function ListOfCompaniesItem({ company }: CompanyDetailsType) {
  return (
    <>
      <li className="border-solid border-gray-700 border-1 rounded-xl p-6 flex gap-2 bg-white xl:gap-3 flex-col xl:flex-row shadow-lg">
        <Link
          href={`/companies/${company?.id}`}
          className="flex gap-4 flex-col"
        >
          <p className="font-bold text-amber-800">
            Name:{" "}
            <span className="font-bold text-gray-950">{company?.name}</span>
          </p>
          <p className="text-amber-800">
            Description:{" "}
            <span className="font-medium text-gray-950">
              {company?.description}
            </span>
          </p>
          <p className="text-amber-800">
            Owner:{" "}
            <span className="font-medium text-gray-950">
              {company?.owner?.name}
            </span>
          </p>
        </Link>
      </li>
    </>
  );
}
