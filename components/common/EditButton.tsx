import { EditButtonType } from "@/types/types";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

export default function EditButton({
  toggleActiveState,
  field,
  isActive,
}: EditButtonType) {
  return (
    <>
      <button type="button" onClick={() => toggleActiveState(field)}>
        {!isActive ? <MdEdit /> : <FaCheck />}
      </button>
    </>
  );
}
