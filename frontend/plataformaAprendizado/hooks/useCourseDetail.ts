import { useState, useEffect, useCallback } from "react";
import { CourseDetail, CourseLevel } from "@/types/courseTypes";
import { getAccessToken } from "@/services/authService";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;


export interface UseCourseDetailReturn {
  course: CourseDetail | null;
  levels: CourseLevel[];
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
        const token = await getAccessToken();

        const res = await fetch(`${API_BASE}/api/Courses/${courseId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          }
        });

        if (!res.ok) throw new Error("Não foi possível carregar o curso.");
        const data: CourseDetail = await res.json();
        
        if (!cancelled) setCourse(data);
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

  const levels: CourseLevel[] = (course?.levels ?? []).map((level, index, arr) => {
    const isCompleted = course!.completedLevelIds.includes(level.id);
    const prevCompleted =
      index === 0 || course!.completedLevelIds.includes(arr[index - 1].id);

    let status: CourseLevel["status"] = "locked";
    if (isCompleted) status = "completed";
    else if (prevCompleted) status = "available";

    return { ...level, status };
  });


  const completeLevel = useCallback(
    async (levelId: string) => {
      if (!course) return;
      if (course.completedLevelIds.includes(levelId)) return;

      const level = course.levels.find((l) => l.id === levelId);
      if (!level) return;

      try {
        const token = await getAccessToken();
        
        await fetch(`${API_BASE}/api/Courses/${courseId}/levels/${levelId}/complete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          }
        });
      } catch {
      }

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