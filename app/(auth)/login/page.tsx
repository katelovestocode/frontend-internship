import Button from "@/components/common/Button";
import Link from "next/link";
import Wrapper from "@/components/common/Wrapper";
import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function Login() {
  return (
    <Wrapper title="Continue the Journey, Sign In">
      <Button title="Auth0" />
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
