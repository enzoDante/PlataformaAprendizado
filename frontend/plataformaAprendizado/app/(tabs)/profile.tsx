import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import {
  GlobalStyles,
  Colors,
  Typography,
  Spacing,
  Radii,
} from "@/styles/GlobalStyles";
import { router } from "expo-router";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProfileState {
  fullName: string;
  email: string;
  birthDate: string;
  password: string;
  showPassword: boolean;
  isEditing: boolean;
  savedName: string;
  savedEmail: string;
  savedBirthDate: string;
  errors: Record<string, string>;
}

// ─── Mock user ────────────────────────────────────────────────────────────────

const MOCK_USER = {
  fullName: "Ana Silva",
  email: "ana.silva@email.com",
  birthDate: "14/03/1998",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default class Profile extends React.Component<{}, ProfileState> {
  state: ProfileState = {
    fullName: MOCK_USER.fullName,
    email: MOCK_USER.email,
    birthDate: MOCK_USER.birthDate,
    password: "",
    showPassword: false,
    isEditing: false,
    savedName: MOCK_USER.fullName,
    savedEmail: MOCK_USER.email,
    savedBirthDate: MOCK_USER.birthDate,
    errors: {},
  };

  // ── Helpers ────────────────────────────────────────────────────────────────

  getInitials = (): string => {
    const parts = this.state.fullName.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0]?.[0]?.toUpperCase() ?? "?";
  };

  validate = (): boolean => {
    const { fullName, email, birthDate } = this.state;
    const errors: Record<string, string> = {};

    if (!fullName.trim()) errors.fullName = "Informe o nome completo";
    if (!email.includes("@")) errors.email = "Informe um e-mail válido";
    if (!birthDate.match(/^\d{2}\/\d{2}\/\d{4}$/))
      errors.birthDate = "Use o formato DD/MM/AAAA";

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  setField = (field: keyof ProfileState, value: string) => {
    const errors = { ...this.state.errors };
    delete errors[field];
    this.setState({ [field]: value, errors } as any);
  };

  // ── Actions ────────────────────────────────────────────────────────────────

  handleEdit = () =>
    this.setState((s) => ({
      isEditing: true,
      savedName: s.fullName,
      savedEmail: s.email,
      savedBirthDate: s.birthDate,
    }));

    handleLogin = () => {
        router.push("/login");
    }

  handleCancel = () =>
    this.setState((s) => ({
      isEditing: false,
      fullName: s.savedName,
      email: s.savedEmail,
      birthDate: s.savedBirthDate,
      password: "",
      errors: {},
    }));

  handleSave = () => {
    if (!this.validate()) return;
    this.setState({ isEditing: false, password: "", errors: {} });
    Alert.alert("Perfil atualizado", "Suas informações foram salvas com sucesso.");
  };

  handleLogout = () =>
    Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: () => this.handleLogin() },
    ]);

  // ── Render helpers ────────────────────────────────────────────────────────

  renderField = (
    label: string,
    field: keyof ProfileState,
    options: {
      placeholder?: string;
      keyboardType?: any;
      autoCapitalize?: any;
    } = {}
  ) => {
    const { isEditing, errors } = this.state;
    const value = this.state[field] as string;
    const hasError = !!errors[field];

    return (
      <View>
        <Text style={styles.fieldLabel}>{label}</Text>
        {isEditing ? (
          <View style={GlobalStyles.inputWrapper}>
            <TextInput
              style={[GlobalStyles.input, hasError && GlobalStyles.inputError]}
              value={value}
              onChangeText={(v) => this.setField(field, v)}
              placeholder={options.placeholder ?? ""}
              placeholderTextColor={Colors.textMuted}
              keyboardType={options.keyboardType ?? "default"}
              autoCapitalize={options.autoCapitalize ?? "words"}
              autoCorrect={false}
            />
            {hasError && (
              <Text style={GlobalStyles.inputErrorText}>{errors[field]}</Text>
            )}
          </View>
        ) : (
          <Text style={[GlobalStyles.bodyBase, styles.fieldValue]}>{value}</Text>
        )}
      </View>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────

  render() {
    const { isEditing, showPassword, password, errors } = this.state;

    return (
      <View style={GlobalStyles.screen}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

        {/* ── Page Header ── */}
        <View style={[GlobalStyles.pageHeader, styles.header]}>
          <Text style={GlobalStyles.pageTitle}>Perfil</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[GlobalStyles.scrollContent, styles.scrollContent]}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Avatar ── */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarInitials}>{this.getInitials()}</Text>
              </View>
              <TouchableOpacity
                style={styles.editAvatarBtn}
                onPress={this.handleEdit}
                activeOpacity={0.8}
              >
                <Text style={styles.editAvatarIcon}>✏️</Text>
              </TouchableOpacity>
            </View>
            <Text style={[GlobalStyles.headingMD, styles.avatarName]}>
              {this.state.fullName}
            </Text>
            <Text style={GlobalStyles.bodySM}>{this.state.email}</Text>
          </View>

          {/* ── Form Card ── */}
          <View style={[GlobalStyles.card, styles.formCard]}>

            {this.renderField("Nome Completo", "fullName", {
              placeholder: "Seu nome completo",
            })}

            <View style={GlobalStyles.divider} />

            {this.renderField("E-mail", "email", {
              placeholder: "seuemail@exemplo.com",
              keyboardType: "email-address",
              autoCapitalize: "none",
            })}

            <View style={GlobalStyles.divider} />

            {this.renderField("Data de Nascimento", "birthDate", {
              placeholder: "DD/MM/AAAA",
              keyboardType: "numeric",
              autoCapitalize: "none",
            })}

            <View style={GlobalStyles.divider} />

            {/* Senha — campo especial com toggle */}
            <View>
              <Text style={styles.fieldLabel}>Senha</Text>
              {isEditing ? (
                <View style={GlobalStyles.inputWrapper}>
                  <View style={GlobalStyles.row}>
                    <TextInput
                      style={[
                        GlobalStyles.input,
                        styles.passwordInput,
                        !!errors.password && GlobalStyles.inputError,
                      ]}
                      value={password}
                      onChangeText={(v) => this.setField("password", v)}
                      placeholder="Nova senha (opcional)"
                      placeholderTextColor={Colors.textMuted}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      style={styles.eyeBtn}
                      onPress={() =>
                        this.setState((s) => ({ showPassword: !s.showPassword }))
                      }
                    >
                      <Text style={styles.eyeIcon}>{showPassword ? "🙈" : "👁️"}</Text>
                    </TouchableOpacity>
                  </View>
                  {!!errors.password && (
                    <Text style={GlobalStyles.inputErrorText}>{errors.password}</Text>
                  )}
                </View>
              ) : (
                <Text style={[GlobalStyles.bodyBase, styles.fieldValue]}>••••••••</Text>
              )}
            </View>
          </View>

          {/* ── Action Buttons ── */}
          {isEditing ? (
            <View style={[GlobalStyles.row, styles.actionRow]}>
              <TouchableOpacity
                style={[GlobalStyles.buttonSecondary, styles.actionBtn]}
                onPress={this.handleCancel}
                activeOpacity={0.85}
              >
                <Text style={GlobalStyles.buttonSecondaryText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[GlobalStyles.buttonPrimary, styles.actionBtn]}
                onPress={this.handleSave}
                activeOpacity={0.85}
              >
                <Text style={GlobalStyles.buttonPrimaryText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[GlobalStyles.buttonPrimary, styles.editBtn]}
              onPress={this.handleEdit}
              activeOpacity={0.85}
            >
              <Text style={GlobalStyles.buttonPrimaryText}>Editar perfil</Text>
            </TouchableOpacity>
          )}

          {/* ── Logout ── */}
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={this.handleLogout}
            activeOpacity={0.75}
          >
            <Text style={styles.logoutText}>Sair da conta</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

// ─── Estilos locais (apenas o que o GlobalStyles não cobre) ───────────────────

const styles = StyleSheet.create({
  // Header
  header: {
    paddingTop: 52,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    alignItems: "center",
  },

  scrollContent: {
    paddingTop: Spacing.xl,
  },

  // Avatar
  avatarSection: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: Spacing.md,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: Radii.full,
    backgroundColor: Colors.primaryLight,
    borderWidth: 3,
    borderColor: Colors.primaryMuted,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitials: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.primary,
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: Radii.full,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editAvatarIcon: {
    fontSize: 13,
  },
  avatarName: {
    marginBottom: Spacing.xs,
  },

  // Form card
  formCard: {
    padding: Spacing.base,
    marginBottom: Spacing.lg,
  },

  // Campos
  fieldLabel: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  fieldValue: {
    fontWeight: Typography.medium,
    marginBottom: Spacing.xs,
  },

  // Senha
  passwordInput: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  eyeBtn: {
    padding: Spacing.xs,
  },
  eyeIcon: {
    fontSize: 18,
  },

  // Botões
  editBtn: {
    marginBottom: Spacing.md,
  },
  actionRow: {
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  actionBtn: {
    flex: 1,
  },

  // Logout
  logoutBtn: {
    alignItems: "center",
    paddingVertical: Spacing.md,
    marginTop: Spacing.xs,
  },
  logoutText: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.error,
  },
});