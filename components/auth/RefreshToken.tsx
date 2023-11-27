"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRefreshUserMutation } from "@/redux/api/authApiSlice";
import React from "react";
import { useAppDispatch } from "@/redux/store";
import { logOut } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react";

export default function RefreshToken({ error }: any) {
  const [getRefreshToken, { data: result, isSuccess, error: refreshError }] =
    useRefreshUserMutation();
  const refreshToken = Cookies.get("refreshToken") as string;

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { logout } = useAuth0();

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
      dispatch(logOut());
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("provider");
      logout({ logoutParams: { returnTo: window.location.origin } });
      router.push("/");
    }
  }, [isSuccess, refreshError]);

  return <></>;
}
