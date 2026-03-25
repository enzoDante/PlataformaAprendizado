import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors, Typography, Spacing, Radii } from "@/styles/GlobalStyles";
import { ExploreCourse, LEVEL_COLORS } from "@/hooks/useExplore";

// ─── Props ────────────────────────────────────────────────────────────────────

interface ExploreCourseCardProps {
  course: ExploreCourse;
  onPress: (course: ExploreCourse) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ExploreCourseCard({ course, onPress }: ExploreCourseCardProps) {
  const levelColor = LEVEL_COLORS[course.level];

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
        {/* Title row + level badge */}
        <View style={GlobalStyles.rowBetween}>
          <Text style={[GlobalStyles.headingSM, styles.title]} numberOfLines={1}>
            {course.title}
          </Text>
          <View style={[styles.levelBadge, { backgroundColor: levelColor + "20" }]}>
            <Text style={[styles.levelText, { color: levelColor }]}>
              {course.level}
            </Text>
          </View>
        </View>

        {/* Instructor */}
        <Text style={[GlobalStyles.bodySM, styles.instructor]}>
          por {course.instructor}
        </Text>

        {/* Meta: rating · students · duration */}
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
      </View>
    </TouchableOpacity>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: "hidden",
    marginBottom: Spacing.md,
  },

  // Thumbnail
  thumbnail: {
    height: 120,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  thumbnailEmoji: {
    fontSize: 48,
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
    color: Colors.textOnPrimary,
  },

  // Info
  info: {
    padding: Spacing.md,
  },
  title: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  instructor: {
    marginTop: 2,
    marginBottom: Spacing.sm,
  },

  // Meta
  meta: {
    gap: 2,
  },
  metaText: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
  },
  metaDot: {
    fontSize: Typography.xs,
    color: Colors.textMuted,
  },

  // Level badge
  levelBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radii.sm,
  },
  levelText: {
    fontSize: Typography.xs,
    fontWeight: Typography.semiBold,
  },
});