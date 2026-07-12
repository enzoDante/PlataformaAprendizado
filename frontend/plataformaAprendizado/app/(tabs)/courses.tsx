import React from "react";
import {
  View, Text, ScrollView, StatusBar,
  StyleSheet, ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors, Spacing, Radii, Typography } from "@/styles/GlobalStyles";
import { useCourses } from "@/hooks/useCourses";
import { CoursesSummaryCards } from "@/components/CoursesComponents/CoursesSummaryCards";
import { CoursesFilterTabs } from "@/components/CoursesComponents/CoursesFilterTabs";
import { EnrolledCourseCard } from "@/components/CoursesComponents/EnrolledCourseCard";
 
export default function Courses() {
  const {
    activeFilter,
    filterTabs,
    filteredCourses,
    summary,
    loading,
    error,
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
 
      {/* ── Loading ── */}
      {loading && (
        <View style={[GlobalStyles.centered, { flex: 1 }]}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
 
      {/* ── Erro ── */}
      {!loading && error && (
        <View style={styles.errorBanner}>
          <Ionicons name="alert-circle-outline" size={16} color="#B91C1C" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
 
      {/* ── Conteúdo ── */}
      {!loading && !error && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[GlobalStyles.scrollContent, styles.scrollContent]}
        >
          <CoursesSummaryCards summary={summary} />
 
          <CoursesFilterTabs
            tabs={filterTabs}
            active={activeFilter}
            onSelect={setFilter}
          />
 
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
      )}
    </View>
  );
}
 
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