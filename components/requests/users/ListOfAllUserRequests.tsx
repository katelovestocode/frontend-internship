"use client";
import React from "react";
import {
  useGetUsersAllRequestsQuery,
  useSendUserRequestMutation,
} from "@/redux/api/requestApiSlice";
import RefreshToken from "../../auth/RefreshToken";
import ListOfUserRequestsItem from "./ListOfUserRequestsItem";
import ModalWindow from "@/components/common/Modal";
import { FiSend } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLazyGetAllCompaniesQuery } from "@/redux/api/companyApiSlice";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import { UserReqIdsType } from "@/types/types";

export default function ListOfAllUserRequests({ id }: { id: number }) {
  const { data, error } = useGetUsersAllRequestsQuery(id);

  const userId = useAppSelector((state) => state.authReducer.user?.id);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [getAllCompanies, { data: getCompanyData, error: getCompanyError }] =
    useLazyGetAllCompaniesQuery();

  const [
    sendRequest,
    { isSuccess: sendRequestSuccess, error: sendRequestError },
  ] = useSendUserRequestMutation();

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
    setSelectedCompany(null);
  };

  const handleClick = async () => {
    await getAllCompanies();
    toggleModal();
  };

  const handleSendRequest = async ({ companyId, userId }: UserReqIdsType) => {
    try {
      await sendRequest({ companyId, userId });
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    if (sendRequestSuccess) {
      toggleModal();
    }
  }, [sendRequestSuccess]);

  return (
    <>
      {Number(userId) === Number(id) && (
        <div className="">
          <button className="btn btn-neutral" onClick={handleClick}>
            <FiSend /> Send Request
          </button>
        </div>
      )}

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data?.requests &&
          data?.requests?.map((request: any) => (
            <ListOfUserRequestsItem request={request} key={request?.id} />
          ))}
      </ul>

      <ModalWindow showModal={showModal} toggleModal={toggleModal}>
        <div className="flex flex-col border-solid mb-6 border-gray-700 border-1 rounded-xl p-10 flex gap-2 bg-white shadow-2xl">
          <h2 className="text-center font-bold text-2xl mb-4">
            Choose Company to Join
          </h2>
          <ul className="grid grid-cols-1 gap-4 place-content-center text-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {getCompanyData &&
              getCompanyData?.companies.map((company: any) => (
                <li
                  key={company.id}
                  onClick={() => setSelectedCompany(company.id)}
                  className={`border-solid text-sm font-bold border rounded-xl p-4 flex gap-2 bg-white flex-col shadow-lg ${
                    selectedCompany === company.id
                      ? "border-amber-800 border-4"
                      : "border-gray-700"
                  } `}
                >
                  {company.name}
                </li>
              ))}
          </ul>
          <button
            className="btn btn-outline mt-6"
            onClick={() =>
              handleSendRequest({
                companyId: Number(selectedCompany),
                userId: Number(userId),
              })
            }
          >
            <FiSend /> Send Request
          </button>
        </div>
      </ModalWindow>
      <RefreshToken error={error || sendRequestError} />
    </>
  );
}
