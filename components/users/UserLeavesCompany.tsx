import ModalWindow from "../common/Modal";
import { FaCheck } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RefreshToken from "../auth/RefreshToken";
import { useEffect } from "react";
import { useUserLeavesCompanyMutation } from "@/redux/api/userApiSlice";
import { useAppSelector } from "@/redux/store";
import { UserLeavesProps, IdTypes } from "@/types/types";
import React from "react";

export default function UserLeavesCompany({
  id,
  showModal,
  toggleModal,
}: UserLeavesProps) {
  const [
    leaveCompany,
    { error: leaveCompanyError, isSuccess: isLeaveCompanySuccess },
  ] = useUserLeavesCompanyMutation();
  const userId = useAppSelector((state) => state.authReducer.user?.id);

  const handleLeaveCompany = async ({ userId, companyId }: IdTypes) => {
    try {
      await leaveCompany({ userId, companyId });
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    if (isLeaveCompanySuccess) {
      toggleModal();
    }
  }, [isLeaveCompanySuccess]);

  return (
    <>
      <ModalWindow showModal={showModal} toggleModal={toggleModal}>
        <div className="flex flex-col border-solid mb-6 border-gray-700 border-1 rounded-xl p-10 flex gap-2 bg-white shadow-2xl">
          <h2 className="text-center font-bold text-2xl mb-4">
            Are you sure you want to leave this company?
          </h2>

          <button
            className="btn btn-outline mt-6"
            onClick={() =>
              handleLeaveCompany({
                userId: Number(userId),
                companyId: Number(id),
              })
            }
          >
            <FaCheck />
            Yes, I want to leave
          </button>

          <button
            className="btn btn-outline mt-6"
            onClick={() => toggleModal()}
          >
            <FcCancel /> No, I changed my mind
          </button>
        </div>
      </ModalWindow>

      <RefreshToken error={leaveCompanyError} />
    </>
  );
}
