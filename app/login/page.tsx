import { AuthButton } from "@/components/AuthButton";
import Link from "next/link";
import { Wrapper } from "@/components/Wrapper";
import LoginForm from "@/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function Login() {
  return (
    <Wrapper title={"Continue the Journey, Sign In"}>
      <AuthButton title={"Auth0"} />
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
