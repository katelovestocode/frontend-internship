import Container from "@/components/common/Container";
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
      <p className="text-2xl">
        Why Choose <span className="font-semibold"> QuizQuest </span>Quizzes?
      </p>
      <ul className="flex flex-col gap-4 text-xl">
        <li>
          1. Diverse Topics: Explore quizzes on a wide range of subjects, from
          science and technology to pop culture and history.
        </li>
        <li>
          2. Interactive Experience: Engage in a dynamic learning experience
          with our interactive quizzes that cater to all learning styles.
        </li>
        <li>
          3. Track Your Progress: Monitor your achievements, review completed
          quizzes, and challenge yourself to continuously improve.
        </li>
      </ul>
      <HealthCheck />
      <Counter />
    </Container>
  );
}
