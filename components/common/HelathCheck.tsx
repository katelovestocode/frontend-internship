"use client";
import React from "react";
import { useGetHealthCheckQuery } from "../../redux/api/healthApiSlice";
import Loader from "../common/Loader";

export default function HealthCheck() {
  const { data, isLoading, error } = useGetHealthCheckQuery("");

  return (
    <>
      {error && <p>Something went wrong. Please retry after some time.</p>}
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <p>status сode: {data?.status_code}</p>
          <p>details: {data?.detail}</p>
          <p>result: {data?.result}</p>
        </div>
      )}
    </>
  );
}
