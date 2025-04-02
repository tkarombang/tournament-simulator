import { Team } from "@/data";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface StandingsTableProps {
  teams: Team[];
}

export default function StandingsTable({ teams }: StandingsTableProps) {
  const sortedTeams = [...teams].sort((a, b) => (b.PTS !== a.PTS ? b.PTS - a.PTS : b.GD - a.GD));
  const tableRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const scrollLeft = tableRef.current.scrollLeft;
        setIsScrolled(scrollLeft > 0);
      }
    };

    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (tableElement) {
        tableElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="overflow-x-auto snap-x snap-mandatory scroll-pl-6 scrollbar-custom min-w-full shadow-md rounded-lg" ref={tableRef}>
      <motion.table className="w-full text-left border-collapse min-w-[600px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <thead>
          <tr className="dark:bg-dark-bg text-sky-300 dark:text-cyan-200 border-b-2 border-sky-300 dark:border-cyan-200">
            <th className={`p-2 whitespace-nowrap text-xs sm:text-base sticky left-0 z-10 bg-light-bg dark:bg-dark-bg ${isScrolled ? "with-separator" : ""}`}>Team</th>
            <th className="p-2 sm:p-2 snap-center scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs w-12 sm:text-base text-center">MP</th>
            <th className="p-2 sm:p-2 snap-center scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs w-12 sm:text-base text-center">W</th>
            <th className="p-2 sm:p-2 snap-center scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs w-12 sm:text-base text-center">D</th>
            <th className="p-2 sm:p-2 snap-center scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs w-12 sm:text-base text-center">L</th>
            <th className="p-2 sm:p-2 snap-center scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs w-12 sm:text-base text-center font-extrabold">PTS</th>
            <th className="p-2 sm:p-2 snap-center scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs w-12 sm:text-base text-center">GF</th>
            <th className="p-2 sm:p-2 snap-center scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs w-12 sm:text-base text-center">GA</th>
            <th className="p-2 sm:p-2 snap-center scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs w-12 sm:text-base text-center">GD</th>
            <th className="p-2 sm:p-2 snap-center scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs sm:text-base">Last 5</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team, index) => (
            <tr key={team.team} className={`${index > 1 ? "bg-rose-100 dark:bg-rose-950" : ""} last:border-b-0 border-b-2 border-stone-300 dark:border-gray-700 text-slate-800 dark:text-gray-200`}>
              <td className={`p-2 whitespace-nowrap text-xs sm:text-base sticky left-0 z-10 min-w-[120px] bg-light-bg dark:bg-dark-bg ${isScrolled ? "with-separator" : ""}`}>{team.team}</td>
              <td className="p-2 snap-start scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs sm:text-base text-center w-12">{team.MP}</td>
              <td className="p-2 snap-start scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs sm:text-base text-center w-12">{team.W}</td>
              <td className="p-2 snap-start scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs sm:text-base text-center w-12">{team.D}</td>
              <td className="p-2 snap-start scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs sm:text-base text-center w-12">{team.L}</td>
              <td className="p-2 snap-start scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs sm:text-base text-center w-12 font-bold">{team.PTS}</td>
              <td className="p-2 snap-start scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs sm:text-base text-center w-12">{team.GF}</td>
              <td className="p-2 snap-start scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs sm:text-base text-center w-12">{team.GA}</td>
              <td className="p-2 snap-start scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs sm:text-base text-center w-12">{team.GD}</td>
              <td className="p-2 snap-start scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs sm:text-base flex gap-1">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <span key={i} className="w-4 h-4 rounded-full border bg-slate-300">
                      {team.last5[i] === "W" ? <span className="text-win-green">✔</span> : team.last5[i] === "L" ? <span className="text-lose-red">✖</span> : team.last5[i] === "D" ? <span className="text-slate-500">−</span> : ""}
                    </span>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
}
