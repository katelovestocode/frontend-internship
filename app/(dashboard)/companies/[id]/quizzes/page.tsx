import CreateQuiz from "@/components/quizzes/CreateQuiz";
import ListOfAllCompanyQuizzes from "@/components/quizzes/ListOfAllCompanyQuizzes";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "List of Companies Quizzes",
};

type IdProps = {
  params: { id: number };
};

export default function Quizzes({ params: { id } }: IdProps) {
  return (
    <>
      <CreateQuiz id={id} />
      <ListOfAllCompanyQuizzes id={id} />
    </>
  );
}
