"use client";
import React, { useEffect, useState } from "react";
import RefreshToken from "../auth/RefreshToken";
import {
  useDeleteCompanyMutation,
  useLazyGetAllCompaniesQuery,
  useLazyGetOneCompanyQuery,
  useUpdateCompanyMutation,
} from "@/redux/api/companyApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { updateCompanySchema } from "./CompanyValidation";
import UpdateFormInput from "../users/UpdateFormInput";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import ModalWindow from "../common/Modal";
import {
  UpdateCompanyType,
  UpdateFieldsCompanyType,
  UserType,
} from "@/types/types";

export default function UpdateOneCompany({ id, company }: UpdateCompanyType) {
  const userId = useAppSelector((state) => state.authReducer.user?.id);
  const [disabledFields, setDisabledFields] = useState(true);
  const [isActive, setIsActive] = useState({
    name: false,
    description: false,
  });
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
    formik.resetForm();
  };

  const [getOneCompany, { error: getOneCompanyError }] =
    useLazyGetOneCompanyQuery();
  const [getAllCompanies, { error: getAllCompaniesError }] =
    useLazyGetAllCompaniesQuery();

  const [
    updateCompany,
    {
      data: updatedData,
      isError: isUpdatedError,
      isSuccess: isUpdatedSuccess,
      error: updatedError,
    },
  ] = useUpdateCompanyMutation();

  const [
    deleteCompany,
    {
      data: deletedData,
      isSuccess: isDeletedSuccess,
      isError: isDeletedError,
      error: deletedError,
    },
  ] = useDeleteCompanyMutation();

  const toggleActiveState = (field: keyof UpdateFieldsCompanyType) => {
    setIsActive((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const editCompany = () => {
    setDisabledFields((prevState) => !prevState);
    toggleModal();
  };

  useEffect(() => {
    if (isUpdatedSuccess) {
      toggleModal();
      getOneCompany(id);
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

  useEffect(() => {
    if (isDeletedError) {
      setDisabledFields(true);
      formik.resetForm();
    }
    if (isDeletedSuccess) {
      router.push("/companies");
      getAllCompanies();
    }
  }, [isDeletedSuccess, isDeletedError]);

  const handleUpdateCompany = async (data: any) => {
    try {
      await updateCompany(data);
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleDeleteCompany = async (id: number | undefined) => {
    try {
      await deleteCompany(id);
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
      const updatedFields: Partial<typeof formik.values> = {};

      for (const key in values) {
        if (values[key] !== formik.initialValues[key]) {
          updatedFields[key] = values[key];
        }
      }

      if (formik.dirty) {
        handleUpdateCompany({ id, ...updatedFields });
      } else {
        toast.error("No changes were made!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    },
  });

  return (
    <>
      <div className="border-solid border-gray-700 border-1 rounded-xl p-8 flex gap-7 bg-white flex-col shadow-2xl">
        <p className="flex gap-14 font-bold text-xl text-amber-800">
          Name: <span className="font-bold text-gray-950">{company?.name}</span>
        </p>
        <p className="flex gap-3 flex-wrap font-bold text-lg text-amber-800">
          Description:{" "}
          <span className="font-medium text-gray-950 max-w-xs">
            {company?.description}
          </span>
        </p>
        <p className="flex gap-14 font-bold text-lg text-amber-800">
          Owner:{" "}
          <span className="font-medium text-gray-950">
            {company?.owner?.name}
          </span>
        </p>
        <p className="flex gap-9 font-bold text-lg text-amber-800">
          Members:{" "}
          {company?.members.map((member: UserType, index: number) => (
            <span className="font-medium text-gray-950" key={index}>
              {" "}
              {member.name}
            </span>
          ))}
        </p>
        <p className="flex gap-14 font-bold text-lg text-amber-800">
          Admins:{" "}
          {company?.admins.map((admin: UserType, index: number) => (
            <span className="font-medium text-gray-950" key={index}>
              {admin.name}
            </span>
          ))}
        </p>
        {company?.owner?.id === userId && (
          <div className="flex gap-4 mt-4">
            {disabledFields && (
              <>
                <button className="btn btn-outline" onClick={editCompany}>
                  Edit
                </button>
                <button
                  className="btn btn-outline btn-error"
                  onClick={() => handleDeleteCompany(id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>

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
                  placeholder={`${company.name}`}
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
                  placeholder={`${company.description}`}
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

      <RefreshToken
        error={
          getOneCompanyError ||
          updatedError ||
          deletedError ||
          getAllCompaniesError
        }
      />
    </>
  );
}
