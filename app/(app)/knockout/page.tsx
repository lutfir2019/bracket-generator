"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Users,
  Trophy,
  Shuffle,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Target,
  Minus,
} from "lucide-react";
import Combobox from "@/components/global/custom-combobox";
import { toast } from "sonner";
import useBracketStore from "@/stores/bracket";

// Types
type TeamOption = {
  value: number;
  label: string;
};

// Constants
const defaultTeams: TeamOption[] = [
  { value: 2, label: "2 Teams" },
  { value: 4, label: "4 Teams" },
  { value: 8, label: "8 Teams" },
  { value: 16, label: "16 Teams" },
  { value: 32, label: "32 Teams" },
  { value: 64, label: "64 Teams" },
];

function Knockout() {
  const router = useRouter();

  // State
  const [participantCount, setParticipantCount] = useState<number>(4);
  const [names, setNames] = useState<string[]>(["", "", "", ""]);
  const [tournamentName, setTournamentName] = useState<string>("");
  const [selectTeam, setSelectTeam] = useState<number>(4);
  const bracketStore = useBracketStore();

  // Handlers
  const handleCountChange = useCallback(
    (value: number) => {
      const clamped = Math.max(2, Math.min(64, value));
      const evenValue = clamped % 2 === 0 ? clamped : clamped + 1;

      setParticipantCount(evenValue);

      const updatedNames = Array(evenValue)
        .fill("")
        .map((_, i) => names[i] || "");
      setNames(updatedNames);
    },
    [names]
  );

  const handleNameChange = (index: number, value: string) => {
    const updated = [...names];
    updated[index] = value;
    setNames(updated);
  };

  const generateRandomNames = () => {
    const newNames = Array.from(
      { length: participantCount },
      (_, i) => `Team-${i + 1}`
    ).sort(() => Math.random() - 0.5);

    setNames(newNames);
    toast.success("Random team names generated successfully.");
  };

  const addParticipant = () => {
    if (participantCount < 64) {
      handleCountChange(participantCount + 2);
    }
  };

  const removeParticipant = () => {
    if (participantCount > 2) {
      handleCountChange(participantCount - 2);
    }
  };

  const clearAllNames = () => {
    setNames(Array(participantCount).fill(""));
    toast.success("Team names cleared.");
  };

  const handleChangeSelectTeam = (val: number) => {
    setSelectTeam(val);
    handleCountChange(val);
    toast.success("Team count updated.");
  };

  // Derived Values
  const isValid =
    names.every((name) => name.trim() !== "") && tournamentName.trim() !== "";

  const filledCount = names.filter((name) => name.trim() !== "").length;

  const completionPercentage = Math.round(
    (filledCount / participantCount) * 100
  );

  const rounds = Math.round(Math.log2(participantCount));

  const handleGenerateTournament = () => {
    bracketStore.addItem({
      id: String(Date.now()),
      title: tournamentName,
      teams: names.map((name, idx) => ({ id: String(idx), name })),
    });

    toast.success("Generate Tournament Bracket Successfully");

    setTimeout(() => {
      router.push("/knockout/bracket");
    }, 300);
  };

  return (
    <div className="min-h-full">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white">
              <Trophy className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tournament Setup
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Create your knockout tournament bracket in minutes
          </p>
        </div>

        {/* Progress indicator */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Setup Progress
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {completionPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Tournament Info */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Target className="h-5 w-5 text-blue-600" />
                Tournament Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label
                  htmlFor="tournament-name"
                  className="text-sm font-medium"
                >
                  Tournament Name
                </Label>
                <Input
                  id="tournament-name"
                  value={tournamentName}
                  placeholder="Enter tournament name"
                  onChange={(e) => setTournamentName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Participants
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {participantCount}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Rounds
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  >
                    {rounds}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Matches
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                  >
                    {participantCount - 1}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Setup Controls */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Users className="h-5 w-5 text-purple-600" />
                Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label
                  htmlFor="participant-count"
                  className="text-sm font-medium"
                >
                  Number of Participants
                </Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="participant-count"
                    type="number"
                    min={2}
                    max={64}
                    step={2}
                    value={participantCount}
                    onChange={(e) => handleCountChange(Number(e.target.value))}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={removeParticipant}
                    disabled={participantCount <= 2}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={addParticipant}
                    disabled={participantCount >= 64}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Must be even number (2–64)
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Combobox
                  value={selectTeam}
                  onChange={(val) => handleChangeSelectTeam(Number(val))}
                  options={defaultTeams}
                />

                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={generateRandomNames}
                >
                  <Shuffle className="h-4 w-4" />
                  Generate Names
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-red-600 hover:text-red-700"
                  onClick={clearAllNames}
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All Name
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Participants */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Users className="h-5 w-5 text-green-600" />
                Participants
                <div className="ml-auto flex items-center gap-2">
                  {isValid ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  )}
                  <span className="text-sm font-normal text-gray-600 dark:text-gray-300">
                    {filledCount}/{participantCount}
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-y-auto pr-2 space-y-3">
                {Array.from({ length: participantCount }).map((_, i) => (
                  <div key={i} className="space-y-1">
                    <Label
                      htmlFor={`participant-${i}`}
                      className="text-sm font-medium"
                    >
                      Participant {i + 1}
                    </Label>
                    <Input
                      id={`participant-${i}`}
                      value={names[i]}
                      placeholder={`Enter name for participant ${i + 1}`}
                      onChange={(e) => handleNameChange(i, e.target.value)}
                      className={`transition-all duration-200 ${
                        names[i]?.trim()
                          ? "border-green-300 focus:border-green-500"
                          : "border-gray-300 focus:border-blue-500"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generate Button */}
        <div className="max-w-2xl mx-auto mt-8">
          <Button
            size="lg"
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={!isValid}
            onClick={handleGenerateTournament}
          >
            <Trophy className="h-5 w-5 mr-2" />
            Generate Tournament Bracket
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>

          {!isValid && (
            <div className="mt-3 text-center">
              <p className="text-sm text-amber-600 dark:text-amber-400 flex items-center justify-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Please fill in all participant names and tournament name
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Knockout;
