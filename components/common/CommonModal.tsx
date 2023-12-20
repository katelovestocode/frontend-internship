import ModalWindow from "../common/Modal";
import { FaCheck } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { CommonModalType } from "@/types/types";

export default function CommonModal({
  ids,
  showModal,
  toggleModal,
  titleText,
  handleOnClick,
  yesText,
  noText,
  error,
}: CommonModalType) {
  return (
    <>
      <ModalWindow showModal={showModal} toggleModal={toggleModal}>
        <div className="flex flex-col border-solid mb-6 border-gray-700 border-1 rounded-xl p-10 flex gap-2 bg-white shadow-2xl">
          <h2 className="text-center font-bold text-2xl mb-4">{titleText}</h2>

          <button
            className="btn btn-outline mt-6"
            onClick={() => handleOnClick(ids)}
          >
            <FaCheck />
            {yesText}
          </button>

          <button
            className="btn btn-outline mt-6"
            onClick={() => toggleModal()}
          >
            <FcCancel /> {noText}
          </button>
        </div>
      </ModalWindow>
    </>
  );
}
