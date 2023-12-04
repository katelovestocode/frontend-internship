import ModalWindow from "@/components/common/Modal";
import React from "react";
import { BsSendX } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { FaCheck } from "react-icons/fa";
import { useCompanyCancelInvitationMutation } from "@/redux/api/invitationApiSlice";
import RefreshToken from "@/components/auth/RefreshToken";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { CompInviteIdsType, InviteAndIdType } from "@/types/types";

export default function ListOfCompanyInviteItem({
  invite,
  id,
}: InviteAndIdType) {
  const [companyCancelsInvitation, { error: cancelInviteError }] =
    useCompanyCancelInvitationMutation();

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const handleCancelInvite = async ({
    companyId,
    invitationId,
  }: CompInviteIdsType) => {
    try {
      await companyCancelsInvitation({ companyId, invitationId });
      toggleModal();
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
      <li className="border-solid border-gray-700 border-1 rounded-xl p-6 flex gap-4 bg-white flex-col shadow-lg">
        <div className="flex flex-col gap-2">
          <p className="text-amber-800">
            Invite #:{" "}
            <span className="font-medium text-gray-950">{invite.id}</span>
          </p>
          <p className="text-amber-800">
            Invitee:{" "}
            <span className="font-medium text-gray-950">
              {invite.invitee.name}
            </span>
          </p>

          <p className="text-amber-800">
            Status:{" "}
            <span className="font-bold text-gray-950">{invite.status}</span>
          </p>
        </div>
        {invite?.id && invite.status === "pending" && (
          <button className="btn btn-outline" onClick={() => toggleModal()}>
            <BsSendX /> Cancel
          </button>
        )}
      </li>

      <ModalWindow showModal={showModal} toggleModal={toggleModal}>
        <div className="flex flex-col border-solid mb-6 border-gray-700 border-1 rounded-xl p-10 flex gap-2 bg-white shadow-2xl">
          <h2 className="text-center font-bold text-2xl mb-4">
            Are you sure you want to cancel invitation?
          </h2>

          <button
            className="btn btn-outline mt-6"
            onClick={() =>
              handleCancelInvite({
                companyId: Number(id),
                invitationId: Number(invite.id),
              })
            }
          >
            <FaCheck />
            Yes, I want to cancel it
          </button>

          <button
            className="btn btn-outline mt-6"
            onClick={() => toggleModal()}
          >
            <FcCancel /> No, I changed my mind
          </button>
        </div>
      </ModalWindow>

      <RefreshToken error={cancelInviteError} />
    </>
  );
}
