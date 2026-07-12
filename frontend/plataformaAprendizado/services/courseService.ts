import { getAccessToken } from "./authService";
import { CourseLevel } from "@/types/courseTypes";
import { EnrolledCourse } from "@/hooks/useCourses";
 
const API_BASE = process.env.EXPO_PUBLIC_API_URL;
 
// ─── Auth header helper ───────────────────────────────────────────────────────
 
async function authHeaders(): Promise<Record<string, string>> {
  const token = await getAccessToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
 
// ─── Endpoints ────────────────────────────────────────────────────────────────
 
/** Busca todos os cursos em que o usuário está matriculado. */
export async function fetchEnrolledCourses(userId: number): Promise<EnrolledCourse[]> {
  const headers = await authHeaders();
  const res = await fetch(`${API_BASE}/api/UsersGames/enrolled?userId=${userId}`, {
    method: "GET",
    headers,
  });
  if (!res.ok) throw new Error(`Erro ao buscar cursos matriculados: ${res.status}`);
  return res.json();
}
 
/** Verifica se o usuário está matriculado em um curso específico. */
export async function checkEnrollmentStatus(userId: number, gameId: number): Promise<boolean> {
  const headers = await authHeaders();
  const res = await fetch(
    `${API_BASE}/api/UsersGames/Check?userId=${userId}&gameId=${gameId}`,
    { method: "GET", headers }
  );
  if (!res.ok) throw new Error(`Erro ao verificar inscrição: ${res.status}`);
  const data = await res.json();
  return !!data.isEnrolled;
}
 
/** Busca os detalhes e exercícios de uma fase. */
export async function getLevelDetails(mundoId: string, faseId: string): Promise<CourseLevel> {
  const headers = await authHeaders();
  const res = await fetch(`${API_BASE}/api/GameAdmin/Class/${mundoId}/${faseId}`, {
    method: "GET",
    headers,
  });
  if (!res.ok) throw new Error(`Erro ao carregar fase: ${res.status}`);
  return res.json() as Promise<CourseLevel>;
}
 