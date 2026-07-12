import { useState, useEffect, useCallback } from "react";
import { router } from "expo-router";
import { Colors } from "@/styles/GlobalStyles";
import {
  fetchCourses,
  checkEnrollment,
  enrollInCourse,
  CourseDTO,
} from "@/services/exploreService";
 
// ─── Types ────────────────────────────────────────────────────────────────────
 
export type CourseLevel = "Iniciante" | "Intermediário" | "Avançado";
 
export type ExploreCourse = CourseDTO;
 
export const LEVEL_COLORS: Record<CourseLevel, string> = {
  Iniciante: Colors.accentGreen,
  Intermediário: Colors.accentOrange,
  Avançado: Colors.error,
};
 
// Mapa de categoria → rota (ajuste os paths conforme seu _layout.tsx)
const CATEGORY_ROUTE: Record<string, string> = {
  C:       "/cWorld",
  Java:    "/javaWorld",
  Python:  "/pythonWorld",
  Logic:   "/logicWorld",
};
 
const CATEGORIES = ["Todos", "Programação", "Web", "Mobile", "Banco de Dados"];
 
// ─── Modal state ──────────────────────────────────────────────────────────────
 
export interface EnrollModalState {
  visible: boolean;
  course: ExploreCourse | null;
  enrolling: boolean;   // loading durante a chamada de matrícula
  error: string | null;
}
 
// ─── Return type ──────────────────────────────────────────────────────────────
 
export interface UseExploreReturn {
  // lista + filtros
  search: string;
  selectedCategory: string;
  categories: string[];
  filteredCourses: ExploreCourse[];
  loading: boolean;
  error: string | null;
  // ações de filtro
  setSearch: (value: string) => void;
  clearSearch: () => void;
  setCategory: (category: string) => void;
  // press no card
  onCoursePress: (course: ExploreCourse) => void;
  checkingEnrollment: boolean;
  // modal de matrícula
  enrollModal: EnrollModalState;
  confirmEnroll: () => Promise<void>;
  dismissModal: () => void;
}
 
// ─── Hook ─────────────────────────────────────────────────────────────────────
 
export function useExplore(): UseExploreReturn {
  const [courses, setCourses] = useState<ExploreCourse[]>([]);
  const [search, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkingEnrollment, setCheckingEnrollment] = useState(false);
 
  const [enrollModal, setEnrollModal] = useState<EnrollModalState>({
    visible: false,
    course: null,
    enrolling: false,
    error: null,
  });
 
  // ── Busca cursos do backend ao montar ──────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCourses();
        if (!cancelled) setCourses(data);
      } catch (e: any) {
        if (!cancelled) setError(e.message ?? "Erro ao carregar cursos");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);
 
  // ── Filtro local ──────────────────────────────────────────────────────────
  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "Todos" || course.category === selectedCategory;
    const matchesSearch =
      search.trim() === "" ||
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
 
  // ── Press no card: verifica matrícula ─────────────────────────────────────
  const onCoursePress = useCallback(async (course: ExploreCourse) => {
    try {
      setCheckingEnrollment(true);
      const enrolled = await checkEnrollment(course.id);
 
      if (enrolled) {
        // Já matriculado → navega para a trilha correspondente
        const route = CATEGORY_ROUTE[course.category];
        if (route) {
          router.push(route as any);
        }
      } else {
        // Não matriculado → abre modal de confirmação
        setEnrollModal({ visible: true, course, enrolling: false, error: null });
      }
    } catch (e: any) {
      setEnrollModal({ visible: true, course, enrolling: false, error: e.message });
    } finally {
      setCheckingEnrollment(false);
    }
  }, []);
 
  // ── Confirma matrícula no modal ───────────────────────────────────────────
  const confirmEnroll = useCallback(async () => {
    if (!enrollModal.course) return;
    try {
      setEnrollModal((prev) => ({ ...prev, enrolling: true, error: null }));
      await enrollInCourse(enrollModal.course.id);
      // Matrícula OK → fecha modal e navega
      const route = CATEGORY_ROUTE[enrollModal.course.category];
      setEnrollModal({ visible: false, course: null, enrolling: false, error: null });
      if (route) router.push(route as any);
    } catch (e: any) {
      setEnrollModal((prev) => ({
        ...prev,
        enrolling: false,
        error: e.message ?? "Erro ao se matricular",
      }));
    }
  }, [enrollModal.course]);
 
  // ── Fecha modal sem fazer nada ────────────────────────────────────────────
  const dismissModal = useCallback(() => {
    setEnrollModal({ visible: false, course: null, enrolling: false, error: null });
  }, []);
 
  return {
    search,
    selectedCategory,
    categories: CATEGORIES,
    filteredCourses,
    loading,
    error,
    setSearch: setSearchValue,
    clearSearch: () => setSearchValue(""),
    setCategory: setSelectedCategory,
    onCoursePress,
    checkingEnrollment,
    enrollModal,
    confirmEnroll,
    dismissModal,
  };
}