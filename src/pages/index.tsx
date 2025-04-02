import GroupTabs from "@/components/GroupTabs";
import ThemeToggle from "@/components/ThemeToggle";
import initialData, { Tournament } from "@/data";
import { useState } from "react";

interface HomeProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Home({ darkMode, setDarkMode }: HomeProps) {
  const [tournament, setTournament] = useState<Tournament>(initialData);

  return (
    <div className={`min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300`}>
      <header className="p-4 flex justify-between items-center bg-blue-ocean dark:bg-teal-dark text-white">
        <div className="container mx-auto flex justify-between items-center ">
          <h1 className="text-xl font-bold">{tournament.tournament}</h1>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </header>

      <main className="container mx-auto m-5 max-w-screen-xl">
        <GroupTabs tournament={tournament} setTournament={setTournament} />
      </main>
    </div>
  );
}
