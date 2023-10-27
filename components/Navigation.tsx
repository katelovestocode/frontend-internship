import Link from "next/link";

const Navigation = () => {
  return (
    <>
      <Link href="/" className={"text-xl"}>
        Home
      </Link>
      <Link href="/about" className={"text-xl"}>
        About
      </Link>

      <Link href="/profile" className={"text-xl"}>
        Profile
      </Link>
      <Link href="/users" className={"text-xl"}>
        Users
      </Link>
      <Link href="/companies" className={"text-xl"}>
        Companies
      </Link>
      <Link href="/company-profile" className={"text-xl"}>
        Company Profile
      </Link>

      <Link href="/register" className={"text-xl"}>
        Register
      </Link>
      <Link href="/login" className={"text-xl"}>
        Login
      </Link>
    </>
  );
};

export { Navigation };
