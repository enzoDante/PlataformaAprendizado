import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors, Typography, Spacing, Radii } from "@/styles/GlobalStyles";

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProfileActionsProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onLogout: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProfileActions({
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onLogout,
}: ProfileActionsProps) {
  return (
    <View>
      {isEditing ? (
        /* ── Edit mode: Cancel + Save ── */
        <View style={[GlobalStyles.row, styles.editRow]}>
          <TouchableOpacity
            style={[GlobalStyles.buttonSecondary, styles.halfBtn]}
            onPress={onCancel}
            activeOpacity={0.85}
          >
            <Text style={GlobalStyles.buttonSecondaryText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[GlobalStyles.buttonPrimary, styles.halfBtn]}
            onPress={onSave}
            activeOpacity={0.85}
          >
            <Ionicons
              name="checkmark"
              size={16}
              color={Colors.textOnPrimary}
              style={styles.btnIcon}
            />
            <Text style={GlobalStyles.buttonPrimaryText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* ── View mode: Edit profile ── */
        <TouchableOpacity
          style={[GlobalStyles.buttonPrimary, styles.editBtn]}
          onPress={onEdit}
          activeOpacity={0.85}
        >
          <Ionicons
            name="pencil-outline"
            size={15}
            color={Colors.textOnPrimary}
            style={styles.btnIcon}
          />
          <Text style={GlobalStyles.buttonPrimaryText}>Editar perfil</Text>
        </TouchableOpacity>
      )}

      {/* ── Logout ── */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={onLogout}
        activeOpacity={0.75}
      >
        <Ionicons name="log-out-outline" size={16} color={Colors.error} />
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  editBtn: {
    flexDirection: "row",
    marginBottom: Spacing.md,
  },
  editRow: {
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  halfBtn: {
    flex: 1,
    flexDirection: "row",
  },
  btnIcon: {
    marginRight: Spacing.sm,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    marginTop: Spacing.xs,
  },
  logoutText: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.error,
  },
});