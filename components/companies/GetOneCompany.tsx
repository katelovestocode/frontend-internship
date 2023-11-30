"use client";
import React, { useEffect, useState } from "react";
import RefreshToken from "../auth/RefreshToken";
import {
  useDeleteCompanyMutation,
  useLazyGetOneCompanyQuery,
} from "@/redux/api/companyApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { IdProps, UserType } from "@/types/types";
import Loader from "../common/Loader";
import UpdateCompany from "./UpdateCompany";

export default function GetOneCompany({ id }: IdProps) {
  const userId = useAppSelector((state) => state.authReducer.user?.id);
  const [showModal, setShowModal] = useState(false);
  const [disabledFields, setDisabledFields] = useState(true);
  const router = useRouter();

  const [
    getOneCompany,
    { data, error: getOneCompanyError, isLoading: getOneCompanyLoading },
  ] = useLazyGetOneCompanyQuery();

  const { company } = data || {};

  useEffect(() => {
    getOneCompany(id);
  }, [getOneCompany, id]);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };
  const editCompany = () => {
    setDisabledFields((prevState) => !prevState);
    toggleModal();
  };

  const [
    deleteCompany,
    {
      data: deletedData,
      isSuccess: isDeletedSuccess,
      isError: isDeletedError,
      error: deletedError,
    },
  ] = useDeleteCompanyMutation();

  useEffect(() => {
    if (isDeletedError) {
      setDisabledFields(true);
    }
    if (isDeletedSuccess) {
      router.push("/companies");
    }
  }, [isDeletedSuccess, isDeletedError]);

  const handleDeleteCompany = async (id: number | undefined) => {
    try {
      await deleteCompany(id);
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
      {getOneCompanyLoading ? (
        <Loader />
      ) : (
        <div className="border-solid border-gray-700 border-1 rounded-xl p-12 flex gap-7 bg-white flex-col shadow-2xl">
          <p className="flex gap-14 font-bold text-xl text-amber-800">
            Name:{" "}
            <span className="font-bold text-gray-950">{company?.name}</span>
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
            </div>
          )}
        </div>
      )}
      <UpdateCompany
        id={id}
        company={company}
        showModal={showModal}
        toggleModal={toggleModal}
        disabledFields={disabledFields}
        setDisabledFields={setDisabledFields}
        getOneCompany={getOneCompany}
      />
      <RefreshToken error={getOneCompanyError || deletedError} />
    </>
  );
}
