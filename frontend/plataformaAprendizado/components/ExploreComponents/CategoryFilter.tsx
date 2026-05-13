import React from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors, Typography, Spacing, Radii } from "@/styles/GlobalStyles";

// ─── Props ────────────────────────────────────────────────────────────────────

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {categories.map((cat) => {
        const active = selected === cat;
        return (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onSelect(cat)}
            activeOpacity={0.75}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  row: {
    paddingRight: Spacing.lg,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.textSecondary,
  },
  chipTextActive: {
    color: Colors.textOnPrimary,
    fontWeight: Typography.semiBold,
  },
});