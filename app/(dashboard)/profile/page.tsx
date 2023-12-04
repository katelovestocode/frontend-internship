import UserProfile from "@/components/users/UserProfile";
import { Children } from "@/types/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "User's Profile",
};

export default function Profile({ children }: Children) {
  return (
    <>
      <div className="flex flex-col px-8 xl:px-14 gap-6">
        <h1 className="font-bold text-3xl text-center">User Profile</h1>
        <UserProfile> {children} </UserProfile>
      </div>
    </>
  );
}
