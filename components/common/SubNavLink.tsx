"use client";
import { SubNavLinkType } from "@/types/types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function SubNavLink({ hrefLink, label }: SubNavLinkType) {
  const pathname = usePathname();
  return (
    <Link href={hrefLink} passHref>
      <div
        className={`text-xl font-medium border-2 p-2.5 rounded-md shadow-md ${
          pathname === `${hrefLink}` ? "border-2 border-amber-700" : "text-xl"
        }`}
      >
        {label}
      </div>
    </Link>
  );
}
