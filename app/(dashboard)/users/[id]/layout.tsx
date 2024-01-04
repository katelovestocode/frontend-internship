import OneUser from "@/components/users/GetOneUser";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

type IdProps = {
  params: { id: number };
  children: React.ReactNode;
};

export async function generateMetadata({
  params: { id },
}: IdProps): Promise<Metadata> {
  return { title: `User ${id} Profile` };
}

export default function OneUserLayout({ params: { id }, children }: IdProps) {
  return (
    <div className="flex flex-col md:px-18 px-8 gap-6">
      <h1 className="font-bold text-3xl text-center">User Profile</h1>
      <Link
        href={`/users`}
        className="mx-6 md:mx-8 text-xl font-medium border-amber-700 w-60 border-2 p-2.5 rounded-md shadow-md"
      >
        Back to Users
      </Link>
      <div className="flex md:px-8 px-6 py-8 md:gap-10 gap-8">
        <OneUser id={Number(id)}>{children}</OneUser>
      </div>
    </div>
  );
}
