import ModalWindow from "../common/Modal";
import { FiSend } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RefreshToken from "../auth/RefreshToken";
import { useEffect, useState } from "react";
import React from "react";
import { useOwnerAddsOrRemovesAdminMutation } from "@/redux/api/companyApiSlice";
import { AddAdminType, IdTypes } from "@/types/types";

export default function AddAdmin({
  id,
  company,
  showModal,
  toggleModal,
}: AddAdminType) {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [
    ownerAddsAdmin,
    {
      data: ownerAddsAdminData,
      error: ownerAddsAdminError,
      isSuccess: ownerAddsAdminSuccess,
    },
  ] = useOwnerAddsOrRemovesAdminMutation();

  const currentUserAsAdmin = (id: number | null) => {
    setSelectedMember(id);
  };

  const handleAddAdmin = async ({ companyId, userId }: IdTypes) => {
    try {
      await ownerAddsAdmin({
        companyId: companyId,
        userId: userId,
        isAdmin: true,
      });
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    if (ownerAddsAdminSuccess) {
      toggleModal();
      setSelectedMember(null);
      toast.success("Admin has been added to the list", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [ownerAddsAdminSuccess]);

  return (
    <>
      <ModalWindow showModal={showModal} toggleModal={toggleModal}>
        <div className="flex flex-col border-solid mb-6 border-gray-700 border-1 rounded-xl p-10 flex gap-2 bg-white shadow-2xl">
          <h2 className="text-center font-bold text-2xl mb-4">
            Choose User to make an Admin
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {company &&
              company?.members?.map((member: any) => (
                <li
                  key={member.id}
                  onClick={() => currentUserAsAdmin(member.id)}
                  className={`border-solid border rounded-xl p-6 flex gap-2 bg-white flex-col shadow-lg ${
                    selectedMember === member.id
                      ? "border-amber-800 border-4"
                      : "border-gray-700"
                  } `}
                >
                  {member.name}
                </li>
              ))}
          </ul>
          <button
            className="btn btn-outline mt-6"
            onClick={() =>
              handleAddAdmin({
                companyId: Number(id),
                userId: Number(selectedMember),
              })
            }
          >
            <FiSend /> Add Admin
          </button>
        </div>
      </ModalWindow>

      <RefreshToken error={ownerAddsAdminError} />
    </>
  );
}
