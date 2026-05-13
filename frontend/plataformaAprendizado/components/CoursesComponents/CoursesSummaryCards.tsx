import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles, Colors, Typography, Spacing } from "@/styles/GlobalStyles";
import { CoursesSummary } from "@/hooks/useCourses";

// ─── Props ────────────────────────────────────────────────────────────────────

interface CoursesSummaryCardsProps {
  summary: CoursesSummary;
}

// ─── Sub-component: single summary card ──────────────────────────────────────

interface SummaryCardProps {
  value: number;
  label: string;
  valueColor?: string;
}

function SummaryCard({ value, label, valueColor }: SummaryCardProps) {
  return (
    <View style={[GlobalStyles.card, styles.card]}>
      <Text style={[styles.value, valueColor ? { color: valueColor } : null]}>
        {value}
      </Text>
      <Text style={GlobalStyles.bodyXS}>{label}</Text>
    </View>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CoursesSummaryCards({ summary }: CoursesSummaryCardsProps) {
  return (
    <View style={[GlobalStyles.row, styles.row]}>
      <SummaryCard value={summary.total} label="Total" />
      <SummaryCard
        value={summary.inProgress}
        label="Em andamento"
        valueColor={Colors.primary}
      />
      <SummaryCard
        value={summary.completed}
        label="Concluídos"
        valueColor={Colors.accentGreen}
      />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  row: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  card: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  value: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
});