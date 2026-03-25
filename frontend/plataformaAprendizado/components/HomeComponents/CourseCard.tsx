import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors, Typography, Spacing, Radii } from "@/styles/GlobalStyles";
import { Course } from "@/hooks/useHome";

// ─── Props ────────────────────────────────────────────────────────────────────

interface CourseCardProps {
  course: Course;
  onPress: (course: Course) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CourseCard({ course, onPress }: CourseCardProps) {
  return (
    <TouchableOpacity
      style={[GlobalStyles.card, styles.card]}
      onPress={() => onPress(course)}
      activeOpacity={0.85}
    >
      {/* ── Thumbnail ── */}
      <View style={styles.thumbnail}>
        <Text style={styles.thumbnailEmoji}>{course.emoji}</Text>
        <View style={[styles.categoryBadge, { backgroundColor: course.categoryColor }]}>
          <Text style={styles.categoryBadgeText}>{course.category}</Text>
        </View>
      </View>

      {/* ── Info ── */}
      <View style={styles.info}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={GlobalStyles.bodySM}>por {course.instructor}</Text>

        {/* Meta row */}
        <View style={[GlobalStyles.row, styles.meta]}>
          <Ionicons name="star" size={12} color={Colors.accentOrange} />
          <Text style={styles.metaText}> {course.rating}</Text>
          <Text style={styles.metaDot}>  ·  </Text>
          <Ionicons name="people-outline" size={12} color={Colors.textMuted} />
          <Text style={styles.metaText}> {course.students}</Text>
          <Text style={styles.metaDot}>  ·  </Text>
          <Ionicons name="time-outline" size={12} color={Colors.textMuted} />
          <Text style={styles.metaText}> {course.duration}</Text>
        </View>

        {/* Progress */}
        <View style={styles.progressArea}>
          <View style={[GlobalStyles.rowBetween, styles.progressLabelRow]}>
            <Text style={GlobalStyles.bodyXS}>Progresso</Text>
            <Text style={styles.progressPct}>{course.progress}%</Text>
          </View>
          <View style={GlobalStyles.progressTrack}>
            <View
              style={[
                GlobalStyles.progressFill,
                { width: `${course.progress}%` as any },
              ]}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: "hidden",
    marginBottom: Spacing.base,
  },

  // Thumbnail
  thumbnail: {
    height: 140,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  thumbnailEmoji: {
    fontSize: 56,
  },
  categoryBadge: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radii.sm,
  },
  categoryBadgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.semiBold,
    color: Colors.background,
  },

  // Info
  info: {
    padding: Spacing.base,
  },
  title: {
    fontSize: Typography.base,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },

  // Meta
  meta: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  metaText: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
  },
  metaDot: {
    fontSize: Typography.xs,
    color: Colors.textMuted,
  },

  // Progress
  progressArea: {
    gap: Spacing.xs,
  },
  progressLabelRow: {
    marginBottom: 4,
  },
  progressPct: {
    fontSize: Typography.xs,
    fontWeight: Typography.semiBold,
    color: Colors.primary,
  },
});