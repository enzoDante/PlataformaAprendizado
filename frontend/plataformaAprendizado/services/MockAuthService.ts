import { saveSession, UserAndTokenResponseDTO } from "@/services/authService";

// ─── Conta mockada ────────────────────────────────────────────────────────────

const MOCK_USER: UserAndTokenResponseDTO = {
  id: 1,
  publicId: "mock-public-id-0001",
  username: "devteste",
  email: "dev@laquage.com",
  birthdate: "2000-01-01",
  accessLevel: "User",
  tokenType: "Bearer",
  expiresIn: 3600,
  accessToken: "mock-access-token",
  refreshToken: "mock-refresh-token",
};

// ─── Credenciais aceitas ──────────────────────────────────────────────────────

const MOCK_USERNAME = "devteste";
const MOCK_EMAIL    = "dev@laquage.com";
const MOCK_PASSWORD = "Teste@123";

// ─── Função de login mockado ──────────────────────────────────────────────────

export async function mockLogin(
  userNameOrEmail: string,
  password: string
): Promise<UserAndTokenResponseDTO> {
  await new Promise((res) => setTimeout(res, 600)); // simula latência de rede

  const isValidUser =
    userNameOrEmail === MOCK_USERNAME || userNameOrEmail === MOCK_EMAIL;
  const isValidPassword = password === MOCK_PASSWORD;

  if (!isValidUser || !isValidPassword) {
    throw new Error("Usuário ou senha incorretos");
  }

  await saveSession(MOCK_USER);
  return MOCK_USER;
}