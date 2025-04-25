import GroupTabs from "@/components/GroupTabs";
import ThemeToggle from "@/components/ThemeToggle";
import FooterPage from "@/components/FooterPage";
import initialData, { Team, Tournament } from "@/data";
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
        {/* <GroupTabs tournament={tournament} setTournament={setTournament} /> */}
        <GroupTabs />
      </main>

      <footer className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
        <FooterPage />
      </footer>
    </div>
  );
}
