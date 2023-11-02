"use client";
import  Button from "../common/Button";
import  Input  from "../common/Input";

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
        name="user_email"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        placeholder="Email"
        onChange={handleChange}
        className=""
      />
      <Input
        type="password"
        name="user_password"
        placeholder="Password"
        onChange={handleChange}
        className=""
      />

      <Button title="Login" />
    </form>
  );
}
