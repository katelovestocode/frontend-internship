import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
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
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const refreshToken = Cookies.get("refreshToken") as string;

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        method: "POST",
        url: "/auth/refresh",
        body: {
          refreshToken: refreshToken,
        },
      },
      api,
      extraOptions
    );

    if (
      refreshResult.data &&
      (
        refreshResult.data as {
          user: { accessToken: string; refreshToken: string };
        }
      ).user
    ) {
      const user = (
        refreshResult.data as {
          user: { accessToken: string; refreshToken: string };
        }
      ).user;
      Cookies.set("accessToken", user.accessToken);
      Cookies.set("refreshToken", user.refreshToken);
      Cookies.set("provider", "jwt");
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch({
        type: "auth/logOut",
      });
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("provider");
    }
  }
  return result;
};

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
    "User-Companies",
    "Notifications",
    "Quizzes",
    "Quiz",
  ],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({}),
});
