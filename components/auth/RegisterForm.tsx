"use client";
import React, { useEffect } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { useFormik } from "formik";
import { registerValidationSchema } from "./AuthValidation";
import { useRegisterUserMutation } from "@/redux/api/authApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RegisterState } from "@/types/types";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [
    registerUser,
    {
      data: registerData,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterUserMutation();

  useEffect(() => {
    if (isRegisterError) {
      toast.error((registerError as any).data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (isRegisterSuccess) {
      toast.success("You have successfully registered! Please login!", {
        position: toast.POSITION.TOP_CENTER,
      });

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }, [isRegisterSuccess, registerData, registerError, router]);

  const handleRegister = async (user: RegisterState) => {
    try {
      await registerUser(user);
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      if (values.password === values.confirmPassword) {
        handleRegister({
          name: values.name,
          email: values.email,
          password: values.password,
        });
      }
    },
  });

  return (
    <>
      <form
        className="flex flex-col gap-5 justify-center items-center"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <div className="w-full text-center">
          <Input
            type="text"
            name="name"
            placeholder="Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className=""
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-xs text-red-600 pt-1">{formik.errors.name}</p>
          )}
        </div>

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

        <div className="text-center">
          <div className="flex flex-row gap-3">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className=""
            />

            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className=""
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-xs text-red-600 pt-1">
              {formik.errors.password}
            </p>
          )}
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-xs text-red-600 pt-1">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>
        <Button title="Register" />
      </form>
      <ToastContainer />
    </>
  );
}
