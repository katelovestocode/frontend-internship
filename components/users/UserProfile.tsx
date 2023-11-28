"use client";
import React from "react";
import OneUserTemplate from "./OneUserTemplate";
import { useAppSelector } from "@/redux/store";

export default function UserProfile() {
  const user = useAppSelector((state) => state.authReducer.user);

  return <>{user && <OneUserTemplate id={user.id} user={user} />}</>;
}
