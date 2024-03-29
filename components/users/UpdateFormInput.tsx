import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  placeholder: string;
  pattern?: string;
  isActive?: boolean;
}
export default function UpdateFormInput({
  name,
  type,
  placeholder,
  isActive,
  disabled,
  ...rest
}: InputProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`${
        isActive
          ? "w-full p-2 border-solid border-gray-400 border rounded-md text-zinc-800"
          : "w-full bg-white text-zinc-400"
      }`}
      {...rest}
      disabled={disabled}
    />
  );
}
