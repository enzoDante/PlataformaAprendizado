import React from "react";
import { View, Text, ScrollView, StatusBar, StyleSheet } from "react-native";
import { GlobalStyles, Colors, Spacing } from "@/styles/GlobalStyles";
import { useCourses } from "@/hooks/useCourses";
import { CoursesSummaryCards } from "@/components/CoursesComponents/CoursesSummaryCards";
import { CoursesFilterTabs } from "@/components/CoursesComponents/CoursesFilterTabs";
import { EnrolledCourseCard } from "@/components/CoursesComponents/EnrolledCourseCard";

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function Courses() {
  const {
    activeFilter,
    filterTabs,
    filteredCourses,
    summary,
    setFilter,
    onCoursePress,
  } = useCourses();

  return (
    <View style={GlobalStyles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={GlobalStyles.pageTitle}>Meus Cursos</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[GlobalStyles.scrollContent, styles.scrollContent]}
      >
        {/* ── Summary: total · em andamento · concluídos ── */}
        <CoursesSummaryCards summary={summary} />

        {/* ── Filter tabs ── */}
        <CoursesFilterTabs
          tabs={filterTabs}
          active={activeFilter}
          onSelect={setFilter}
        />

        {/* ── Course list or empty state ── */}
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <EnrolledCourseCard
              key={course.id}
              course={course}
              onPress={onCoursePress}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📚</Text>
            <Text style={[GlobalStyles.headingSM, styles.emptyTitle]}>
              Nenhum curso aqui
            </Text>
            <Text style={GlobalStyles.bodySM}>
              Explore novos cursos na aba Pesquisar
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
  emptyState: {
    alignItems: "center",
    paddingTop: Spacing.xxxl,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    marginBottom: Spacing.sm,
  },
});