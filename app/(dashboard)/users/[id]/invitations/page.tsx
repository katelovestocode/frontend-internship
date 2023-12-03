import ListOfAllCompanyInvitations from "@/components/invitations/company/ListOfAllCompanyInvitations";
import ListOfAllUserInvitations from "@/components/invitations/users/ListOfAllUserInvitations";
import { IdParamsProps } from "@/types/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "List of Users Invitations",
};

export default function Invitations({ params: { id } }: IdParamsProps) {
  return (
    <>
      <ListOfAllUserInvitations id={id} />
    </>
  );
}
