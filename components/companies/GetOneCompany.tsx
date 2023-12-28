"use client";
import React, { useEffect, useState } from "react";
import {
  useDeleteCompanyMutation,
  useLazyGetOneCompanyQuery,
  useOwnerAddsOrRemovesAdminMutation,
  useOwnerRemovesUserMutation,
} from "@/redux/api/companyApiSlice";
import { useAppSelector } from "@/redux/store";
import { IdChildrenProps, UserType } from "@/types/types";
import Loader from "../common/Loader";
import UpdateCompany from "./UpdateCompany";
import SubNavLink from "../common/SubNavLink";
import CommonModal from "../common/CommonModal";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserLeavesCompanyMutation } from "@/redux/api/userApiSlice";
import AddAdmin from "./AddAdmin";
import MemberOrAdminItem from "./MemberOrAdminItem";
import Link from "next/link";

export default function GetOneCompany({ id, children }: IdChildrenProps) {
  const userId = useAppSelector((state) => state.authReducer.user?.id);
  const [disabledFields, setDisabledFields] = useState(true);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [userIsMember, setUserIsMember] = useState(false);
  const [showUpdateCompanyModal, setShowUpdateCompanyModal] = useState(false);
  const [showDeleteCompanyModal, setShowDeleteCompanyModal] = useState(false);
  const [showRemoveUserModal, setShowRemoveUserModal] = useState(false);
  const [showLeaveCompanyModal, setShowLeaveCompanyModal] = useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [showDeleteAdminModal, setShowDeleteAdminModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [selectedAdmin, setSelectedAdmin] = useState<number | null>(null);

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
  const toggleAddAdminModal = () => {
    setShowAddAdminModal((prev) => !prev);
  };
  const toggleDeleteAdminModal = () => {
    setShowDeleteAdminModal((prev) => !prev);
  };

  const [
    getOneCompany,
    { data, error: getOneCompanyError, isLoading: getOneCompanyLoading },
  ] = useLazyGetOneCompanyQuery();

  const { company } = data || {};

  useEffect(() => {
    getOneCompany(id);
  }, [getOneCompany, id]);

  const [
    deleteCompany,
    {
      data: deletedData,
      isSuccess: isDeletedSuccess,
      isError: isDeletedError,
      error: deletedError,
    },
  ] = useDeleteCompanyMutation();
  const router = useRouter();

  useEffect(() => {
    if (isDeletedSuccess) {
      toast.success("Company has been successfully deleted", {
        position: toast.POSITION.TOP_CENTER,
      });
      router.push("/companies");
    }
  }, [isDeletedSuccess]);

  const handleDeleteCompany = async (ids: any[]) => {
    try {
      await deleteCompany(ids[0]);
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const ownerDeletesCompany = () => {
    toggleDeleteCompanyModal();
  };

  const [
    removeMember,
    {
      data: removeMemberData,
      error: removeMemberError,
      isSuccess: isRemoveMemberSuccess,
    },
  ] = useOwnerRemovesUserMutation();

  const handleRemoveMember = async (ids: any[]) => {
    try {
      await removeMember({ companyId: ids[0], userId: ids[1] });
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    if (isRemoveMemberSuccess) {
      toggleRemoveUserModal();
      toast.success("Member has been successfully removed", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [isRemoveMemberSuccess]);

  const deleteCompanyMember = (id: number) => {
    setSelectedMember(id);
    toggleRemoveUserModal();
  };

  const [
    leaveCompany,
    {
      data: leaveCompanyData,
      error: leaveCompanyError,
      isSuccess: isLeaveCompanySuccess,
    },
  ] = useUserLeavesCompanyMutation();

  const handleLeaveCompany = async (ids: any[]) => {
    try {
      await leaveCompany({ userId: ids[0], companyId: ids[1] });
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    if (isLeaveCompanySuccess) {
      toggleLeaveCompanyModal();
      setUserIsMember(false);
      toast.success("You successfully has left company", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [isLeaveCompanySuccess]);

  const updateCompany = () => {
    setDisabledFields((prevState) => !prevState);
    toggleUpdateCompanyModal();
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

  const addAdmin = async () => {
    toggleAddAdminModal();
  };

  const deleteCompanyAdmin = (id: number) => {
    setSelectedAdmin(id);
    toggleDeleteAdminModal();
    setIsAdmin(false);
  };

  const [
    removeAdmin,
    {
      data: removeAdminData,
      error: removeAdminError,
      isSuccess: isRemoveAdminSuccess,
    },
  ] = useOwnerAddsOrRemovesAdminMutation();

  const handleRemoveAdmin = async (ids: any[]) => {
    try {
      await removeAdmin({
        companyId: ids[0],
        userId: ids[1],
        isAdmin: ids[2],
      });
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    if (isRemoveAdminSuccess) {
      toggleDeleteAdminModal();
      setSelectedAdmin(null);
      toast.success("Admin has been successfully removed", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [isRemoveAdminSuccess]);
  return (
    <>
      {getOneCompanyLoading ? (
        <Loader />
      ) : (
        <>
          <Link
            href={`/companies`}
            className="mx-4 xl:mx-6 text-xl font-medium border-amber-700 w-60 border-2 p-2.5 rounded-md shadow-md"
          >
            Back to Companies
          </Link>
          <div className="p-4 xl:p-6 flex gap-7 flex-row">
            <div className="flex flex-col justify-between border-solid border-gray-700 border-1 rounded-xl p-8 gap-7 bg-white shadow-2xl">
              <div className="flex flex-col gap-7">
                <p className="flex gap-14 font-bold text-xl text-amber-800">
                  Name:{" "}
                  <span className="font-bold text-gray-950">
                    {company?.name}
                  </span>
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
                {/*  members, owner can remove members from the company */}
                <p className="flex font-bold text-lg text-amber-800">
                  Members:{" "}
                </p>
                <ul className="flex gap-4 font-bold text-lg text-amber-800">
                  {company?.members.map((member: UserType, index: number) => (
                    <MemberOrAdminItem
                      key={index}
                      company={company}
                      memberOrAdmin={member}
                      selectedUser={selectedMember}
                      userId={userId}
                      deleteMemberOrAdmin={deleteCompanyMember}
                    />
                  ))}
                </ul>
                {/*  admins, owner can remove admins from the company */}
                <p className="flex font-bold text-lg text-amber-800">
                  Admins:{" "}
                </p>
                <ul className="flex gap-4 font-bold text-lg text-amber-800">
                  {company?.admins.map((admin: UserType, index: number) => (
                    <MemberOrAdminItem
                      key={index}
                      company={company}
                      memberOrAdmin={admin}
                      selectedUser={selectedAdmin}
                      userId={userId}
                      deleteMemberOrAdmin={deleteCompanyAdmin}
                    />
                  ))}
                </ul>
              </div>

              {company?.owner?.id === userId && (
                <div className="flex place-items-center mt-4 gap-4 p-4">
                  <div className="flex gap-4 mr-auto place-items-center">
                    <button className="btn btn-outline" onClick={updateCompany}>
                      Edit
                    </button>
                    <button
                      className="btn btn-outline btn-error"
                      onClick={ownerDeletesCompany}
                    >
                      Delete
                    </button>
                  </div>
                  <button className="btn btn-outline" onClick={addAdmin}>
                    + Admin
                  </button>
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

            {/* requests, invitation, quizzes and analytics tabs */}
            <div className="flex flex-col gap-4 ">
              <ul className="flex flex-row w-full flex-wrap gap-6 ">
                {(company?.owner?.id === userId ||
                  company?.admins
                    .map((admin: UserType) => admin.id)
                    .includes(userId)) && (
                  <>
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
                    <li>
                      <SubNavLink
                        hrefLink={`/companies/${id}/quizzes`}
                        label="Quizzes"
                      />
                    </li>
                    <li>
                      <SubNavLink
                        hrefLink={`/companies/${id}/analytics`}
                        label="Analytics"
                      />
                    </li>
                    <li>
                      <SubNavLink
                        hrefLink={`/companies/${id}/export`}
                        label="Export"
                      />
                    </li>
                  </>
                )}
                {company?.members
                  .map((member: UserType) => member.id)
                  .includes(userId) &&
                  !company?.admins
                    .map((admin: UserType) => admin.id)
                    .includes(userId) && (
                    <li>
                      <SubNavLink
                        hrefLink={`/companies/${id}/quizzes`}
                        label="Quizzes"
                      />
                    </li>
                  )}
              </ul>

              {/* invitations and requests and quizzes lists renders */}
              {children}
            </div>
          </div>
        </>
      )}
      <UpdateCompany
        id={id}
        company={company}
        showModal={showUpdateCompanyModal}
        toggleModal={toggleUpdateCompanyModal}
        disabledFields={disabledFields}
        setDisabledFields={setDisabledFields}
      />

      {/* owner deletes company*/}
      <CommonModal
        ids={[id]}
        showModal={showDeleteCompanyModal}
        toggleModal={toggleDeleteCompanyModal}
        handleOnClick={handleDeleteCompany}
        titleText="Are you sure you want to delete this company?"
        yesText="Yes, I made my mind"
        noText="No, I changed my mind"
      />

      {/* owner removes user from company member's list*/}
      <CommonModal
        ids={[id, selectedMember]}
        showModal={showRemoveUserModal}
        toggleModal={toggleRemoveUserModal}
        handleOnClick={handleRemoveMember}
        titleText="Are you sure you want to delete this user?"
        yesText="Yes, I made my mind"
        noText="No, I changed my mind"
      />

      {/* user leaves company*/}
      <CommonModal
        ids={[userId, id]}
        showModal={showLeaveCompanyModal}
        toggleModal={toggleLeaveCompanyModal}
        handleOnClick={handleLeaveCompany}
        titleText=" Are you sure you want to leave this company?"
        yesText=" Yes, I want to leave"
        noText="No, I changed my mind"
      />

      {/* owner deletes admin from  the list */}
      <CommonModal
        ids={[id, selectedAdmin, isAdmin]}
        showModal={showDeleteAdminModal}
        toggleModal={toggleDeleteAdminModal}
        handleOnClick={handleRemoveAdmin}
        titleText=" Are you sure you want to remove this admin?"
        yesText=" Yes, I want to remove"
        noText="No, I changed my mind"
      />

      {/* owner adds admin to the company*/}
      <AddAdmin
        id={id}
        company={company}
        showModal={showAddAdminModal}
        toggleModal={toggleAddAdminModal}
      />
    </>
  );
}
