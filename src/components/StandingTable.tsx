import { Team } from "@/data";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleCheck, faCircleXmark, faCircleMinus } from "@fortawesome/free-solid-svg-icons";

library.add(faCircleCheck, faCircleXmark, faCircleMinus);

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
    <div className="overflow-x-auto snap-x snap-mandatory scroll-pl-1 scrollbar-custom min-w-full shadow-md rounded-lg" ref={tableRef}>
      <motion.table
        className="w-full text-left border-collapse min-w-[600px]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
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
              <td className={`p-2 whitespace-nowrap text-xs sm:text-base sticky left-0 z-10 min-w-[160px] bg-light-bg dark:bg-dark-bg ${isScrolled ? "with-separator" : ""}`}>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">{index + 1}</span>
                  <span className={`text-base ${team.flag || "fi fi-un"}`}></span>
                  <span>{team.team}</span>
                </div>
              </td>
              <td className="p-2 snap-start scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs sm:text-base text-center w-12">
                {}
                {team.MP}
              </td>
              <td className="p-2 snap-start scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs sm:text-base text-center w-12">{team.W}</td>
              <td className="p-2 snap-start scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs sm:text-base text-center w-12">{team.D}</td>
              <td className="p-2 snap-start scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs sm:text-base text-center w-12">{team.L}</td>
              <td className="p-2 snap-start scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs sm:text-base text-center w-12 font-bold">{team.PTS}</td>
              <td className="p-2 snap-start scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs sm:text-base text-center w-12">{team.GF}</td>
              <td className="p-2 snap-start scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs sm:text-base text-center w-12">{team.GA}</td>
              <td className="p-2 snap-start scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs sm:text-base text-center w-12">{team.GD}</td>
              <td className="p-2 snap-start scroll-ml-3 sm:scroll-ml-6 whitespace-nowrap text-xs sm:text-base text-center flex gap-1 ">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <span key={i} className="w-4 h-4 rounded-full mt-1 bg-slate-300 flex items-center justify-center text-xs sm:text-base">
                      {team.last5[i] === "W" ? (
                        <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 text-xs sm:text-base w-4 h-4" />
                      ) : team.last5[i] === "L" ? (
                        <FontAwesomeIcon icon={faCircleXmark} className="text-rose-600 text-xs sm:text-base w-4 h-4" />
                      ) : team.last5[i] === "D" ? (
                        <FontAwesomeIcon icon={faCircleMinus} className="text-slate-500 text-xs sm:text-base w-4 h-4" />
                      ) : (
                        ""
                      )}
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
