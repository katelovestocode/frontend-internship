import React, { useEffect } from "react";
import { BsSendX } from "react-icons/bs";
import { useCompanyCancelInvitationMutation } from "@/redux/api/invitationApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { InviteAndIdType } from "@/types/types";
import CommonModal from "@/components/common/CommonModal";

export default function ListOfCompanyInviteItem({
  invite,
  id,
}: InviteAndIdType) {
  const [
    companyCancelsInvitation,
    { error: cancelInviteError, isSuccess: isCancelSuccess },
  ] = useCompanyCancelInvitationMutation();

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const handleCancelInvite = async (ids: any) => {
    try {
      await companyCancelsInvitation({
        companyId: ids[0],
        invitationId: ids[1],
      });
      toggleModal();
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    if (isCancelSuccess) {
      toast.success("Invitation has been successfully cancelled", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [isCancelSuccess]);

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

      <CommonModal
        ids={[id, invite.id]}
        showModal={showModal}
        toggleModal={toggleModal}
        handleOnClick={handleCancelInvite}
        titleText="Are you sure you want to cancel invitation?"
        yesText="Yes, I want to cancel it"
        noText="No, I changed my mind"
        error={cancelInviteError}
      />
    </>
  );
}
