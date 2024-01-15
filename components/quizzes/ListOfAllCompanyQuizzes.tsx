"use client";
import React from "react";
import { useGetAllQuizzesQuery } from "@/redux/api/quizApiSlice";
import ListOfCompanyQuizzesItem from "./ListOfAllCompanyQuizzesItem";
import { IdProps, QuizType } from "@/types/types";

export default function ListOfAllCompanyQuizzes({ id }: IdProps) {
  const { data, error } = useGetAllQuizzesQuery(id);

  const sortedQuizzes = [...(data?.quizzes || [])].sort(
    (a: any, b: any) => b.id - a.id
  );
  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {sortedQuizzes &&
          sortedQuizzes.map((quiz: QuizType) => (
            <ListOfCompanyQuizzesItem
              quiz={quiz}
              key={quiz?.id}
              companyId={id}
            />
          ))}
      </ul>
    </>
  );
}
