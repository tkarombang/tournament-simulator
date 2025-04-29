import NavbarPage from "@/pages/NavbarPage";
import Tournament from "@/data";
import React from "react";
import FooterPage from "@/pages/FooterPage";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300 flex flex-col`}>
      <header className="p-2 flex justify-between items-center bg-blue-ocean dark:bg-teal-dark text-white">
        <NavbarPage tournamentName={Tournament.tournament} />
      </header>

      <main className="container mx-auto m-5 max-w-screen-xl">{children}</main>

      <footer className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
        <FooterPage />
      </footer>
    </div>
  );
}
