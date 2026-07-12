import { useState, useEffect, useCallback } from "react";
import { Colors } from "@/styles/GlobalStyles";
import { router } from "expo-router";
import { fetchEnrolledCourses } from "@/services/courseService";
import { getStoredUser } from "@/services/authService";
 
// ─── Types ────────────────────────────────────────────────────────────────────
 
export type CourseStatus = "in_progress" | "completed" | "not_started";
export type FilterTab = "Todos" | "Em andamento" | "Concluídos";
 
export interface EnrolledCourse {
  id: string;           // "c" | "java" | "python" | "logic"
  title: string;
  instructor: string;
  category: string;
  categoryColor: string;
  emoji: string;
  progress: number;         // 0–100
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
 
// ─── Constantes ───────────────────────────────────────────────────────────────
 
export const FILTER_TABS: FilterTab[] = ["Todos", "Em andamento", "Concluídos"];
 
// Mapa de courseId → rota do world
const WORLD_ROUTES: Record<string, string> = {
  c:      "/cWorld",
  java:   "/javaWorld",
  python: "/pythonWorld",
  logic:  "/logicWorld",
};
 
// ─── Hook ─────────────────────────────────────────────────────────────────────
 
export function useCourses(): UseCoursesReturn {
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("Todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  // Busca cursos matriculados ao montar
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
 
        const user = await getStoredUser();
        if (!user?.id) {
          router.replace("/login");
          return;
        }
 
        const data = await fetchEnrolledCourses(Number(user.id));
        if (!cancelled) setCourses(data);
      } catch (e: any) {
        if (!cancelled) setError(e.message ?? "Erro ao carregar cursos");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);
 
  // Filtro local
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
 
  // Press: navega direto para o world (já está matriculado por definição)
  const onCoursePress = useCallback((course: EnrolledCourse) => {
    const route = WORLD_ROUTES[course.id];
    if (route) {
      router.push(route as any);
    }
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