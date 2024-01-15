"use client";
import React from "react";
import { useGetHealthCheckQuery } from "../../redux/api/healthApiSlice";
import Loader from "./Loader";
import { useAppSelector } from "../../redux/store";

export default function HealthCheck() {
  const healthCheckData = useAppSelector((state) => state.healthCheck);

  const { isLoading, error } = useGetHealthCheckQuery();

  return (
    <>
      {error && <p>Something went wrong. Please retry after some time.</p>}
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <p>status сode: {healthCheckData.status_code}</p>
          <p>details: {healthCheckData.detail}</p>
          <p>result: {healthCheckData.result}</p>
        </div>
      )}
    </>
  );
}
