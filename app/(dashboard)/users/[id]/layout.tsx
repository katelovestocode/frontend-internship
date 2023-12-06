import SubNavLink from "@/components/common/SubNavLink";
import OneUser from "@/components/users/GetOneUser";
import type { Metadata } from "next";
import React from "react";

type IdProps = {
  params: { id: number };
  children: React.ReactNode;
};

export async function generateMetadata({
  params: { id },
}: IdProps): Promise<Metadata> {
  return { title: `User ${id} Profile` };
}

export default function OneUserLayout({ params: { id }, children }: IdProps) {
  return (
    <div className="flex flex-col md:px-18 px-8 gap-6">
      <h1 className="font-bold text-3xl text-center">User Profile</h1>
      <div className="flex md:px-10 px-6 py-8 md:gap-16 gap-8">
        <OneUser id={Number(id)} />
        <div className="flex flex-col gap-4">
          <ul className="flex flex-row gap-6">
            <li>
              {" "}
              <SubNavLink hrefLink={`/users/${id}/requests`} label="Requests" />
            </li>
            <li>
              {" "}
              <SubNavLink
                hrefLink={`/users/${id}/invitations`}
                label="Invitations"
              />
            </li>
          </ul>

          {/* requests and invitations */}
          {children}
        </div>
      </div>
    </div>
  );
}
