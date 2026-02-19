import React from "react";
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

type Gender = "male" | "female" | "other" | "prefer_not" | null;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  gender: Gender;
  showPassword: boolean;
  errors: Record<string, string>;
}

const GENDER_OPTIONS: { label: string; value: Gender }[] = [
  { label: "Masculino", value: "male" },
  { label: "Feminino", value: "female" },
  { label: "Outro", value: "other" },
  { label: "Prefiro não dizer", value: "prefer_not" },
];

export default class Register extends React.Component<{}, FormData> {
  state: FormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    gender: null,
    showPassword: false,
    errors: {},
  };

  handleLogin = () => {
    router.push("/login");
  };

  setField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    this.setState({ [field]: value } as Pick<FormData, K>, () => {
      if (this.state.errors[field as string]) {
        const errors = { ...this.state.errors };
        delete errors[field as string];
        this.setState({ errors });
      }
    });
  };

  validate = (): boolean => {
    const { firstName, lastName, email, password, confirmPassword, birthDay, birthMonth, birthYear, gender } = this.state;
    const errors: Record<string, string> = {};

    if (!firstName.trim()) errors.firstName = "Informe o nome";
    if (!lastName.trim()) errors.lastName = "Informe o sobrenome";
    if (!email.includes("@")) errors.email = "Informe um e-mail válido";
    if (password.length < 8) errors.password = "A senha deve ter no mínimo 8 caracteres";
    if (password !== confirmPassword) errors.confirmPassword = "As senhas não coincidem";
    if (!birthDay || !birthMonth || !birthYear || birthYear.length < 4)
      errors.birthDate = "Informe uma data de nascimento válida";
    if (!gender) errors.gender = "Selecione seu gênero";

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = () => {
    if (this.validate()) {
      console.log("Registro enviado:", this.state);
    }
  };

  renderInput = (
    field: keyof FormData,
    label: string,
    placeholder: string,
    options: {
      keyboardType?: any;
      autoCapitalize?: any;
      secureTextEntry?: boolean;
      maxLength?: number;
      flex?: number;
    } = {}
  ) => {
    const value = this.state[field] as string;
    const error = this.state.errors[field];

    return (
      <View style={[GlobalStyles.inputWrapper, options.flex ? { flex: options.flex } : null]}>
        <Text style={GlobalStyles.inputLabel}>{label}</Text>
        <TextInput
          style={[GlobalStyles.input, !!error && GlobalStyles.inputError]}
          placeholder={placeholder}
          placeholderTextColor={Colors.textMuted}
          value={value}
          onChangeText={(v) => this.setField(field, v as any)}
          keyboardType={options.keyboardType ?? "default"}
          autoCapitalize={options.autoCapitalize ?? "sentences"}
          autoCorrect={false}
          secureTextEntry={options.secureTextEntry}
          maxLength={options.maxLength}
        />
        {!!error && <Text style={GlobalStyles.inputErrorText}>{error}</Text>}
      </View>
    );
  };

  render() {
    const { birthDay, birthMonth, birthYear, gender, showPassword, password, confirmPassword, errors } = this.state;

    return (
      <View style={GlobalStyles.screen}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoBox}>
              <Text style={styles.logoIcon}>📖</Text>
            </View>
            <Text style={styles.brandName}>LaquaGe</Text>
          </View>

          <Text style={styles.pageTitle}>Criar conta</Text>
          <Text style={styles.pageSubtitle}>Preencha os dados abaixo para começar a aprender</Text>

          {/* ── Seção: Nome ── */}
          <Text style={styles.sectionLabel}>Identificação</Text>

          <View style={styles.row}>
            {this.renderInput("firstName", "Nome", "Ana", {
              autoCapitalize: "words",
              flex: 1,
            })}
            <View style={{ width: Spacing.md }} />
            {this.renderInput("lastName", "Sobrenome", "Silva", {
              autoCapitalize: "words",
              flex: 1,
            })}
          </View>

          {this.renderInput("email", "E-mail", "ana@email.com", {
            keyboardType: "email-address",
            autoCapitalize: "none",
          })}

          {/* ── Seção: Segurança ── */}
          <Text style={styles.sectionLabel}>Segurança</Text>

          {/* Senha */}
          <View style={GlobalStyles.inputWrapper}>
            <Text style={GlobalStyles.inputLabel}>Senha</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[
                  GlobalStyles.input,
                  styles.passwordInput,
                  !!errors.password && GlobalStyles.inputError,
                ]}
                placeholder="Mínimo 8 caracteres"
                placeholderTextColor={Colors.textMuted}
                value={password}
                onChangeText={(v) => this.setField("password", v)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => this.setState((s) => ({ showPassword: !s.showPassword }))}
              >
                <Text style={styles.eyeIcon}>{showPassword ? "🙈" : "👁️"}</Text>
              </TouchableOpacity>
            </View>
            {!!errors.password && (
              <Text style={GlobalStyles.inputErrorText}>{errors.password}</Text>
            )}
          </View>

          {/* Confirmar Senha */}
          <View style={GlobalStyles.inputWrapper}>
            <Text style={GlobalStyles.inputLabel}>Confirmar senha</Text>
            <TextInput
              style={[
                GlobalStyles.input,
                !!errors.confirmPassword && GlobalStyles.inputError,
              ]}
              placeholder="Repita a senha"
              placeholderTextColor={Colors.textMuted}
              value={confirmPassword}
              onChangeText={(v) => this.setField("confirmPassword", v)}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            {!!errors.confirmPassword && (
              <Text style={GlobalStyles.inputErrorText}>{errors.confirmPassword}</Text>
            )}
          </View>

          {/* ── Seção: Dados pessoais ── */}
          <Text style={styles.sectionLabel}>Dados pessoais</Text>

          {/* Data de nascimento */}
          <View style={GlobalStyles.inputWrapper}>
            <Text style={GlobalStyles.inputLabel}>Data de nascimento</Text>
            <View style={styles.row}>
              <TextInput
                style={[
                  GlobalStyles.input,
                  styles.dateFieldSmall,
                  !!errors.birthDate && GlobalStyles.inputError,
                ]}
                placeholder="DD"
                placeholderTextColor={Colors.textMuted}
                value={birthDay}
                onChangeText={(v) => this.setField("birthDay", v)}
                keyboardType="numeric"
                maxLength={2}
                textAlign="center"
              />
              <Text style={styles.dateSep}>/</Text>
              <TextInput
                style={[
                  GlobalStyles.input,
                  styles.dateFieldSmall,
                  !!errors.birthDate && GlobalStyles.inputError,
                ]}
                placeholder="MM"
                placeholderTextColor={Colors.textMuted}
                value={birthMonth}
                onChangeText={(v) => this.setField("birthMonth", v)}
                keyboardType="numeric"
                maxLength={2}
                textAlign="center"
              />
              <Text style={styles.dateSep}>/</Text>
              <TextInput
                style={[
                  GlobalStyles.input,
                  styles.dateFieldYear,
                  !!errors.birthDate && GlobalStyles.inputError,
                ]}
                placeholder="AAAA"
                placeholderTextColor={Colors.textMuted}
                value={birthYear}
                onChangeText={(v) => this.setField("birthYear", v)}
                keyboardType="numeric"
                maxLength={4}
                textAlign="center"
              />
            </View>
            {!!errors.birthDate && (
              <Text style={GlobalStyles.inputErrorText}>{errors.birthDate}</Text>
            )}
          </View>

          {/* Gênero */}
          <View style={GlobalStyles.inputWrapper}>
            <Text style={GlobalStyles.inputLabel}>Gênero</Text>
            <View style={styles.genderGrid}>
              {GENDER_OPTIONS.map((opt) => {
                const active = gender === opt.value;
                return (
                  <TouchableOpacity
                    key={opt.value}
                    style={[styles.genderChip, active && styles.genderChipActive]}
                    onPress={() => this.setField("gender", opt.value)}
                    activeOpacity={0.75}
                  >
                    <Text style={[styles.genderChipText, active && styles.genderChipTextActive]}>
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {!!errors.gender && (
              <Text style={GlobalStyles.inputErrorText}>{errors.gender}</Text>
            )}
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={[GlobalStyles.buttonPrimary, styles.submitBtn]}
            onPress={this.handleSubmit}
            activeOpacity={0.85}
          >
            <Text style={GlobalStyles.buttonPrimaryText}>Criar conta</Text>
          </TouchableOpacity>

          {/* Link para login */}
          <View style={[GlobalStyles.row, styles.loginRow]}>
            <Text style={styles.loginText}>Já tem uma conta? </Text>
            <TouchableOpacity
            onPress={this.handleLogin}>
              <Text style={GlobalStyles.link}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Spacing.xxxl,
    marginBottom: Spacing.xl,
  },
  logoBox: {
    width: 36,
    height: 36,
    borderRadius: Radii.md,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  logoIcon: {
    fontSize: 18,
  },
  brandName: {
    fontSize: Typography.md,
    fontWeight: Typography.semiBold,
    color: Colors.primary,
  },

  // Page title
  pageTitle: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  pageSubtitle: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },

  // Section label
  sectionLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.semiBold,
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: Spacing.md,
    marginTop: Spacing.xs,
  },

  // Row
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  // Password toggle
  passwordWrapper: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeBtn: {
    position: "absolute",
    right: Spacing.base,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  eyeIcon: {
    fontSize: 18,
  },

  // Date fields
  dateFieldSmall: {
    flex: 1,
  },
  dateFieldYear: {
    flex: 1.6,
  },
  dateSep: {
    fontSize: Typography.md,
    color: Colors.textMuted,
    marginHorizontal: Spacing.sm,
    marginTop: Spacing.md,
  },

  // Gender chips
  genderGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  genderChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  genderChipActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  genderChipText: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.textSecondary,
  },
  genderChipTextActive: {
    color: Colors.primary,
    fontWeight: Typography.semiBold,
  },

  // Submit
  submitBtn: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.lg,
  },

  // Login row
  loginRow: {
    justifyContent: "center",
  },
  loginText: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
  },
});