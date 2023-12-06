import {
  useCompanyAcceptsRequestMutation,
  useCompanyDeclinesRequestMutation,
} from "@/redux/api/requestApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcCancel } from "react-icons/fc";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import ModalWindow from "@/components/common/Modal";
import RefreshToken from "@/components/auth/RefreshToken";
import { CompReqIdsType, RequestAndIdType } from "@/types/types";
import React from "react";

export default function ListOfCompanyRequestsItem({
  request,
  companyId,
}: RequestAndIdType) {
  const [acceptRequest, { error: acceptError, isSuccess: isAcceptSuccess }] =
    useCompanyAcceptsRequestMutation();
  const [declineRequest, { error: requestError, isSuccess: isDeclineSuccess }] =
    useCompanyDeclinesRequestMutation();

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const handleDeclinedRequest = async ({
    companyId,
    requestId,
  }: CompReqIdsType) => {
    try {
      await declineRequest({ companyId, requestId });
      toggleModal();
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleAcceptedRequest = async ({
    companyId,
    requestId,
  }: CompReqIdsType) => {
    try {
      await acceptRequest({ companyId, requestId });
      toggleModal();
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    if (isAcceptSuccess || isDeclineSuccess) {
      toast.success("Request has been accepted/declined successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [isAcceptSuccess, isDeclineSuccess]);

  return (
    <>
      <li className="flex flex-col gap-4 justify-between border-solid border-gray-700 border-1 rounded-xl p-6 bg-white shadow-lg">
        <div className="flex gap-4 flex-col">
          <p className="text-amber-800">
            Request #:{" "}
            <span className="font-medium text-gray-950">{request.id}</span>
          </p>
          <p className="text-amber-800">
            Requester:{" "}
            <span className="font-medium text-gray-950">
              {request.requester.name}
            </span>
          </p>

          <p className="text-amber-800">
            Status:{" "}
            <span className="font-bold text-gray-950">{request.status}</span>
          </p>
        </div>
        {request?.id && request.status === "pending" && (
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

        <ModalWindow showModal={showModal} toggleModal={toggleModal}>
          <div className="flex flex-col border-solid mb-6 border-gray-700 border-1 rounded-xl p-10 flex gap-2 bg-white shadow-2xl">
            <h2 className="text-center font-bold text-2xl mb-4">
              Are you sure you want to accept/decline request?
            </h2>

            <button
              className="btn btn-outline mt-6"
              onClick={() =>
                handleAcceptedRequest({
                  companyId: Number(companyId),
                  requestId: Number(request.id),
                })
              }
            >
              <FaCheck />
              Yes, I Accept it
            </button>

            <button
              className="btn btn-outline mt-6"
              onClick={() =>
                handleDeclinedRequest({
                  companyId: Number(companyId),
                  requestId: Number(request.id),
                })
              }
            >
              <FcCancel /> No, I Decline it
            </button>
          </div>
        </ModalWindow>
      </li>
      <RefreshToken error={acceptError || requestError} />
    </>
  );
}
