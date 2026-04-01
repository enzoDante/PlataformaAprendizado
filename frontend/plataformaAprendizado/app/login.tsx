import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { GlobalStyles, Colors, Typography, Spacing, Radii } from "../styles/GlobalStyles";
import { router } from "expo-router";
import { login } from "../services/authService"; // ajuste o caminho se necessário

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = (): boolean => {
    let valid = true;

    if (!email.includes("@")) {
      setEmailError("Informe um e-mail válido");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("A senha deve ter no mínimo 6 caracteres");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setIsLoading(true);
    setApiError("");

    try {
      await login(email.trim(), password);
      // Login bem-sucedido — tokens já salvos no AsyncStorage pelo authService
      router.push("/(tabs)/explore");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Ocorreu um erro. Tente novamente.";
      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <View style={GlobalStyles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo / Brand */}
        <View style={styles.brandArea}>
          <View style={styles.logoBox}>
            <Text style={styles.logoIcon}>📖</Text>
          </View>
          <Text style={styles.brandName}>LaquaGe</Text>
          <Text style={styles.brandTagline}>Aprenda programação no seu ritmo</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>Entrar na sua conta</Text>

          {/* Erro global da API */}
          {!!apiError && (
            <View style={styles.apiErrorBox}>
              <Text style={styles.apiErrorText}>{apiError}</Text>
            </View>
          )}

          {/* E-mail */}
          <View style={GlobalStyles.inputWrapper}>
            <Text style={GlobalStyles.inputLabel}>E-mail ou usuário</Text>
            <TextInput
              style={[GlobalStyles.input, !!emailError && GlobalStyles.inputError]}
              placeholder="seuemail@exemplo.com"
              placeholderTextColor={Colors.textMuted}
              value={email}
              onChangeText={(v) => {
                setEmail(v);
                setEmailError("");
                setApiError("");
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />
            {!!emailError && (
              <Text style={GlobalStyles.inputErrorText}>{emailError}</Text>
            )}
          </View>

          {/* Senha */}
          <View style={GlobalStyles.inputWrapper}>
            <View style={GlobalStyles.rowBetween}>
              <Text style={GlobalStyles.inputLabel}>Senha</Text>
              <TouchableOpacity>
                <Text style={GlobalStyles.link}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[
                  GlobalStyles.input,
                  styles.passwordInput,
                  !!passwordError && GlobalStyles.inputError,
                ]}
                placeholder="••••••••"
                placeholderTextColor={Colors.textMuted}
                value={password}
                onChangeText={(v) => {
                  setPassword(v);
                  setPasswordError("");
                  setApiError("");
                }}
                secureTextEntry={!showPassword}
                editable={!isLoading}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword((prev) => !prev)}
                disabled={isLoading}
              >
                <Text style={styles.eyeIcon}>
                  {showPassword ? "🙈" : "👁️"}
                </Text>
              </TouchableOpacity>
            </View>
            {!!passwordError && (
              <Text style={GlobalStyles.inputErrorText}>{passwordError}</Text>
            )}
          </View>

          {/* Entrar */}
          <TouchableOpacity
            style={[
              GlobalStyles.buttonPrimary,
              styles.submitBtn,
              isLoading && styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            activeOpacity={0.85}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={GlobalStyles.buttonPrimaryText}>Entrar</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={GlobalStyles.dividerRow}>
            <View style={GlobalStyles.dividerLine} />
            <Text style={GlobalStyles.dividerText}>ou</Text>
            <View style={GlobalStyles.dividerLine} />
          </View>

          {/* Cadastrar */}
          <TouchableOpacity
            style={GlobalStyles.buttonSecondary}
            activeOpacity={0.85}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={GlobalStyles.buttonSecondaryText}>Criar uma conta</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>
          Ao entrar, você concorda com nossos{" "}
          <Text style={GlobalStyles.link}>Termos de Uso</Text>
          {" "}e{" "}
          <Text style={GlobalStyles.link}>Política de Privacidade</Text>.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxxl,
    justifyContent: "center",
  },

  // Brand
  brandArea: {
    alignItems: "center",
    paddingTop: Spacing.xxxl + Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: Radii.xl,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.base,
  },
  logoIcon: {
    fontSize: 30,
  },
  brandName: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    letterSpacing: 0.5,
  },
  brandTagline: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },

  // Form
  form: {
    marginBottom: Spacing.xl,
  },
  formTitle: {
    fontSize: Typography.md,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xl,
  },
  submitBtn: {
    marginTop: Spacing.xs,
  },
  buttonDisabled: {
    opacity: 0.7,
  },

  // Erro da API
  apiErrorBox: {
    backgroundColor: "#FEE2E2",
    borderRadius: Radii.sm ?? 6,
    padding: Spacing.base,
    marginBottom: Spacing.base,
  },
  apiErrorText: {
    color: "#B91C1C",
    fontSize: Typography.sm,
    textAlign: "center",
  },

  // Password
  passwordWrapper: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeButton: {
    position: "absolute",
    right: Spacing.base,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  eyeIcon: {
    fontSize: 18,
  },

  // Footer
  footerText: {
    fontSize: Typography.xs,
    color: Colors.textMuted,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: Spacing.lg,
  },
});