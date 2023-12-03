"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { CompanyDetailsType } from "@/types/types";
import { FiSend } from "react-icons/fi";
import { useSendUserRequestMutation } from "@/redux/api/requestApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "@/redux/store";
import RefreshToken from "../auth/RefreshToken";

export default function ListOfCompaniesItem({ company }: CompanyDetailsType) {
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
