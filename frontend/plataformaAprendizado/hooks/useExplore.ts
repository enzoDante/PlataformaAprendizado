import { useState, useEffect, useCallback } from "react";
import { router } from "expo-router";
import { Colors } from "@/styles/GlobalStyles";
import { CourseDTO } from "@/services/exploreService";
import { MOCK_ENROLLED_COURSES, MOCK_EXPLORE_COURSES } from "./Mockcourses";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CourseLevel = "Iniciante" | "Intermediário" | "Avançado";
export type ExploreCourse = CourseDTO;

export const LEVEL_COLORS: Record<CourseLevel, string> = {
  Iniciante: Colors.accentGreen,
  Intermediário: Colors.accentOrange,
  Avançado: Colors.error,
};

const CATEGORY_ROUTE: Record<string, string> = {
  c:      "/cWorld",
  java:   "/javaWorld",
  python: "/pythonWorld",
  logic:  "/logicWorld",
};

const CATEGORIES = ["Todos", "Programação", "Web", "Mobile", "Banco de Dados"];

export interface EnrollModalState {
  visible: boolean;
  course: ExploreCourse | null;
  enrolling: boolean;
  error: string | null;
}

export interface UseExploreReturn {
  search: string;
  selectedCategory: string;
  categories: string[];
  filteredCourses: ExploreCourse[];
  loading: boolean;
  error: string | null;
  setSearch: (value: string) => void;
  clearSearch: () => void;
  setCategory: (category: string) => void;
  onCoursePress: (course: ExploreCourse) => void;
  checkingEnrollment: boolean;
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
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);

  const [enrollModal, setEnrollModal] = useState<EnrollModalState>({
    visible: false,
    course: null,
    enrolling: false,
    error: null,
  });

  // ── MOCK: carrega cursos e ids matriculados ────────────────────────────────
  // Quando o backend estiver pronto, substituir por:
  // const data = await fetchCourses();
  // const enrolled = await fetchEnrolledCourses(userId);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        await new Promise((res) => setTimeout(res, 400)); // simula latência
        if (!cancelled) {
          setCourses(MOCK_EXPLORE_COURSES);
          setEnrolledIds(MOCK_ENROLLED_COURSES.map((c) => c.id));
        }
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

  // ── Press no card ─────────────────────────────────────────────────────────
  const onCoursePress = useCallback(async (course: ExploreCourse) => {
    try {
      setCheckingEnrollment(true);
      await new Promise((res) => setTimeout(res, 300)); // simula latência

      const enrolled = enrolledIds.includes(course.id);

      if (enrolled) {
        const route = CATEGORY_ROUTE[course.id];
        if (route) router.push(route as any);
      } else {
        setEnrollModal({ visible: true, course, enrolling: false, error: null });
      }
    } catch (e: any) {
      setEnrollModal({ visible: true, course, enrolling: false, error: e.message });
    } finally {
      setCheckingEnrollment(false);
    }
  }, [enrolledIds]);

  // ── Confirma matrícula ────────────────────────────────────────────────────
  const confirmEnroll = useCallback(async () => {
    if (!enrollModal.course) return;
    try {
      setEnrollModal((prev) => ({ ...prev, enrolling: true, error: null }));
      await new Promise((res) => setTimeout(res, 600)); // simula latência

      // Adiciona localmente à lista de matriculados
      setEnrolledIds((prev) => [...prev, enrollModal.course!.id]);

      const route = CATEGORY_ROUTE[enrollModal.course.id];
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

  // ── Fecha modal ───────────────────────────────────────────────────────────
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