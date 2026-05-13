import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { GlobalStyles, Colors, Typography, Spacing, Radii } from "@/styles/GlobalStyles";
import { FilterTab } from "@/hooks/useCourses";

// ─── Props ────────────────────────────────────────────────────────────────────

interface CoursesFilterTabsProps {
  tabs: FilterTab[];
  active: FilterTab;
  onSelect: (tab: FilterTab) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CoursesFilterTabs({ tabs, active, onSelect }: CoursesFilterTabsProps) {
  return (
    <View style={[GlobalStyles.row, styles.row]}>
      {tabs.map((tab) => {
        const isActive = active === tab;
        return (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onSelect(tab)}
            activeOpacity={0.75}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  row: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.md,
    alignItems: "center",
    backgroundColor: Colors.backgroundInput,
  },
  tabActive: {
    backgroundColor: Colors.primaryLight,
  },
  tabText: {
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.primary,
    fontWeight: Typography.semiBold,
  },
});