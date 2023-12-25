import UserNotifications from "@/components/notifications/UserNotifications";
import { IdParamsProps } from "@/types/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "User's Notifications",
};

export default function Notifications({ params: { id } }: IdParamsProps) {
  return (
    <>
      <UserNotifications id={id} />
    </>
  );
}
