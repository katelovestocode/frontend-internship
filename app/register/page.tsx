import { AuthButton } from "@/components/AuthButton";
import RegisterForm from "@/components/RegisterForm";
import { Wrapper } from "@/components/Wrapper";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Register() {
  return (
    <Wrapper title={"Sign Up to be a part of our gang"}>
      <RegisterForm />

      <p className="font-bold text-xl"> OR </p>
      <AuthButton title={"Auth0"} />

      <p>
        Already have an account?
        <Link href="/login">
          <span className="font-bold"> Sign in</span>
        </Link>
      </p>
    </Wrapper>
  );
}
