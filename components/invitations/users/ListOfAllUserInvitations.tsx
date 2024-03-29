"use client";
import { useGetAllUsersInvitationsQuery } from "@/redux/api/invitationApiSlice";
import ListOfUserInviteItem from "./ListOfUserInviteItem";
import React from "react";

export default function ListOfAllUserInvitations({ id }: { id: number }) {
  const { data, error } = useGetAllUsersInvitationsQuery(id);

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {data &&
          data?.invitations?.map((invite: any) => (
            <ListOfUserInviteItem invite={invite} key={invite?.id} />
          ))}
      </ul>
    </>
  );
}
