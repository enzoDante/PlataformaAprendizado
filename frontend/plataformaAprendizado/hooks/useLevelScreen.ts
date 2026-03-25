import { useState } from "react";
import { LevelExercise } from "@/types/courseTypes";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AnswerState = "idle" | "correct" | "wrong";

export interface UseLevelScreenReturn {
  currentExercise: LevelExercise | null;
  currentIndex: number;
  totalExercises: number;
  selectedOptionId: string | null;
  answerState: AnswerState;
  isFinished: boolean;
  correctCount: number;
  progressRatio: number;           // 0–1 for the top progress bar
  selectOption: (optionId: string) => void;
  confirmAnswer: () => void;
  next: () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLevelScreen(exercises: LevelExercise[]): UseLevelScreenReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [isFinished, setIsFinished] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentExercise = exercises[currentIndex] ?? null;
  const totalExercises = exercises.length;
  const progressRatio = totalExercises > 0 ? currentIndex / totalExercises : 0;

  const selectOption = (optionId: string) => {
    if (answerState !== "idle") return;   // locked after confirming
    setSelectedOptionId(optionId);
  };

  const confirmAnswer = () => {
    if (!selectedOptionId || !currentExercise) return;
    const isCorrect = selectedOptionId === currentExercise.correctOptionId;
    setAnswerState(isCorrect ? "correct" : "wrong");
    if (isCorrect) setCorrectCount((c) => c + 1);
  };

  const next = () => {
    if (currentIndex >= totalExercises - 1) {
      setIsFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedOptionId(null);
      setAnswerState("idle");
    }
  };

  return {
    currentExercise,
    currentIndex,
    totalExercises,
    selectedOptionId,
    answerState,
    isFinished,
    correctCount,
    progressRatio,
    selectOption,
    confirmAnswer,
    next,
  };
}