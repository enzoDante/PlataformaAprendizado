import { useState, useEffect, useCallback } from "react";
import { CourseDetail, CourseLevel } from "@/types/courseTypes";

// ─── Replace with your real base URL ─────────────────────────────────────────
const API_BASE = "https://your-api.com";

// ─── Hook ─────────────────────────────────────────────────────────────────────

export interface UseCourseDetailReturn {
  course: CourseDetail | null;
  levels: CourseLevel[];           // levels with computed status
  totalXp: number;
  completedCount: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  completeLevel: (levelId: string) => Promise<void>;
}

export function useCourseDetail(courseId: string): UseCourseDetailReturn {
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchTick, setFetchTick] = useState(0);

  // ── Fetch course from API ─────────────────────────────────────────────────

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await global.fetch(`${API_BASE}/courses/${courseId}`);
        if (!res.ok) throw new Error("Não foi possível carregar o curso.");
        const data: CourseDetail = await res.json();
        if (!cancelled) setCourse(data);
      } catch (e: any) {
        if (!cancelled) setError(e.message ?? "Erro desconhecido.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetch();
    return () => { cancelled = true; };
  }, [courseId, fetchTick]);

  const refetch = useCallback(() => setFetchTick((t) => t + 1), []);

  // ── Derive levels with computed status ────────────────────────────────────
  // The API returns completedLevelIds; status is calculated here so the UI
  // doesn't need to worry about it.

  const levels: CourseLevel[] = (course?.levels ?? []).map((level, index, arr) => {
    const isCompleted = course!.completedLevelIds.includes(level.id);
    const prevCompleted =
      index === 0 || course!.completedLevelIds.includes(arr[index - 1].id);

    let status: CourseLevel["status"] = "locked";
    if (isCompleted) status = "completed";
    else if (prevCompleted) status = "available";

    return { ...level, status };
  });

  // ── Mark level as complete (call API, then update local state) ────────────

  const completeLevel = useCallback(
    async (levelId: string) => {
      if (!course) return;
      if (course.completedLevelIds.includes(levelId)) return;

      const level = course.levels.find((l) => l.id === levelId);
      if (!level) return;

      try {
        await global.fetch(`${API_BASE}/courses/${courseId}/levels/${levelId}/complete`, {
          method: "POST",
        });
      } catch {
        // Optimistic update already applied — silently ignore network errors
      }

      // Optimistic update: reflect completion immediately in the UI
      setCourse((prev) =>
        prev
          ? {
              ...prev,
              completedLevelIds: [...prev.completedLevelIds, levelId],
              totalXp: prev.totalXp + level.xp,
            }
          : prev
      );
    },
    [course, courseId]
  );

  return {
    course,
    levels,
    totalXp: course?.totalXp ?? 0,
    completedCount: course?.completedLevelIds.length ?? 0,
    isLoading,
    error,
    refetch,
    completeLevel,
  };
}