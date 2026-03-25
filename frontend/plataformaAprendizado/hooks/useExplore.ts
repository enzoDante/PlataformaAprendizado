import { useState } from "react";
import { Colors } from "@/styles/GlobalStyles";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CourseLevel = "Iniciante" | "Intermediário" | "Avançado";

export interface ExploreCourse {
  id: string;
  title: string;
  instructor: string;
  category: string;
  categoryColor: string;
  rating: number;
  students: string;
  duration: string;
  emoji: string;
  level: CourseLevel;
}

export interface UseExploreReturn {
  search: string;
  selectedCategory: string;
  categories: string[];
  filteredCourses: ExploreCourse[];
  setSearch: (value: string) => void;
  clearSearch: () => void;
  setCategory: (category: string) => void;
  onCoursePress: (course: ExploreCourse) => void;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const LEVEL_COLORS: Record<CourseLevel, string> = {
  Iniciante: Colors.accentGreen,
  Intermediário: Colors.accentOrange,
  Avançado: Colors.error,
};

const CATEGORIES = ["Todos", "Programação", "Web", "Mobile", "Banco de Dados"];

const ALL_COURSES: ExploreCourse[] = [
  {
    id: "1",
    title: "Python",
    instructor: "João Santos",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    rating: 4.9,
    students: "6.921",
    duration: "31h",
    emoji: "🐍",
    level: "Iniciante",
  },
  {
    id: "2",
    title: "Lógica de Programação",
    instructor: "Ana Costa",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    rating: 4.7,
    students: "12.4k",
    duration: "23h",
    emoji: "🧩",
    level: "Iniciante",
  },
  {
    id: "3",
    title: "Java",
    instructor: "Maria Silva",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    rating: 4.8,
    students: "15.2k",
    duration: "40h",
    emoji: "☕",
    level: "Intermediário",
  },
  {
    id: "4",
    title: "C",
    instructor: "Carlos Lima",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    rating: 4.6,
    students: "20.1k",
    duration: "18h",
    emoji: "🌐",
    level: "Iniciante",
  },
  {
    id: "5",
    title: "HTML & CSS",
    instructor: "Pedro Alves",
    category: "Web",
    categoryColor: Colors.accentOrange,
    rating: 4.6,
    students: "18.3k",
    duration: "16h",
    emoji: "🎨",
    level: "Iniciante",
  },
  {
    id: "6",
    title: "React Native",
    instructor: "Lucas Mendes",
    category: "Mobile",
    categoryColor: Colors.accentPurple,
    rating: 4.8,
    students: "7.8k",
    duration: "42h",
    emoji: "📱",
    level: "Intermediário",
  },
  {
    id: "7",
    title: "SQL",
    instructor: "Rafael Souza",
    category: "Banco de Dados",
    categoryColor: Colors.accentGreen,
    rating: 4.5,
    students: "11.6k",
    duration: "20h",
    emoji: "🗄️",
    level: "Iniciante",
  },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useExplore(): UseExploreReturn {
  const [search, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredCourses = ALL_COURSES.filter((course) => {
    const matchesCategory =
      selectedCategory === "Todos" || course.category === selectedCategory;
    const matchesSearch =
      search.trim() === "" ||
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const setSearch = (value: string) => setSearchValue(value);
  const clearSearch = () => setSearchValue("");
  const setCategory = (category: string) => setSelectedCategory(category);
  const onCoursePress = (course: ExploreCourse) => {
    console.log("Course pressed:", course.title);
  };

  return {
    search,
    selectedCategory,
    categories: CATEGORIES,
    filteredCourses,
    setSearch,
    clearSearch,
    setCategory,
    onCoursePress,
  };
}