import React from "react";
import Navigation from "./Navigation";

export default function TheHeader() {
  return (
    <header className="flex flex-row items-center p-10">
      <p className="text-4xl"> QuizQuest </p>
      <div className="flex flex-row place-content-right items-center ml-auto gap-8">
        <Navigation />
      </div>
    </header>
  );
}
