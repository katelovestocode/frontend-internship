import React from "react";
import { useDeleteCompanyMutation } from "@/redux/api/companyApiSlice";
import ModalWindow from "../common/Modal";
import { FaCheck } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RefreshToken from "../auth/RefreshToken";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DeleteCompanyType } from "@/types/types";

export default function OwnerDeletesCompany({
  id,
  showModal,
  toggleModal,
}: DeleteCompanyType) {
  const [
    deleteCompany,
    {
      data: deletedData,
      isSuccess: isDeletedSuccess,
      isError: isDeletedError,
      error: deletedError,
    },
  ] = useDeleteCompanyMutation();
  const router = useRouter();

  useEffect(() => {
    if (isDeletedSuccess) {
      router.push("/companies");
    }
  }, [isDeletedSuccess]);

  const handleDeleteCompany = async (id: number | undefined) => {
    try {
      await deleteCompany(id);
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
      <ModalWindow showModal={showModal} toggleModal={toggleModal}>
        <div className="flex flex-col border-solid mb-6 border-gray-700 border-1 rounded-xl p-10 flex gap-2 bg-white shadow-2xl">
          <h2 className="text-center font-bold text-2xl mb-4">
            Are you sure you want to delete this company?
          </h2>

          <button
            className="btn btn-outline mt-6"
            onClick={() => handleDeleteCompany(Number(id))}
          >
            <FaCheck />
            Yes, I made my mind
          </button>

          <button
            className="btn btn-outline mt-6"
            onClick={() => toggleModal()}
          >
            <FcCancel /> No, I changed my mind
          </button>
        </div>
      </ModalWindow>

      <RefreshToken error={deletedError} />
    </>
  );
}
