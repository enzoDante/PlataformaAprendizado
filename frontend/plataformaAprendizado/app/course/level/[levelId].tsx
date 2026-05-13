import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors, Typography, Spacing, Radii } from "@/styles/GlobalStyles";
import { CourseLevel } from "@/types/courseTypes";

// ─── Props ────────────────────────────────────────────────────────────────────

interface LevelCardProps {
  level: CourseLevel;
  accentColor: string;
  onPress: (level: CourseLevel) => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StatusIcon({ status }: { status: CourseLevel["status"] }) {
  if (status === "completed")
    return <Ionicons name="checkmark-circle" size={26} color={Colors.accentGreen} />;
  if (status === "locked")
    return <Ionicons name="lock-closed" size={20} color={Colors.textMuted} />;
  return <Ionicons name="play-circle" size={26} color={Colors.primary} />;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function LevelCard({ level, accentColor, onPress }: LevelCardProps) {
  const isLocked = level.status === "locked";
  const isCompleted = level.status === "completed";

  const circleColor = isLocked
    ? Colors.border
    : isCompleted
    ? Colors.accentGreen
    : accentColor;

  const circleBg = isLocked
    ? Colors.backgroundInput
    : isCompleted
    ? Colors.accentGreen + "18"
    : accentColor + "18";

  return (
    <TouchableOpacity
      style={[
        GlobalStyles.card,
        styles.card,
        isLocked && styles.cardLocked,
        isCompleted && styles.cardCompleted,
      ]}
      onPress={() => !isLocked && onPress(level)}
      activeOpacity={isLocked ? 1 : 0.82}
    >
      {/* Number circle */}
      <View style={[styles.circle, { backgroundColor: circleBg, borderColor: circleColor }]}>
        <Text style={[styles.circleText, { color: circleColor }]}>{level.number}</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text
          style={[GlobalStyles.headingSM, isLocked && styles.mutedText]}
          numberOfLines={1}
        >
          {level.title}
        </Text>
        <Text style={[GlobalStyles.bodySM, styles.description]} numberOfLines={1}>
          {level.description}
        </Text>
        <View style={[GlobalStyles.row, styles.metaRow]}>
          <Ionicons
            name="star"
            size={11}
            color={isLocked ? Colors.textMuted : Colors.accentOrange}
          />
          <Text style={[styles.metaText, isLocked && styles.mutedText]}>
            {" "}{level.xp} XP
          </Text>
          <Text style={styles.metaDot}>  ·  </Text>
          <Ionicons name="book-outline" size={11} color={Colors.textMuted} />
          <Text style={[styles.metaText, isLocked && styles.mutedText]}>
            {" "}{level.exercises.length} exercícios
          </Text>
        </View>
      </View>

      {/* Status icon */}
      <StatusIcon status={level.status} />
    </TouchableOpacity>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  cardLocked: { opacity: 0.55 },
  cardCompleted: { borderColor: Colors.accentGreen + "50" },

  circle: {
    width: 44,
    height: 44,
    borderRadius: Radii.full,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  circleText: {
    fontSize: Typography.md,
    fontWeight: Typography.bold,
  },

  content: { flex: 1 },
  description: { marginTop: 2, marginBottom: Spacing.xs },
  mutedText: { color: Colors.textMuted },

  metaRow: { gap: 2 },
  metaText: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.medium,
  },
  metaDot: { fontSize: Typography.xs, color: Colors.textMuted },
});