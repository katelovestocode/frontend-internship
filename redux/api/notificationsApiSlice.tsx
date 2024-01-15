import { createApi } from "@reduxjs/toolkit/query/react";
import { commonApi } from "./commonApi";
import { NotificationsReq, NotificationsRes } from "@/types/types";

export type NotificationsApi = ReturnType<typeof createApi>;

export const notificationsApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsersNotifications: build.query<NotificationsRes, number>({
      query: (userId) => ({
        url: `/notifications/${userId}/all`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Notifications" }],
    }),
    markNotificationAsRead: build.mutation<NotificationsRes, NotificationsReq>({
      query: ({ notificationId, userId }) => ({
        url: `/notifications/${notificationId}/read/${userId}`,
        method: "PUT",
      }),
      invalidatesTags: () => [{ type: "Notifications" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllUsersNotificationsQuery,
  useLazyGetAllUsersNotificationsQuery,
  useMarkNotificationAsReadMutation,
} = notificationsApi;
