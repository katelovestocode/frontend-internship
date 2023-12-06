"use client";
import {
  useCompanySendsInvitationMutation,
  useGetAllCompanyInvitationsQuery,
} from "@/redux/api/invitationApiSlice";
import RefreshToken from "../../auth/RefreshToken";
import ListOfCompanyInviteItem from "./ListOfCompanyInviteItem";
import { FiSend } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLazyGetAllUsersQuery } from "@/redux/api/userApiSlice";
import { useEffect, useState } from "react";
import ModalWindow from "@/components/common/Modal";
import { CompIdsType } from "@/types/types";
import React from "react";

export default function ListOfAllCompanyInvitations({ id }: { id: number }) {
  const { data, error } = useGetAllCompanyInvitationsQuery(id);
  const [getAllUsers, { data: getUsersData, error: getUsersError }] =
    useLazyGetAllUsersQuery();
  const [
    sendInvitatation,
    { isSuccess: sendInvitatationSuccess, error: invitationError },
  ] = useCompanySendsInvitationMutation();

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
    setSelectedUser(null);
  };

  const handleClick = async () => {
    await getAllUsers();
    toggleModal();
  };

  useEffect(() => {
    if (sendInvitatationSuccess) {
      toast.success("All invitations successfully retrieved", {
        position: toast.POSITION.TOP_CENTER,
      });
      toggleModal();
    }
  }, [sendInvitatationSuccess]);

  const handleSendInvitation = async ({
    companyId,
    inviteeId,
  }: CompIdsType) => {
    try {
      await sendInvitatation({ companyId, inviteeId });
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
      {id && (
        <div className="">
          <button className="btn btn-neutral" onClick={handleClick}>
            <FiSend /> Send Invitation
          </button>
        </div>
      )}

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data &&
          data?.invitations?.map((invite: any) => (
            <ListOfCompanyInviteItem invite={invite} key={invite?.id} id={id} />
          ))}
      </ul>

      <ModalWindow showModal={showModal} toggleModal={toggleModal}>
        <div className="flex flex-col border-solid mb-6 border-gray-700 border-1 rounded-xl p-10 flex gap-2 bg-white shadow-2xl">
          <h2 className="text-center font-bold text-2xl mb-4">
            Choose User to Invite
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {getUsersData &&
              getUsersData?.users.map((user: any) => (
                <li
                  key={user.id}
                  onClick={() => setSelectedUser(user.id)}
                  className={`border-solid border rounded-xl p-6 flex gap-2 bg-white flex-col shadow-lg ${
                    selectedUser === user.id
                      ? "border-amber-800 border-4"
                      : "border-gray-700"
                  } `}
                >
                  {user.name}
                </li>
              ))}
          </ul>
          <button
            className="btn btn-outline mt-6"
            onClick={() =>
              handleSendInvitation({
                companyId: Number(id),
                inviteeId: Number(selectedUser),
              })
            }
          >
            <FiSend /> Send Invitation
          </button>
        </div>
      </ModalWindow>

      <RefreshToken error={error || invitationError || getUsersError} />
    </>
  );
}
