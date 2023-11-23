import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const commonApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    responseHandler: async (response) => {
      const data = await response.json();
      if (!response.ok) {
        toast.error("An error occurred", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      if (response.ok) {
        toast.success(data?.result, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      return data.details;
    },
  }),
  endpoints: (build) => ({}),
});
