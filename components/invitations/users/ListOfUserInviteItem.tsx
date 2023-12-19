import ModalWindow from "@/components/common/Modal";
import React, { useEffect } from "react";
import {
  useUserAcceptsInvitationMutation,
  useUserDeclineInvitationMutation,
} from "@/redux/api/invitationApiSlice";
import { useAppSelector } from "@/redux/store";
import { useState } from "react";
import { FcCancel } from "react-icons/fc";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OneInviteType, UserInviteIdsType } from "@/types/types";

export default function ListOfUserInviteItem({ invite }: OneInviteType) {
  const userId = useAppSelector((state) => state.authReducer.user?.id);

  const [
    acceptedInvite,
    { error: acceptInviteError, isSuccess: isAcceptSuccess },
  ] = useUserAcceptsInvitationMutation();
  const [
    declinedInvite,
    { error: declineInviteError, isSuccess: isDeclineSuccess },
  ] = useUserDeclineInvitationMutation();

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const handleDeclinedInvite = async ({
    userId,
    invitationId,
  }: UserInviteIdsType) => {
    try {
      await declinedInvite({ userId, invitationId });
      toggleModal();
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleAcceptedInvite = async ({
    userId,
    invitationId,
  }: UserInviteIdsType) => {
    try {
      await acceptedInvite({ userId, invitationId });
      toggleModal();
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    if (isAcceptSuccess || isDeclineSuccess) {
      toast.success("Invitation has been accepted/declined successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [isAcceptSuccess, isDeclineSuccess]);
  return (
    <>
      <li className="border-solid border-gray-700 border-1 rounded-xl p-6 flex gap-2 bg-white flex-col shadow-lg">
        <p className="text-amber-800">
          Invite #:{" "}
          <span className="font-medium text-gray-950">{invite.id}</span>
        </p>
        <p className="text-amber-800">
          Invitee:{" "}
          <span className="font-medium text-gray-950">
            {invite.company.name}
          </span>
        </p>

        <p className="text-amber-800">
          Status:{" "}
          <span className="font-bold text-gray-950">{invite.status}</span>
        </p>

        {invite?.id && invite.status === "pending" && (
          <div className="flex gap-4 flex-row">
            <button
              className="btn btn-outline  text-2xl"
              onClick={() => toggleModal()}
            >
              +
            </button>
            <button
              className="btn btn-outline btn-error text-2xl"
              onClick={() => toggleModal()}
            >
              -
            </button>
          </div>
        )}
      </li>

      <ModalWindow showModal={showModal} toggleModal={toggleModal}>
        <div className="flex flex-col border-solid mb-6 border-gray-700 border-1 rounded-xl p-10 flex gap-2 bg-white shadow-2xl">
          <h2 className="text-center font-bold text-2xl mb-4">
            Are you sure you want to accept/decline invitation?
          </h2>

          <button
            className="btn btn-outline mt-6"
            onClick={() =>
              handleAcceptedInvite({
                userId: Number(userId),
                invitationId: Number(invite.id),
              })
            }
          >
            <FaCheck />
            Yes, I Accept it
          </button>

          <button
            className="btn btn-outline mt-6"
            onClick={() =>
              handleDeclinedInvite({
                userId: Number(userId),
                invitationId: Number(invite.id),
              })
            }
          >
            <FcCancel /> No, I Decline it
          </button>
        </div>
      </ModalWindow>
    </>
  );
}
