import Button from "@/components/common/Button";
import RegisterForm from "@/components/auth/RegisterForm";
import Wrapper from "@/components/common/Wrapper";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Register() {
  return (
    <Wrapper title="Sign Up to be a part of our gang">
      <RegisterForm />

      <p className="font-bold text-xl"> OR </p>
      <Button title="Auth0" />

      <p>
        Already have an account?
        <Link href="/login">
          <span className="font-bold"> Sign in</span>
        </Link>
      </p>
    </Wrapper>
  );
}
