"use client";

import { Trophy } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import useBracketStore from "@/stores/bracket";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function BracketPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const [rounds, setRounds] = useState<IRoundProps[]>([]);
  const bracketStore = useBracketStore();
  const router = useRouter();

  const shuffleAndGenerateRounds = () => {
    const allTeams = bracketStore.item?.teams ?? [];

    // Jika tim kurang dari 2, tidak perlu buat bracket
    if (allTeams.length < 2) {
      setRounds([]);
      return;
    }

    // Acak tim
    const shuffled = [...allTeams].sort(() => Math.random() - 0.5);

    // Hitung jumlah ronde berdasarkan tim (log base 2 dibulatkan ke atas)
    const totalRounds = Math.ceil(Math.log2(shuffled.length));
    const paddedSize = 2 ** totalRounds;

    // Tambahkan 'BYE' untuk melengkapi jumlah tim jadi kelipatan 2^n
    while (shuffled.length < paddedSize) {
      shuffled.push({
        id: `bye-${shuffled.length}`,
        name: "BYE",
      });
    }

    const rounds: IRoundProps[] = [];

    for (let roundIndex = 0; roundIndex < totalRounds; roundIndex++) {
      const seeds: ISeedProps[] = [];
      const matchCount = Math.pow(2, totalRounds - roundIndex - 1);

      for (let i = 0; i < matchCount; i++) {
        let team1, team2;

        if (roundIndex === 0) {
          team1 = shuffled[i * 2];
          team2 = shuffled[i * 2 + 1];
        } else {
          // Placeholder untuk winner dari ronde sebelumnya
          team1 = {
            id: `w-${roundIndex}-${i * 2}`,
            name: `Winner ${i * 2 + 1}`,
          };
          team2 = {
            id: `w-${roundIndex}-${i * 2 + 1}`,
            name: `Winner ${i * 2 + 2}`,
          };
        }

        seeds.push({
          id: i + 1,
          date: new Date().toDateString(),
          teams: [
            { id: team1.id, name: team1.name, score: 0 },
            { id: team2.id, name: team2.name, score: 0 },
          ],
        });
      }

      rounds.push({
        title:
          roundIndex === totalRounds - 1 ? "Final" : `Round ${roundIndex + 1}`,
        seeds,
      });
    }

    setRounds(rounds);
  };

  useEffect(() => {
    if (bracketStore.item?.teams?.length) {
      shuffleAndGenerateRounds();
    } else {
      router.push("/knockout");
    }
  }, [bracketStore.item]);

  const teamNames = bracketStore.item
    ? Array.from(
        new Map(
          bracketStore.item.teams.map((team) => [
            team.id,
            {
              value: team.name,
              label: team.name,
            },
          ])
        ).values()
      ).sort((a, b) =>
        a.label.localeCompare(b.label, undefined, { numeric: true })
      )
    : [];

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
      const updatedRounds = rounds.map((round, rIdx) =>
        rIdx === editingSeed.roundIdx
          ? {
              ...round,
              seeds: round.seeds.map((seed, sIdx) =>
                sIdx === editingSeed.seedIdx
                  ? {
                      ...seed,
                      teams: teamInputs.map((name, idx) => ({
                        ...seed.teams[idx],
                        name,
                        score: scoreInputs[idx],
                      })),
                    }
                  : seed
              ),
            }
          : round
      );

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
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5 text-center">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white">
          <Trophy className="h-8 w-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Knockout Bracket
        </h1>
      </div>

      <div className="text-center mb-2">
        <span className="text-sm sm:text-base font-medium text-muted-foreground">
          Tournament Name:{" "}
          <span className="text-primary font-semibold">
            {bracketStore.item?.title}
          </span>
        </span>
      </div>

      {/* Tabs */}
      <div className="flex md:hidden gap-4 mb-4 overflow-x-auto w-full small-scrollbar">
        {rounds.map((r, i) => (
          <button
            key={r.title}
            onClick={() => setTabIndex(i)}
            className={cn(
              "relative px-4 py-2 whitespace-nowrap font-semibold text-sm transition-colors duration-200",
              {
                "text-accent border-b-2 border-accent": tabIndex === i,
                "text-muted-foreground hover:text-accent": tabIndex !== i,
              }
            )}
          >
            {r.title}
          </button>
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
          key={rounds.map((r) => r.title).join("-")}
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
