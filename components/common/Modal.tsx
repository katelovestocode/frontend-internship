"use client";
import Button from "./Button";
import { ModalType } from "@/types/types";

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
        <Button onClick={openModal} title={"open modal"} />
      </div>

      <dialog id={modal_id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{text}</p>
          <div className="modal-action">
            <form method="dialog" onSubmit={handleSubmit}>
              {children}
              <Button title={"Submit"} onClick={closeDialog} />
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
