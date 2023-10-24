"use client";
import Link from "next/link";

type NavLink = {
  label: string;
  href: string;
};
type Props = {
  navLinks: NavLink[];
};

const Navigation = ({ navLinks }: Props) => {
  return (
    <>
      {navLinks.map((link) => {
        return (
          <Link key={link.label} href={link.href} className={"text-xl"}>
            {link.label}
          </Link>
        );
      })}
      <Link href="/profile" className={"text-xl"}>
        Profile
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
