import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-row gap-10 place-content-around px-20 py-8">
      <div className="flex flex-col gap-16 justify-center w-3/6">
        <h1 className="font-bold text-3xl">
          Welcome to Meduzzen Full-Stack Internship
        </h1>
        <p className="text-xl">
          It may be a challenging and lengthy journey, but the rewards will make
          it all worthwhile. Stay resilient!
        </p>
      </div>
      <div>
        <div className={"w-600"}>
          <Image
            width={635}
            height={675}
            src={"/images/hero-min.png"}
            alt="hero-image"
          />
        </div>
      </div>
    </main>
  );
}
