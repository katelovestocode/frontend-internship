"use client";
import { useCreateCompanyMutation } from "@/redux/api/companyApiSlice";
import { useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import RefreshToken from "../auth/RefreshToken";
import { createACompanySchema } from "./CompanyValidation";
import UpdateFormInput from "../users/UpdateFormInput";
import ModalWindow from "../common/Modal";
import Button from "../common/Button";
import { CreateCompanyType } from "@/types/types";

export default function CreateACompany() {
  const [isActive, setIsActive] = useState({
    name: true,
    description: true,
  });

  const [
    createACompany,
    {
      data: companyData,
      isSuccess: isCreateSuccess,
      isError: isCreateError,
      error: createError,
    },
  ] = useCreateCompanyMutation();

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
    formik.resetForm();
  };

  useEffect(() => {
    if (isCreateError) {
      toast.error((isCreateError as any).message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (isCreateSuccess) {
      toggleModal();
    }
  }, [isCreateError, isCreateSuccess]);

  const handleCreateCompany = async (company: CreateCompanyType) => {
    try {
      await createACompany(company);
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
    validationSchema: createACompanySchema,
    onSubmit: async (values) => {
      handleCreateCompany({
        name: values.name,
        description: values.description,
      });
    },
  });

  return (
    <>
      <div className="ml-auto">
        <Button onClick={toggleModal} title={"Add Company"} />
      </div>
      <ModalWindow showModal={showModal} toggleModal={toggleModal}>
        <div className="flex flex-col border-solid mb-6 border-gray-700 border-1 rounded-xl p-10 flex gap-2 bg-white shadow-2xl">
          <h2 className="text-center font-bold text-2xl mb-4">
            Add a new Company
          </h2>
          <form
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-5 justify-center items-center w-52 md:w-80 "
          >
            <div className="w-full">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <div className="flex flex-row pt-2 items-center gap-2">
                <UpdateFormInput
                  type="text"
                  name="name"
                  placeholder={``}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  isActive={isActive.name}
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <p className="text-xs text-red-600 pt-1">
                  {formik.errors.name as string}
                </p>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <div className="flex flex-row pt-2 items-center gap-2">
                <UpdateFormInput
                  type="text"
                  name="description"
                  placeholder={``}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  isActive={isActive.description}
                />
              </div>
              {formik.touched.description && formik.errors.description && (
                <p className="text-xs text-red-600 pt-1">
                  {formik.errors.description as string}
                </p>
              )}
            </div>
            <Button title="Submit" />
          </form>
        </div>
      </ModalWindow>
      <RefreshToken error={createError} />
    </>
  );
}
