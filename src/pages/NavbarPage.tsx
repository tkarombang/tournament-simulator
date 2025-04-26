import ThemeToggle from "@/components/ThemeToggle";
import { useDarkMode } from "@/context/DarkModeContext";
import React from "react";

interface NavbarPageProps {
  tournamentName: string;
}

const NavbarPage: React.FC<NavbarPageProps> = ({ tournamentName }) => {
  const { darkMode, setDarkMode } = useDarkMode();
  return (
    <div className="container mx-auto flex justify-between items-center ">
      <h1 className="text-xl font-bold">{tournamentName}</h1>
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
};

export default NavbarPage;
