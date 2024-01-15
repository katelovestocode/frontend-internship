import { IdChildrenProps } from "@/types/types";
import SubNavLink from "../common/SubNavLink";

export default function OneUserSubLinks({ id, children }: IdChildrenProps) {
  return (
    <div className="flex flex-col w-full gap-4">
      <ul className="flex flex-row  flex-wrap gap-4">
        <li>
          <SubNavLink hrefLink={`/users/${id}/requests`} label="Requests" />
        </li>
        <li>
          <SubNavLink
            hrefLink={`/users/${id}/invitations`}
            label="Invitations"
          />
        </li>
        <li>
          <SubNavLink hrefLink={`/users/${id}/analytics`} label="Analytics" />
        </li>
        <li>
          <SubNavLink hrefLink={`/users/${id}/companies`} label="Companies" />
        </li>
        <li>
          <SubNavLink hrefLink={`/users/${id}/membership`} label="Membership" />
        </li>
        <li>
          <SubNavLink hrefLink={`/users/${id}/export`} label="Export" />
        </li>
        <li>
          <SubNavLink
            hrefLink={`/users/${id}/notifications`}
            label="Notifications"
          />
        </li>
      </ul>

      {/* all requests, invitations, notifications, quizzes, exports passed down as children */}
      {children}
    </div>
  );
}
