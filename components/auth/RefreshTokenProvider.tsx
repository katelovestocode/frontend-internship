"use client";
import { useRefreshUserMutation } from "@/redux/api/authApiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import useLogout from "@/hooks/useLogout";
import { isRefreshError } from "../../redux/slices/authSlice";

export function RefreshTokenProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [getRefreshToken, { data: result, isSuccess, error: refreshError }] =
    useRefreshUserMutation();

  const isError = useAppSelector((state) => state.authReducer.isError);
  const refreshToken = Cookies.get("refreshToken") as string;
  const logOutUser = useLogout();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      const handleRefresh = async () => {
        await getRefreshToken({ refreshToken: refreshToken });
      };
      handleRefresh();
    }
  }, [getRefreshToken, isError, refreshToken]);

  useEffect(() => {
    if (isSuccess) {
      Cookies.set("accessToken", result?.user?.accessToken as string);
      Cookies.set("refreshToken", result?.user?.refreshToken as string);
      Cookies.set("provider", "jwt");
      dispatch(isRefreshError(false));
    }

    if (refreshError) {
      logOutUser();
      router.push("/");
    }
  }, [isSuccess, refreshError]);

  return <>{children}</>;
}
