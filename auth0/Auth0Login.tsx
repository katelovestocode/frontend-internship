"use client";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useLazyCurrentUserQuery } from "@/redux/api/authApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import React from "react";

export const Auth0Login = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [getCurrentUser, results] = useLazyCurrentUserQuery();
  const router = useRouter();

  useEffect(() => {
    getToken();
  }, [isAuthenticated]);

  async function getToken() {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently()
        .then(loginUserAuth)
        .then((result) => result)
        .catch((error) => console.log(error));
      return token;
    }
  }

  async function loginUserAuth(token: string) {
    try {
      getCurrentUser(token);
      if (results) {
        Cookies.set("accessToken", token);
        Cookies.set("provider", "auth0");

        toast.success("You have been successfully logged-in", {
          position: toast.POSITION.TOP_CENTER,
        });

        router.push("/profile");
      }
    } catch (error) {
      throw Error;
    }
  }

  return (
    <>
      <ToastContainer />
    </>
  );
};
