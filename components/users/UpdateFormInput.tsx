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
          ? "w-full p-2 border-solid border-gray-400 border-2 rounded-md text-gray"
          : "w-full bg-white text-gray"
      }`}
      {...rest}
    />
  );
}
