import { Metadata } from "next";
import React from "react";

type IdProps = {
  params: { quizId: number };
};

export async function generateMetadata({
  params: { quizId },
}: IdProps): Promise<Metadata> {
  return { title: `Quiz #${quizId}` };
}

export default function OneQuiz() {
  return <></>;
}
