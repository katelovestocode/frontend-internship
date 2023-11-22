"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useLazyCurrentUserQuery } from "@/redux/api/authApiSlice";
import { Children } from "@/types/types";
import React from "react";

export default function CurrentUser({ children }: Children) {
  const accessToken = Cookies.get("accessToken") as string;
  const [getCurrentUser] = useLazyCurrentUserQuery();

  useEffect(() => {
    if (accessToken) getCurrentUser(accessToken);
  }, [accessToken, getCurrentUser]);

  return <>{children}</>;
}
