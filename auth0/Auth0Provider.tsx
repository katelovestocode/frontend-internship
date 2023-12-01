"use client";
import { Auth0Provider, AppState } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { Children } from "../types/types";
import React from "react";

const Auth0ProviderWithNavigate = ({ children }: Children) => {
  const router = useRouter();

  const redirectUri =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_URL;

  const onRedirectCallback = (appState?: AppState) => {
    router.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={`${process.env.NEXT_PUBLIC_AUTH0_ISSUER_URL}`}
      clientId={`${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}`}
      authorizationParams={{
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
