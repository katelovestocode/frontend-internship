import { SelectedButtonType } from "@/types/types";
import React from "react";

export default function SelectedButton({
  selectedType,
  setSelectedType,
  type,
  name,
}: SelectedButtonType) {
  return (
    <button
      className={`flex flex-col font-bold border-solid border rounded-lg p-2.5 bg-white shadow-lg ${
        selectedType === type ? "border-amber-800 border-2" : "border-zinc-200"
      } `}
      onClick={() => {
        setSelectedType(type);
      }}
    >
      {name}
    </button>
  );
}
