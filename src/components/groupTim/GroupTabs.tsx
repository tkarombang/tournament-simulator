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
  const [isLoaded, setIsLoaded] = useState(false);

  const isClient = typeof window !== "undefined";

  // Langkah-2: Ambil data dari localStorage di useEffect setelah hidrasi
  useEffect(() => {
    if (isClient) {
      const saveData = localStorage.getItem("groupData");
      if (saveData) {
        const parsingData = JSON.parse(saveData);
        if (parsingData.groupTeams) {
          setGroupTeams(parsingData.groupTeams);
        } else {
          setGroupTeams(initialData.groups);
        }
        if (parsingData.simulatedMatches) {
          setSimulatedMatches(Object.fromEntries(Object.entries(parsingData.simulatedMatches).map(([group, matchSet]) => [group, new Set(matchSet as string[])])));
        }
      } else {
        setGroupTeams(initialData.groups);
      }
      setIsLoaded(true);
    }
  }, [isClient]);

  // Langkah-3: Simpan data ke localStorage
  useEffect(() => {
    if (isClient && isLoaded) {
      const dataToSave = {
        groupTeams,
        simulatedMatches: Object.fromEntries(Object.entries(simulatedMatches).map(([group, matchSet]) => [group, Array.from(matchSet)])),
      };
      localStorage.setItem("groupData", JSON.stringify(dataToSave));
    }
  }, [groupTeams, simulatedMatches, isLoaded, isClient]);

  // RESET SCORES PAS GANTI GROUP
  useEffect(() => {
    if (isClient && isLoaded) {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(`match-${activeGroup}`)) {
          localStorage.removeItem(key);
        }
      });
    }
  }, [activeGroup, isClient, isLoaded]);

  const handleSimulate = (stageMatches: Array<{ team1: string; score1: number; team2: string; score2: number; matchId: string }>) => {
    console.log("Received stageMatches:", stageMatches); // Debug: Cek data dari SimulationForm
    if (!stageMatches || stageMatches.length === 0) {
      console.log("No valid stageMatches provided, skipping update");
      return;
    }

    setGroupTeams((prevTeams) => {
      const newTeams = { ...prevTeams };
      let currentGroupTeams = [...(newTeams[activeGroup] || initialData.groups[activeGroup])]; // Selalu pakai initialData sebagai fallback

      if (currentGroupTeams.length === 0) {
        console.log("currentGroupTeams is empty, populating from initialData");
        currentGroupTeams = [...initialData.groups[activeGroup]]; // Pastikan tim awal ada
      }

      stageMatches.forEach(({ matchId, team1, score1, team2, score2 }) => {
        console.log(`Processing match ${matchId}: ${team1} vs ${team2}`); // Debug
        const isAlreadySimulated = simulatedMatches[activeGroup]?.has(matchId) ?? false;
        let team1Index = currentGroupTeams.findIndex((team) => team.team === team1);
        let team2Index = currentGroupTeams.findIndex((team) => team.team === team2);

        console.log(`team1Index: ${team1Index}, team2Index: ${team2Index}`); // Debug indeks tim

        // Tambah tim dari initialData kalau nggak ada
        if (team1Index === -1) {
          const initialTeam = initialData.groups[activeGroup].find((t) => t.team === team1);
          if (initialTeam) {
            console.log(`Adding ${team1} from initialData`);
            currentGroupTeams.push({ ...initialTeam, MP: 0, GF: 0, GA: 0, GD: 0, W: 0, D: 0, L: 0, PTS: 0, last5: [] });
            team1Index = currentGroupTeams.length - 1;
          } else {
            console.log(`Initial team ${team1} not found in initialData`);
          }
        }
        if (team2Index === -1) {
          const initialTeam = initialData.groups[activeGroup].find((t) => t.team === team2);
          if (initialTeam) {
            console.log(`Adding ${team2} from initialData`);
            currentGroupTeams.push({ ...initialTeam, MP: 0, GF: 0, GA: 0, GD: 0, W: 0, D: 0, L: 0, PTS: 0, last5: [] });
            team2Index = currentGroupTeams.length - 1;
          } else {
            console.log(`Initial team ${team2} not found in initialData`);
          }
        }

        if (team1Index === -1 || team2Index === -1) {
          console.log(`Team not found: ${team1} or ${team2}, skipping match ${matchId}`);
          return;
        }

        const team1Data = { ...currentGroupTeams[team1Index] };
        const team2Data = { ...currentGroupTeams[team2Index] };

        // JIKA PERTANDINGAN SUDAH DISIMULASIKAN SEBELUMNYA, KURANGI STATS SEBELUMNYA
        if (isAlreadySimulated) {
          team1Data.MP -= 1;
          team2Data.MP -= 1;
          const prevScore = JSON.parse(localStorage.getItem(`match-${matchId}`) || "{}");
          team1Data.GF -= prevScore.score1 || 0;
          team1Data.GA -= prevScore.score2 || 0;
          team2Data.GF -= prevScore.score2 || 0;
          team2Data.GA -= prevScore.score1 || 0;
          team1Data.GD = team1Data.GF - team1Data.GA;
          team2Data.GD = team2Data.GF - team2Data.GA;
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
          team1Data.last5 = team1Data.last5.slice(0, -1);
          team2Data.last5 = team2Data.last5.slice(0, -1);
        }

        // UPDATE STATS BARU
        team1Data.MP += 1;
        team2Data.MP += 1;
        team1Data.GF += score1;
        team1Data.GA += score2;
        team2Data.GF += score2;
        team2Data.GA += score1;
        team1Data.GD = team1Data.GF - team1Data.GA;
        team2Data.GD = team2Data.GF - team2Data.GA;
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
        team1Data.last5 = [...team1Data.last5, score1 > score2 ? "W" : score1 < score2 ? "L" : "D"].slice(-5);
        team2Data.last5 = [...team2Data.last5, score2 > score1 ? "W" : score2 < score1 ? "L" : "D"].slice(-5);

        currentGroupTeams[team1Index] = team1Data;
        currentGroupTeams[team2Index] = team2Data;
        newTeams[activeGroup] = [...currentGroupTeams]; // Pastikan array di-copy ulang
      });

      console.log("Updated groupTeams[activeGroup]:", newTeams[activeGroup]); // Debug
      return newTeams;
    });
    setSimulatedMatches((prev) => {
      const currentSet = prev[activeGroup] || new Set<string>();
      const newMatchIds = new Set([...Array.from(currentSet), ...stageMatches.map((m) => m.matchId)]);
      return {
        ...prev,
        [activeGroup]: newMatchIds,
      };
    });
  };

  const handleReset = () => {
    setGroupTeams((prev) => {
      if (prev) {
        const newGroupTeams = { ...prev, [activeGroup]: initialData.groups[activeGroup] };
        localStorage.setItem("groupData", JSON.stringify({ groupTeams: newGroupTeams }));
        return newGroupTeams;
      }
      return prev || initialData.groups;
    });
    setSimulatedMatches((prev) => ({
      ...prev,
      [activeGroup]: new Set<string>(),
    }));
    setResetKey((prev) => prev + 1);
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("match-") && key.includes(activeGroup)) {
        localStorage.removeItem(key);
      }
    });
    // localStorage.removeItem("groupData");
  };

  const isResetDisabled = !simulatedMatches[activeGroup] || simulatedMatches[activeGroup].size === 0;

  // Langkah 4: Render hanya jika data siap
  if (!isLoaded || !groupTeams || Object.keys(groupTeams).length === 0) {
    return <div className="p-4 text-center text-gray-500 dark:text-gray-400">Loading...</div>;
  }

  return (
    <div className="p-4">
      <ul className="flex flex-wrap justify-center text-sm font-medium text-center text-slate-600 border-b border-sky-500 dark:border-teal-dark dark:text-slate-500 mb-3">
        {Object.keys(groupTeams).map((group) => (
          <li key={group} className="me-1">
            <button
              onClick={() => setActiveGroup(group)}
              className={`inline-block px-2 py-0.5 rounded-t-md ${
                activeGroup === group ? "text-slate-100 bg-sky-500 dark:bg-teal-dark dark:text-slate-100" : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-stone-900 dark:hover:text-stone-400"
              }`}
            >
              {group}
            </button>
          </li>
        ))}
      </ul>
      <div>
        <StandingsTable key={`${activeGroup}-${resetKey}`} teams={groupTeams[activeGroup] || initialData.groups[activeGroup]} />
        <SimulationForm
          key={resetKey}
          teams={groupTeams[activeGroup] || initialData.groups[activeGroup]}
          activeGroup={activeGroup}
          simulatedMatches={simulatedMatches}
          setSimulatedMatches={setSimulatedMatches}
          onSimulateStage={handleSimulate}
        />
        <div className="mt-7 flex justify-center relative">
          <motion.button
            layout
            disabled={isResetDisabled}
            onClick={handleReset}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`absolute z-50 bottom-1 right-1 w-12 h-12 text-2xl text-white rounded-full ${
              isResetDisabled ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed" : "transition-colors bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
            }`}
          >
            <FontAwesomeIcon icon={faRotate} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
