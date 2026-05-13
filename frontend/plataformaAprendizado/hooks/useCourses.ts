import { useState } from "react";
import { Colors } from "@/styles/GlobalStyles";

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
  setFilter: (tab: FilterTab) => void;
  onCoursePress: (course: EnrolledCourse) => void;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const FILTER_TABS: FilterTab[] = ["Todos", "Em andamento", "Concluídos"];

const ENROLLED_COURSES: EnrolledCourse[] = [
  {
    id: "1",
    title: "Python",
    instructor: "João Santos",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    emoji: "🐍",
    progress: 45,
    totalLessons: 62,
    completedLessons: 28,
    duration: "31h",
    lastAccessedLesson: "Funções e Módulos",
    status: "in_progress",
  },
  {
    id: "2",
    title: "Lógica de Programação",
    instructor: "Ana Costa",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    emoji: "🧩",
    progress: 30,
    totalLessons: 40,
    completedLessons: 12,
    duration: "23h",
    lastAccessedLesson: "Estruturas de Repetição",
    status: "in_progress",
  },
  {
    id: "3",
    title: "Java",
    instructor: "Maria Silva",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    emoji: "☕",
    progress: 65,
    totalLessons: 80,
    completedLessons: 52,
    duration: "40h",
    lastAccessedLesson: "Orientação a Objetos",
    status: "in_progress",
  },
  {
    id: "4",
    title: "C",
    instructor: "Carlos Lima",
    category: "Programação",
    categoryColor: Colors.accentOrange,
    emoji: "🌐",
    progress: 100,
    totalLessons: 35,
    completedLessons: 35,
    duration: "18h",
    lastAccessedLesson: "Ponteiros Avançados",
    status: "completed",
  },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCourses(): UseCoursesReturn {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("Todos");

  const filteredCourses = ENROLLED_COURSES.filter((course) => {
    if (activeFilter === "Em andamento")
      return course.status === "in_progress" || course.status === "not_started";
    if (activeFilter === "Concluídos")
      return course.status === "completed";
    return true;
  });

  const summary: CoursesSummary = {
    total: ENROLLED_COURSES.length,
    inProgress: ENROLLED_COURSES.filter((c) => c.status === "in_progress").length,
    completed: ENROLLED_COURSES.filter((c) => c.status === "completed").length,
  };

  const setFilter = (tab: FilterTab) => setActiveFilter(tab);

  const onCoursePress = (course: EnrolledCourse) => {
    console.log("Course pressed:", course.title);
  };

  return {
    activeFilter,
    filterTabs: FILTER_TABS,
    filteredCourses,
    summary,
    setFilter,
    onCoursePress,
  };
}