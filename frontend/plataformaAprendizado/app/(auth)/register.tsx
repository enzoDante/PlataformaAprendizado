import React, { useState } from "react";
import {
  View, Text, ScrollView, TextInput,
  TouchableOpacity, StyleSheet, ActivityIndicator,
  KeyboardAvoidingView, Platform,
} from "react-native";
import { GlobalStyles, Colors, Typography, Spacing, Radii } from "../../styles/GlobalStyles";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// ── MOCK: simula cadastro sem backend ─────────────────────────────────────────
// Quando o backend estiver pronto, substituir por:
// import { signUp } from "../../services/authService";
async function mockSignUp(username: string, email: string, password: string): Promise<void> {
  await new Promise((res) => setTimeout(res, 800)); // simula latência
  if (email === "dev@laquage.com") {
    throw new Error("E-mail já cadastrado");
  }
}

export default function Register() {
  const [username, setUsername]               = useState("");
  const [email, setEmail]                     = useState("");
  const [password, setPassword]               = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDay, setBirthDay]               = useState("");
  const [birthMonth, setBirthMonth]           = useState("");
  const [birthYear, setBirthYear]             = useState("");

  const [showPassword, setShowPassword]               = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading]                     = useState(false);
  const [apiError, setApiError]                       = useState("");
  const [fieldErrors, setFieldErrors]                 = useState<Record<string, string>>({});

  // ── Validação ────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!username.trim())
      errors.username = "Informe um nome de usuário";
    if (!email.includes("@"))
      errors.email = "Informe um e-mail válido";
    if (password.length < 8)
      errors.password = "A senha deve ter no mínimo 8 caracteres";
    if (confirmPassword !== password)
      errors.confirmPassword = "As senhas não coincidem";

    const day   = parseInt(birthDay);
    const month = parseInt(birthMonth);
    const year  = parseInt(birthYear);
    if (
      !birthDay || !birthMonth || !birthYear ||
      isNaN(day) || isNaN(month) || isNaN(year) ||
      day < 1 || day > 31 ||
      month < 1 || month > 12 ||
      year < 1900 || year > new Date().getFullYear()
    ) {
      errors.birthDate = "Informe uma data de nascimento válida";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleRegister = async () => {
    setApiError("");
    if (!validate()) return;

    setIsLoading(true);
    try {
      await mockSignUp(username, email, password);
      // Quando o backend estiver pronto, trocar por:
      // const birthdateObj = new Date(parseInt(birthYear), parseInt(birthMonth) - 1, parseInt(birthDay));
      // await signUp(username, email, password, birthdateObj);
      alert("Cadastro concluído!")
      router.replace("/");
    } catch (error: any) {
      setApiError(error.message || "Erro ao cadastrar");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
    <View style={GlobalStyles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={GlobalStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Text style={GlobalStyles.headingXL}>Criar Conta</Text>
          <Text style={GlobalStyles.bodySM}>Preencha os dados abaixo para começar</Text>
        </View>

        {/* Erro da API */}
        {!!apiError && (
          <View style={styles.apiErrorBox}>
            <Text style={styles.apiErrorText}>{apiError}</Text>
          </View>
        )}

        {/* Username */}
        <View style={GlobalStyles.inputWrapper}>
          <Text style={GlobalStyles.inputLabel}>Nome de Usuário</Text>
          <TextInput
            style={[GlobalStyles.input, !!fieldErrors.username && GlobalStyles.inputError]}
            placeholder="ex: pedro_laqua"
            placeholderTextColor={Colors.textMuted}
            value={username}
            onChangeText={(v) => { setUsername(v); setFieldErrors((p) => ({ ...p, username: "" })); }}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
          {!!fieldErrors.username && <Text style={GlobalStyles.inputErrorText}>{fieldErrors.username}</Text>}
        </View>

        {/* Email */}
        <View style={GlobalStyles.inputWrapper}>
          <Text style={GlobalStyles.inputLabel}>E-mail</Text>
          <TextInput
            style={[GlobalStyles.input, !!fieldErrors.email && GlobalStyles.inputError]}
            placeholder="seuemail@exemplo.com"
            placeholderTextColor={Colors.textMuted}
            value={email}
            onChangeText={(v) => { setEmail(v); setFieldErrors((p) => ({ ...p, email: "" })); }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
          {!!fieldErrors.email && <Text style={GlobalStyles.inputErrorText}>{fieldErrors.email}</Text>}
        </View>

        {/* Data de nascimento */}
        <View style={GlobalStyles.inputWrapper}>
          <Text style={GlobalStyles.inputLabel}>Data de Nascimento</Text>
          <View style={GlobalStyles.row}>
            <TextInput
              style={[GlobalStyles.input, styles.dateFieldSmall, !!fieldErrors.birthDate && GlobalStyles.inputError]}
              placeholder="DD"
              placeholderTextColor={Colors.textMuted}
              keyboardType="number-pad"
              maxLength={2}
              value={birthDay}
              onChangeText={(v) => { setBirthDay(v); setFieldErrors((p) => ({ ...p, birthDate: "" })); }}
              editable={!isLoading}
            />
            <Text style={styles.dateSep}>/</Text>
            <TextInput
              style={[GlobalStyles.input, styles.dateFieldSmall, !!fieldErrors.birthDate && GlobalStyles.inputError]}
              placeholder="MM"
              placeholderTextColor={Colors.textMuted}
              keyboardType="number-pad"
              maxLength={2}
              value={birthMonth}
              onChangeText={(v) => { setBirthMonth(v); setFieldErrors((p) => ({ ...p, birthDate: "" })); }}
              editable={!isLoading}
            />
            <Text style={styles.dateSep}>/</Text>
            <TextInput
              style={[GlobalStyles.input, styles.dateFieldYear, !!fieldErrors.birthDate && GlobalStyles.inputError]}
              placeholder="ANO"
              placeholderTextColor={Colors.textMuted}
              keyboardType="number-pad"
              maxLength={4}
              value={birthYear}
              onChangeText={(v) => { setBirthYear(v); setFieldErrors((p) => ({ ...p, birthDate: "" })); }}
              editable={!isLoading}
            />
          </View>
          {!!fieldErrors.birthDate && <Text style={GlobalStyles.inputErrorText}>{fieldErrors.birthDate}</Text>}
        </View>

        {/* Senha */}
        <View style={GlobalStyles.inputWrapper}>
          <Text style={GlobalStyles.inputLabel}>Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[GlobalStyles.input, styles.passwordInput, !!fieldErrors.password && GlobalStyles.inputError]}
              placeholder="••••••••"
              placeholderTextColor={Colors.textMuted}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(v) => { setPassword(v); setFieldErrors((p) => ({ ...p, password: "" })); }}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />
            <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={Colors.textMuted} />
            </TouchableOpacity>
          </View>
          {!!fieldErrors.password && <Text style={GlobalStyles.inputErrorText}>{fieldErrors.password}</Text>}
        </View>

        {/* Confirmar senha */}
        <View style={GlobalStyles.inputWrapper}>
          <Text style={GlobalStyles.inputLabel}>Confirmar Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[GlobalStyles.input, styles.passwordInput, !!fieldErrors.confirmPassword && GlobalStyles.inputError]}
              placeholder="••••••••"
              placeholderTextColor={Colors.textMuted}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={(v) => { setConfirmPassword(v); setFieldErrors((p) => ({ ...p, confirmPassword: "" })); }}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />
            <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color={Colors.textMuted} />
            </TouchableOpacity>
          </View>
          {!!fieldErrors.confirmPassword && <Text style={GlobalStyles.inputErrorText}>{fieldErrors.confirmPassword}</Text>}
        </View>

        {/* Botão cadastrar */}
        <TouchableOpacity
          style={[GlobalStyles.buttonPrimary, styles.submitBtn, isLoading && GlobalStyles.buttonDisabled]}
          onPress={handleRegister}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.textOnPrimary} />
          ) : (
            <Text style={GlobalStyles.buttonPrimaryText}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        {/* Link login */}
        <View style={styles.footerLinkRow}>
          <Text style={GlobalStyles.bodySM}>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={GlobalStyles.link}>Faça Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: Spacing.xxl,
    marginBottom: Spacing.xl,
  },
  passwordContainer: { position: "relative" },
  passwordInput: { paddingRight: 48 },
  eyeBtn: {
    position: "absolute",
    right: Spacing.base,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  dateFieldSmall: { flex: 1, textAlign: "center" },
  dateFieldYear: { flex: 1.6, textAlign: "center" },
  dateSep: {
    fontSize: Typography.md,
    color: Colors.textMuted,
    marginHorizontal: Spacing.sm,
  },
  submitBtn: { marginTop: Spacing.md },
  footerLinkRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing.xl,
  },
  apiErrorBox: {
    backgroundColor: Colors.errorLight,
    borderRadius: Radii.md,
    padding: Spacing.base,
    marginBottom: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  apiErrorText: {
    color: Colors.error,
    fontSize: Typography.sm,
    textAlign: "center",
    fontWeight: Typography.medium,
  },
});