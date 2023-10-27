import { Navigation } from "./Navigation";

const TheHeader = () => {
  return (
    <header className="flex flex-row p-10">
      <p className="text-4xl"> LOGO </p>
      <nav className="flex flex-row place-content-right items-center ml-auto gap-8">
        <Navigation />
      </nav>
    </header>
  );
};

export { TheHeader };
