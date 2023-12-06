"use client";
import React, { useEffect, useState } from "react";
import ModalWindow from "../common/Modal";
import UpdateFormInput from "../users/UpdateFormInput";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useUpdateCompanyMutation } from "@/redux/api/companyApiSlice";
import { UpdateCompanyProps, UpdateFieldsCompanyType } from "@/types/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { updateCompanySchema } from "./CompanyValidation";
import { updateFormikFields } from "@/utils/helpers";
import RefreshToken from "../auth/RefreshToken";

export default function UpdateCompany({
  id,
  company,
  showModal,
  toggleModal,
  disabledFields,
  setDisabledFields,
}: UpdateCompanyProps) {
  const [isActive, setIsActive] = useState({
    name: false,
    description: false,
  });
  const [
    updateCompany,
    {
      data: updatedData,
      isError: isUpdatedError,
      isSuccess: isUpdatedSuccess,
      error: updatedError,
    },
  ] = useUpdateCompanyMutation();

  useEffect(() => {
    if (isUpdatedSuccess) {
      toggleModal();
      toast.success("You successfully has updated company information", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (isUpdatedSuccess || updatedError) {
      setDisabledFields(true);
      setIsActive({
        name: false,
        description: false,
      });
      formik.resetForm();
    }
  }, [updatedError, isUpdatedSuccess]);

  const handleUpdateCompany = async (data: any) => {
    try {
      await updateCompany(data);
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: updateCompanySchema,
    onSubmit: (values: any) => {
      const updatedFields = updateFormikFields(
        values,
        formik,
        formik.initialValues
      );

      if (formik.dirty) {
        handleUpdateCompany({ id, ...updatedFields });
      } else {
        toast.error("No changes were made!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    },
  });

  useEffect(() => {
    if (showModal) formik.resetForm();
    setDisabledFields(false);
    setIsActive({
      name: false,
      description: false,
    });
  }, [formik.resetForm, showModal]);

  const toggleActiveState = (field: keyof UpdateFieldsCompanyType) => {
    setIsActive((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <>
      <ModalWindow showModal={showModal} toggleModal={toggleModal}>
        <div className="flex flex-col border-solid border-gray-700 border-1 rounded-xl p-4 flex gap-2 bg-white ">
          <h2 className="text-center font-bold text-2xl mb-4">
            Update Company
          </h2>

          <form
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-5 justify-center items-center w-52 md:w-80 "
          >
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <div className="flex flex-row pt-2 items-center gap-2">
                <UpdateFormInput
                  type="text"
                  name="name"
                  placeholder={`${company?.name}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  isActive={isActive.name}
                  disabled={disabledFields}
                />
                {!disabledFields && (
                  <button
                    type="button"
                    onClick={() => toggleActiveState("name")}
                  >
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

            <div className="w-full flex flex-col gap-2">
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <div className="flex flex-row pt-2 items-center gap-2">
                <UpdateFormInput
                  type="text"
                  name="description"
                  placeholder={`${company?.description}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  isActive={isActive.description}
                  disabled={disabledFields}
                />

                {!disabledFields && (
                  <button
                    type="button"
                    onClick={() => toggleActiveState("description")}
                  >
                    {!isActive.description ? <MdEdit /> : <FaCheck />}
                  </button>
                )}
              </div>
              {formik.touched.description && formik.errors.description && (
                <p className="text-xs text-red-600 pt-1">
                  {formik.errors.description as string}
                </p>
              )}
            </div>

            {!disabledFields && (
              <button type="submit" className="btn btn-outline mt-4">
                Submit
              </button>
            )}
          </form>
        </div>
      </ModalWindow>
      <RefreshToken error={updatedError} />
    </>
  );
}
