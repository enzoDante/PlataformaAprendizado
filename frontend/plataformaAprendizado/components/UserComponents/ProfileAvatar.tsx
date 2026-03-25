import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors, Typography, Spacing, Radii } from "@/styles/GlobalStyles";

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProfileAvatarProps {
  initials: string;
  fullName: string;
  email: string;
  onEditPress: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProfileAvatar({
  initials,
  fullName,
  email,
  onEditPress,
}: ProfileAvatarProps) {
  return (
    <View style={styles.container}>
      {/* Avatar circle */}
      <View style={styles.avatarWrapper}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarInitials}>{initials}</Text>
        </View>

        {/* Edit button */}
        <TouchableOpacity
          style={styles.editBtn}
          onPress={onEditPress}
          activeOpacity={0.8}
        >
          <Ionicons name="pencil" size={12} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Name + email */}
      <Text style={[GlobalStyles.headingMD, styles.name]}>{fullName}</Text>
      <Text style={GlobalStyles.bodySM}>{email}</Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
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
  editBtn: {
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
  name: {
    marginBottom: Spacing.xs,
  },
});