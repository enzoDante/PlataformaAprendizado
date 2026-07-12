import React, { useRef, useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, ActivityIndicator, Animated,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors, Typography, Spacing, Radii } from "@/styles/GlobalStyles";
import { useCourseDetail } from "@/hooks/useCourseDetail";
 
const COURSE_ID = "java";
 
export default function CWorld() {
  const { levels, isLoading, error } = useCourseDetail(COURSE_ID);
  const [selectedId, setSelectedId] = useState<string | null>(null);
 
  const selectedLevel = levels.find((l) => l.id === selectedId) ?? null;
 
  const handleCardPress = (id: string, status: string) => {
    if (status === "locked") return;
    setSelectedId((prev) => (prev === id ? null : id));
  };
 
  const handleStart = () => {
    if (!selectedId) return;
    router.push(`/course/${COURSE_ID}/${selectedId}`);
  };
 
  return (
    <View style={GlobalStyles.screen}>
      <View style={styles.header}>
        <Text style={GlobalStyles.headingXL}>Java ☕</Text>
        <Text style={GlobalStyles.bodySM}>Aprenda orientação a objetos e a plataforma Java</Text>
      </View>
 
      {isLoading && (
        <View style={[GlobalStyles.centered, { flex: 1 }]}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
 
      {!!error && !isLoading && (
        <View style={styles.errorBanner}>
          <Ionicons name="alert-circle-outline" size={16} color="#B91C1C" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
 
      {!isLoading && !error && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {levels.map((level, index) => {
            const isCompleted = level.status === "completed";
            const isAvailable = level.status === "available";
            const isLocked = level.status === "locked";
            const isSelected = selectedId === level.id;
 
            return (
              <View key={level.id} style={styles.faseWrapper}>
                {/* Connector line */}
                {index < levels.length - 1 && (
                  <View style={[
                    styles.connectorLine,
                    isCompleted && styles.connectorDone,
                  ]} />
                )}
 
                {/* Balão ao selecionar */}
                {isSelected && selectedLevel && (
                  <View style={styles.balloon}>
                    <Text style={styles.balloonTitle}>{selectedLevel.title}</Text>
                    <TouchableOpacity style={styles.balloonBtn} onPress={handleStart} activeOpacity={0.85}>
                      <Text style={styles.balloonBtnText}>Começar</Text>
                    </TouchableOpacity>
                    <View style={styles.balloonArrow} />
                  </View>
                )}
 
                <TouchableOpacity
                  style={[
                    styles.cardFase,
                    isCompleted && styles.cardConcluido,
                    isAvailable && styles.cardAtual,
                    isLocked && styles.cardBloqueado,
                  ]}
                  disabled={isLocked}
                  onPress={() => handleCardPress(level.id, level.status)}
                  activeOpacity={0.8}
                >
                  <View style={styles.iconContainer}>
                    {isCompleted && <Ionicons name="checkmark-circle" size={28} color={Colors.accentGreen} />}
                    {isAvailable && <Ionicons name="play-circle" size={32} color={Colors.primary} />}
                    {isLocked && <Ionicons name="lock-closed" size={24} color={Colors.textMuted} />}
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={[
                      styles.tituloFase,
                      isLocked && { color: Colors.textMuted },
                      isCompleted && { textDecorationLine: "line-through", color: Colors.textSecondary },
                    ]}>
                      Nível {level.number}: {level.title}
                    </Text>
                    <Text style={[styles.descricaoFase, isLocked && { color: Colors.textMuted }]}>
                      {isLocked ? "Bloqueado" : level.description}
                    </Text>
                    {!isLocked && <Text style={styles.xpText}>+{level.xp} XP</Text>}
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}
 
const styles = StyleSheet.create({
  header: {
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  scrollContainer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    backgroundColor: "#FEE2E2",
    borderRadius: Radii.sm,
    margin: Spacing.lg,
    padding: Spacing.sm,
  },
  errorText: {
    fontSize: Typography.sm,
    color: "#B91C1C",
    flex: 1,
  },
  faseWrapper: {
    alignItems: "center",
    position: "relative",
    marginBottom: Spacing.lg,
  },
  connectorLine: {
    position: "absolute",
    bottom: -Spacing.lg,
    width: 4,
    height: Spacing.lg + 10,
    backgroundColor: Colors.border,
    zIndex: -1,
  },
  connectorDone: {
    backgroundColor: Colors.accentGreen + "60",
  },
 
  // Balão
  balloon: {
    width: "100%",
    backgroundColor: Colors.background,
    borderRadius: Radii.md,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  balloonTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  balloonBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radii.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
  },
  balloonBtnText: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.textOnPrimary,
  },
  balloonArrow: {
    position: "absolute",
    bottom: -8,
    width: 14,
    height: 14,
    backgroundColor: Colors.background,
    borderRightWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: Colors.primary,
    transform: [{ rotate: "45deg" }],
  },
 
  // Cards
  cardFase: {
    flexDirection: "row",
    width: "100%",
    padding: Spacing.md,
    borderRadius: Radii.md,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  cardConcluido: {
    borderColor: Colors.accentGreen + "40",
    backgroundColor: Colors.accentGreen + "05",
  },
  cardAtual: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight + "10",
    elevation: 3,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardBloqueado: {
    borderColor: Colors.border,
    backgroundColor: Colors.backgroundInput,
    opacity: 0.7,
  },
  iconContainer: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.sm,
  },
  infoContainer: { flex: 1 },
  tituloFase: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  descricaoFase: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  xpText: {
    fontSize: Typography.xs,
    fontWeight: Typography.semiBold,
    color: Colors.accentOrange,
  },
});