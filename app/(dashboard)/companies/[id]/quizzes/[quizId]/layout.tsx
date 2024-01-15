import QuizAttempt from "@/components/quiz-attempts/QuizAttempt";
import type { Metadata } from "next";
import React from "react";

type IdProps = {
  params: { quizId: number; id: number };
};

export async function generateMetadata({
  params: { quizId },
}: IdProps): Promise<Metadata> {
  return { title: `Quiz #${quizId} Page` };
}

export default function OneQuizLayout({ params: { quizId, id } }: IdProps) {
  return (
    <>
      <div className="flex flex-col place-content-center px-8 xl:px-14 gap-6">
        <h1 className="font-bold text-3xl text-center">{`Quiz #${quizId}`}</h1>
        <QuizAttempt quizId={Number(quizId)} companyId={id}></QuizAttempt>
      </div>
    </>
  );
}
