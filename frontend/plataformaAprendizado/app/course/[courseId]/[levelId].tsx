import React, { useEffect } from "react";
import {
  View, Text, ScrollView, TouchableOpacity,
  StatusBar, StyleSheet, ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors, Typography, Spacing, Radii } from "@/styles/GlobalStyles";
import { useCourseDetail } from "@/hooks/useCourseDetail";
import { useLevelScreen } from "@/hooks/useLevelScreen";
import { AnswerOption } from "@/components/LevelComponents/AnswerOption";
import { LevelResult } from "@/components/LevelComponents/LevelResult";
 
export default function LevelScreen() {
  const { courseId, levelId } = useLocalSearchParams<{
    courseId: string;
    levelId: string;
  }>();
  const router = useRouter();
 
  const { course, levels, completeLevel, isLoading } = useCourseDetail(courseId);
  const level = levels.find((l) => l.id === levelId) ?? null;
 
  const {
    currentExercise,
    currentIndex,
    totalExercises,
    selectedOptionId,
    answerState,
    isFinished,
    correctCount,
    progressRatio,
    selectOption,
    confirmAnswer,
    next,
  } = useLevelScreen(level?.exercises ?? []);
 
  useEffect(() => {
    if (isFinished && levelId) completeLevel(levelId);
  }, [isFinished]);
 
  if (isLoading || !level || !course) {
    return (
      <View style={[GlobalStyles.screen, GlobalStyles.centered]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
 
  if (isFinished) {
    return (
      <LevelResult
        correctCount={correctCount}
        totalCount={totalExercises}
        xp={level.xp}
        onContinue={() => router.back()}
      />
    );
  }
 
  const answered = answerState !== "idle";
  const canConfirm = selectedOptionId !== null && !answered;
 
  return (
    <View style={GlobalStyles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
 
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
        <View style={[GlobalStyles.progressTrack, styles.topProgress]}>
          <View style={[GlobalStyles.progressFill, { width: `${progressRatio * 100}%` as any }]} />
        </View>
        <Text style={styles.counter}>{currentIndex + 1}/{totalExercises}</Text>
      </View>
 
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={GlobalStyles.bodySM}>Nível {level.number} · {level.title}</Text>
 
        <Text style={[GlobalStyles.headingMD, styles.question]}>
          {currentExercise?.question}
        </Text>
 
        <View style={styles.options}>
          {currentExercise?.options.map((opt) => (
            <AnswerOption
              key={opt.id}
              optionId={opt.id}
              text={opt.text}
              isSelected={selectedOptionId === opt.id}
              isCorrect={opt.id === currentExercise.correctOptionId}
              answerState={answerState}
              onPress={selectOption}
            />
          ))}
        </View>
 
        {answered && (
          <View style={[
            styles.explanationBox,
            answerState === "correct" ? styles.explanationCorrect : styles.explanationWrong,
          ]}>
            <View style={[GlobalStyles.row, styles.explanationHeader]}>
              <Ionicons
                name={answerState === "correct" ? "checkmark-circle" : "close-circle"}
                size={18}
                color={answerState === "correct" ? Colors.accentGreen : Colors.error}
              />
              <Text style={[
                styles.explanationTitle,
                { color: answerState === "correct" ? Colors.accentGreen : Colors.error },
              ]}>
                {answerState === "correct" ? " Correto!" : " Incorreto"}
              </Text>
            </View>
            <Text style={styles.explanationText}>{currentExercise?.explanation}</Text>
          </View>
        )}
      </ScrollView>
 
      {/* Footer */}
      <View style={styles.footer}>
        {!answered ? (
          <TouchableOpacity
            style={[GlobalStyles.buttonPrimary, styles.actionBtn, !canConfirm && GlobalStyles.buttonDisabled]}
            onPress={confirmAnswer}
            disabled={!canConfirm}
            activeOpacity={0.85}
          >
            <Text style={GlobalStyles.buttonPrimaryText}>Confirmar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[GlobalStyles.buttonPrimary, styles.actionBtn]}
            onPress={next}
            activeOpacity={0.85}
          >
            <Text style={GlobalStyles.buttonPrimaryText}>
              {currentIndex >= totalExercises - 1 ? "Ver resultado" : "Próximo"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 52,
    paddingBottom: Spacing.base,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.background,
  },
  closeBtn: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  topProgress: { flex: 1, height: 8, borderRadius: Radii.full },
  counter: {
    fontSize: Typography.sm,
    fontWeight: Typography.semiBold,
    color: Colors.textSecondary,
    minWidth: 32,
    textAlign: "right",
  },
  scrollContent: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  question: { marginTop: Spacing.lg, marginBottom: Spacing.xl, lineHeight: 26 },
  options: { gap: Spacing.xs },
  explanationBox: { marginTop: Spacing.lg, borderRadius: Radii.md, padding: Spacing.base, borderWidth: 1 },
  explanationCorrect: { backgroundColor: Colors.accentGreen + "10", borderColor: Colors.accentGreen + "40" },
  explanationWrong: { backgroundColor: Colors.errorLight, borderColor: Colors.error + "40" },
  explanationHeader: { marginBottom: Spacing.sm },
  explanationTitle: { fontSize: Typography.base, fontWeight: Typography.semiBold },
  explanationText: { fontSize: Typography.sm, color: Colors.textSecondary, lineHeight: 20 },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  actionBtn: { width: "100%" },
});