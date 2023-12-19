"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useLazyCurrentUserQuery } from "@/redux/api/authApiSlice";
import React from "react";

interface Children {
  children: React.ReactNode;
}

export default function CurrentUser({ children }: Children) {
  const [getCurrentUser, { error: getUserError }] = useLazyCurrentUserQuery();
  const accessToken = Cookies.get("accessToken") as string;

  useEffect(() => {
    if (accessToken) {
      getCurrentUser();
    }
  }, [accessToken, getCurrentUser]);

  return <>{children}</>;
}
