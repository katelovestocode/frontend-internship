import { Auth0Login } from "@/auth0/Auth0Login";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <main className="flex flex-row gap-10 place-content-around px-20 py-8">
      <div className="flex flex-col gap-16 justify-center w-3/6">
        <h1 className="font-bold text-3xl">
          Unlock Your Potential with Our Engaging Quizzes
        </h1>
        <p className="text-xl">
          At <span className="font-semibold"> QuizQuest</span>, we believe in
          the power of knowledge and the joy of learning. Our quizzes are
          designed to spark curiosity, challenge your mind, and provide an
          enjoyable way to acquire new information.
        </p>
      </div>
      <div>
        <div className="w-600">
          <Image
            width={635}
            height={675}
            src="/images/hero-min.png"
            alt="hero-image"
          />
        </div>
      </div>
      <Auth0Login />
    </main>
  );
}
