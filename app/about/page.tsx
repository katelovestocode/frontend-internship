import Container from "@/components/Container";
import Modal from "@/components/Modal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

export default function About() {
  return (
    <Container title={"About Us"}>
      <p className="text-xl">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
        aspernatur dolores provident commodi ratione explicabo ipsam nesciunt
        optio eaque unde qui sit tempora sunt dolor neque, illo, aliquid et ad.
      </p>

      <Modal
        modal_id={"about"}
        title={"About Us Page"}
        text={
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Quidem aspernatur dolores provident commodi ratione explicabo ipsam"
        }
      />
    </Container>
  );
}
