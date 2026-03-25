import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors, Typography, Spacing, Radii } from "@/styles/GlobalStyles";
import { AnswerState } from "@/hooks/useLevelScreen";

// ─── Props ────────────────────────────────────────────────────────────────────

interface AnswerOptionProps {
  optionId: string;
  text: string;
  isSelected: boolean;
  isCorrect: boolean;               // is this the correct answer?
  answerState: AnswerState;
  onPress: (optionId: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AnswerOption({
  optionId,
  text,
  isSelected,
  isCorrect,
  answerState,
  onPress,
}: AnswerOptionProps) {
  const answered = answerState !== "idle";

  // Determine visual state
  const showCorrect = answered && isCorrect;
  const showWrong = answered && isSelected && !isCorrect;

  const containerStyle = [
    styles.option,
    isSelected && !answered && styles.optionSelected,
    showCorrect && styles.optionCorrect,
    showWrong && styles.optionWrong,
  ];

  const textStyle = [
    styles.optionText,
    isSelected && !answered && styles.optionTextSelected,
    showCorrect && styles.optionTextCorrect,
    showWrong && styles.optionTextWrong,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={() => !answered && onPress(optionId)}
      activeOpacity={answered ? 1 : 0.75}
    >
      <Text style={textStyle}>{text}</Text>
      {showCorrect && (
        <Ionicons name="checkmark-circle" size={20} color={Colors.accentGreen} />
      )}
      {showWrong && (
        <Ionicons name="close-circle" size={20} color={Colors.error} />
      )}
    </TouchableOpacity>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radii.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.background,
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  optionCorrect: {
    borderColor: Colors.accentGreen,
    backgroundColor: Colors.accentGreen + "12",
  },
  optionWrong: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorLight,
  },

  optionText: {
    flex: 1,
    fontSize: Typography.base,
    color: Colors.textPrimary,
    marginRight: Spacing.sm,
  },
  optionTextSelected: { color: Colors.primary, fontWeight: Typography.medium },
  optionTextCorrect: { color: Colors.accentGreen, fontWeight: Typography.medium },
  optionTextWrong: { color: Colors.error, fontWeight: Typography.medium },
});