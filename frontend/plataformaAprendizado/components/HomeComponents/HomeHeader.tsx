import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles, Colors, Typography, Spacing, Radii } from "@/styles/GlobalStyles";

// ─── Props ────────────────────────────────────────────────────────────────────

interface HomeHeaderProps {
  userName: string;
  initials: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HomeHeader({ userName, initials }: HomeHeaderProps) {
  return (
    <>
      {/* ── Top bar with logo ── */}
      <View style={styles.topBar}>
        <Text style={styles.logo}>📖</Text>
        <Text style={styles.logoTitle}>LaquaGe</Text>
      </View>

      {/* ── Greeting row ── */}
      <View style={[GlobalStyles.rowBetween, styles.greetingRow]}>
        <View>
          <Text style={styles.greetingHello}>Olá, {userName} 👋</Text>
          <Text style={GlobalStyles.bodySM}>Continue de onde parou!</Text>
        </View>

        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      </View>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 52,
    paddingBottom: Spacing.base,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  logo: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  logoTitle: {
    fontSize: Typography.md,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
    letterSpacing: 0.3,
  },
  greetingRow: {
    marginBottom: Spacing.xl,
  },
  greetingHello: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: Radii.full,
    backgroundColor: Colors.primaryLight,
    borderWidth: 2,
    borderColor: Colors.primaryMuted,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: Typography.md,
    fontWeight: Typography.bold,
    color: Colors.primary,
  },
});