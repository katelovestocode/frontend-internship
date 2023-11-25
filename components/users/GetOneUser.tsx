"use client";
import React from "react";
import { useGetOneUserQuery } from "../../redux/api/userApiSlice";
import RefreshToken from "../auth/RefreshToken";
import OneUserTemplate from "./OneUserTemplate";

type Props = {
  id: number;
};

export default function GetOneUser({ id }: Props) {
  const { data, error: getOneUserError } = useGetOneUserQuery(id);

  return (
    <>
      <OneUserTemplate id={id} data={data} />
      <RefreshToken error={getOneUserError} />
    </>
  );
}
