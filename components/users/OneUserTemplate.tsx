"use client";
import React, { useEffect, useState } from "react";
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/userApiSlice";
import RefreshToken from "../auth/RefreshToken";
import { useFormik } from "formik";
import { updateUserSchema } from "./UpdateUserValidation";
import UpdateFormInput from "./UpdateFormInput";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "@/redux/store";
import { ActiveFieldsType, OneUserType } from "@/types/types";
import { useLazyCurrentUserQuery } from "@/redux/api/authApiSlice";
import useLogout from "../../hooks/useLogout";
import { omit } from "lodash";

export default function OneUserTemplate({ id, user }: OneUserType) {
  const [disabledFields, setDisabledFields] = useState(true);
  const userId = useAppSelector((state) => state.authReducer.user?.id);
  const [isActive, setIsActive] = useState({
    email: false,
    name: false,
    password: false,
    confirmPassword: false,
  });
  const logOutUser = useLogout();

  const [getCurrentUser, { error: getUserError, data: userData }] =
    useLazyCurrentUserQuery();

  const [
    updateCurrentUser,
    {
      data: updatedData,
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
      error: updateError,
    },
  ] = useUpdateUserMutation();

  const [
    deleteCurrentUser,
    {
      data: deletedData,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteUserMutation();

  const toggleActiveState = (field: keyof ActiveFieldsType) => {
    setIsActive((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const enableFields = () => {
    if (userId === id) {
      setDisabledFields((prevState) => !prevState);
    } else
      toast.error("Forbidden! You can only update your own profile!", {
        position: toast.POSITION.TOP_CENTER,
      });
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      getCurrentUser();
    }
    if (isUpdateSuccess || isUpdateError) {
      setDisabledFields(true);
      setIsActive({
        email: false,
        name: false,
        password: false,
        confirmPassword: false,
      });
      formik.resetForm();
    }
  }, [isUpdateError, isUpdateSuccess]);

  useEffect(() => {
    if (isDeleteError) {
      setDisabledFields(true);
      formik.resetForm();
    }
    if (isDeleteSuccess) {
      logOutUser();
    }
  }, [isDeleteSuccess, isDeleteError]);

  const handleUpdateUser = async (data: any) => {
    try {
      await updateCurrentUser(data);
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleDeleteUser = async (id: number | undefined) => {
    try {
      if (id === userId) {
        await deleteCurrentUser(id);
      } else
        toast.error("Forbidden! You can only delete your own profile!", {
          position: toast.POSITION.TOP_CENTER,
        });
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: updateUserSchema,
    onSubmit: (values: any) => {
      if (values.password === values.confirmPassword) {
        const updatedFields: Partial<typeof formik.values> = {};

        for (const key in values) {
          if (values[key] !== formik.initialValues[key]) {
            updatedFields[key] = values[key];
          }
        }
        const fieldsToSend = omit(updatedFields, ["email", "confirmPassword"]);

        if (formik.dirty) {
          handleUpdateUser({ id, ...fieldsToSend });
        } else {
          toast.error("No changes were made!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    },
  });

  return (
    <div className="flex flex-col border-solid border-gray-700 border-1 rounded-xl p-10 flex gap-2 bg-white shadow-lg">
      <form
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-5 justify-center items-center w-52 md:w-80 "
      >
        <div className="w-full">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <div className="flex flex-row pt-2 gap-2">
            <UpdateFormInput
              type="email"
              name="email"
              placeholder={`${user?.email}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              isActive={isActive.email}
              disabled
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-xs text-red-600 pt-1">
              {formik.errors.email as string}
            </p>
          )}
        </div>

        <div className="w-full">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <div className="flex flex-row pt-2 items-center gap-2">
            <UpdateFormInput
              type="text"
              name="name"
              placeholder={`${user?.name}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isActive={isActive.name}
              disabled={disabledFields}
            />
            {!disabledFields && (
              <button type="button" onClick={() => toggleActiveState("name")}>
                {!isActive.name ? <MdEdit /> : <FaCheck />}
              </button>
            )}
          </div>
          {formik.touched.name && formik.errors.name && (
            <p className="text-xs text-red-600 pt-1">
              {formik.errors.name as string}
            </p>
          )}
        </div>

        <div className="w-full">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <div className="flex flex-row pt-2 items-center gap-2">
            <UpdateFormInput
              type="password"
              name="password"
              placeholder="************"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              isActive={isActive.password}
              disabled={disabledFields}
            />
            {!disabledFields && (
              <button
                type="button"
                onClick={() => toggleActiveState("password")}
              >
                {!isActive.password ? <MdEdit /> : <FaCheck />}
              </button>
            )}
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-xs text-red-600 pt-1">
              {formik.errors.password as string}
            </p>
          )}
        </div>

        <div className="w-full">
          <label htmlFor="password" className="font-semibold">
            Confirm Password
          </label>
          <div className="flex flex-row pt-2 items-center gap-2">
            <UpdateFormInput
              type="password"
              name="confirmPassword"
              placeholder="************"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              isActive={isActive.confirmPassword}
              disabled={disabledFields}
            />
            {!disabledFields && (
              <button
                type="button"
                onClick={() => toggleActiveState("confirmPassword")}
              >
                {!isActive.confirmPassword ? <MdEdit /> : <FaCheck />}
              </button>
            )}
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-xs text-red-600 pt-1">
              {formik.errors.confirmPassword as string}
            </p>
          )}
        </div>

        {!disabledFields && (
          <button type="submit" className="btn btn-outline mt-4">
            Submit
          </button>
        )}
      </form>

      <div className="flex justify-between mt-4">
        {disabledFields && (
          <>
            <button className="btn btn-outline" onClick={enableFields}>
              Edit
            </button>
            <button
              className="btn btn-outline btn-error"
              onClick={() => handleDeleteUser(id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
      <RefreshToken error={updateError || deleteError || getUserError} />
    </div>
  );
}
