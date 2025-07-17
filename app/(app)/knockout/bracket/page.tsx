"use client";

import { Trophy } from "lucide-react";
import React, { useState } from "react";
import {
  Bracket,
  Seed,
  SeedItem,
  SeedTeam,
  IRoundProps,
  ISeedProps,
} from "react-brackets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const initialRounds: IRoundProps[] = [
  {
    title: "Round 1",
    seeds: [
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [
          { name: "Alice", score: 1 },
          { name: "Bob", score: 0 },
        ],
      },
      {
        id: 2,
        date: new Date().toDateString(),
        teams: [
          { name: "Charlie", score: 2 },
          { name: "Diana", score: 3 },
        ],
      },
    ],
  },
  {
    title: "Final",
    seeds: [
      {
        id: 3,
        date: new Date().toDateString(),
        teams: [
          { name: "Finalist 1", score: 0 },
          { name: "Finalist 2", score: 0 },
        ],
      },
    ],
  },
];

export default function BracketPage() {
  const [rounds, setRounds] = useState<IRoundProps[]>(initialRounds);
  const [editingSeed, setEditingSeed] = useState<{
    roundIdx: number;
    seedIdx: number;
  } | null>(null);
  const [teamInputs, setTeamInputs] = useState<string[]>([]);
  const [scoreInputs, setScoreInputs] = useState<number[]>([]);

  const handleEdit = (roundIdx: number, seedIdx: number, seed: ISeedProps) => {
    setEditingSeed({ roundIdx, seedIdx });
    setTeamInputs(seed.teams.map((t) => t?.name || ""));
    setScoreInputs(seed.teams.map((t) => t?.score ?? 0));
  };

  const handleSave = () => {
    if (editingSeed) {
      const newRounds = [...rounds];
      const seed = newRounds[editingSeed.roundIdx].seeds[editingSeed.seedIdx];
      seed.teams = teamInputs.map((name, idx) => ({
        name,
        score: scoreInputs[idx],
      }));
      setRounds(newRounds);
      setEditingSeed(null);
    }
  };

  const generateRandomBracket = () => {
    const participants = Array.from({ length: 8 }, (_, i) => ({
      name: `Team ${i + 1}`,
      score: Math.floor(Math.random() * 5),
    }));

    const shuffled = participants.sort(() => Math.random() - 0.5);

    const round1Seeds: ISeedProps[] = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      round1Seeds.push({
        id: i / 2 + 1,
        date: new Date().toDateString(),
        teams: [shuffled[i], shuffled[i + 1]],
      });
    }

    const semifinalSeeds: ISeedProps[] = [
      {
        id: 5,
        date: new Date().toDateString(),
        teams: [
          { name: "Winner 1", score: 0 },
          { name: "Winner 2", score: 0 },
        ],
      },
      {
        id: 6,
        date: new Date().toDateString(),
        teams: [
          { name: "Winner 3", score: 0 },
          { name: "Winner 4", score: 0 },
        ],
      },
    ];

    const final: ISeedProps[] = [
      {
        id: 7,
        date: new Date().toDateString(),
        teams: [
          { name: "Finalist 1", score: 0 },
          { name: "Finalist 2", score: 0 },
        ],
      },
    ];

    setRounds([
      { title: "Round 1", seeds: round1Seeds },
      { title: "Semifinal", seeds: semifinalSeeds },
      { title: "Final", seeds: final },
    ]);
  };

  return (
    <div className="min-h-full pt-10 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white">
          <Trophy className="h-8 w-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Knockout Bracket
        </h1>
        <Button
          className="w-full ml-auto sm:w-auto"
          onClick={generateRandomBracket}
        >
          Generate Random Bracket
        </Button>
      </div>

      {/* Edit Form */}
      {editingSeed !== null && (
        <div className="flex flex-row flex-wrap justify-center gap-4 mb-4">
          {teamInputs.map((team, idx) => (
            <div key={idx} className="flex flex-row gap-2 items-center">
              <Input
                value={team}
                onChange={(e) => {
                  const copy = [...teamInputs];
                  copy[idx] = e.target.value;
                  setTeamInputs(copy);
                }}
                placeholder={`Team ${idx + 1}`}
                className="w-40"
              />
              <Input
                type="number"
                value={scoreInputs[idx]}
                min={0}
                onChange={(e) => {
                  const copy = [...scoreInputs];
                  copy[idx] = parseInt(e.target.value);
                  setScoreInputs(copy);
                }}
                className="w-20"
                placeholder="Score"
              />
            </div>
          ))}
          <Button
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={handleSave}
          >
            Save Edit
          </Button>
        </div>
      )}

      {/* Bracket View */}
      <div className="bg-card overflow-x-auto py-5">
        <Bracket
          rounds={rounds}
          bracketClassName="min-w-[600px] sm:min-w-[800px] md:min-w-[1000px] inline-block"
          roundTitleComponent={(title) => (
            <div className="text-center font-semibold text-xs sm:text-sm mb-2 uppercase">
              {title}
            </div>
          )}
          renderSeedComponent={({ seed, roundIndex, seedIndex }) => (
            <CustomSeed
              seed={seed}
              onEdit={() => handleEdit(roundIndex, seedIndex, seed)}
            />
          )}
        />
      </div>
    </div>
  );
}

interface CustomSeedProps {
  seed: ISeedProps;
  onEdit?: () => void;
}

const CustomSeed: React.FC<CustomSeedProps> = ({ seed, onEdit }) => {
  const teamA = seed.teams[0]?.name || "Bye";
  const teamB = seed.teams[1]?.name || "Bye";
  const scoreA = seed.teams[0]?.score ?? "-";
  const scoreB = seed.teams[1]?.score ?? "-";

  return (
    <Seed className="transition-transform">
      <SeedItem className="bg-white shadow-md rounded-lg border border-gray-200 px-3 py-2 space-y-2 w-[180px] sm:w-[200px]">
        <SeedTeam
          className={cn(
            "flex justify-between text-xs sm:text-sm font-medium px-2 py-1 rounded-md",
            {
              "bg-accent text-accent-foreground":
                Number(scoreA) > Number(scoreB),
            }
          )}
        >
          {teamA}
          <span
            className={cn("font-bold text-blue-600", {
              "text-red-600": Number(scoreA) < Number(scoreB),
            })}
          >
            {scoreA}
          </span>
        </SeedTeam>
        <SeedTeam
          className={cn(
            "flex justify-between text-xs sm:text-sm font-medium px-2 py-1 rounded-md",
            {
              "bg-accent text-accent-foreground":
                Number(scoreA) < Number(scoreB),
            }
          )}
        >
          {teamB}
          <span
            className={cn("font-bold text-blue-600", {
              "text-red-600": Number(scoreA) > Number(scoreB),
            })}
          >
            {scoreB}
          </span>
        </SeedTeam>
        <div className="text-[10px] text-center text-gray-400 pt-1">
          {seed.date}
        </div>
        {onEdit && (
          <button
            onClick={onEdit}
            className="w-full text-[10px] text-center text-blue-500 hover:underline"
          >
            Edit
          </button>
        )}
      </SeedItem>
    </Seed>
  );
};
