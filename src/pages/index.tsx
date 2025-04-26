import Tournament from "@/data";
import NavbarPage from "@/pages/NavbarPage";
import GroupTabs from "@/components/GroupTabs";
import FooterPage from "@/pages/FooterPage";

export default function Home() {
  return (
    <div className={`min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300`}>
      <header className="p-4 flex justify-between items-center bg-blue-ocean dark:bg-teal-dark text-white">
        <NavbarPage tournamentName={Tournament.tournament} />
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
