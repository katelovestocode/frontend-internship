import React from "react";
import RefreshToken from "@/components/auth/RefreshToken";
import ModalWindow from "@/components/common/Modal";
import { useUserCancelRequestMutation } from "@/redux/api/requestApiSlice";
import { useAppSelector } from "@/redux/store";
import { useState } from "react";
import { BsSendX } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcCancel } from "react-icons/fc";
import { FaCheck } from "react-icons/fa";
import { OneRequestType, ReqIdsType } from "@/types/types";

export default function ListOfUserRequestsItem({ request }: OneRequestType) {
  const userId = useAppSelector((state) => state.authReducer.user?.id);
  const [cancelRequest, { error: cancelRequestError }] =
    useUserCancelRequestMutation();

  const handleCancelRequest = async ({ requestId, userId }: ReqIdsType) => {
    try {
      await cancelRequest({ requestId, userId });
      toggleModal();
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <>
      <li className="border-solid border-gray-700 border-1 rounded-xl p-6 flex flex-col place-content-between gap-4 bg-white shadow-lg">
        <div className="flex flex-col gap-2">
          <p className="text-amber-800">
            Request #:{" "}
            <span className="font-medium text-gray-950">{request.id}</span>
          </p>
          <p className="text-amber-800">
            Request To:{" "}
            <span className="font-medium text-gray-950">
              {request.company.name}
            </span>
          </p>

          <p className="text-amber-800">
            Status:{" "}
            <span className="font-bold text-gray-950">{request.status}</span>
          </p>
        </div>

        {request?.id && request.status === "pending" && (
          <button className="btn btn-outline" onClick={() => toggleModal()}>
            <BsSendX /> Cancel
          </button>
        )}
      </li>

      <ModalWindow showModal={showModal} toggleModal={toggleModal}>
        <div className="flex flex-col border-solid mb-6 border-gray-700 border-1 rounded-xl p-10 flex gap-2 bg-white shadow-2xl">
          <h2 className="text-center font-bold text-2xl mb-4">
            Are you sure you want to cancel request?
          </h2>

          <button
            className="btn btn-outline mt-6"
            onClick={() =>
              handleCancelRequest({
                requestId: Number(request.id),
                userId: Number(userId),
              })
            }
          >
            <FaCheck />
            Yes, want to cancel it
          </button>

          <button
            className="btn btn-outline mt-6"
            onClick={() => toggleModal()}
          >
            <FcCancel /> No, I changed my mind
          </button>
        </div>
      </ModalWindow>
      <RefreshToken error={cancelRequestError} />
    </>
  );
}
