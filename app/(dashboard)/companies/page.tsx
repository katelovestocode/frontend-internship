import Container from "@/components/common/Container";
import CreateACompany from "@/components/companies/CreateACompany";
import ListOfAllCompanies from "@/components/companies/ListOfAllCompanies";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "List of Companies",
};

export default function Companies() {
  return (
    <Container title="List of Companies">
      <div className="flex flex-col gap-4">
        <CreateACompany />
        <ListOfAllCompanies />
      </div>
    </Container>
  );
}
