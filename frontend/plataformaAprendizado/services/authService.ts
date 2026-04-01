import AsyncStorage from "@react-native-async-storage/async-storage";

// ─── Config ───────────────────────────────────────────────────────────────────
// Troque pelo IP da sua máquina quando usar dispositivo físico / Expo Go
// Ex: "http://192.168.1.100:32768"
// Para emulador Android use: "http://10.0.2.2:32768"
const BASE_URL = "http://10.0.2.2:32768";

// ─── AsyncStorage Keys ────────────────────────────────────────────────────────
const KEYS = {
  ACCESS_TOKEN: "@auth:accessToken",
  REFRESH_TOKEN: "@auth:refreshToken",
  USER: "@auth:user",
};

// ─── DTOs ─────────────────────────────────────────────────────────────────────
export interface UserResponseDTO {
  id: number;
  publicId: string;
  username: string;
  email: string;
  birthdate: string;
  accessLevel: string;
}

export interface UserAndTokenResponseDTO extends UserResponseDTO {
  tokenType: string;
  expiresIn: number;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  userNameOrEmail: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  birthdate: string; // formato ISO: "YYYY-MM-DD"
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}/${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const data = await response.json();

  if (!response.ok) {
    // Tenta extrair mensagem de erro do corpo da resposta
    const message =
      data?.message ?? data?.title ?? `Erro ${response.status}`;
    throw new Error(message);
  }

  return data as T;
}

/** Monta o header Authorization com o token salvo. */
async function authHeader(): Promise<Record<string, string>> {
  const token = await AsyncStorage.getItem(KEYS.ACCESS_TOKEN);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ─── Storage helpers ──────────────────────────────────────────────────────────
export async function saveSession(data: UserAndTokenResponseDTO): Promise<void> {
  const { accessToken, refreshToken, ...user } = data;
  await AsyncStorage.multiSet([
    [KEYS.ACCESS_TOKEN, accessToken],
    [KEYS.REFRESH_TOKEN, refreshToken],
    [KEYS.USER, JSON.stringify(user)],
  ]);
}

export async function clearSession(): Promise<void> {
  await AsyncStorage.multiRemove([
    KEYS.ACCESS_TOKEN,
    KEYS.REFRESH_TOKEN,
    KEYS.USER,
  ]);
}

export async function getStoredUser(): Promise<UserResponseDTO | null> {
  const raw = await AsyncStorage.getItem(KEYS.USER);
  return raw ? (JSON.parse(raw) as UserResponseDTO) : null;
}

export async function getAccessToken(): Promise<string | null> {
  return AsyncStorage.getItem(KEYS.ACCESS_TOKEN);
}

export async function getRefreshToken(): Promise<string | null> {
  return AsyncStorage.getItem(KEYS.REFRESH_TOKEN);
}

// ─── Auth API calls ───────────────────────────────────────────────────────────

/**
 * POST /api/Auth/Login
 * Autentica o usuário e salva tokens + dados no AsyncStorage.
 */
export async function login(
  userNameOrEmail: string,
  password: string
): Promise<UserAndTokenResponseDTO> {
  const body: LoginRequest = { userNameOrEmail, password };

  const data = await request<UserAndTokenResponseDTO>("api/Auth/Login", {
    method: "POST",
    body: JSON.stringify(body),
  });

  await saveSession(data);
  return data;
}

/**
 * POST /api/Auth/RefreshToken
 * Renova o accessToken usando o refreshToken salvo.
 * Atualiza os tokens no AsyncStorage automaticamente.
 */
export async function refreshToken(): Promise<UserAndTokenResponseDTO> {
  const storedRefreshToken = await getRefreshToken();

  if (!storedRefreshToken) {
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  const body: RefreshTokenRequest = { refreshToken: storedRefreshToken };

  const data = await request<UserAndTokenResponseDTO>("api/Auth/RefreshToken", {
    method: "POST",
    body: JSON.stringify(body),
  });

  await saveSession(data);
  return data;
}

/**
 * DELETE /api/Auth/LogOut  [Authorize]
 * Encerra a sessão no servidor e limpa o AsyncStorage.
 */
export async function logout(): Promise<void> {
  const storedRefreshToken = await getRefreshToken();

  if (!storedRefreshToken) {
    await clearSession();
    return;
  }

  const headers = await authHeader();
  const body: RefreshTokenRequest = { refreshToken: storedRefreshToken };

  try {
    await request<void>("api/Auth/LogOut", {
      method: "DELETE",
      headers,
      body: JSON.stringify(body),
    });
  } finally {
    // Limpa a sessão local mesmo se a chamada falhar
    await clearSession();
  }
}

/**
 * POST /api/Auth/Revoke  [Authorize]
 * Revoga o refreshToken atual no servidor.
 */
export async function revokeToken(): Promise<void> {
  const storedRefreshToken = await getRefreshToken();

  if (!storedRefreshToken) return;

  const headers = await authHeader();
  const body: RefreshTokenRequest = { refreshToken: storedRefreshToken };

  await request<void>("api/Auth/Revoke", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}

/**
 * POST /api/Auth/SignUp
 * Cria uma nova conta. Retorna UserResponseDTO (sem tokens).
 * O usuário precisará fazer login após o cadastro.
 */
export async function signUp(
  username: string,
  email: string,
  password: string,
  birthdate: Date
): Promise<UserResponseDTO> {
  const body: SignUpRequest = {
    username,
    email,
    password,
    // Formata para "YYYY-MM-DD" sem depender de timezone
    birthdate: birthdate.toISOString().split("T")[0],
  };

  return request<UserResponseDTO>("api/Auth/SignUp", {
    method: "POST",
    body: JSON.stringify(body),
  });
}