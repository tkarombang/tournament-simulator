import { Tabs } from "flowbite-react";
import { Tournament } from "@/data";
import StandingsTable from "./StandingTable";
import { useState } from "react";

interface GroupTabsProps {
  tournament: Tournament;
  setTournament: (tournament: Tournament) => void;
}

export default function GroupTabs({ tournament }: GroupTabsProps) {
  const [activeGroup, setActiveGroup] = useState<string>("A");
  return (
    <div>
      <ul className="flex flex-wrap justify-center text-sm font-medium text-center text-slate-600 border-b border-sky-500 dark:border-sky-900 dark:text-slate-500 mb-3">
        {Object.keys(tournament.groups).map((group) => (
          <li key={group} className="me-2">
            <button
              onClick={() => setActiveGroup(group)}
              className={`inline-block p-4 rounded-t-lg ${activeGroup === group ? "text-slate-100 bg-sky-500 dark:bg-sky-900 dark:text-slate-100" : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-stone-900 dark:hover:text-stone-400"}`}
            >
              Group {group}
            </button>
          </li>
        ))}
      </ul>
      <div>
        <StandingsTable teams={tournament.groups[activeGroup]} />
      </div>
    </div>
  );
}
