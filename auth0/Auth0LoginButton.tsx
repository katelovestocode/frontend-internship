"use client";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { MouseEventHandler } from "react";

export default function LoginAuth0Button() {
  const { loginWithRedirect } = useAuth0();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    loginWithRedirect();
  };

  return (
    <button
      className="bg-gray-700 w-full h-68 px-4 py-2 border-solid border-gray-200 border-2 rounded-xl text-white text-xl hover:bg-gray-600 shadow-sm"
      onClick={handleClick}
    >
      Auth0
    </button>
  );
}
