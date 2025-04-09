import { Team } from "@/data";
import React from "react";
import { motion } from "framer-motion";

interface SimulationFormProps {
  teams: Team[];
  activeGroup: string;
  scores: { [matchId: string]: { score1: number; score2: number } };
  setScores: React.Dispatch<React.SetStateAction<{ [matchId: string]: { score1: number; score2: number } }>>;
  simulatedMatches: Set<string>;
  onSimulate: (team1: string, score1: number, team2: string, score2: number, matchId: string) => void;
}

export default function SimulationForm({ teams, activeGroup, scores, setScores, simulatedMatches, onSimulate }: SimulationFormProps) {
  const matches = [
    { stage: 1, team1: teams[0], team2: teams[1], matchId: `${activeGroup}-1-0-1` },
    { stage: 1, team1: teams[2], team2: teams[3], matchId: `${activeGroup}-1-2-3` },

    { stage: 2, team1: teams[3], team2: teams[0], matchId: `${activeGroup}-2-3-0` },
    { stage: 2, team1: teams[2], team2: teams[1], matchId: `${activeGroup}-2-2-1` },

    { stage: 3, team1: teams[2], team2: teams[0], matchId: `${activeGroup}-3-2-0` },
    { stage: 3, team1: teams[3], team2: teams[1], matchId: `${activeGroup}-3-3-1` },
  ];

  // UPDATE SKOR DAN PANGGIL onSimulate PAS INPUT BERUBAH
  const handleIncrement = (matchId: string, team1: string, team2: string, isScore1: boolean) => {
    setScores((prev) => {
      // KONVERSI KE NUMBER, DEFAULT 0 KALAU KOSONG
      const score = prev[matchId] || { score1: 0, score2: 0 };
      const newScore1 = isScore1 ? score.score1 + 1 : score.score1;
      const newScore2 = !isScore1 ? score.score2 + 1 : score.score2;
      const newScores = { ...prev, [matchId]: { score1: newScore1, score2: newScore2 } };
      onSimulate(team1, newScore1, team2, newScore2, matchId);
      return newScores;
    });
  };
  // UPDATE SKOR DAN PANGGIL onSimulate PAS INPUT BERUBAH
  const handleDecrement = (matchId: string, team1: string, team2: string, isScore1: boolean) => {
    setScores((prev) => {
      // KONVERSI KE NUMBER, DEFAULT 0 KALAU KOSONG
      const score = prev[matchId] || { score1: 0, score2: 0 };
      const newScore1 = isScore1 ? Math.max(0, score.score1 - 1) : score.score1;
      const newScore2 = !isScore1 ? Math.max(0, score.score2 - 1) : score.score2;
      const newScores = { ...prev, [matchId]: { score1: newScore1, score2: newScore2 } };
      onSimulate(team1, newScore1, team2, newScore2, matchId);
      return newScores;
    });
  };

  // KELOMPOKKAN PERTANDINGAN BERDASARKAN STAGE
  const stages = matches.reduce((acc, match) => {
    if (!acc[match.stage]) acc[match.stage] = [];
    acc[match.stage].push(match);
    return acc;
  }, {} as { [stage: number]: typeof matches });

  return (
    <motion.div className="mt-8">
      {Object.keys(stages).map((stage) => (
        <div key={stage} className="mb-6">
          <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200 mb-2 border-y-2 border-sky-500 dark:border-teal-dark pb-1 uppercase">Stage {stage}</h3>
          <div className="space-y-4">
            {stages[Number(stage)].map((match) => {
              const matchId = match.matchId;
              const score = scores[matchId] || { score1: 0, score2: 0 };
              const isSimulated = simulatedMatches.has(matchId);

              return (
                <div key={matchId} className="flex items-center justify-center gap-4 text-gray-800 dark:text-gray-200">
                  {/* TIM 1 */}
                  <div className="flex items-center gap-2 w-32 justify-between border-b-2 border-stone-300 dark:border-gray-700">
                    <span className={`w-5 h-5 ${match.team1.flag}`}></span>
                    <span className="text-sm sm:text-base">{match.team1.team}</span>
                  </div>
                  {/* COUNTER SCORE */}
                  <div className="flex items-center gap-2">
                    {/* Counter Tim 1 */}
                    <div className="relative flex items-center max-w-[5rem]">
                      <button
                        type="button"
                        onClick={() => handleDecrement(matchId, match.team1.team, match.team2.team, true)}
                        disabled={isSimulated}
                        className={`bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-sm flex items-center p-1 h-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none ${
                          isSimulated ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {" "}
                        -
                      </button>
                      <input
                        type="text"
                        value={score.score1}
                        readOnly
                        className="bg-gray-50 border-x-0 border-gray-300 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-1 h-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleIncrement(matchId, match.team1.team, match.team2.team, true)}
                        disabled={isSimulated}
                        className={`bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-sm flex items-center p-1 h-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none ${
                          isSimulated ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        +
                      </button>
                    </div>

                    <span className="text-gray-500 dark:text-gray-400 text-xs">v</span>

                    {/* Counter Tim 2 */}
                    <div className="relative flex items-center max-w-[5rem]">
                      <button
                        type="button"
                        onClick={() => handleDecrement(matchId, match.team1.team, match.team2.team, false)}
                        disabled={isSimulated}
                        className={`bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-sm flex items-center p-1 h-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none ${
                          isSimulated ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        +
                      </button>
                      <input
                        type="text"
                        value={score.score2}
                        readOnly
                        className="bg-gray-50 border-x-0 border-gray-300 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-1 h-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleIncrement(matchId, match.team1.team, match.team2.team, false)}
                        disabled={isSimulated}
                        className={`bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-sm flex items-center p-1 h-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none ${
                          isSimulated ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        -
                      </button>
                    </div>
                  </div>
                  {/* TIM 2 */}
                  <div className="flex items-center gap-2 w-32 justify-between border-b-2 border-stone-300 dark:border-gray-700">
                    <span className="text-sm sm:text-base items-end">{match.team2.team}</span>
                    <span className={`w-5 h-5 ${match.team2.flag}`}></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
