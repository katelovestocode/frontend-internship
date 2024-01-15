"use client";
import React from "react";
import OneUserTemplate from "./OneUserTemplate";
import { useAppSelector } from "@/redux/store";
import { ChildrenProps } from "@/types/types";

export default function UserProfile({ children }: ChildrenProps) {
  const user = useAppSelector((state) => state.authReducer.user);

  return (
    <>
      <div className="p-4 xl:p-6 flex gap-7 flex-row">
        {user && (
          <OneUserTemplate id={user.id} user={user}>
            {children}
          </OneUserTemplate>
        )}
      </div>
    </>
  );
}
