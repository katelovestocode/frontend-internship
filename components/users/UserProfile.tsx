"use client";
import React from "react";
import OneUserTemplate from "./OneUserTemplate";
import { useAppSelector } from "@/redux/store";
import SubNavLink from "../common/SubNavLink";
import { ChildrenProps } from "@/types/types";

export default function UserProfile({ children }: ChildrenProps) {
  const user = useAppSelector((state) => state.authReducer.user);

  return (
    <>
      <div className="p-4 xl:p-6 flex gap-7 flex-row">
        {user && <OneUserTemplate id={user.id} user={user} />}

        <div className="flex flex-col gap-6">
          <ul className="flex flex-row gap-6">
            <li>
              {" "}
              <SubNavLink
                hrefLink={`/users/${user.id}/requests`}
                label="Requests"
              />
            </li>
            <li>
              {" "}
              <SubNavLink
                hrefLink={`/users/${user.id}/invitations`}
                label="Invitations"
              />
            </li>
            <li>
              {" "}
              <SubNavLink
                hrefLink={`/users/${user.id}/analytics`}
                label="Analytics"
              />
            </li>
            <li>
              {" "}
              <SubNavLink
                hrefLink={`/users/${user.id}/companies`}
                label="Companies"
              />
            </li>
            <li>
              {" "}
              <SubNavLink
                hrefLink={`/users/${user.id}/membership`}
                label="Membership"
              />
            </li>
            <li>
              {" "}
              <SubNavLink
                hrefLink={`/users/${user.id}/export`}
                label="Export"
              />
            </li>
          </ul>

          {/* invitations and requests lists renders */}
          {children}
        </div>
      </div>
    </>
  );
}
