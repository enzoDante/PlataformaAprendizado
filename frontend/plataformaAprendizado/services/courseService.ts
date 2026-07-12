import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAccessToken } from "./authService";
import { CourseLevel } from "@/types/courseTypes";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

export async function checkEnrollmentStatus(userId: number, gameId: number): Promise<boolean> {
  const token = await getAccessToken();
  const url = `${API_BASE}/api/UsersGames/Check?userId=${userId}&gameId=${gameId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao verificar inscrição: ${response.status}`);
  }

  const data = await response.json();

  return !!data.isEnrolled; 
}

export async function getLevelDetails(mundoId: string, faseId: string): Promise<CourseLevel> {

  const token = await getAccessToken();
  
  const url = `${API_BASE}/api/GameAdmin/Class/${mundoId}/${faseId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao carregar fase: ${response.status}`);
  }

  return response.json() as Promise<CourseLevel>;
}