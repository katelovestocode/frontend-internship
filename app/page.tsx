import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-5 items-center p-24">
      <h1 className="font-bold text-3xl">
        Welcome to Meduzzen Full-Stack Internship
      </h1>
      <p className="text-xl">
        {" "}
        It may be a challenging and lengthy journey, but the rewards will make
        it all worthwhile. Stay resilient!
      </p>
    </main>
  );
}
