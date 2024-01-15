"use client";
import { createPortal } from "react-dom";
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { ModalWindowType } from "@/types/types";

export function CreateModal({
  children,
  showModal,
  toggleModal,
  minWidth,
}: ModalWindowType) {
  if (typeof window !== "undefined") {
    const modalRoot = document.querySelector("#modal-root");
    if (!modalRoot) return null;

    return createPortal(
      <ModalWindow
        showModal={showModal}
        toggleModal={toggleModal}
        minWidth={minWidth}
      >
        {children}
      </ModalWindow>,
      modalRoot as HTMLElement
    );
  }
  return null;
}

export default function ModalWindow({
  children,
  showModal,
  toggleModal,
  minWidth,
}: ModalWindowType) {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("modal-overlay")) {
      toggleModal();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = showModal ? "hidden" : "auto";
    }
    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "auto";
      }
    };
  }, [showModal]);

  return (
    <>
      {showModal ? (
        <div
          className="fixed top-0 left-0 overflow-hidden w-screen h-screen
          backdrop-opacity-10 bg-[#11111199] modal-overlay"
          onClick={handleOverlayClick}
        >
          <div
            className={`flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2
              -translate-y-1/2 min-h-[50%]  ${
                minWidth ? `${minWidth}` : "min-w-[30%]"
              } p-10 bg-white rounded-2xl overflow-y-auto`}
          >
            <div className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-200 hover:bg-zinc-400">
              <button
                className="flex items-center"
                onClick={() => toggleModal()}
              >
                <IoClose />
              </button>
            </div>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
