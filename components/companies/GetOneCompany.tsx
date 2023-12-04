"use client";
import React, { useEffect, useState } from "react";
import RefreshToken from "../auth/RefreshToken";
import { useLazyGetOneCompanyQuery } from "@/redux/api/companyApiSlice";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "@/redux/store";
import { IdChildrenProps, UserType } from "@/types/types";
import Loader from "../common/Loader";
import UpdateCompany from "./UpdateCompany";
import SubNavLink from "../common/SubNavLink";
import { RiDeleteBin5Fill } from "react-icons/ri";
import OwnerRemovesMember from "./OwnerRemovesMember";
import UserLeavesCompany from "../users/UserLeavesCompany";
import OwnerDeletesCompany from "./OwnerDeletesCompany";

export default function GetOneCompany({ id, children }: IdChildrenProps) {
  const userId = useAppSelector((state) => state.authReducer.user?.id);
  const [disabledFields, setDisabledFields] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [userIsMember, setUserIsMember] = useState(false);
  const [showUpdateCompanyModal, setShowUpdateCompanyModal] = useState(false);
  const [showDeleteCompanyModal, setShowDeleteCompanyModal] = useState(false);
  const [showRemoveUserModal, setShowRemoveUserModal] = useState(false);
  const [showLeaveCompanyModal, setShowLeaveCompanyModal] = useState(false);

  const toggleUpdateCompanyModal = () => {
    setShowUpdateCompanyModal((prev) => !prev);
  };
  const toggleDeleteCompanyModal = () => {
    setShowDeleteCompanyModal((prev) => !prev);
  };
  const toggleRemoveUserModal = () => {
    setShowRemoveUserModal((prev) => !prev);
  };
  const toggleLeaveCompanyModal = () => {
    setShowLeaveCompanyModal((prev) => !prev);
  };

  const [
    getOneCompany,
    { data, error: getOneCompanyError, isLoading: getOneCompanyLoading },
  ] = useLazyGetOneCompanyQuery();

  const { company } = data || {};

  useEffect(() => {
    getOneCompany(id);
  }, [getOneCompany, id]);

  const updateCompany = () => {
    setDisabledFields((prevState) => !prevState);
    toggleUpdateCompanyModal();
  };

  const ownerDeletesCompany = () => {
    toggleDeleteCompanyModal();
  };

  const deleteCompanyMember = (id: any) => {
    setSelectedMember(id);
    toggleRemoveUserModal();
  };

  // check if the logged-in user is the member of the company
  useEffect(() => {
    company?.members?.map((member: UserType) => {
      if (Number(member.id) === Number(userId)) {
        setUserIsMember(true);
      } else {
        setUserIsMember(false);
      }
    });
  }, [company?.members, userId]);

  return (
    <>
      {getOneCompanyLoading ? (
        <Loader />
      ) : (
        <div className="p-4 xl:p-6 flex gap-7 flex-row">
          <div className="flex flex-col justify-between border-solid border-gray-700 border-1 rounded-xl p-12 gap-7 bg-white shadow-2xl">
            <div className="flex flex-col gap-7">
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

              {/*  owner option to remove member from the company */}
              <ul className="flex gap-8 font-bold text-lg text-amber-800">
                Members:{" "}
                {company?.members.map((member: UserType, index: number) => (
                  <li
                    onClick={
                      company?.owner?.id === userId
                        ? () => deleteCompanyMember(member.id)
                        : undefined
                    }
                    className={`flex gap-2 place-items-center border-solid border rounded-xl p-2.5 bg-white shadow-lg ${
                      selectedMember === member.id
                        ? "border-amber-800 border-4"
                        : "border-zinc-200"
                    } `}
                    key={index}
                  >
                    <p className="font-medium text-gray-950">{member.name} </p>
                    {company?.owner?.id === userId ? (
                      <RiDeleteBin5Fill className="text-red-500" />
                    ) : undefined}
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
            </div>
            {company?.owner?.id === userId && (
              <div className="flex gap-4 mt-4">
                <>
                  <button className="btn btn-outline" onClick={updateCompany}>
                    Edit
                  </button>
                  <button
                    className="btn btn-outline btn-error"
                    onClick={ownerDeletesCompany}
                  >
                    Delete
                  </button>
                </>
              </div>
            )}

            {/* user leaves company */}
            {userIsMember && (
              <button
                className="btn btn-outline btn-error"
                onClick={() => toggleLeaveCompanyModal()}
              >
                Leave Company
              </button>
            )}
          </div>

          {/* requests and invitation tabs */}
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

              {/* invitations and requests lists renders */}
              {children}
            </div>
          )}
        </div>
      )}

      <UpdateCompany
        id={id}
        company={company}
        showModal={showUpdateCompanyModal}
        toggleModal={toggleUpdateCompanyModal}
        disabledFields={disabledFields}
        setDisabledFields={setDisabledFields}
      />

      <OwnerDeletesCompany
        id={id}
        showModal={showDeleteCompanyModal}
        toggleModal={toggleDeleteCompanyModal}
      />

      <OwnerRemovesMember
        id={id}
        showModal={showRemoveUserModal}
        toggleModal={toggleRemoveUserModal}
        selectedMember={selectedMember}
      />

      <UserLeavesCompany
        id={id}
        showModal={showLeaveCompanyModal}
        toggleModal={toggleLeaveCompanyModal}
      />
      <RefreshToken error={getOneCompanyError} />
    </>
  );
}
