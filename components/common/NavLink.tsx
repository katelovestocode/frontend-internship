import { NavLinkType } from "@/types/types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function NavLink({
  hrefLink,
  label,
  setIsSideBarOpen,
}: NavLinkType) {
  const pathname = usePathname();
  return (
    <Link href={hrefLink} passHref onClick={() => setIsSideBarOpen(false)}>
      <div
        className={`text-xl font-medium ${
          pathname === `${hrefLink}` ? "border-b-2 border-amber-700" : "text-xl"
        }`}
      >
        {label}
      </div>
    </Link>
  );
}
