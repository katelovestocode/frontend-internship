"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRefreshUserMutation } from "@/redux/api/authApiSlice";
import React from "react";
import { useRouter } from "next/navigation";
import useLogout from "@/hooks/useLogout";

export default function RefreshToken({ error }: any) {
  const [getRefreshToken, { data: result, isSuccess, error: refreshError }] =
    useRefreshUserMutation();
  const refreshToken = Cookies.get("refreshToken") as string;

  const router = useRouter();
  const logOutUser = useLogout();

  useEffect(() => {
    if (error?.status === 401 && refreshToken) {
      handleRefresh();
    }
  }, [error, refreshToken]);

  const handleRefresh = async () => {
    await getRefreshToken({ refreshToken: refreshToken });
  };

  useEffect(() => {
    if (isSuccess) {
      Cookies.set("accessToken", result?.user?.accessToken as string);
      Cookies.set("refreshToken", result?.user?.refreshToken as string);
      Cookies.set("provider", "jwt");
    }

    if (refreshError) {
      logOutUser();
      router.push("/");
    }
  }, [isSuccess, refreshError]);

  return <></>;
}
