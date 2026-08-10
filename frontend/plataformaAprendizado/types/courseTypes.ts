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

// ─── Raw level (vindo da API ou dos mocks) — sem status ──────────────────────

export interface CourseLevel {
  id: string;
  number: number;
  title: string;
  description: string;
  xp: number;
  exercises: LevelExercise[];
}

// ─── Level com status calculado (usado nas telas dos worlds) ─────────────────

export interface CourseLevelWithStatus extends CourseLevel {
  status: LevelStatus;
}

// ─── Course detail (retornado pela API ou pelos mocks) ───────────────────────

export interface CourseDetail {
  id: string;
  title: string;
  emoji: string;
  categoryColor: string;
  totalXp: number;
  completedLevelIds: string[];
  levels: CourseLevel[];
}