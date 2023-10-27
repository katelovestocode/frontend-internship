"use client";
import { AuthButton } from "./AuthButton";
import { Input } from "./Input";

export default function RegisterForm() {
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
      className="flex flex-col gap-5 justify-center items-center"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <Input
        type="name"
        //value={}
        name="user_name"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        placeholder="Name"
        onChange={handleChange}
        className=""
      />
      <Input
        type="email"
        //value={}
        name="user_email"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        placeholder="Email"
        onChange={handleChange}
        className=""
      />
      <div className="flex flex-row gap-3">
        <Input
          type="password"
          //value={}
          name="user_password"
          placeholder="Password"
          onChange={handleChange}
          className=""
        />
        <Input
          type="password"
          //value={}
          name="user_password"
          placeholder="Confirm Password"
          onChange={handleChange}
          className=""
        />
      </div>
      <AuthButton title={"Register"} />
    </form>
  );
}
