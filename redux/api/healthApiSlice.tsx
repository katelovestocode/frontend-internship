import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HealthCheckState } from "@/types/types";

export type HealthApi = ReturnType<typeof createApi>;

export const healthApi = createApi({
  reducerPath: "healthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  endpoints: (build) => ({
    getHealthCheck: build.query<HealthCheckState, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetHealthCheckQuery } = healthApi;
