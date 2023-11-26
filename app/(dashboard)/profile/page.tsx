import Container from "@/components/common/Container";
import UserProfile from "@/components/users/UserProfile";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "User's Profile",
};

export default function Profile() {
  return (
    <Container title="Profile">
      <UserProfile />
    </Container>
  );
}
