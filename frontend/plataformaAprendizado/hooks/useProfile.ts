import { useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProfileData {
  fullName: string;
  email: string;
  birthDate: string;
  password: string;
}

export interface UseProfileReturn {
  // State
  data: ProfileData;
  isEditing: boolean;
  showPassword: boolean;
  errors: Record<string, string>;

  // Derived
  initials: string;

  // Actions
  setField: (field: keyof ProfileData, value: string) => void;
  startEditing: () => void;
  cancelEditing: () => void;
  saveChanges: () => void;
  toggleShowPassword: () => void;
  logout: () => void;
}

// ─── Mock user ────────────────────────────────────────────────────────────────

const INITIAL_USER: ProfileData = {
  fullName: "Ana Silva",
  email: "ana.silva@email.com",
  birthDate: "14/03/1998",
  password: "",
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useProfile(): UseProfileReturn {
  const [data, setData] = useState<ProfileData>(INITIAL_USER);
  const [snapshot, setSnapshot] = useState<ProfileData>(INITIAL_USER);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ── Derived ──────────────────────────────────────────────────────────────

  const initials = (() => {
    const parts = data.fullName.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0]?.[0]?.toUpperCase() ?? "?";
  })();

  // ── Field update ─────────────────────────────────────────────────────────

  const setField = (field: keyof ProfileData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  // ── Validation ───────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const next: Record<string, string> = {};

    if (!data.fullName.trim())
      next.fullName = "Informe o nome completo";
    if (!data.email.includes("@"))
      next.email = "Informe um e-mail válido";
    if (!data.birthDate.match(/^\d{2}\/\d{2}\/\d{4}$/))
      next.birthDate = "Use o formato DD/MM/AAAA";
    if (data.password.length > 0 && data.password.length < 8)
      next.password = "A senha deve ter no mínimo 8 caracteres";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // ── Actions ──────────────────────────────────────────────────────────────

  const startEditing = () => {
    setSnapshot(data);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setData(snapshot);
    setErrors({});
    setIsEditing(false);
  };

  const saveChanges = () => {
    if (!validate()) return;
    setIsEditing(false);
    setData((prev) => ({ ...prev, password: "" }));
    setErrors({});
    Alert.alert("Perfil atualizado", "Suas informações foram salvas com sucesso.");
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const router = useRouter();

  const logout = () =>
    Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => async () => {
          try {
            // Remove token ou dados de sessão
            await AsyncStorage.removeItem("authToken");
            // Redireciona para a tela de login
            router.replace("/login");
          } catch (error) {
            console.error("Erro ao fazer logout:", error);
          }
      }
    },
    ]);

  return {
    data,
    isEditing,
    showPassword,
    errors,
    initials,
    setField,
    startEditing,
    cancelEditing,
    saveChanges,
    toggleShowPassword,
    logout,
  };
}