import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors, Typography, Spacing } from "@/styles/GlobalStyles";
import { ProfileData } from "@/hooks/useProfile";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FieldConfig {
  key: keyof ProfileData;
  label: string;
  placeholder: string;
  keyboardType?: any;
  autoCapitalize?: any;
}

interface ProfileFormProps {
  data: ProfileData;
  isEditing: boolean;
  showPassword: boolean;
  errors: Record<string, string>;
  onChangeField: (field: keyof ProfileData, value: string) => void;
  onTogglePassword: () => void;
}

// ─── Field config ─────────────────────────────────────────────────────────────

const FIELDS: FieldConfig[] = [
  {
    key: "fullName",
    label: "Nome Completo",
    placeholder: "Seu nome completo",
    autoCapitalize: "words",
  },
  {
    key: "email",
    label: "E-mail",
    placeholder: "seuemail@exemplo.com",
    keyboardType: "email-address",
    autoCapitalize: "none",
  },
  {
    key: "birthDate",
    label: "Data de Nascimento",
    placeholder: "DD/MM/AAAA",
    keyboardType: "numeric",
    autoCapitalize: "none",
  },
];

// ─── Sub-component: single field row ─────────────────────────────────────────

interface FieldRowProps {
  label: string;
  value: string;
  isEditing: boolean;
  error?: string;
  placeholder?: string;
  keyboardType?: any;
  autoCapitalize?: any;
  onChangeText: (v: string) => void;
}

function FieldRow({
  label,
  value,
  isEditing,
  error,
  placeholder,
  keyboardType,
  autoCapitalize,
  onChangeText,
}: FieldRowProps) {
  return (
    <View>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isEditing ? (
        <View style={GlobalStyles.inputWrapper}>
          <TextInput
            style={[GlobalStyles.input, !!error && GlobalStyles.inputError]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={Colors.textMuted}
            keyboardType={keyboardType ?? "default"}
            autoCapitalize={autoCapitalize ?? "sentences"}
            autoCorrect={false}
          />
          {!!error && (
            <Text style={GlobalStyles.inputErrorText}>{error}</Text>
          )}
        </View>
      ) : (
        <Text style={[GlobalStyles.bodyBase, styles.fieldValue]}>{value}</Text>
      )}
    </View>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ProfileForm({
  data,
  isEditing,
  showPassword,
  errors,
  onChangeField,
  onTogglePassword,
}: ProfileFormProps) {
  return (
    <View style={[GlobalStyles.card, styles.card]}>
      {/* Standard fields */}
      {FIELDS.map((field, index) => (
        <React.Fragment key={field.key}>
          <FieldRow
            label={field.label}
            value={data[field.key]}
            isEditing={isEditing}
            error={errors[field.key]}
            placeholder={field.placeholder}
            keyboardType={field.keyboardType}
            autoCapitalize={field.autoCapitalize}
            onChangeText={(v) => onChangeField(field.key, v)}
          />
          {index < FIELDS.length && <View style={GlobalStyles.divider} />}
        </React.Fragment>
      ))}

      {/* Password field — special: has visibility toggle */}
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
                value={data.password}
                onChangeText={(v) => onChangeField("password", v)}
                placeholder="Nova senha (opcional)"
                placeholderTextColor={Colors.textMuted}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={onTogglePassword}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={Colors.textMuted}
                />
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
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    padding: Spacing.base,
    marginBottom: Spacing.lg,
  },
  fieldLabel: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  fieldValue: {
    fontWeight: Typography.medium,
    marginBottom: Spacing.xs,
  },
  passwordInput: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  eyeBtn: {
    padding: Spacing.xs,
    justifyContent: "center",
  },
});