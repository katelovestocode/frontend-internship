"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import io, { Socket } from "socket.io-client";
import { setNotification } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export function SocketComponent() {
  const [socket, setSocket] = useState<Socket>();
  const notifications = useAppSelector(
    (state) => state.authReducer.notifications
  );
  const accessToken = Cookies.get("accessToken") as string;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const newSocket = io(`${process.env.NEXT_PUBLIC_API_BASE_URL}`, {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      },
    });
    setSocket(newSocket);
  }, [setSocket]);

  const messageListener = (message: string) => {
    dispatch(setNotification([message]));
  };

  useEffect(() => {
    socket?.on("newNotification", messageListener);
    return () => {
      socket?.off("newNotification", messageListener);
    };
  }, [messageListener]);

  useEffect(() => {
    notifications.map((message) =>
      toast.info(message, {
        position: toast.POSITION.TOP_CENTER,
      })
    );
  }, [notifications]);

  return <></>;
}
