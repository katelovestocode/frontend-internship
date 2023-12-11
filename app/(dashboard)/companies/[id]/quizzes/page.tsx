import CreateQuiz from "@/components/quizzes/CreateQuiz";
import ListOfAllCompanyQuizzes from "@/components/quizzes/ListOfAllCompanyQuizzes";
import { IdParamsProps } from "@/types/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "List of Companies Quizzes",
};

export default function Quizzes({ params: { id } }: IdParamsProps) {
  return (
    <>
      <CreateQuiz id={id} />
      <ListOfAllCompanyQuizzes id={id} />
    </>
  );
}
