import initialData, { Tournament } from "@/data";
import StandingsTable from "./StandingTable";
import { useEffect, useState } from "react";
import SimulationForm from "./SimulationForm";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

export default function GroupTabs() {
  const [activeGroup, setActiveGroup] = useState<string>("A");
  const [groupTeams, setGroupTeams] = useState<Tournament["groups"]>(initialData.groups);
  const [simulatedMatches, setSimulatedMatches] = useState<{ [group: string]: Set<string> }>({});
  const [resetKey, setResetKey] = useState<number>(0);

  //  RESET SCORES PAS GANTI GROUP
  useEffect(() => {
    // BERSIHKAN localStorage UNTUK GROUP INI
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(`match-${activeGroup}`)) {
        localStorage.removeItem(key);
      }
    });
  }, [activeGroup]);

  const handleSimulate = (stageMatches: Array<{ team1: string; score1: number; team2: string; score2: number; matchId: string }>) => {
    setGroupTeams((prevTeams) => {
      const newTeams = { ...prevTeams };
      const currentGroupTeams = [...newTeams[activeGroup]];

      stageMatches.forEach(({ matchId, team1, score1, team2, score2 }) => {
        const isAlreadySimulated = simulatedMatches[activeGroup]?.has(matchId) ?? false;
        const team1Index = currentGroupTeams.findIndex((team) => team.team === team1);
        const team2Index = currentGroupTeams.findIndex((team) => team.team === team2);

        if (team1Index === -1 || team2Index === -1) return prevTeams;

        const team1Data = { ...currentGroupTeams[team1Index] };
        const team2Data = { ...currentGroupTeams[team2Index] };

        // JIKA PERTANDINGAN SUDAH DISIMULASIKAN SEBELUMNYA, KURANGI STATS SEBELUMNYA
        if (isAlreadySimulated) {
          // KURANGI MP
          team1Data.MP -= 1;
          team2Data.MP -= 1;

          // KURANGI GF DAN GA BERDASARKAN SKOR SEBELUMNYA
          const prevScore = JSON.parse(localStorage.getItem(`match-${matchId}`) || "{}");
          team1Data.GF -= prevScore.score1 || 0;
          team1Data.GA -= prevScore.score2 || 0;
          team2Data.GF -= prevScore.score2 || 0;
          team2Data.GA -= prevScore.score1 || 0;

          // UPDATE GD
          team1Data.GD = team1Data.GF - team1Data.GA;
          team2Data.GD = team2Data.GF - team2Data.GA;

          // KURANGI W, D, L, PTS berdasarkan hasil sebelumnya
          const prevResult1 = team1Data.last5[team1Data.last5.length - 1];
          const prevResult2 = team2Data.last5[team2Data.last5.length - 1];
          if (prevResult1 === "W") {
            team1Data.W -= 1;
            team1Data.PTS -= 3;
          } else if (prevResult1 === "D") {
            team1Data.D -= 1;
            team1Data.PTS -= 1;
          } else if (prevResult1 === "L") {
            team1Data.L -= 1;
          }
          if (prevResult2 === "W") {
            team2Data.W -= 1;
            team2Data.PTS -= 3;
          } else if (prevResult2 === "D") {
            team2Data.D -= 1;
            team2Data.PTS -= 1;
          } else if (prevResult2 === "L") {
            team2Data.L -= 1;
          }

          // HAPUS HASIL TERAKHIR LAST5
          team1Data.last5 = team1Data.last5.slice(0, -1);
          team2Data.last5 = team2Data.last5.slice(0, -1);
        }

        // UPDATE MP (MATCH PLAYED)
        team1Data.MP += 1;
        team2Data.MP += 1;

        // UPDATE GF (Goals Gor) dan GA (Goals Against)
        team1Data.GF += score1;
        team1Data.GA += score2;
        team2Data.GF += score2;
        team2Data.GA += score1;

        // UPDATE GD (GOAL DIFFERENCE)
        team1Data.GD = team1Data.GF - team1Data.GA;
        team2Data.GD = team2Data.GF - team2Data.GA;

        // TENTUKAN PEMENANG DAN UPDATE W, D, L, PTS
        if (score1 > score2) {
          team1Data.W += 1;
          team1Data.PTS += 3;
          team2Data.L += 1;
        } else if (score2 > score1) {
          team2Data.W += 1;
          team2Data.PTS += 3;
          team1Data.L += 1;
        } else {
          team1Data.D += 1;
          team2Data.D += 1;
          team1Data.PTS += 1;
          team2Data.PTS += 1;
        }

        // UPDATE LAST5
        team1Data.last5 = [...team1Data.last5, score1 > score2 ? "W" : score1 < score2 ? "L" : "D"].slice(-5);
        team2Data.last5 = [...team2Data.last5, score2 > score1 ? "W" : score2 < score1 ? "L" : "D"].slice(-5);

        // UPDATE ARRAY TIM DI GROUP AKTIF
        currentGroupTeams[team1Index] = team1Data;
        currentGroupTeams[team2Index] = team2Data;
        newTeams[activeGroup] = currentGroupTeams;

        // SIMPAN SKOR DI LOCALSTORAGE
        localStorage.setItem(`match-${matchId}`, JSON.stringify({ score1, score2 }));
      });

      newTeams[activeGroup] = currentGroupTeams;
      return newTeams;
    });
  };

  const handleReset = () => {
    setGroupTeams(initialData.groups);
    setSimulatedMatches((prev) => ({
      ...prev,
      [activeGroup]: new Set<string>(),
    }));
    // Force remount SimulationForm to reset internal state
    setResetKey((prev) => prev + 1);
    // BERSIHKAN LOCAL STORAGE
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("match-")) {
        localStorage.removeItem(key);
      }
    });
  };

  const isResetDisabled = !simulatedMatches[activeGroup] || simulatedMatches[activeGroup].size == 0;
  return (
    <div className="p-4">
      <ul className="flex flex-wrap justify-center text-sm font-medium text-center text-slate-600 border-b border-sky-500 dark:border-teal-dark dark:text-slate-500 mb-3">
        {Object.keys(groupTeams).map((group) => (
          <li key={group} className="me-2">
            <button
              onClick={() => setActiveGroup(group)}
              className={`inline-block p-4 rounded-t-lg ${
                activeGroup === group ? "text-slate-100 bg-sky-500 dark:bg-teal-dark dark:text-slate-100" : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-stone-900 dark:hover:text-stone-400"
              }`}
            >
              Group {group}
            </button>
          </li>
        ))}
      </ul>
      <div>
        <StandingsTable teams={groupTeams[activeGroup]} />
        <div className="mt-7 flex justify-center">
          <motion.button
            layout
            disabled={isResetDisabled}
            onClick={handleReset}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`fixed bottom-10 z-50 right-10 w-12 h-12 text-2xl text-white rounded-full
           ${isResetDisabled ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed" : "transition-colors bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"} `}
          >
            <FontAwesomeIcon icon={faRotate} />
          </motion.button>
        </div>
        <SimulationForm key={resetKey} teams={groupTeams[activeGroup]} activeGroup={activeGroup} simulatedMatches={simulatedMatches} setSimulatedMatches={setSimulatedMatches} onSimulateStage={handleSimulate} />
      </div>
    </div>
  );
}
