import GetOneCompany from "@/components/companies/GetOneCompany";
import type { Metadata } from "next";

type IdProps = {
  params: { id: number };
  children: React.ReactNode;
};

export async function generateMetadata({
  params: { id },
}: IdProps): Promise<Metadata> {
  return { title: `Company ${id} Profile` };
}

export default function OneCompanyLayout({
  params: { id },
  children,
}: IdProps) {
  return (
    <div className="flex flex-col px-8 xl:px-14 gap-6">
      <h1 className="font-bold text-3xl text-center">Company Profile</h1>
      <GetOneCompany id={Number(id)}>{children} </GetOneCompany>
    </div>
  );
}
