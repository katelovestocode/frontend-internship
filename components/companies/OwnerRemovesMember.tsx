import { useOwnerRemovesUserMutation } from "@/redux/api/companyApiSlice";
import ModalWindow from "../common/Modal";
import { FaCheck } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RefreshToken from "../auth/RefreshToken";
import { useEffect } from "react";
import { IdTypes, RemoveMemberProps } from "@/types/types";
import React from "react";

export default function OwnerRemovesMember({
  id,
  showModal,
  toggleModal,
  selectedMember,
}: RemoveMemberProps) {
  const [
    removeMember,
    { error: removeMemberError, isSuccess: isRemoveMemberSuccess },
  ] = useOwnerRemovesUserMutation();

  const handleRemoveMember = async ({ companyId, userId }: IdTypes) => {
    try {
      await removeMember({ companyId, userId });
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    if (isRemoveMemberSuccess) {
      toggleModal();
    }
  }, [isRemoveMemberSuccess]);

  return (
    <>
      <ModalWindow showModal={showModal} toggleModal={toggleModal}>
        <div className="flex flex-col border-solid mb-6 border-gray-700 border-1 rounded-xl p-10 flex gap-2 bg-white shadow-2xl">
          <h2 className="text-center font-bold text-2xl mb-4">
            Are you sure you want to delete this user?
          </h2>

          <button
            className="btn btn-outline mt-6"
            onClick={() =>
              handleRemoveMember({
                companyId: Number(id),
                userId: Number(selectedMember),
              })
            }
          >
            <FaCheck />
            Yes, I made my mind
          </button>

          <button
            className="btn btn-outline mt-6"
            onClick={() => toggleModal()}
          >
            <FcCancel /> No, I changed my mind
          </button>
        </div>
      </ModalWindow>

      <RefreshToken error={removeMemberError} />
    </>
  );
}
