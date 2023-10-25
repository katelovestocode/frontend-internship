import { Navigation } from "./Navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

const TheHeader = () => {
  return (
    <header className="flex flex-row p-10">
      <p className="text-4xl"> LOGO </p>
      <nav className="flex flex-row place-content-right ml-auto gap-8">
        {" "}
        <Navigation navLinks={navItems} />
      </nav>
    </header>
  );
};

export { TheHeader };
