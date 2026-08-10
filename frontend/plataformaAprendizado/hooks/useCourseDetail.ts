import { useState, useEffect, useCallback } from "react";
import { CourseDetail, CourseLevel, CourseLevelWithStatus } from "@/types/courseTypes";
import { getAccessToken } from "@/services/authService";
import { MOCK_COURSE_DETAILS } from "./Mockcourses";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

export interface UseCourseDetailReturn {
  course: CourseDetail | null;
  levels: CourseLevelWithStatus[];
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

  useEffect(() => {
    let cancelled = false;

    async function fetchCourseData() {
      setIsLoading(true);
      setError(null);
      try {
        // ── MOCK (remover quando o backend estiver pronto) ──
        const data = MOCK_COURSE_DETAILS[courseId];
        if (!data) throw new Error("Curso não encontrado");
        if (!cancelled) setCourse(data);

        // ── BACKEND (descomentar quando o backend estiver pronto) ──
        // const token = await getAccessToken();
        // const res = await fetch(`${API_BASE}/api/Game/${courseId}/sections`, {
        //   headers: {
        //     "Content-Type": "application/json",
        //     ...(token ? { Authorization: `Bearer ${token}` } : {}),
        //   },
        // });
        // if (!res.ok) throw new Error("Não foi possível carregar o curso.");
        // const data: CourseDetail = await res.json();
        // if (!cancelled) setCourse(data);
      } catch (e: any) {
        if (!cancelled) setError(e.message ?? "Erro desconhecido.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchCourseData();
    return () => { cancelled = true; };
  }, [courseId, fetchTick]);

  const refetch = useCallback(() => setFetchTick((t) => t + 1), []);

  // Calcula status de cada level com base nos completedLevelIds
  const levels: CourseLevelWithStatus[] = (course?.levels ?? []).map(
    (level, index, arr): CourseLevelWithStatus => {
      const isCompleted = course!.completedLevelIds.includes(level.id);
      const prevCompleted =
        index === 0 || course!.completedLevelIds.includes(arr[index - 1].id);

      let status: CourseLevelWithStatus["status"] = "locked";
      if (isCompleted) status = "completed";
      else if (prevCompleted) status = "available";

      return { ...level, status };
    }
  );

  const completeLevel = useCallback(
    async (levelId: string) => {
      if (!course) return;
      if (course.completedLevelIds.includes(levelId)) return;

      const level = course.levels.find((l) => l.id === levelId);
      if (!level) return;

      // ── BACKEND (descomentar quando o backend estiver pronto) ──
      // try {
      //   const token = await getAccessToken();
      //   await fetch(`${API_BASE}/api/Game/classes/${levelId}/complete`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       ...(token ? { Authorization: `Bearer ${token}` } : {}),
      //     },
      //   });
      // } catch {}

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