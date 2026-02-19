import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { GlobalStyles, Colors, Typography, Spacing, Radii } from "@/styles/GlobalStyles";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const STATS = [
  {
    id: "enrolled",
    label: "Cursos Inscritos",
    value: 8,
    icon: "🎓",
    iconColor: Colors.accentBlue,
    iconBg: Colors.primaryLight,
  },
  {
    id: "hours",
    label: "Horas de Estudo",
    value: 47,
    icon: "⏱️",
    iconColor: Colors.accentGreen,
    iconBg: "#ECFDF5",
  },
  {
    id: "certificates",
    label: "Certificados",
    value: 3,
    icon: "🏅",
    iconColor: Colors.accentPurple,
    iconBg: "#F5F3FF",
  },
  {
    id: "streak",
    label: "Sequência Diária",
    value: 12,
    icon: "🔥",
    iconColor: Colors.accentOrange,
    iconBg: "#FFFBEB",
  },
];

const ENROLLED_COURSES = [
  {
    id: "1",
    title: "Python",
    instructor: "João Santos",
    category: "Programação",
    progress: 45,
    rating: 4.9,
    students: "6.921",
    duration: "31h",
    emoji: "🐍",
    categoryColor: Colors.accentBlue,
  },
  {
    id: "2",
    title: "Lógica",
    instructor: "Ana Costa",
    category: "Programação",
    progress: 30,
    rating: 4.7,
    students: "12.4k",
    duration: "23h",
    emoji: "🧩",
    categoryColor: Colors.accentPurple,
  },
  {
    id: "3",
    title: "Java",
    instructor: "Maria Silva",
    category: "Programação",
    progress: 65,
    rating: 4.8,
    students: "15.2k",
    duration: "40h",
    emoji: "☕",
    categoryColor: Colors.accentOrange,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={GlobalStyles.screen}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

        {/* ── Top Header ── */}
        <View style={styles.header}>
          <Text style={styles.headerLogo}>📖</Text>
          <Text style={styles.headerTitle}>LaquaGe</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ── Greeting ── */}
          <View style={styles.greetingRow}>
            <View>
              <Text style={styles.greetingHello}>Olá, Ana 👋</Text>
              <Text style={styles.greetingSub}>Continue de onde parou!</Text>
            </View>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>A</Text>
            </View>
          </View>

          {/* ── Stats Grid ── */}
          <View style={styles.statsGrid}>
            {STATS.map((stat) => (
              <View key={stat.id} style={[GlobalStyles.card, styles.statCard]}>
                <View style={[styles.statIconBox, { backgroundColor: stat.iconBg }]}>
                  <Text style={styles.statIcon}>{stat.icon}</Text>
                </View>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
              </View>
            ))}
          </View>

          {/* ── Divider ── */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Continuar Estudando</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          {/* ── Course Cards ── */}
          {ENROLLED_COURSES.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={[GlobalStyles.card, styles.courseCard]}
              activeOpacity={0.85}
            >
              {/* Thumbnail */}
              <View style={styles.courseThumbnail}>
                <Text style={styles.courseThumbnailEmoji}>{course.emoji}</Text>
                <View style={[styles.categoryBadge, { backgroundColor: course.categoryColor }]}>
                  <Text style={styles.categoryBadgeText}>{course.category}</Text>
                </View>
              </View>

              {/* Info */}
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseInstructor}>por {course.instructor}</Text>

                {/* Meta row */}
                <View style={[GlobalStyles.row, styles.courseMeta]}>
                  <Text style={styles.metaText}>⭐ {course.rating}</Text>
                  <Text style={styles.metaDot}>·</Text>
                  <Text style={styles.metaText}>👥 {course.students}</Text>
                  <Text style={styles.metaDot}>·</Text>
                  <Text style={styles.metaText}>⏱ {course.duration}</Text>
                </View>

                {/* Progress */}
                <View style={styles.progressArea}>
                  <View style={[GlobalStyles.rowBetween, styles.progressLabelRow]}>
                    <Text style={styles.progressLabel}>Progresso</Text>
                    <Text style={styles.progressPct}>{course.progress}%</Text>
                  </View>
                  <View style={GlobalStyles.progressTrack}>
                    <View
                      style={[
                        GlobalStyles.progressFill,
                        { width: `${course.progress}%` as any },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          <View style={{ height: Spacing.xl }} />
        </ScrollView>
      </View>
    );
  }
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 52,
    paddingBottom: Spacing.base,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerLogo: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  headerTitle: {
    fontSize: Typography.md,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
    letterSpacing: 0.3,
  },

  // Scroll
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },

  // Greeting
  greetingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  greetingHello: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  greetingSub: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: Radii.full,
    backgroundColor: Colors.primaryLight,
    borderWidth: 2,
    borderColor: Colors.primaryMuted,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: Typography.md,
    fontWeight: Typography.bold,
    color: Colors.primary,
  },

  // Stats grid (2 columns)
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statCard: {
    width: "47%",
    padding: Spacing.base,
    gap: Spacing.sm,
  },
  statIconBox: {
    width: 36,
    height: 36,
    borderRadius: Radii.md,
    justifyContent: "center",
    alignItems: "center",
  },
  statIcon: {
    fontSize: 18,
  },
  statLabel: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.medium,
  },
  statValue: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },

  // Section header
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  sectionLink: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.primary,
  },

  // Course card
  courseCard: {
    padding: 0,
    overflow: "hidden",
    marginBottom: Spacing.base,
  },
  courseThumbnail: {
    height: 140,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  courseThumbnailEmoji: {
    fontSize: 56,
  },
  categoryBadge: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radii.sm,
  },
  categoryBadgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.semiBold,
    color: Colors.background,
  },

  courseInfo: {
    padding: Spacing.base,
  },
  courseTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  courseInstructor: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },

  // Meta
  courseMeta: {
    marginBottom: Spacing.md,
    gap: Spacing.xs,
  },
  metaText: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
  },
  metaDot: {
    fontSize: Typography.xs,
    color: Colors.textMuted,
    marginHorizontal: 2,
  },

  // Progress
  progressArea: {
    gap: Spacing.xs,
  },
  progressLabelRow: {
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
  },
  progressPct: {
    fontSize: Typography.xs,
    fontWeight: Typography.semiBold,
    color: Colors.primary,
  },
});