import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const healthApi = createApi({
  reducerPath: "healthApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    getHealthCheck: builder.query({
      query: () => "/",
    }),
  }),
});

export const { useGetHealthCheckQuery } = healthApi;
