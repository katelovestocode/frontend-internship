import { ButtonProps } from "@/types/types";
import React from "react";

export default function Button({ title, onClick, ...rest }: ButtonProps) {
  return (
    <button
      type="submit"
      className="w-full h-68 px-4 py-2 border-solid border-gray-200 border-2 rounded-xl text-white text-xl bg-gray-700 hover:bg-gray-600 shadow-sm"
      onClick={onClick}
      {...rest}
    >
      {title}
    </button>
  );
}
