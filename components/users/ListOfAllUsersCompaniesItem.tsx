import { ListOfAllUsersCompaniesType } from "@/types/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useUserLeavesCompanyMutation } from "@/redux/api/userApiSlice";
import CommonModal from "../common/CommonModal";

export default function ListOfAllUsersCompaniesItem({
  company,
  userId,
  userIsMember,
}: ListOfAllUsersCompaniesType) {
  const [showLeaveCompanyModal, setShowLeaveCompanyModal] = useState(false);

  const toggleLeaveCompanyModal = () => {
    setShowLeaveCompanyModal((prev) => !prev);
  };

  const [leaveCompany, { isSuccess: isLeaveCompanySuccess }] =
    useUserLeavesCompanyMutation();

  const handleLeaveCompany = async (ids: any[]) => {
    try {
      await leaveCompany({ userId: ids[0], companyId: ids[1] });
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    if (isLeaveCompanySuccess) {
      toggleLeaveCompanyModal();
      toast.success("You successfully has left company", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [isLeaveCompanySuccess]);

  return (
    <>
      <li className="flex flex-col gap-4 justify-between border-solid border-gray-700 border-1 rounded-xl p-6 bg-white shadow-lg">
        <div className="flex gap-4 flex-col">
          <p className="text-amber-800">
            Name:{" "}
            <span className="font-bold text-gray-950">{company.name}</span>
          </p>
          <p className="text-amber-800">
            Company ID #:{" "}
            <span className="font-medium text-gray-950">{company.id}</span>
          </p>
          <p className="text-amber-800">
            Description:{" "}
            <span className="font-medium text-gray-950">
              {company.description}
            </span>
          </p>
          <p className="text-amber-800">
            Created At:{" "}
            <span className="font-medium text-gray-950">
              {company.createdAt}
            </span>
          </p>
        </div>
        <div className="flex mt-auto">
          {userIsMember && (
            <button
              className="btn btn-outline btn-error "
              onClick={() => toggleLeaveCompanyModal()}
            >
              Leave Company
            </button>
          )}
        </div>
      </li>

      <CommonModal
        ids={[userId, company.id]}
        showModal={showLeaveCompanyModal}
        toggleModal={toggleLeaveCompanyModal}
        handleOnClick={handleLeaveCompany}
        titleText="Are you sure you want to leave this company?"
        yesText=" Yes, I want to leave"
        noText="No, I changed my mind"
      />
    </>
  );
}
