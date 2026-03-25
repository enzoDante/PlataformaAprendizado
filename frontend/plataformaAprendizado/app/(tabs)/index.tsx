import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import { GlobalStyles, Colors, Spacing } from "@/styles/GlobalStyles";
import { useHome } from "@/hooks/useHome";
import { HomeHeader } from "@/components/HomeComponents/HomeHeader";
import { StatsGrid } from "@/components/HomeComponents/StatsGrid";
import { CourseCard } from "@/components/HomeComponents/CourseCard";

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const {
    userName,
    initials,
    stats,
    enrolledCourses,
    onCoursePress,
    onSeeAllPress,
  } = useHome();

  return (
    <View style={GlobalStyles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* ── Header (logo + topbar) ── */}
      <HomeHeader userName={userName} initials={initials} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Stats 2x2 ── */}
        <StatsGrid stats={stats} />

        {/* ── Section header ── */}
        <View style={[GlobalStyles.rowBetween, styles.sectionHeader]}>
          <Text style={GlobalStyles.headingSM}>Continuar Estudando</Text>
          <TouchableOpacity onPress={onSeeAllPress}>
            <Text style={GlobalStyles.link}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        {/* ── Course cards ── */}
        {enrolledCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onPress={onCoursePress}
          />
        ))}

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  sectionHeader: {
    marginBottom: Spacing.md,
  },
});