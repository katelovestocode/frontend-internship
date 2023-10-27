"use client";
import { AuthButton } from "./AuthButton";
import { Input } from "./Input";

export default function LoginForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> & {
      target: HTMLButtonElement;
    }
  ) => {
    const { name, value } = event.target;
  };
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="flex flex-col gap-5 justify-center items-center w-full"
    >
      <Input
        type="email"
        //value={}
        name="user_email"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        placeholder="Email"
        onChange={handleChange}
        className=""
      />
      <Input
        type="password"
        //value={}
        name="user_password"
        placeholder="Password"
        onChange={handleChange}
        className=""
      />

      <AuthButton title={"Login"} />
    </form>
  );
}
