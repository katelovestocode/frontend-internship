"use client";
import React, { useEffect } from "react";
import { useGetHealthCheckQuery } from "../../redux/api/healthApiSlice";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { updateHealthCheck } from "@/redux/slices/healthCheck-slice";

export default function HealthCheck() {
  const dispatch: AppDispatch = useDispatch();
  const healthCheckData = useAppSelector((state) => state.healthCheck);

  const { data, isLoading, error } = useGetHealthCheckQuery();

  useEffect(() => {
    if (data) {
      dispatch(updateHealthCheck(data));
    }
  }, [data, dispatch]);

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
