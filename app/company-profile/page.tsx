import Container from "@/components/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Profile",
};

export default function CompanyProfile() {
  return (
    <Container title={"Company Profile"}>
      <p className="text-xl">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
        aspernatur dolores provident commodi ratione explicabo ipsam nesciunt
        optio eaque unde qui sit tempora sunt dolor neque, illo, aliquid et ad.
      </p>
    </Container>
  );
}
