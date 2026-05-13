import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors, Typography, Spacing, Radii } from "@/styles/GlobalStyles";
import { CourseDetail } from "@/types/courseTypes";

// ─── Props ────────────────────────────────────────────────────────────────────

interface CourseDetailHeaderProps {
  course: CourseDetail;
  completedCount: number;
  totalCount: number;
  totalXp: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CourseDetailHeader({
  course,
  completedCount,
  totalCount,
  totalXp,
}: CourseDetailHeaderProps) {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <View style={styles.container}>
      {/* Emoji */}
      <View style={[styles.emojiBox, { backgroundColor: course.categoryColor + "18" }]}>
        <Text style={styles.emoji}>{course.emoji}</Text>
      </View>

      <Text style={GlobalStyles.headingLG}>{course.title}</Text>

      {/* Stats row */}
      <View style={[GlobalStyles.row, styles.statsRow]}>
        <View style={GlobalStyles.row}>
          <Ionicons name="star" size={14} color={Colors.accentOrange} />
          <Text style={styles.statText}> {totalXp} XP</Text>
        </View>
        <Text style={styles.dot}>·</Text>
        <View style={GlobalStyles.row}>
          <Ionicons name="layers-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.statText}> {completedCount}/{totalCount} níveis</Text>
        </View>
      </View>

      {/* Overall progress bar */}
      <View style={styles.progressWrapper}>
        <View style={[GlobalStyles.rowBetween, styles.progressLabel]}>
          <Text style={GlobalStyles.bodyXS}>Progresso geral</Text>
          <Text style={styles.progressPct}>{percent}%</Text>
        </View>
        <View style={GlobalStyles.progressTrack}>
          <View
            style={[GlobalStyles.progressFill, { width: `${percent}%` as any }]}
          />
        </View>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  emojiBox: {
    width: 72,
    height: 72,
    borderRadius: Radii.xl,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  emoji: { fontSize: 36 },
  statsRow: {
    gap: Spacing.md,
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  statText: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.medium,
  },
  dot: { color: Colors.textMuted },
  progressWrapper: { width: "100%" },
  progressLabel: { marginBottom: Spacing.sm },
  progressPct: {
    fontSize: Typography.xs,
    fontWeight: Typography.semiBold,
    color: Colors.primary,
  },
});