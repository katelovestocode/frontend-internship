import Container from "@/components/common/Container";
import Modal from "@/components/common/Modal";
import { Metadata } from "next";
import React from "react";
import Counter from "@/components/common/Counter";
import HealthCheck from "@/components/common/HealthCheck";

export const metadata: Metadata = {
  title: "About Us",
};

export default function About() {
  return (
    <Container title="About Us">
      <p className="text-xl">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
        aspernatur dolores provident commodi ratione explicabo ipsam nesciunt
        optio eaque unde qui sit tempora sunt dolor neque, illo, aliquid et ad.
      </p>
      <HealthCheck />
      <Counter />
      <Modal
        modal_id="about"
        title="About Us Page"
        text="Lorem ipsum dolor sit, amet consectetur adipisicing elit.Quidem aspernatur dolores provident commodi ratione explicabo ipsam"
      />
    </Container>
  );
}
