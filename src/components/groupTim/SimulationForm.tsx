import initialData, { Team } from "@/data";
import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faSitemap } from "@fortawesome/free-solid-svg-icons";

interface SimulationFormProps {
  teams: Team[];
  activeGroup: string;
  simulatedMatches: { [group: string]: Set<string> };
  setSimulatedMatches: React.Dispatch<React.SetStateAction<{ [group: string]: Set<string> }>>;
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

function generateMatches(teams: Team[], group: string) {
  if (teams.length < 4) {
    console.log("Not enough teams, using initialData as fallback");
    return generateMatches(initialData.groups[group], group); // Fallback ke initialData
  }
  // if (teams.length < 4) return [];
  return [
    { stage: 1, team1: teams[0], team2: teams[1], matchId: `${group}-1-0-1` },
    { stage: 1, team1: teams[2], team2: teams[3], matchId: `${group}-1-2-3` },
    { stage: 2, team1: teams[3], team2: teams[0], matchId: `${group}-2-3-0` },
    { stage: 2, team1: teams[2], team2: teams[1], matchId: `${group}-2-2-1` },
    { stage: 3, team1: teams[2], team2: teams[0], matchId: `${group}-3-2-0` },
    { stage: 3, team1: teams[3], team2: teams[1], matchId: `${group}-3-3-1` },
  ];
}

export default function SimulationForm({ teams: propTeams, activeGroup, simulatedMatches, setSimulatedMatches, onSimulateStage }: SimulationFormProps) {
  const teams = propTeams.length > 0 ? propTeams : initialData.groups[activeGroup];

  const matches = useMemo(() => generateMatches(teams, activeGroup), [teams, activeGroup]);

  const stages = useMemo(() => {
    return matches.reduce((acc, match) => {
      if (!acc[match.stage]) acc[match.stage] = [];
      acc[match.stage].push(match);
      return acc;
    }, {} as { [stage: number]: typeof matches });
  }, [matches]);

  const [scores, setScores] = useState<{ [matchId: string]: MatchScore }>(() => {
    return matches.reduce((acc, match) => {
      acc[match.matchId] = { score1: 0, score2: 0 };
      return acc;
    }, {} as { [matchId: string]: MatchScore });
  });

  const [visibleStages, setVisibleStages] = useState<{ [group: string]: number[] }>({});

  useEffect(() => {
    setVisibleStages((prev) => ({
      ...prev,
      [activeGroup]: prev[activeGroup] ?? [1],
    }));
  }, [activeGroup, matches, setSimulatedMatches]);

  const handleSimulateStage = (stage: number) => {
    const stageMatches = stages[stage];
    if (!stageMatches) return;

    const updatedMatches = stageMatches.map((match) => ({
      ...match,
      score1: scores[match.matchId]?.score1 ?? 0,
      score2: scores[match.matchId]?.score2 ?? 0,
    }));

    // Update scores state
    setScores((prev) => {
      const newScores = { ...prev };
      updatedMatches.forEach((match) => {
        newScores[match.matchId] = {
          score1: match.score1,
          score2: match.score2,
        };
      });
      return newScores;
    });

    // Kirim hasil ke parent
    const stageScores = updatedMatches.map((match) => ({
      matchId: match.matchId,
      team1: match.team1.team,
      score1: match.score1,
      team2: match.team2.team,
      score2: match.score2,
    }));

    onSimulateStage(stageScores);

    setSimulatedMatches((prev) => {
      const currentGroupMatches = prev[activeGroup] ?? new Set<string>();
      updatedMatches.forEach((match) => currentGroupMatches.add(match.matchId));
      return { ...prev, [activeGroup]: currentGroupMatches };
    });

    // Tampilkan stage berikutnya
    if (stage === 1) {
      setVisibleStages((prev) => {
        const current = prev[activeGroup] ?? [];
        const newStages = current.includes(2) ? current : [...current, 2];
        return { ...prev, [activeGroup]: newStages };
      });
    }

    if (stage === 2) {
      setVisibleStages((prev) => {
        const current = prev[activeGroup] ?? [];
        const newStages = current.includes(3) ? current : [...current, 3];
        return { ...prev, [activeGroup]: newStages };
      });
    }
  };

  const handleIncrement = (matchId: string, isScore1: boolean) => {
    setScores((prev) => {
      const score = prev[matchId] || { score1: 0, score2: 0 };
      const newScore1 = isScore1 ? score.score1 + 1 : score.score1;
      const newScore2 = !isScore1 ? score.score2 + 1 : score.score2;
      return { ...prev, [matchId]: { score1: newScore1, score2: newScore2 } };
    });
  };

  const handleDecrement = (matchId: string, isScore1: boolean) => {
    setScores((prev) => {
      const score = prev[matchId] || { score1: 0, score2: 0 };
      const newScore1 = isScore1 ? Math.max(0, score.score1 - 1) : score.score1;
      const newScore2 = !isScore1 ? Math.max(0, score.score2 - 1) : score.score2;
      return { ...prev, [matchId]: { score1: newScore1, score2: newScore2 } };
    });
  };

  return (
    <motion.div className="mt-8 min-h-[25rem]">
      {Object.keys(stages).map((stage) => {
        const stageNumber = Number(stage);
        const stageMatches = stages[stageNumber];
        const isStageVisible = (visibleStages[activeGroup] ?? []).includes(stageNumber);
        const isStageSimulated = stageMatches.every((match) => simulatedMatches[activeGroup]?.has(match.matchId) ?? false);

        const isButtonDisabled = isStageSimulated;

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
              Loading... {stage}
            </motion.div>
          );
        }

        return (
          <AnimatePresence key={stage}>
            {isStageVisible && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                exit={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, scale: 1, height: "auto" }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                className="mb-6"
              >
                <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200 mb-2 border-y-2 border-sky-500 dark:border-teal-dark pb-1 uppercase">Stage {stage}</h3>
                <div className="space-y-4">
                  {stageMatches.map((match) => {
                    const matchId = match.matchId;
                    const score = scores[matchId] || { score1: 0, score2: 0 };
                    const isSimulated = isStageSimulated;

                    return (
                      <div key={matchId} className="flex items-center justify-center gap-4 text-gray-800 dark:text-gray-200 mt-7">
                        {/* Tim 1 */}
                        <div className="flex flex-col items-center gap-1 w-32">
                          <div className="flex items-center gap-2 w-32 justify-start border-b-2 border-stone-300 dark:border-gray-700">
                            <span className={`w-5 h-5 ${match.team1.flag}`}></span>
                            <span className="text-sm sm:text-base">{match.team1.team}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <button
                              type="button"
                              onClick={() => handleDecrement(matchId, true)}
                              disabled={isSimulated}
                              className={`bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 border border-gray-300 rounded-s-sm flex items-center p-1 h-5 ${isSimulated ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <input type="text" value={score.score1} disabled={isSimulated} readOnly className="bg-gray-50 border-x-0 border-gray-300 text-center w-10 py-2 dark:bg-gray-700 dark:border-gray-600 text-sm" />
                            <button
                              type="button"
                              onClick={() => handleIncrement(matchId, true)}
                              disabled={isSimulated}
                              className={`bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 border border-gray-300 rounded-e-sm flex items-center p-1 h-5 ${isSimulated ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                        </div>

                        <span className="text-gray-500 dark:text-gray-400 text-xs p-5">v</span>

                        {/* Tim 2 */}
                        <div className="flex flex-col items-center gap-1 w-32">
                          <div className="flex items-center gap-2 w-32 justify-end border-b-2 border-stone-300 dark:border-gray-700">
                            <span className="text-sm sm:text-base">{match.team2.team}</span>
                            <span className={`w-5 h-5 ${match.team2.flag}`}></span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <button
                              type="button"
                              onClick={() => handleIncrement(matchId, false)}
                              disabled={isSimulated}
                              className={`bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 border border-gray-300 rounded-s-sm flex items-center p-1 h-5 ${isSimulated ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <input type="text" value={score.score2} disabled={isSimulated} readOnly className="bg-gray-50 border-x-0 border-gray-300 text-center w-10 py-2 dark:bg-gray-700 dark:border-gray-600 text-sm" />
                            <button
                              type="button"
                              onClick={() => handleDecrement(matchId, false)}
                              disabled={isSimulated}
                              className={`bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 border border-gray-300 rounded-e-sm flex items-center p-1 h-5 ${isSimulated ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => handleSimulateStage(Number(stage))}
                      disabled={isButtonDisabled}
                      className={`px-4 py-2 rounded text-white uppercase font-bold ${
                        isButtonDisabled ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 dark:bg-teal-dark dark:hover:bg-teal-700"
                      } transition-colors`}
                    >
                      laga <FontAwesomeIcon icon={faSitemap} className="ml-2" />
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
