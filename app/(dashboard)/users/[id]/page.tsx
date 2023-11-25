import Container from "@/components/common/Container";
import { Metadata } from "next";
import React from "react";
import OneUser from "@/components/users/OneUser";

type Props = {
  params: { id: number };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  return { title: `User ${id} Profile` };
}

export default function UserProfile({ params: { id } }: Props) {
  return (
    <Container title="User Profile">
      <OneUser id={Number(id)} />
    </Container>
  );
}
