import React, { useCallback, useEffect, useState } from "react";
import { Tournament } from "@/data";
import { match } from "assert";

// [Langkah 1: Inisialisasi state untuk menyimpan skor pertandingan dan groupTeams]
export default function KnockoutStages() {
  const [activeTab, setActiveTab] = useState<Stage>("Round Of 16");
  const [knockoutScores, setKnockoutScores] = useState<Record<Stage, Record<string, { team1Score: number; team2Score: number }>>>({
    "Round Of 16": {},
    "Quarter-finals": {},
    "Semi-finals": {},
    "Final-match": {},
  });
  const [groupTeams, setGroupTeams] = useState<Tournament["groups"] | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isClient = typeof window !== "undefined";

  type Stage = "Round Of 16" | "Quarter-finals" | "Semi-finals" | "Final-match";

  // [Langkah 2: Hitung juara dan runner-up dari groupTeams dengan validasi]
  const getTopTwoTeams = (teams: Tournament["groups"][string] | undefined): [string, string] => {
    if (!teams || teams.length < 2 || teams.every((team) => team.PTS === 0)) {
      return ["TBA", "TBA"]; // Fallback kalau data belum disimulasikan
    }
    const sortedTeams = [...teams].sort((a, b) => {
      if (b.PTS !== a.PTS) return b.PTS - a.PTS; // Urutkan berdasarkan PTS
      if (b.GD !== a.GD) return b.GD - a.GD; // Goal Difference
      return b.GF - a.GF; // Goals For
    });
    return [sortedTeams[0].team, sortedTeams[1].team]; // Juara, Runner-up
  };

  const [roundOf16Matches, setRoundOf16Matches] = useState<{ team1: string; team2: string }[]>([
    { team1: "Juara A", team2: "Runner-up B" },
    { team1: "Runner-up A", team2: "Juara B" },
    { team1: "Juara C", team2: "Runner-up D" },
    { team1: "Runner-up C", team2: "Juara D" },
    { team1: "Juara E", team2: "Runner-up F" },
    { team1: "Runner-up E", team2: "Juara F" },
    { team1: "Juara G", team2: "Runner-up H" },
    { team1: "Runner-up G", team2: "Juara H" },
  ]);

  // [Langkah 3: Load groupTeams dari localStorage]
  useEffect(() => {
    if (isClient) {
      const savedData = localStorage.getItem("groupData");
      const currentData = savedData ? JSON.parse(savedData) : null;
      if (currentData && currentData.groupTeams && JSON.stringify(currentData.groupTeams) !== JSON.stringify(groupTeams)) {
        setGroupTeams(currentData.groupTeams);
      } else if (!savedData) {
        setGroupTeams({ A: [], B: [], C: [], D: [], E: [], F: [], G: [], H: [] });
      }

      const savedKnockoutData = localStorage.getItem("knockoutData");
      if (savedKnockoutData) {
        const parsedKnockoutData = JSON.parse(savedKnockoutData);
        setKnockoutScores(
          parsedKnockoutData || {
            "Round Of 16": {},
            "Quarter-finals": {},
            "Semi-finals": {},
            "Final-match": {},
          },
        );
      }
      setIsLoaded(true);
    }
  }, [isClient, groupTeams]);

  // [Langkah 4: Update matches berdasarkan groupTeams secara bertahap]
  useEffect(() => {
    if (isClient && isLoaded && groupTeams) {
      const updatedMatches = roundOf16Matches.map((match, index) => {
        const [group1, group2] = [match.team1.replace("Juara ", "").replace("Runner-up ", ""), match.team2.replace("Juara ", "").replace("Runner-up ", "")];

        const isRunnerUp1 = match.team1.includes("Runner-up");
        const isRunnerUp2 = match.team2.includes("Runner-up");

        const newTeam1 = groupTeams[group1] ? (groupTeams[group1] ? getTopTwoTeams(groupTeams[group1])[isRunnerUp1 ? 1 : 0] : "TBA") : match.team1;
        const newTeam2 = groupTeams[group2] ? (groupTeams[group2] ? getTopTwoTeams(groupTeams[group2])[isRunnerUp2 ? 1 : 0] : "TBA") : match.team2;
        return {
          team1: newTeam1 === "TBA" ? match.team1 : newTeam1,
          team2: newTeam2 === "TBA" ? match.team2 : newTeam2,
        };
      });
      // Hanya update kalau ada perubahan
      if (JSON.stringify(updatedMatches) !== JSON.stringify(roundOf16Matches)) {
        setRoundOf16Matches(updatedMatches);
      }
    }
  }, [groupTeams, isLoaded, isClient, roundOf16Matches]); // Tambah roundOf16Matches sebagai dependensi

  const tabs: Stage[] = ["Round Of 16", "Quarter-finals", "Semi-finals", "Final-match"];
  // const groups = ["A", "B", "C", "D", "E", "F", "G", "H"];

  // [Langkah 5: State untuk matches Quarter-finals berdasarkan simuasi]
  const [quarterFinalMatches, setQuarterFinalMatches] = useState<{ team1: string; team2: string }[]>([
    { team1: "Pemenang R16-1", team2: "Pemenang R16-2" },
    { team1: "Pemenang R16-3", team2: "Pemenang R16-4" },
    { team1: "Pemenang R16-5", team2: "Pemenang R16-6" },
    { team1: "Pemenang R16-7", team2: "Pemenang R16-8" },
  ]);

  const [semiFinalMatches, setSemiFinalMatches] = useState<{ team1: string; team2: string }[]>([
    { team1: "Pemenang QF-1", team2: "Pemenang QF-2" },
    { team1: "Pemenang QF-3", team2: "Pemenang QF-4" },
  ]);

  const [finalMatches, setFinalMatches] = useState<{ team1: string; team2: string }>({
    team1: "Pemenang SF-1",
    team2: "Pemenang SF-2",
  });

  const getWinner = useCallback(
    (matchIndex: number, stage: Stage = "Quarter-finals"): string => {
      const scores = knockoutScores[stage]["match-" + matchIndex];
      if (scores) {
        const matches = stage === "Quarter-finals" ? quarterFinalMatches : stage === "Semi-finals" ? semiFinalMatches : roundOf16Matches;
        return scores.team1Score > scores.team2Score ? matches[matchIndex].team1 : matches[matchIndex].team2;
      }
      return stage === "Quarter-finals" ? `Pemenang QF-${matchIndex + 1}` : stage === "Semi-finals" ? `Pemenang SF-${matchIndex + 1}` : `Pemenang R16-${matchIndex + 1}`;
    },
    [knockoutScores, roundOf16Matches, quarterFinalMatches, semiFinalMatches],
  );

  useEffect(() => {
    const roundOf16Scores = knockoutScores["Round Of 16"];
    if (roundOf16Scores) {
      const updatedQuarterFinals = [
        { team1: getWinner(0, "Round Of 16"), team2: getWinner(2, "Round Of 16") },
        { team1: getWinner(1, "Round Of 16"), team2: getWinner(3, "Round Of 16") },
        { team1: getWinner(4, "Round Of 16"), team2: getWinner(6, "Round Of 16") },
        { team1: getWinner(5, "Round Of 16"), team2: getWinner(7, "Round Of 16") },
      ];
      if (JSON.stringify(updatedQuarterFinals) !== JSON.stringify(quarterFinalMatches)) {
        setQuarterFinalMatches(updatedQuarterFinals);
      }
    }
  }, [knockoutScores, quarterFinalMatches, getWinner]);

  // UPDATE Semi-finals setelah Quarter-finals
  useEffect(() => {
    const quarterFinalScores = knockoutScores["Quarter-finals"];
    if (quarterFinalScores) {
      const updatedSemiFinals = [
        { team1: getWinner(0, "Quarter-finals"), team2: getWinner(2, "Quarter-finals") },
        { team1: getWinner(1, "Quarter-finals"), team2: getWinner(3, "Quarter-finals") },
      ];
      if (JSON.stringify(updatedSemiFinals) !== JSON.stringify(semiFinalMatches)) {
        setSemiFinalMatches(updatedSemiFinals);
      }
    }
  }, [knockoutScores, semiFinalMatches, getWinner]);

  useEffect(() => {
    const semiFinalScores = knockoutScores["Semi-finals"];
    if (semiFinalScores) {
      const updatedFinalMatches = {
        team1: getWinner(0, "Semi-finals"),
        team2: getWinner(1, "Semi-finals"),
      };
      if (JSON.stringify(updatedFinalMatches) !== JSON.stringify(finalMatches)) {
        setFinalMatches(updatedFinalMatches);
      }
    }
  }, [knockoutScores, finalMatches, getWinner]);

  const matches: Record<Stage, { team1: string; team2: string }[]> = {
    "Round Of 16": roundOf16Matches,
    "Quarter-finals": quarterFinalMatches,
    "Semi-finals": semiFinalMatches,
    "Final-match": [finalMatches],
    // "Final-match": [{ team1: "Pemenang SF-1", team2: "Pemenang SF-2" }],
  };
  useEffect(() => {
    if (isClient && isLoaded) {
      localStorage.setItem("knockoutData", JSON.stringify(knockoutScores));
    }
  }, [knockoutScores, isLoaded, isClient]);

  // [Langkah 6: Fungsi untuk update skor]
  const handleScoreChange = (matchIndex: number, team: "team1" | "team2", value: number) => {
    setKnockoutScores((prevScores) => {
      const currentScores = prevScores[activeTab]["match-" + matchIndex] || {
        team1Score: 0,
        team2Score: 0,
      };
      const newScores = {
        ...prevScores,
        [activeTab]: {
          ...prevScores[activeTab],
          ["match-" + matchIndex]: {
            ...currentScores,
            ...(team === "team1" ? { team1Score: Math.max(0, currentScores.team1Score + value) } : { team2Score: Math.max(0, currentScores.team2Score + value) }),
          },
        },
      };
      return newScores;
    });
  };

  // [Langkah 7: Fungsi simulasi pertandingan]
  const handleSimulationMatch = (matchIndex: number) => {
    const currentScores = knockoutScores[activeTab]["match-" + matchIndex] || {
      team1Score: 0,
      team2Score: 0,
    };
    const matchData = {
      [activeTab]: {
        ...knockoutScores[activeTab],
        ["match-" + matchIndex]: currentScores,
      },
    };
    console.log(`Data yang akan disimpan ke localStorage untuk pertandingan ${matchIndex + 1} di ${activeTab}:`, matchData);
    setKnockoutScores((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        ["match-" + matchIndex]: currentScores,
      },
    }));
  };

  // [Langkah 8: Fungsi reset per stage/match]
  const handleReset = (label: string) => {
    if (activeTab === "Round Of 16") {
      const groupLabel = label;
      const newKnockoutScores = { ...knockoutScores };
      const resetMatches: Record<string, { team1Score: number; team2Score: number }> = {};
      Object.keys(newKnockoutScores["Round Of 16"]).forEach((matchKey) => {
        const matchIndex = parseInt(matchKey.split("-")[1]);
        const match = matches["Round Of 16"][matchIndex];
        if (match.team1.includes(groupLabel) || match.team2.includes(groupLabel)) {
          resetMatches[matchKey] = { team1Score: 0, team2Score: 0 };
        }
      });
      setKnockoutScores((prev) => ({
        ...prev,
        "Round Of 16": { ...prev["Round Of 16"], ...resetMatches },
      }));
    } else {
      const matchIndex = parseInt(label.split("-")[1]) - 1;
      let targetStage: Stage;
      if (activeTab === "Quarter-finals") targetStage = "Round Of 16";
      else if (activeTab === "Semi-finals") targetStage = "Quarter-finals";
      else targetStage = "Semi-finals";

      setKnockoutScores((prev) => ({
        ...prev,
        [targetStage]: {
          ...prev[targetStage],
          ["match-" + matchIndex]: { team1Score: 0, team2Score: 0 },
        },
      }));
    }
  };

  // [Langkah 9: Fungsi reset semua data]
  const handleResetAll = () => {
    setKnockoutScores({
      "Round Of 16": {},
      "Quarter-finals": {},
      "Semi-finals": {},
      "Final-match": {},
    });
    if (isClient) {
      localStorage.removeItem("knockoutData");
    }
  };

  // [Langkah 10: Loading state]
  if (!isLoaded && isClient) {
    return <div className="p-4 text-center text-gray-500 dark:text-gray-400">Loading...</div>;
  }

  return (
    <div className="p-2 sm:p-2 md:p-1">
      {/* TAB BABAK */}
      <ul className="flex flex-wrap justify-center text-sm font-medium text-center text-slate-600 border-b border-sky-500 dark:border-teal-dark dark:text-slate-500 mb-6">
        {tabs.map((tab) => (
          <li key={tab} className="me-2">
            <button
              onClick={() => setActiveTab(tab)}
              className={`initial-blok p-2 text-xs rounded-t-sm ${
                activeTab === tab ? "text-slate-100 bg-sky-500 dark:bg-teal-dark dark:text-slate-100" : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-stone-900 dark:hover:text-stone-400"
              }`}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      {/* DAFTAR PERTANDINGAN */}
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <div className={`sm:flex sm:justify-center sm:flex-col gap-4 ${activeTab == "Semi-finals" || activeTab == "Final-match" ? "flex justify-center sm:flex sm:justify-center" : "grid grid-cols-2 sm:grid sm:grid-cols-2"}`}>
          {matches[activeTab].map((match, index) => {
            let label = "";
            if (activeTab === "Round Of 16") label = `R16-${index + 1}`;
            else if (activeTab === "Quarter-finals") label = `QF-${index + 1}`;
            else if (activeTab === "Semi-finals") label = `SF-${index + 1}`;
            else if (activeTab === "Final-match") label = `FM-${index + 1}`;

            const currentScores = knockoutScores[activeTab]["match-" + index] || { team1Score: 0, team2Score: 0 };
            return (
              <div key={index} className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border-gray-200 dark:border-gray-700">
                {/* PERTANDINGAN */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-800 dark:text-gray-200">
                  <p className="text-xs">{label}</p>
                  {/* JUARA GRUP */}
                  <div className="flex flex-col items-center gap-1 w-full sm:w-40">
                    <span className="text-xs font-medium text-left">{match.team1}</span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleScoreChange(index, "team1", -1)} className="bg-gray-100 dark:bg-gray-700 border border-gray-300 rounded-l-sm flex items-center p-1 h-5 w-5 text-gray-600 dark:text-gray-400 text-xs">
                        -
                      </button>
                      <input type="text" value={currentScores.team1Score} readOnly className="bg-gray-50 border-x-0 border-gray-300 text-center w-8 py-0.5 dark:bg-gray-700 dark:border-gray-600 text-xs" />
                      <button onClick={() => handleScoreChange(index, "team1", 1)} className="bg-gray-100 dark:bg-gray-700 border border-gray-300 rounded-r-sm flex items-center p-1 h-5 w-5 text-gray-600 dark:text-gray-400 text-xs">
                        +
                      </button>
                    </div>
                  </div>

                  <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-bold my-2 sm:my-0">vs</span>

                  {/* RUNNERUP GRUP */}
                  <div className="flex flex-col items-center gap-1 w-full sm:w-40">
                    <span className="text-xs font-medium text-left">{match.team2}</span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleScoreChange(index, "team2", -1)} className="bg-gray-100 dark:bg-gray-700 border border-gray-300 rounded-l-sm flex items-center p-1 h-5 w-5 text-gray-600 dark:text-gray-400 text-xs">
                        -
                      </button>
                      <input type="text" value={currentScores.team2Score} readOnly className="bg-gray-50 border-x-0 border-gray-300 text-center w-8 py-0.5 dark:bg-gray-700 dark:border-gray-600 text-xs" />
                      <button onClick={() => handleScoreChange(index, "team2", 1)} className="bg-gray-100 dark:bg-gray-700 border border-gray-300 rounded-r-sm flex items-center p-1 h-5 w-5 text-gray-600 dark:text-gray-400 text-xs">
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* TOMBOL SIMULASI PERTANDINGAN */}
                {/* <div className="mt-2 flex justify-center">
                  <button onClick={() => handleSimulationMatch(index)} className="px-3 py-1 rounded text-xs text-white bg-blue-500 dark:bg-blue-700 transition-colors">
                    Simulasi
                  </button>
                </div> */}
              </div>
            );
          })}
        </div>
        {/* TOMBOL RESET */}
        <div className="flex justify-center md:w-30 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2 justify-center md:grid md:grid-cols-2 lg:grid lg:grid-cols-1">
            {/* Reset per match */}
            <button onClick={handleResetAll} className="px-2 py-1 rounded text-xs text-white bg-red-600 dark:bg-red-800">
              RESET
            </button>
          </div>
          {/* Tombol Reset All */}
        </div>
      </div>
    </div>
  );
}
