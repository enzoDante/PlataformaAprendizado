import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors, Typography, Spacing, Radii } from "@/styles/GlobalStyles";
import { EnrolledCourse, CourseStatus } from "@/hooks/useCourses";

// ─── Props ────────────────────────────────────────────────────────────────────

interface EnrolledCourseCardProps {
  course: EnrolledCourse;
  onPress: (course: EnrolledCourse) => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getProgressColor(progress: number): string {
  return progress === 100 ? Colors.accentGreen : Colors.primary;
}

// ─── Sub-component: status badge ─────────────────────────────────────────────

function StatusBadge({ status }: { status: CourseStatus }) {
  if (status === "completed") {
    return (
      <View style={styles.badgeCompleted}>
        <Ionicons name="checkmark-circle" size={12} color={Colors.accentGreen} />
        <Text style={styles.badgeCompletedText}>Concluído</Text>
      </View>
    );
  }
  if (status === "not_started") {
    return (
      <View style={styles.badgeNotStarted}>
        <Text style={styles.badgeNotStartedText}>Não iniciado</Text>
      </View>
    );
  }
  return (
    <View style={styles.badgeInProgress}>
      <Text style={styles.badgeInProgressText}>Em andamento</Text>
    </View>
  );
}

// ─── Sub-component: resume button ────────────────────────────────────────────

function ResumeButton({
  status,
  onPress,
}: {
  status: CourseStatus;
  onPress: () => void;
}) {
  const isCompleted = status === "completed";
  const isNotStarted = status === "not_started";

  return (
    <TouchableOpacity
      style={[styles.resumeBtn, isCompleted && styles.resumeBtnCompleted]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Ionicons
        name={isCompleted ? "reload-outline" : "play"}
        size={15}
        color={isCompleted ? Colors.primary : Colors.textOnPrimary}
      />
      <Text
        style={[styles.resumeBtnText, isCompleted && styles.resumeBtnTextCompleted]}
      >
        {isCompleted ? "Rever curso" : isNotStarted ? "Começar" : "Retomar"}
      </Text>
    </TouchableOpacity>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function EnrolledCourseCard({ course, onPress }: EnrolledCourseCardProps) {
  const isCompleted = course.status === "completed";
  const isNotStarted = course.status === "not_started";
  const progressColor = getProgressColor(course.progress);

  return (
    <View style={[GlobalStyles.card, styles.card]}>
      {/* ── Header: thumb + info ── */}
      <View style={GlobalStyles.row}>
        <View style={[styles.thumb, { backgroundColor: course.categoryColor + "18" }]}>
          <Text style={styles.thumbEmoji}>{course.emoji}</Text>
        </View>

        <View style={styles.details}>
          <View style={[GlobalStyles.rowBetween, styles.titleRow]}>
            <Text style={[GlobalStyles.headingSM, styles.title]} numberOfLines={1}>
              {course.title}
            </Text>
            <StatusBadge status={course.status} />
          </View>

          <Text style={GlobalStyles.bodySM}>por {course.instructor}</Text>

          <View style={[GlobalStyles.row, styles.meta]}>
            <Ionicons name="book-outline" size={12} color={Colors.textMuted} />
            <Text style={styles.metaText}>
              {" "}{course.completedLessons}/{course.totalLessons} aulas
            </Text>
            <Text style={styles.metaDot}>  ·  </Text>
            <Ionicons name="time-outline" size={12} color={Colors.textMuted} />
            <Text style={styles.metaText}> {course.duration}</Text>
          </View>
        </View>
      </View>

      {/* ── Divider ── */}
      <View style={[GlobalStyles.divider, styles.divider]} />

      {/* ── Progress ── */}
      <View style={styles.progressSection}>
        <View style={[GlobalStyles.rowBetween, styles.progressLabelRow]}>
          <Text style={GlobalStyles.bodyXS}>
            {isCompleted
              ? "Curso concluído! 🎉"
              : isNotStarted
              ? "Comece sua jornada"
              : `Próxima aula: ${course.lastAccessedLesson}`}
          </Text>
          <Text style={[styles.progressPct, { color: progressColor }]}>
            {course.progress}%
          </Text>
        </View>

        <View style={GlobalStyles.progressTrack}>
          <View
            style={[
              GlobalStyles.progressFill,
              { width: `${course.progress}%` as any, backgroundColor: progressColor },
            ]}
          />
        </View>
      </View>

      {/* ── Resume button ── */}
      <ResumeButton status={course.status} onPress={() => onPress(course)} />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
    padding: Spacing.base,
  },

  // Thumb
  thumb: {
    width: 56,
    height: 56,
    borderRadius: Radii.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  thumbEmoji: {
    fontSize: 28,
  },

  // Details
  details: {
    flex: 1,
  },
  titleRow: {
    marginBottom: 2,
  },
  title: {
    flex: 1,
    marginRight: Spacing.sm,
  },

  // Meta
  meta: {
    marginTop: Spacing.xs,
  },
  metaText: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
  },
  metaDot: {
    fontSize: Typography.xs,
    color: Colors.textMuted,
  },

  // Divider
  divider: {
    marginVertical: Spacing.md,
  },

  // Progress
  progressSection: {
    marginBottom: Spacing.md,
  },
  progressLabelRow: {
    marginBottom: Spacing.sm,
  },
  progressPct: {
    fontSize: Typography.xs,
    fontWeight: Typography.semiBold,
  },

  // Status badges
  badgeCompleted: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: Colors.accentGreen + "18",
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radii.full,
  },
  badgeCompletedText: {
    fontSize: Typography.xs,
    fontWeight: Typography.semiBold,
    color: Colors.accentGreen,
  },
  badgeInProgress: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radii.full,
  },
  badgeInProgressText: {
    fontSize: Typography.xs,
    fontWeight: Typography.semiBold,
    color: Colors.primary,
  },
  badgeNotStarted: {
    backgroundColor: Colors.backgroundInput,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radii.full,
  },
  badgeNotStartedText: {
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
    color: Colors.textMuted,
  },

  // Resume button
  resumeBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: Radii.md,
    paddingVertical: Spacing.sm + 2,
  },
  resumeBtnCompleted: {
    backgroundColor: Colors.primaryLight,
  },
  resumeBtnText: {
    fontSize: Typography.sm,
    fontWeight: Typography.semiBold,
    color: Colors.textOnPrimary,
  },
  resumeBtnTextCompleted: {
    color: Colors.primary,
  },
});