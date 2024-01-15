import Link from "next/link";
import Wrapper from "@/components/common/Wrapper";
import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";
import React from "react";
import LoginAuth0Button from "@/auth0/Auth0LoginButton";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function Login() {
  return (
    <Wrapper title="Continue the Journey, Sign In">
      <LoginAuth0Button />

      <p className="font-bold text-xl p-4"> OR </p>
      <LoginForm />

      <p>
        Do not have an account?
        <Link href="/register">
          <span className="font-bold"> Sign up</span>
        </Link>
      </p>
    </Wrapper>
  );
}
