import { Team } from "@/data";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SimulationFormProps {
  teams: Team[];
  activeGroup: string;
  simulatedMatches: Set<string>;
  setSimulatedMatches: React.Dispatch<React.SetStateAction<Set<string>>>;
  onSimulateStage: (
    stageMatches: Array<{
      matchId: string;
      team1: string;
      score1: number;
      team2: string;
      score2: number;
    }>,
  ) => void;
}

export default function SimulationForm({ teams, activeGroup, simulatedMatches, setSimulatedMatches, onSimulateStage }: SimulationFormProps) {
  const [scores, setScores] = useState<{ [matchId: string]: { score1: number; score2: number } }>({});

  const matches = [
    { stage: 1, team1: teams[0], team2: teams[1], matchId: `${activeGroup}-1-0-1` },
    { stage: 1, team1: teams[2], team2: teams[3], matchId: `${activeGroup}-1-2-3` },

    { stage: 2, team1: teams[3], team2: teams[0], matchId: `${activeGroup}-2-3-0` },
    { stage: 2, team1: teams[2], team2: teams[1], matchId: `${activeGroup}-2-2-1` },

    { stage: 3, team1: teams[2], team2: teams[0], matchId: `${activeGroup}-3-2-0` },
    { stage: 3, team1: teams[3], team2: teams[1], matchId: `${activeGroup}-3-3-1` },
  ];

  // RESET SCORES PAS GANTI GROUP
  useEffect(() => {
    setScores({});
  }, [activeGroup]);

  // UPDATE SKOR DAN PANGGIL onSimulate PAS INPUT BERUBAH
  const handleIncrement = (matchId: string, isScore1: boolean) => {
    setScores((prev) => {
      // KONVERSI KE NUMBER, DEFAULT 0 KALAU KOSONG
      const score = prev[matchId] || { score1: 0, score2: 0 };
      const newScore1 = isScore1 ? score.score1 + 1 : score.score1;
      const newScore2 = !isScore1 ? score.score2 + 1 : score.score2;
      return { ...prev, [matchId]: { score1: newScore1, score2: newScore2 } };
    });
  };
  // UPDATE SKOR DAN PANGGIL onSimulate PAS INPUT BERUBAH
  const handleDecrement = (matchId: string, isScore1: boolean) => {
    setScores((prev) => {
      // KONVERSI KE NUMBER, DEFAULT 0 KALAU KOSONG
      const score = prev[matchId] || { score1: 0, score2: 0 };
      const newScore1 = isScore1 ? Math.max(0, score.score1 - 1) : score.score1;
      const newScore2 = !isScore1 ? Math.max(0, score.score2 - 1) : score.score2;
      return { ...prev, [matchId]: { score1: newScore1, score2: newScore2 } };
    });
  };

  const handleSimulateStage = (stage: number) => {
    const stageMatches = matches.filter((match) => match.stage === stage);
    const stageScores = stageMatches.map((match) => {
      const score = scores[match.matchId] || { score1: 0, score2: 0 };
      return {
        matchId: match.matchId,
        team1: match.team1.team,
        score1: score.score1,
        team2: match.team2.team,
        score2: score.score2,
      };
    });

    onSimulateStage(stageScores);

    setSimulatedMatches((prev) => {
      const newSet = new Set(prev);
      stageMatches.forEach((match) => newSet.add(match.matchId));
      return newSet;
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
      {Object.keys(stages).map((stage) => {
        const stageNumber = Number(stage);
        const stageMatches = stages[stageNumber];
        const isStageSimulated = stageMatches.every((match) => simulatedMatches.has(match.matchId));

        return (
          <div key={stage} className="mb-6">
            <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200 mb-2 border-y-2 border-sky-500 dark:border-teal-dark pb-1 uppercase">Stage {stage}</h3>
            <div className="space-y-4">
              {stages[Number(stage)].map((match) => {
                const matchId = match.matchId;
                const score = scores[matchId] || { score1: 0, score2: 0 };
                const isSimulated = simulatedMatches.has(matchId);

                return (
                  <div key={matchId} className="flex items-center justify-center gap-4 text-gray-800 dark:text-gray-200 mt-5">
                    {/* TIM 1 */}
                    <div className="flex flex-col items-center gap-1 w-32">
                      <div className="flex items-center gap-2 w-32 justify-start border-b-2 border-stone-300 dark:border-gray-700">
                        <span className={`w-5 h-5 ${match.team1.flag}`}></span>
                        <span className="text-sm sm:text-base">{match.team1.team}</span>
                      </div>
                      {/* Counter Tim 1 */}
                      <div className="flex items-center gap-1 mt-1">
                        <button
                          type="button"
                          onClick={() => handleDecrement(matchId, true)}
                          disabled={isSimulated}
                          className={`bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-sm flex items-center p-1 h-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none ${
                            isSimulated ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={score.score1}
                          readOnly
                          className="bg-gray-50 border-x-0 border-gray-300 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-10 h-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleIncrement(matchId, true)}
                          disabled={isSimulated}
                          className={`bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-sm flex items-center p-1 h-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none ${
                            isSimulated ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <span className="text-gray-500 dark:text-gray-400 text-xs p-5 ">v</span>

                    <div className="flex flex-col items-center gap-1 w-32">
                      {/* COUNTER SCORE */}
                      {/* TIM 2 */}
                      <div className="flex items-center gap-2 w-32 justify-end border-b-2 border-stone-300 dark:border-gray-700">
                        <span className="text-sm sm:text-base">{match.team2.team}</span>
                        <span className={`w-5 h-5 ${match.team2.flag}`}></span>
                      </div>
                      {/* Counter Tim 2 */}
                      <div className="flex items-center gap-1 mt-1">
                        <button
                          type="button"
                          onClick={() => handleIncrement(matchId, false)}
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
                          className="bg-gray-50 border-x-0 border-gray-300 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-10 h-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleDecrement(matchId, false)}
                          disabled={isSimulated}
                          className={`bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-sm flex items-center p-1 h-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none ${
                            isSimulated ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* TONBOL SIMULATE STAGE */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handleSimulateStage(stageNumber)}
                  disabled={isStageSimulated}
                  className={`px-4 py-2 rounded text-white ${isStageSimulated ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"} transition-colors`}
                >
                  Simulate Stage {stage}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
