import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles, Colors, Typography, Spacing, Radii } from "@/styles/GlobalStyles";
import { Stat } from "@/hooks/useHome";

// ─── Props ────────────────────────────────────────────────────────────────────

interface StatsGridProps {
  stats: Stat[];
}

// ─── Sub-component: single stat card ─────────────────────────────────────────

interface StatCardProps {
  stat: Stat;
}

function StatCard({ stat }: StatCardProps) {
  return (
    <View style={[GlobalStyles.card, styles.card]}>
      <View style={[styles.iconBox, { backgroundColor: stat.iconBg }]}>
        <Text style={styles.icon}>{stat.icon}</Text>
      </View>
      <Text style={styles.label}>{stat.label}</Text>
      <Text style={styles.value}>{stat.value}</Text>
    </View>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <View style={styles.grid}>
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  card: {
    width: "47%",
    padding: Spacing.base,
    gap: Spacing.sm,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: Radii.md,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 18,
  },
  label: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.medium,
  },
  value: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
});