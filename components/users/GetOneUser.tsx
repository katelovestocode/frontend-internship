"use client";
import React from "react";
import { useGetOneUserQuery } from "../../redux/api/userApiSlice";
import OneUserTemplate from "./OneUserTemplate";
import { IdProps } from "@/types/types";

export default function GetOneUser({ id }: IdProps) {
  const { data, error: getOneUserError } = useGetOneUserQuery(id);

  const { user } = data || {};

  return <>{user && <OneUserTemplate id={id} user={user} />}</>;
}
