import Container from "@/components/common/Container";
import { Metadata } from "next";
import React from "react";
import ListOfUsers from "../../../components/users/ListOfUsers";

export const metadata: Metadata = {
  title: "List of Users",
};

export default function Users() {
  return (
    <Container title="List of Users">
      <ListOfUsers />
    </Container>
  );
}
