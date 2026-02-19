import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { GlobalStyles, Colors, Typography, Spacing, Radii } from "../styles/GlobalStyles";
import { router } from "expo-router";

interface LoginState {
  email: string;
  password: string;
  showPassword: boolean;
  emailError: string;
  passwordError: string;
}

export default class Login extends React.Component<{}, LoginState> {
  state: LoginState = {
    email: "",
    password: "",
    showPassword: false,
    emailError: "",
    passwordError: "",
  };

  validate = (): boolean => {
    let valid = true;
    const errors = { emailError: "", passwordError: "" };

    if (!this.state.email.includes("@")) {
      errors.emailError = "Informe um e-mail válido";
      valid = false;
    }
    if (this.state.password.length < 6) {
      errors.passwordError = "A senha deve ter no mínimo 6 caracteres";
      valid = false;
    }

    this.setState(errors);
    return valid;
  };

  handleLogin = () => {
    if (this.validate()) {
      console.log("Login:", { email: this.state.email });
      router.push('/(tabs)/explore')
    }
  };

  handleRegister = () => {
    router.push("/register");
  };

  render() {
    const { email, password, showPassword, emailError, passwordError } = this.state;

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

            {/* E-mail */}
            <View style={GlobalStyles.inputWrapper}>
              <Text style={GlobalStyles.inputLabel}>E-mail</Text>
              <TextInput
                style={[
                  GlobalStyles.input,
                  emailError ? GlobalStyles.inputError : null,
                ]}
                placeholder="seuemail@exemplo.com"
                placeholderTextColor={Colors.textMuted}
                value={email}
                onChangeText={(v) => this.setState({ email: v, emailError: "" })}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
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
                    passwordError ? GlobalStyles.inputError : null,
                  ]}
                  placeholder="••••••••"
                  placeholderTextColor={Colors.textMuted}
                  value={password}
                  onChangeText={(v) => this.setState({ password: v, passwordError: "" })}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => this.setState((s) => ({ showPassword: !s.showPassword }))}
                >
                  <Text style={styles.eyeIcon}>{showPassword ? "🙈" : "👁️"}</Text>
                </TouchableOpacity>
              </View>
              {!!passwordError && (
                <Text style={GlobalStyles.inputErrorText}>{passwordError}</Text>
              )}
            </View>

            {/* Entrar */}
            <TouchableOpacity
              style={[GlobalStyles.buttonPrimary, styles.submitBtn]}
              onPress={this.handleLogin}
              activeOpacity={0.85}
            >
              <Text style={GlobalStyles.buttonPrimaryText}>Entrar</Text>
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
              onPress={this.handleRegister}
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