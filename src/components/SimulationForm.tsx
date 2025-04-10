import { Team } from "@/data";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

interface MatchScore {
  score1: number;
  score2: number;
}

export default function SimulationForm({ teams, activeGroup, simulatedMatches, setSimulatedMatches, onSimulateStage }: SimulationFormProps) {
  const matches = [
    { stage: 1, team1: teams[0], team2: teams[1], matchId: `${activeGroup}-1-0-1` },
    { stage: 1, team1: teams[2], team2: teams[3], matchId: `${activeGroup}-1-2-3` },

    { stage: 2, team1: teams[3], team2: teams[0], matchId: `${activeGroup}-2-3-0` },
    { stage: 2, team1: teams[2], team2: teams[1], matchId: `${activeGroup}-2-2-1` },

    { stage: 3, team1: teams[2], team2: teams[0], matchId: `${activeGroup}-3-2-0` },
    { stage: 3, team1: teams[3], team2: teams[1], matchId: `${activeGroup}-3-3-1` },
  ];

  const [scores, setScores] = useState<{ [matchId: string]: MatchScore }>(() => {
    return matches.reduce((acc, match) => {
      acc[match.matchId] = { score1: 0, score2: 0 };
      return acc;
    }, {} as { [matchId: string]: MatchScore });
  });
  // STATE UNTUK LACAK STAGE MANA SAJA YANG VISIBLE
  const [visibleStages, setVisibleStages] = useState<number[]>([1]);

  // RESET SCORES PAS GANTI GROUP
  useEffect(() => {
    // setScores({});
    const newScores = matches.reduce((acc, match) => {
      acc[match.matchId] = { score1: 0, score2: 0 };
      return acc;
    }, {} as { [matchId: string]: MatchScore });

    setScores(newScores);
    setVisibleStages([1]);
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
    // TAMBAH STAGE BERIKUTNYA KE visibleStage
    if (stage === 1) {
      setVisibleStages((prev) => [...prev, 2]);
    } else if (stage === 2) {
      setVisibleStages((prev) => [...prev, 3]);
    }
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
        const isStageVisible = visibleStages.includes(stageNumber);

        if (!isStageVisible) {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
              key={stage}
              className="text-center text-gray-500 dark:text-gray-400 mb-6"
            >
              Stage {stage} Akan Tersedia Setelah Stage {stageNumber - 1}.
            </motion.div>
          );
        }

        return (
          <AnimatePresence key={stage}>
            {isStageVisible && (
              // <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5 }} key={stage} className="mb-6">
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5 }} className="mb-6">
                <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200 mb-2 border-y-2 border-sky-500 dark:border-teal-dark pb-1 uppercase">Stage {stage}</h3>
                <div className="space-y-4">
                  {/* {stages[Number(stage)].map((match) => { */}
                  {stageMatches.map((match) => {
                    const matchId = match.matchId;
                    const score = scores[matchId] || { score1: 0, score2: 0 };
                    const isSimulated = simulatedMatches.has(matchId);

                    return (
                      <div key={matchId} className="flex items-center justify-center gap-4 text-gray-800 dark:text-gray-200 mt-7">
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
                              className="bg-gray-50 border-x-0 border-gray-300 text-center text-gray-900 text-sm focus:ring-blue-300 focus:border-blue-300 block w-10 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-300 dark:focus:border-blue-300"
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
                              className="bg-gray-50 border-x-0 border-gray-300 text-center text-gray-900 text-sm focus:ring-blue-300 focus:border-blue-300 block w-10 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-300 dark:focus:border-blue-300"
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
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}
    </motion.div>
  );
}
