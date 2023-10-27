import React, { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  placeholder: string;
  pattern?: string;
  className: string;
}

export const Input: FC<InputProps> = ({
  name,
  type,
  placeholder,
  pattern,
  className,
  ...rest
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      pattern={pattern}
      className={`w-full h-68 px-4 py-2 border-solid border-gray-200 border-2 rounded-xl`}
      {...rest}
    />
  );
};
