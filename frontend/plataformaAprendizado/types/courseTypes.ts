// ─── Level status ─────────────────────────────────────────────────────────────

export type LevelStatus = "locked" | "available" | "completed";

// ─── Exercise option ──────────────────────────────────────────────────────────

export interface ExerciseOption {
  id: string;
  text: string;
}

// ─── A single exercise inside a level ────────────────────────────────────────

export interface LevelExercise {
  id: string;
  question: string;
  options: ExerciseOption[];
  correctOptionId: string;
  explanation: string;
}

// ─── A level inside a course ──────────────────────────────────────────────────

export interface CourseLevel {
  id: string;
  number: number;
  title: string;
  description: string;
  xp: number;
  status: LevelStatus;
  exercises: LevelExercise[];
}

// ─── Course detail (returned by the API) ──────────────────────────────────────

export interface CourseDetail {
  id: string;
  title: string;
  emoji: string;
  categoryColor: string;
  totalXp: number;
  completedLevelIds: string[];
  levels: CourseLevel[];
}