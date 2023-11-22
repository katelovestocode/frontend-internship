"use client";
import React, { useEffect } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { useFormik } from "formik";
import { loginValidationSchema } from "./AuthValidation";
import { useLoginUserMutation } from "@/redux/api/authApiSlice";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginState } from "@/types/types";
import Cookies from "js-cookie";

export default function LoginForm() {
  const router = useRouter();

  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      isLoading: isLoginLoading,
      error: loginError,
    },
  ] = useLoginUserMutation();


  useEffect(() => {
    if (isLoginError) {
      toast.error((loginError as any)?.error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    if (isLoginSuccess) {
      router.push("/profile");
    }
  }, [isLoginError, isLoginSuccess, loginData, loginError, router]);

  const handleLogin = async (user: LoginState) => {
    try {
      const response = await loginUser(user);

      if (!isLoginError && "data" in response) {
        Cookies.set("accessToken", response.data?.user?.accessToken as string);
        Cookies.set(
          "refreshToken",
          response.data?.user?.refreshToken as string
        );
        Cookies.set("provider", "jwt");
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      handleLogin({
        email: values.email,
        password: values.password,
      });
    },
  });
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        autoComplete="off"
        className="flex flex-col gap-5 justify-center items-center w-full"
      >
        <div className="w-full text-center">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className=""
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-xs text-red-600 pt-1">{formik.errors.email}</p>
          )}
        </div>

        <div className="w-full text-center">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className=""
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-xs text-red-600 pt-1">
              {formik.errors.password}
            </p>
          )}
        </div>
        <Button title="Login" />
      </form>
      <ToastContainer />
    </>
  );
}
