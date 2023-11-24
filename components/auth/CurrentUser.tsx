"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import {
  useLazyCurrentUserQuery,
  useRefreshUserMutation,
} from "@/redux/api/authApiSlice";
import { CustomError } from "@/types/types";
import React from "react";
import { useAppDispatch } from "@/redux/store";
import { logOut } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react";

interface Children {
  children: React.ReactNode;
}

export default function CurrentUser({ children }: Children) {
  const [getCurrentUser, { error: getUserError }] = useLazyCurrentUserQuery();
  const [getRefreshToken, { data: result, isSuccess, error: refreshError }] =
    useRefreshUserMutation();

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { logout } = useAuth0();

  const accessToken = Cookies.get("accessToken") as string;
  const refreshToken = Cookies.get("refreshToken") as string;

  useEffect(() => {
    if (accessToken) {
      getCurrentUser();
    }
  }, [accessToken, getCurrentUser]);

  useEffect(() => {
    if ((getUserError as CustomError)?.status === 401 && refreshToken) {
      handleRefresh();
    }
  }, [getUserError, refreshToken]);

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
      router.push("/login");
    }
  }, [isSuccess, refreshError]);

  return <>{children}</>;
}
