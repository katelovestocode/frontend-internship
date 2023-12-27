"use client";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import {
  useGetAllUsersNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from "@/redux/api/notificationsApiSlice";
import moment from "moment";
import { toast } from "react-toastify";
import { Notification } from "@/types/types";
import { useAppSelector } from "@/redux/store";

export default function UserNotifications({ id }: { id: number }) {
  const newNotification = useAppSelector(
    (state) => state.authReducer.notifications
  );
  const [markNotification] = useMarkNotificationAsReadMutation();
  const { data, refetch } = useGetAllUsersNotificationsQuery(id);
  const { notifications } = data || {};
  const sortedNotifications = [...(notifications || [])].sort(
    (a: any, b: any) => b.id - a.id
  );

  const handleMarkNotificationAsRead = async (
    notificationId: number,
    userId: number
  ) => {
    try {
      await markNotification({
        notificationId: notificationId,
        userId: userId,
      });
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    if (newNotification) {
      refetch();
    }
  }, [newNotification]);

  return (
    <>
      {sortedNotifications && (
        <div className="flex flex-col gap-6 p-2 ">
          <h2 className="font-bold text-2xl"> Your Notifications: </h2>
          <ul className="grid gap-4 grid-cols-3">
            {sortedNotifications?.map(
              (notification: Notification, index: number) => (
                <li
                  key={index}
                  className="border-solid border-gray-700 border-1 rounded-xl p-4 flex gap-2 bg-white flex-col shadow-lg"
                >
                  <span className="font-bold text-gray-950">
                    {notification.text}
                  </span>
                  <p className="text-amber-800">
                    Status:{" "}
                    <span className="font-bold text-red-500">
                      {notification.status}
                    </span>
                  </p>
                  <p className="text-amber-800">
                    Created At:{" "}
                    <span className="font-medium text-gray-950">
                      {moment(notification.createdAt).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </span>
                  </p>
                  {notification.status === "unread" && (
                    <button
                      className="btn btn-outline"
                      onClick={() =>
                        handleMarkNotificationAsRead(notification.id, id)
                      }
                    >
                      Mark as Read
                    </button>
                  )}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </>
  );
}
