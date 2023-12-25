"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import io, { Socket } from "socket.io-client";

export function SocketProvider() {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);
  const accessToken = Cookies.get("accessToken") as string;

  useEffect(() => {
    const newSocket = io(`${process.env.NEXT_PUBLIC_SOCKET_PORT}`, {
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
    setMessages([...messages, message]);
  };

  useEffect(() => {
    socket?.on("newNotification", messageListener);
    return () => {
      socket?.off("newNotification", messageListener);
    };
  }, [messageListener]);

  useEffect(() => {
    messages.map((message) =>
      toast.info(message, {
        position: toast.POSITION.TOP_CENTER,
      })
    );
  }, [messages]);

  return <></>;
}
