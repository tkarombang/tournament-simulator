import { group } from "console";
import React, { useState } from "react";

export default function KnockoutStage() {
  type Stage = "Round Of 16" | "Quarter-finals" | "Semi-finals" | "Final-match";
  const [activeTab, setActiveTab] = useState<Stage>("Round Of 16");

  // langkah 1: tulis state untuk menyimpan skor (pertandingan
  const [knockoutScores, setKnockoutScores] = useState<Record<Stage, Record<string, { team1Score: number; team2Score: number }>>>({
    "Round Of 16": {},
    "Quarter-finals": {},
    "Semi-finals": {},
    "Final-match": {},
  });

  const matches: Record<Stage, { team1: string; team2: string }[]> = {
    "Round Of 16": [
      { team1: "Juara A", team2: "Runner-up B" },
      { team1: "Runner-up A", team2: "Juara B" },
      { team1: "Juara C", team2: "Runner-up D" },
      { team1: "Runner-up C", team2: "Juara D" },
      { team1: "Juara E", team2: "Runner-up F" },
      { team1: "Runner-up E", team2: "Juara F" },
      { team1: "Juara G", team2: "Runner-up H" },
      { team1: "Runner-up G", team2: "Juara H" },
    ],
    "Quarter-finals": [
      { team1: "Pemenang R16-1", team2: "Pemenang R16-2" },
      { team1: "Pemenang R16-3", team2: "Pemenang R16-4" },
      { team1: "Pemenang R16-5", team2: "Pemenang R16-6" },
      { team1: "Pemenang R16-7", team2: "Pemenang R16-8" },
    ],
    "Semi-finals": [
      { team1: "Pemenang QF-1", team2: "Pemenang QF-2" },
      { team1: "Pemenang QF-3", team2: "Pemenang QF-4" },
    ],
    "Final-match": [{ team1: "Pemenang SF-1", team2: "Pemenang SF-2" }],
  };

  const tabs: Stage[] = ["Round Of 16", "Quarter-finals", "Semi-finals", "Final-match"];
  const groups = ["A", "B", "C", "D", "E", "F", "G", "H"];

  // langkah-2 FUNGSI UNTUK UPDATE SKOR
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

  // [Langkah-3 Fungsi Simulasi Pertandingan
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
  };

  // langkah-4 FUNGSI RESET
  const handleReset = (label: string) => {
    if (activeTab === "Round Of 16") {
      const grup = label;
      const newKnockoutScores = { ...knockoutScores };
      const resetMatches: Record<string, { team1Score: number; team2Score: number }> = {};
      Object.keys(newKnockoutScores["Round Of 16"]).forEach((matchKey) => {
        const matchIndex = parseInt(matchKey.split("-")[1]);
        const match = matches["Round Of 16"][matchIndex];
        if (match.team1.includes(grup) || match.team2.includes(grup)) {
          resetMatches[matchKey] = { team1Score: 0, team2Score: 0 };
        }
      });
      console.log({ groupStandings: { [grup]: "removed" }, knockOutScores: { "Round Of 16": resetMatches } });
    } else {
      const matchIndex = parseInt(label.split("-")[1]) - 1;
      let targetStage: Stage;
      if (activeTab === "Quarter-finals") console.log((targetStage = "Round Of 16"));
      else if (activeTab === "Semi-finals") console.log((targetStage = "Quarter-finals"));
      else console.log((targetStage = "Semi-finals"));
      const resetMatch = { ["match-" + matchIndex]: { team1Score: 0, team2Score: 0 } };
      console.log(resetMatch);
    }
  };

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
          {/* <div className="flex justify-center items-center flex-col gap-4"> */}
          {matches[activeTab].map((match, index) => {
            const currentScores = knockoutScores[activeTab]["match-" + index] || { team1Score: 0, team2Score: 0 };
            return (
              <div key={index} className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border-gray-200 dark:border-gray-700">
                {/* PERTANDINGAN */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-800 dark:text-gray-200">
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
                <div className="mt-2 flex justify-center">
                  <button onClick={() => handleSimulationMatch(index)} className="px-3 py-1 rounded text-xs text-white bg-blue-500 dark:bg-blue-700 transition-colors">
                    Simulasi
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {/* TOMBOL RESET GRUP */}
        <div className="flex justify-center md:w-30 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2 justify-center md:grid md:grid-cols-2 lg:grid lg:grid-cols-1">
            {activeTab === "Round Of 16"
              ? groups.map((group) => (
                  <button onClick={() => handleReset(group)} key={group} className=" px-2 py-1 rounded text-xs text-white bg-red-500 dark:bg-red-700">
                    Reset {group}
                  </button>
                ))
              : matches[activeTab].map((_, index) => {
                  let label = "";
                  if (activeTab === "Quarter-finals") label = `Reset R16-${index + 1}`;
                  else if (activeTab === "Semi-finals") label = `Reset QF-${index + 1}`;
                  else if (activeTab === "Final-match") label = `Reset SF-${index + 1}`;
                  return (
                    <button onClick={() => handleReset(label)} key={label} className=" px-2 py-1 rounded text-xs text-white bg-red-500 dark:bg-red-700">
                      {label}
                    </button>
                  );
                })}
          </div>
        </div>
        {/* END */}
      </div>
    </div>
  );
}
