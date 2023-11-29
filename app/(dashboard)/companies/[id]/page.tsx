import Container from "@/components/common/Container";
import GetOneCompany from "@/components/companies/GetOneCompany";
import { Metadata } from "next";
import React from "react";

type IdProps = {
  params: { id: number };
};

export async function generateMetadata({
  params: { id },
}: IdProps): Promise<Metadata> {
  return { title: `Company ${id} Profile` };
}

export default function CompanyProfile({ params: { id } }: IdProps) {
  return (
    <Container title="Company Profile">
      <GetOneCompany id={Number(id)} />
    </Container>
  );
}
