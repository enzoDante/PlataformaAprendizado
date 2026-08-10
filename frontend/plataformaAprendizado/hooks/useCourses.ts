import { useState, useEffect, useCallback } from "react";
import { router } from "expo-router";
import { MOCK_ENROLLED_COURSES } from "./Mockcourses";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CourseStatus = "in_progress" | "completed" | "not_started";
export type FilterTab = "Todos" | "Em andamento" | "Concluídos";

export interface EnrolledCourse {
  id: string;
  title: string;
  instructor: string;
  category: string;
  categoryColor: string;
  emoji: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  lastAccessedLesson: string;
  status: CourseStatus;
}

export interface CoursesSummary {
  total: number;
  inProgress: number;
  completed: number;
}

export interface UseCoursesReturn {
  activeFilter: FilterTab;
  filterTabs: FilterTab[];
  filteredCourses: EnrolledCourse[];
  summary: CoursesSummary;
  loading: boolean;
  error: string | null;
  setFilter: (tab: FilterTab) => void;
  onCoursePress: (course: EnrolledCourse) => void;
}

export const FILTER_TABS: FilterTab[] = ["Todos", "Em andamento", "Concluídos"];

const WORLD_ROUTES: Record<string, string> = {
  c:      "/(worlds)/cWorld",
  java:   "/(worlds)/javaWorld",
  python: "/(worlds)/pythonWorld",
  logic:  "/(worlds)/logicWorld",
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCourses(): UseCoursesReturn {
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("Todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        await new Promise((res) => setTimeout(res, 400)); // simula latência
        // ── MOCK: substituir por fetchEnrolledCourses(user.id) quando backend pronto ──
        if (!cancelled) setCourses(MOCK_ENROLLED_COURSES);
      } catch (e: any) {
        if (!cancelled) setError(e.message ?? "Erro ao carregar cursos");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const filteredCourses = courses.filter((course) => {
    if (activeFilter === "Em andamento")
      return course.status === "in_progress" || course.status === "not_started";
    if (activeFilter === "Concluídos")
      return course.status === "completed";
    return true;
  });

  const summary: CoursesSummary = {
    total: courses.length,
    inProgress: courses.filter((c) => c.status === "in_progress").length,
    completed: courses.filter((c) => c.status === "completed").length,
  };

  const onCoursePress = useCallback((course: EnrolledCourse) => {
    const route = WORLD_ROUTES[course.id];
    if (route) router.push(route as any);
  }, []);

  return {
    activeFilter,
    filterTabs: FILTER_TABS,
    filteredCourses,
    summary,
    loading,
    error,
    setFilter: setActiveFilter,
    onCoursePress,
  };
}