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
import Combobox from "@/components/global/custom-combobox";
import { toast } from "sonner";

const initialRounds: IRoundProps[] = [
  {
    title: "Round One",
    seeds: [
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [
          { id: 1, name: "Team A", score: 7 },
          { id: 2, name: "Team B", score: 6 },
        ],
      },
      {
        id: 2,
        date: new Date().toDateString(),
        teams: [
          { id: 3, name: "Team C", score: 2 },
          { id: 4, name: "Team D", score: 3 },
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
          { id: 5, name: "Winner 1", score: 0 },
          { id: 6, name: "Winner 2", score: 0 },
        ],
      },
    ],
  },
];

export default function BracketPage() {
  const [rounds, setRounds] = useState<IRoundProps[]>(initialRounds);
  const [tabIndex, setTabIndex] = useState(0);

  const teamNames = Array.from(
    new Set(
      initialRounds.flatMap((round) =>
        round.seeds.flatMap((seed) =>
          seed.teams.map((team) => ({
            value: team?.name || "-",
            label: team?.name || "-",
          }))
        )
      )
    )
  );

  const [editingSeed, setEditingSeed] = useState<{
    roundIdx: number;
    seedIdx: number;
  } | null>(null);

  const [teamInputs, setTeamInputs] = useState<string[]>([]);
  const [scoreInputs, setScoreInputs] = useState<number[]>([]);

  const handleEdit = (roundIdx: number, seedIdx: number, seed: ISeedProps) => {
    setEditingSeed({ roundIdx, seedIdx });
    setTeamInputs(seed.teams.map((t) => t.name || ""));
    setScoreInputs(seed.teams.map((t) => t.score ?? 0));
  };

  const handleSave = () => {
    if (editingSeed) {
      const updatedRounds = [...rounds];
      const seed =
        updatedRounds[editingSeed.roundIdx].seeds[editingSeed.seedIdx];
      seed.teams = teamInputs.map((name, idx) => ({
        ...seed.teams[idx],
        name,
        score: scoreInputs[idx],
      }));
      setRounds(updatedRounds);
      setEditingSeed(null);

      toast.success("Updated successfully.");
    }
  };

  const handleChangeSelectTeam = (val: string, idx: number) => {
    const copy = [...teamInputs];
    copy[idx] = val;
    setTeamInputs(copy);
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
      </div>

      {/* Tabs */}
      <div className="flex md:hidden tabs flex-wrap justify-center gap-2 mb-4">
        {rounds.map((r, i) => (
          <Button
            key={r.title}
            variant={tabIndex === i ? "default" : "outline"}
            onClick={() => setTabIndex(i)}
          >
            {r.title}
          </Button>
        ))}
      </div>

      {/* Edit Form */}
      {editingSeed && (
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
          {teamInputs.map((team, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <Combobox
                value={team}
                onChange={(val) => handleChangeSelectTeam(val as string, idx)}
                options={teamNames}
              />

              <Input
                type="number"
                min={0}
                value={scoreInputs[idx]}
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
          <Button onClick={handleSave} className="w-full md:w-fit">
            Save
          </Button>
        </div>
      )}

      {/* Bracket */}
      <div className="bg-card overflow-x-auto py-5">
        <Bracket
          rounds={rounds}
          renderSeedComponent={({
            seed,
            breakpoint,
            seedIndex,
            roundIndex,
          }) => (
            <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
              <SeedItem>
                <div>
                  <SeedTeam
                    style={{
                      backgroundColor:
                        seed.teams[0].score > seed.teams[1].score ? "red" : "",
                    }}
                  >
                    <div>{seed.teams[0].name}</div>
                    <div>{seed.teams[0].score}</div>
                  </SeedTeam>
                  <SeedTeam
                    style={{
                      backgroundColor:
                        seed.teams[1].score > seed.teams[0].score
                          ? "purple"
                          : "",
                    }}
                  >
                    <div>{seed.teams[1].name}</div>
                    <div>{seed.teams[1].score}</div>
                  </SeedTeam>
                </div>
              </SeedItem>
              <div className="text-xs text-center">{seed.date}</div>
              <div className="text-center mt-1">
                <button
                  onClick={() => handleEdit(roundIndex, seedIndex, seed)}
                  className="text-blue-500 text-[10px] hover:underline"
                >
                  Edit
                </button>
              </div>
            </Seed>
          )}
          swipeableProps={{
            enableMouseEvents: true,
            animateHeight: true,
            index: tabIndex,
            onChangeIndex: setTabIndex,
          }}
        />
      </div>
    </div>
  );
}
