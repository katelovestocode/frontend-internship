import React, { FC } from "react";
import AuthImage from "../auth/AuthImage";
import { WrapperProps } from "@/types/types";

export default function Wrapper({ title, children }: WrapperProps) {
  return (
    <main className="flex flex-row gap-10 place-content-around px-20 py-10">
      <div className="flex flex-col gap-2 items-center w-570 sm:w-80 lg:w-570">
        <h1 className="font-bold text-3xl p-5">{title}</h1>
        {children}
      </div>
      <AuthImage />
    </main>
  );
}
