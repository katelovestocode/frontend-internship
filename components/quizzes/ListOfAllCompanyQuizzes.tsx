"use client";
import React from "react";
import { useGetAllQuizzesQuery } from "@/redux/api/quizApiSlice";
import ListOfCompanyQuizzesItem from "./ListOfAllCompanyQuizzesItem";
import RefreshToken from "../auth/RefreshToken";

export default function ListOfAllCompanyQuizzes({ id }: { id: number }) {
  const { data, error } = useGetAllQuizzesQuery(id);

  const sortedQuizzes = [...(data?.quizzes || [])].sort(
    (a: any, b: any) => b.id - a.id
  );
  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {sortedQuizzes &&
          sortedQuizzes.map((quiz: any) => (
            <ListOfCompanyQuizzesItem
              quiz={quiz}
              key={quiz?.id}
              companyId={id}
            />
          ))}
      </ul>
      <RefreshToken error={error} />
    </>
  );
}
