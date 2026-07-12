import { getAccessToken } from "@/services/authService";
 
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
 
// ─── DTOs ─────────────────────────────────────────────────────────────────────
 
export interface CourseDTO {
  id: number;
  title: string;
  instructor: string;
  category: string;       // "Programação" | "Web" | "Mobile" | "Banco de Dados"
  categoryColor: string;
  rating: number;
  students: string;
  duration: string;
  emoji: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
}
 
// ─── Auth header helper ───────────────────────────────────────────────────────
 
async function authHeaders(): Promise<Record<string, string>> {
  const token = await getAccessToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
 
// ─── Endpoints ────────────────────────────────────────────────────────────────
 
/** Busca todos os cursos disponíveis. */
export async function fetchCourses(): Promise<CourseDTO[]> {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/api/courses`, { headers });
  if (!res.ok) throw new Error("Erro ao carregar cursos");
  return res.json();
}
 
/** Verifica se o usuário está matriculado no curso. */
export async function checkEnrollment(courseId: number): Promise<boolean> {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/api/courses/${courseId}/enrollment`, { headers });
  if (!res.ok) throw new Error("Erro ao verificar matrícula");
  const data = await res.json();
  return data.enrolled as boolean;
}
 
/** Matricula o usuário no curso. */
export async function enrollInCourse(courseId: number): Promise<void> {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/api/courses/${courseId}/enroll`, {
    method: "POST",
    headers,
  });
  if (!res.ok) throw new Error("Erro ao realizar matrícula");
}