import Container from "@/components/common/Container";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "List of Users",
};

export default function Users() {
  return (
    <Container title="List of Users">
      <p className="text-xl">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
        aspernatur dolores provident commodi ratione explicabo ipsam nesciunt
        optio eaque unde qui sit tempora sunt dolor neque, illo, aliquid et ad.
      </p>
    </Container>
  );
}
