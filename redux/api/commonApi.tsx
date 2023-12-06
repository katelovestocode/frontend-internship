import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

export const commonApi = createApi({
  reducerPath: "commonApi",
  tagTypes: [
    "User",
    "Users",
    "Company",
    "Companies",
    "User-Requests",
    "Company-Requests",
    "User-Invitations",
    "Company-Invitations",
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("accessToken") as string;

      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },

    responseHandler: async (response) => {
      const data = await response.json();
      if (!response.ok) {
        toast.error(data?.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      return data.details;
    },
  }),
  endpoints: (build) => ({}),
});
