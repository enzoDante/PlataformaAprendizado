import { useState } from "react";
import { Colors } from "@/styles/GlobalStyles";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Stat {
  id: string;
  label: string;
  value: number;
  icon: string;
  iconBg: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  categoryColor: string;
  progress: number;
  rating: number;
  students: string;
  duration: string;
  emoji: string;
}

export interface UseHomeReturn {
  userName: string;
  initials: string;
  stats: Stat[];
  enrolledCourses: Course[];
  onCoursePress: (course: Course) => void;
  onSeeAllPress: () => void;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS: Stat[] = [
  {
    id: "enrolled",
    label: "Cursos Inscritos",
    value: 8,
    icon: "🎓",
    iconBg: Colors.primaryLight,
  },
  {
    id: "hours",
    label: "Horas de Estudo",
    value: 47,
    icon: "⏱️",
    iconBg: "#ECFDF5",
  },
  {
    id: "certificates",
    label: "Certificados",
    value: 3,
    icon: "🏅",
    iconBg: "#F5F3FF",
  },
  {
    id: "streak",
    label: "Sequência Diária",
    value: 12,
    icon: "🔥",
    iconBg: "#FFFBEB",
  },
];

const ENROLLED_COURSES: Course[] = [
  {
    id: "1",
    title: "Python",
    instructor: "João Santos",
    category: "Programação",
    progress: 45,
    rating: 4.9,
    students: "6.921",
    duration: "31h",
    emoji: "🐍",
    categoryColor: Colors.accentBlue,
  },
  {
    id: "2",
    title: "Lógica",
    instructor: "Ana Costa",
    category: "Programação",
    progress: 30,
    rating: 4.7,
    students: "12.4k",
    duration: "23h",
    emoji: "🧩",
    categoryColor: Colors.accentPurple,
  },
  {
    id: "3",
    title: "Java",
    instructor: "Maria Silva",
    category: "Programação",
    progress: 65,
    rating: 4.8,
    students: "15.2k",
    duration: "40h",
    emoji: "☕",
    categoryColor: Colors.accentOrange,
  },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useHome(): UseHomeReturn {
  const [userName] = useState("Ana");

  const initials = userName.charAt(0).toUpperCase();

  const onCoursePress = (course: Course) => {
    console.log("Course pressed:", course.title);
  };

  const onSeeAllPress = () => {
    console.log("See all pressed");
  };

  return {
    userName,
    initials,
    stats: STATS,
    enrolledCourses: ENROLLED_COURSES,
    onCoursePress,
    onSeeAllPress,
  };
}