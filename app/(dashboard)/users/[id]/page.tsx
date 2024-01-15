import { Metadata } from "next";
import React from "react";

type IdProps = {
  params: { id: number };
};

export async function generateMetadata({
  params: { id },
}: IdProps): Promise<Metadata> {
  return { title: `User ${id} Profile` };
}

export default function UserProfile() {
  return <></>;
}
