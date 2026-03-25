import React from "react";
import { View, Text, ScrollView, StatusBar, StyleSheet } from "react-native";
import { GlobalStyles, Colors, Spacing } from "@/styles/GlobalStyles";
import { useExplore } from "@/hooks/useExplore";
import { SearchBar } from "@/components/ExploreComponents/SearchBar";
import { CategoryFilter } from "@/components/ExploreComponents/CategoryFilter";
import { ExploreCourseCard } from "@/components/ExploreComponents/ExploreCourseCard";

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function Explore() {
  const {
    search,
    selectedCategory,
    categories,
    filteredCourses,
    setSearch,
    clearSearch,
    setCategory,
    onCoursePress,
  } = useExplore();

  return (
    <View style={GlobalStyles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={GlobalStyles.pageTitle}>Pesquisar</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[GlobalStyles.scrollContent, styles.scrollContent]}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Search input ── */}
        <SearchBar
          value={search}
          onChangeText={setSearch}
          onClear={clearSearch}
        />

        {/* ── Category chips ── */}
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setCategory}
        />

        {/* ── Results header ── */}
        <View style={[GlobalStyles.rowBetween, styles.resultsHeader]}>
          <Text style={GlobalStyles.headingSM}>
            {selectedCategory === "Todos" ? "Todos os cursos" : selectedCategory}
          </Text>
          <Text style={GlobalStyles.bodyXS}>{filteredCourses.length} cursos</Text>
        </View>

        {/* ── Course list or empty state ── */}
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <ExploreCourseCard
              key={course.id}
              course={course}
              onPress={onCoursePress}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={[GlobalStyles.headingSM, styles.emptyTitle]}>
              Nenhum curso encontrado
            </Text>
            <Text style={GlobalStyles.bodySM}>
              Tente buscar por outro termo ou categoria
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  header: {
    paddingTop: 52,
    paddingBottom: Spacing.base,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    alignItems: "center",
  },
  scrollContent: {
    paddingTop: Spacing.lg,
  },
  resultsHeader: {
    marginBottom: Spacing.md,
  },
  emptyState: {
    alignItems: "center",
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.xl,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    marginBottom: Spacing.sm,
  },
});