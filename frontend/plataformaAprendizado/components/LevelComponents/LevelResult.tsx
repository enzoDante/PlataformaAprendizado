import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors, Typography, Spacing, Radii } from "@/styles/GlobalStyles";

// ─── Props ────────────────────────────────────────────────────────────────────

interface LevelResultProps {
  correctCount: number;
  totalCount: number;
  xp: number;
  onContinue: () => void;   // go back to level map
}

// ─── Component ────────────────────────────────────────────────────────────────

export function LevelResult({ correctCount, totalCount, xp, onContinue }: LevelResultProps) {
  const allCorrect = correctCount === totalCount;
  const percent = Math.round((correctCount / totalCount) * 100);

  return (
    <View style={[GlobalStyles.screen, GlobalStyles.centered, styles.container]}>
      {/* Trophy / icon */}
      <View style={[styles.iconBox, { backgroundColor: allCorrect ? Colors.accentGreen + "18" : Colors.primaryLight }]}>
        <Text style={styles.trophy}>{allCorrect ? "🏆" : "⭐"}</Text>
      </View>

      {/* Title */}
      <Text style={[GlobalStyles.headingLG, styles.title]}>
        {allCorrect ? "Perfeito!" : "Nível concluído!"}
      </Text>
      <Text style={[GlobalStyles.bodySM, styles.subtitle]}>
        {allCorrect
          ? "Você acertou todas as questões!"
          : `Você acertou ${correctCount} de ${totalCount} questões`}
      </Text>

      {/* Stats */}
      <View style={[GlobalStyles.card, styles.statsCard]}>
        <View style={[GlobalStyles.rowBetween, styles.statRow]}>
          <View style={GlobalStyles.row}>
            <Ionicons name="checkmark-circle" size={18} color={Colors.accentGreen} />
            <Text style={styles.statLabel}> Acertos</Text>
          </View>
          <Text style={styles.statValue}>{correctCount}/{totalCount}</Text>
        </View>

        <View style={GlobalStyles.divider} />

        <View style={[GlobalStyles.rowBetween, styles.statRow]}>
          <View style={GlobalStyles.row}>
            <Ionicons name="star" size={18} color={Colors.accentOrange} />
            <Text style={styles.statLabel}> XP ganho</Text>
          </View>
          <Text style={[styles.statValue, styles.xpValue]}>+{xp} XP</Text>
        </View>

        <View style={GlobalStyles.divider} />

        <View style={[GlobalStyles.rowBetween, styles.statRow]}>
          <View style={GlobalStyles.row}>
            <Ionicons name="analytics-outline" size={18} color={Colors.primary} />
            <Text style={styles.statLabel}> Precisão</Text>
          </View>
          <Text style={styles.statValue}>{percent}%</Text>
        </View>
      </View>

      {/* Continue button */}
      <TouchableOpacity
        style={[GlobalStyles.buttonPrimary, styles.continueBtn]}
        onPress={onContinue}
        activeOpacity={0.85}
      >
        <Text style={GlobalStyles.buttonPrimaryText}>Continuar</Text>
        <Ionicons name="arrow-forward" size={18} color={Colors.textOnPrimary} style={{ marginLeft: Spacing.sm }} />
      </TouchableOpacity>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
  },
  iconBox: {
    width: 100,
    height: 100,
    borderRadius: Radii.full,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  trophy: { fontSize: 48 },

  title: { marginBottom: Spacing.xs, textAlign: "center" },
  subtitle: { textAlign: "center", marginBottom: Spacing.xl },

  statsCard: {
    width: "100%",
    marginBottom: Spacing.xl,
    padding: Spacing.base,
  },
  statRow: { paddingVertical: Spacing.xs },
  statLabel: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
  },
  statValue: {
    fontSize: Typography.base,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  xpValue: { color: Colors.accentOrange },

  continueBtn: {
    width: "100%",
    flexDirection: "row",
  },
});