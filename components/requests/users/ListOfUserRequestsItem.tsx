import React, { useEffect } from "react";
import { useUserCancelRequestMutation } from "@/redux/api/requestApiSlice";
import { useAppSelector } from "@/redux/store";
import { useState } from "react";
import { BsSendX } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OneRequestType } from "@/types/types";
import CommonModal from "@/components/common/CommonModal";

export default function ListOfUserRequestsItem({ request }: OneRequestType) {
  const userId = useAppSelector((state) => state.authReducer.user?.id);
  const [
    cancelRequest,
    { error: cancelRequestError, isSuccess: isCancelRequestSuccess },
  ] = useUserCancelRequestMutation();

  const handleCancelRequest = async (ids: any) => {
    try {
      await cancelRequest({ requestId: ids[0], userId: ids[1] });
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

  useEffect(() => {
    if (isCancelRequestSuccess) {
      toast.success("Request has been cancelled successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [isCancelRequestSuccess]);

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
      <CommonModal
        ids={[request.id, userId]}
        showModal={showModal}
        toggleModal={toggleModal}
        handleOnClick={handleCancelRequest}
        titleText="Are you sure you want to cancel request?"
        yesText="Yes, I want to cancel it"
        noText="No, I changed my mind"
      />
    </>
  );
}
