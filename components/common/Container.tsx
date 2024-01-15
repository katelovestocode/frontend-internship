import React from "react";
import { ContainerProps } from "../../types/types";

export default function Container({ title, children }: ContainerProps) {
  return (
    <div className="flex flex-col gap-10 items-center place-content-between px-20 py-8">
      <h1 className="font-bold text-3xl">{title}</h1>
      {children}
    </div>
  );
}
