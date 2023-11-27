import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  placeholder: string;
  pattern?: string;
  isActive: boolean;
}
export default function UpdateFormInput({
  name,
  type,
  placeholder,
  isActive,
  ...rest
}: InputProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`${
        isActive
          ? "w-full p-2 border-solid border-gray-400 border-2 rounded-md text-zinc-800"
          : "w-full bg-white text-zinc-400"
      }`}
      {...rest}
    />
  );
}
