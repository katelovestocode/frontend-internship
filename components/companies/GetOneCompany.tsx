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
import { UserType } from "@/types/types";
import Loader from "../common/Loader";
import UpdateCompany from "./UpdateCompany";
import SubNavLink from "../common/SubNavLink";
import { RiDeleteBin5Fill } from "react-icons/ri";
import RemoveMember from "./RemoveMember";

export default function GetOneCompany({ id, children }) {
  const userId = useAppSelector((state) => state.authReducer.user?.id);
  const [showModal, setShowModal] = useState(false);
  const [disabledFields, setDisabledFields] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
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

  const deleteMember = (id: any) => {
    setSelectedMember(id);
    toggleModal();
  };

  return (
    <>
      {getOneCompanyLoading ? (
        <Loader />
      ) : (
        <div className="p-4 xl:p-6 flex gap-7 flex-row">
          <div className="flex flex-col border-solid border-gray-700 border-1 rounded-xl p-12 gap-7 bg-white shadow-2xl">
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

            <ul className="flex gap-8 font-bold text-lg text-amber-800">
              Members:{" "}
              {company?.members.map((member: UserType, index: number) => (
                <li
                  onClick={() => deleteMember(member.id)}
                  className={`flex gap-2 place-items-center border-solid border rounded-xl p-2.5 bg-white shadow-lg ${
                    selectedMember === member.id
                      ? "border-amber-800 border-4"
                      : "border-zinc-200"
                  } `}
                  key={index}
                >
                  <p className="font-medium text-gray-950">{member.name} </p>
                  <RiDeleteBin5Fill className="text-red-500" />
                </li>
              ))}
            </ul>

            <ul className="flex gap-12 font-bold text-lg text-amber-800">
              Admins:{" "}
              {company?.admins.map((admin: UserType, index: number) => (
                <li
                  className="font-medium text-gray-950 border-solid border-zinc-200 border rounded-xl p-2 bg-white flex-col shadow-lg"
                  key={index}
                >
                  {admin.name}
                </li>
              ))}
            </ul>

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

          {company?.owner?.id === userId && (
            <div className="flex flex-col gap-6">
              <ul className="flex flex-row gap-6">
                <li>
                  {" "}
                  <SubNavLink
                    hrefLink={`/companies/${id}/requests`}
                    label="Requests"
                  />
                </li>
                <li>
                  {" "}
                  <SubNavLink
                    hrefLink={`/companies/${id}/invitations`}
                    label="Invitations"
                  />
                </li>
              </ul>

              {/* invitations and requests */}
              {children}
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
      />

      <RemoveMember
        id={id}
        showModal={showModal}
        toggleModal={toggleModal}
        selectedMember={selectedMember}
      />
      <RefreshToken error={getOneCompanyError || deletedError} />
    </>
  );
}
