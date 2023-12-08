"use client";
import { MemberOrAdminItemType } from "@/types/types";
import { RiDeleteBin5Fill } from "react-icons/ri";
import React from "react";

export default function MemberOrAdminItem({
  company,
  memberOrAdmin,
  selectedUser,
  userId,
  deleteMemberOrAdmin,
}: MemberOrAdminItemType) {
  return (
    <li
      onClick={
        company?.owner?.id === userId
          ? () => deleteMemberOrAdmin(memberOrAdmin.id)
          : undefined
      }
      className={`flex gap-2 place-items-center border-solid border rounded-xl p-2.5 bg-white shadow-lg ${
        selectedUser === memberOrAdmin.id
          ? "border-amber-800 border-4"
          : "border-zinc-200"
      } `}
      key={memberOrAdmin.id}
    >
      <p className="font-medium text-gray-950">{memberOrAdmin.name} </p>
      {company?.owner?.id === userId ? (
        <RiDeleteBin5Fill className="text-red-500" />
      ) : undefined}
    </li>
  );
}
