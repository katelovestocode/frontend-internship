import type { Metadata } from "next";
import { Adamina } from "next/font/google";
import "./globals.css";
import TheHeader from "@/components/layout/TheHeader";
import React from "react";
import { ReduxProvider } from "@/redux/provider";
import { Children } from "@/types/types";
import CurrentUser from "@/components/auth/CurrentUser";
import Auth0ProviderWithNavigate from "@/auth0/Auth0Provider";
import { ToastContainer } from "react-toastify";
import { RefreshTokenProvider } from "@/components/auth/RefreshTokenProvider";

const adamina = Adamina({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Personal Project",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en">
      <Auth0ProviderWithNavigate>
        <ReduxProvider>
          <RefreshTokenProvider>
            <body className={adamina.className}>
              <CurrentUser>
                <TheHeader />
                <main>{children}</main>
              </CurrentUser>
              <ToastContainer />
              <div id="modal-root"></div>
            </body>
          </RefreshTokenProvider>
        </ReduxProvider>
      </Auth0ProviderWithNavigate>
    </html>
  );
}
