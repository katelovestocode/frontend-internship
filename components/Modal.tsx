"use client";
import { ReactNode } from "react";
import { AuthButton } from "./AuthButton";

type ModalType = {
  modal_id: string;
  title: string;
  text: string;
  children?: ReactNode;
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function Modal({
  modal_id,
  title,
  text,
  children,
  handleSubmit,
}: ModalType) {
  const openModal = () => {
    const modalElement = document.getElementById(
      modal_id
    ) as HTMLDialogElement | null;
    if (modalElement) {
      modalElement.showModal();
    }
  };

  const closeDialog = () => {
    const modalElement = document.getElementById(
      modal_id
    ) as HTMLDialogElement | null;
    if (modalElement) {
      modalElement.close();
    }
  };

  return (
    <>
      <div className={"w-40"}>
        <AuthButton onClick={openModal} title={"open modal"} />
      </div>

      <dialog id={modal_id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{text}</p>
          <div className="modal-action">
            <form method="dialog" onSubmit={handleSubmit}>
              {children}
              <AuthButton title={"Submit"} onClick={closeDialog} />
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
