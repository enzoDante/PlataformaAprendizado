import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  GlobalStyles,
  Colors,
  Typography,
  Spacing,
  Radii,
} from "@/styles/GlobalStyles";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  categoryColor: string;
  emoji: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  lastAccessedLesson: string;
  status: "in_progress" | "completed" | "not_started";
}

type FilterTab = "Todos" | "Em andamento" | "Concluídos";

interface CoursesState {
  activeFilter: FilterTab;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const ENROLLED_COURSES: Course[] = [
  {
    id: "1",
    title: "Python",
    instructor: "João Santos",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    emoji: "🐍",
    progress: 45,
    totalLessons: 62,
    completedLessons: 28,
    duration: "31h",
    lastAccessedLesson: "Funções e Módulos",
    status: "in_progress",
  },
  {
    id: "2",
    title: "Lógica de Programação",
    instructor: "Ana Costa",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    emoji: "🧩",
    progress: 30,
    totalLessons: 40,
    completedLessons: 12,
    duration: "23h",
    lastAccessedLesson: "Estruturas de Repetição",
    status: "in_progress",
  },
  {
    id: "3",
    title: "Java",
    instructor: "Maria Silva",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    emoji: "☕",
    progress: 65,
    totalLessons: 80,
    completedLessons: 52,
    duration: "40h",
    lastAccessedLesson: "Orientação a Objetos",
    status: "in_progress",
  },
  {
    id: "4",
    title: "C",
    instructor: "Carlos Lima",
    category: "Programação",
    categoryColor: Colors.accentOrange,
    emoji: "🌐",
    progress: 100,
    totalLessons: 35,
    completedLessons: 35,
    duration: "18h",
    lastAccessedLesson: "Flexbox Avançado",
    status: "completed",
  },
 
];

const FILTER_TABS: FilterTab[] = ["Todos", "Em andamento", "Concluídos"];

// ─── Component ────────────────────────────────────────────────────────────────

export default class Courses extends React.Component<{}, CoursesState> {
  state: CoursesState = {
    activeFilter: "Todos",
  };

  getFilteredCourses = (): Course[] => {
    const { activeFilter } = this.state;
    if (activeFilter === "Em andamento")
      return ENROLLED_COURSES.filter((c) => c.status === "in_progress" || c.status === "not_started");
    if (activeFilter === "Concluídos")
      return ENROLLED_COURSES.filter((c) => c.status === "completed");
    return ENROLLED_COURSES;
  };

  getProgressColor = (progress: number): string => {
    if (progress === 100) return Colors.accentGreen;
    if (progress >= 50) return Colors.primary;
    return Colors.primary;
  };

  renderStatusLabel = (course: Course) => {
    if (course.status === "completed") {
      return (
        <View style={styles.completedBadge}>
          <Ionicons name="checkmark-circle" size={12} color={Colors.accentGreen} />
          <Text style={styles.completedBadgeText}>Concluído</Text>
        </View>
      );
    }
    if (course.status === "not_started") {
      return (
        <View style={styles.notStartedBadge}>
          <Text style={styles.notStartedBadgeText}>Não iniciado</Text>
        </View>
      );
    }
    return (
      <View style={styles.inProgressBadge}>
        <Text style={styles.inProgressBadgeText}>Em andamento</Text>
      </View>
    );
  };

  renderCourseCard = (course: Course) => {
    const isCompleted = course.status === "completed";
    const isNotStarted = course.status === "not_started";
    const progressColor = this.getProgressColor(course.progress);

    return (
      <View key={course.id} style={[GlobalStyles.card, styles.courseCard]}>
        {/* ── Topo: emoji + info ── */}
        <View style={GlobalStyles.row}>
          {/* Thumbnail pequeno */}
          <View style={[styles.thumbSmall, { backgroundColor: course.categoryColor + "18" }]}>
            <Text style={styles.thumbEmoji}>{course.emoji}</Text>
          </View>

          {/* Título + instrutor + badge */}
          <View style={styles.courseDetails}>
            <View style={[GlobalStyles.rowBetween, styles.titleRow]}>
              <Text style={[GlobalStyles.headingSM, styles.courseTitle]} numberOfLines={1}>
                {course.title}
              </Text>
              {this.renderStatusLabel(course)}
            </View>
            <Text style={GlobalStyles.bodySM}>por {course.instructor}</Text>

            {/* Meta */}
            <View style={[GlobalStyles.row, styles.meta]}>
              <Ionicons name="book-outline" size={12} color={Colors.textMuted} />
              <Text style={styles.metaText}>
                {" "}{course.completedLessons}/{course.totalLessons} aulas
              </Text>
              <Text style={styles.metaDot}>  ·  </Text>
              <Ionicons name="time-outline" size={12} color={Colors.textMuted} />
              <Text style={styles.metaText}> {course.duration}</Text>
            </View>
          </View>
        </View>

        {/* ── Divider ── */}
        <View style={[GlobalStyles.divider, styles.innerDivider]} />

        {/* ── Progresso ── */}
        <View style={styles.progressSection}>
          <View style={[GlobalStyles.rowBetween, styles.progressLabelRow]}>
            <Text style={GlobalStyles.bodyXS}>
              {isCompleted
                ? "Curso concluído! 🎉"
                : isNotStarted
                ? "Comece sua jornada"
                : `Próxima aula: ${course.lastAccessedLesson}`}
            </Text>
            <Text style={[styles.progressPct, { color: progressColor }]}>
              {course.progress}%
            </Text>
          </View>

          <View style={GlobalStyles.progressTrack}>
            <View
              style={[
                GlobalStyles.progressFill,
                {
                  width: `${course.progress}%` as any,
                  backgroundColor: progressColor,
                },
              ]}
            />
          </View>
        </View>

        {/* ── Botão ── */}
        <TouchableOpacity
          style={[
            styles.resumeBtn,
            isCompleted && styles.resumeBtnCompleted,
          ]}
          activeOpacity={0.85}
        >
          <Ionicons
            name={
              isCompleted
                ? "reload-outline"
                : isNotStarted
                ? "play"
                : "play"
            }
            size={15}
            color={isCompleted ? Colors.primary : Colors.textOnPrimary}
          />
          <Text
            style={[
              styles.resumeBtnText,
              isCompleted && styles.resumeBtnTextCompleted,
            ]}
          >
            {isCompleted ? "Rever curso" : isNotStarted ? "Começar" : "Retomar"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const filtered = this.getFilteredCourses();
    const { activeFilter } = this.state;

    const totalCompleted = ENROLLED_COURSES.filter((c) => c.status === "completed").length;
    const totalInProgress = ENROLLED_COURSES.filter((c) => c.status === "in_progress").length;

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
          {/* ── Summary cards ── */}
          <View style={[GlobalStyles.row, styles.summaryRow]}>
            <View style={[GlobalStyles.card, styles.summaryCard]}>
              <Text style={styles.summaryValue}>{ENROLLED_COURSES.length}</Text>
              <Text style={GlobalStyles.bodyXS}>Total</Text>
            </View>
            <View style={[GlobalStyles.card, styles.summaryCard]}>
              <Text style={[styles.summaryValue, { color: Colors.primary }]}>
                {totalInProgress}
              </Text>
              <Text style={GlobalStyles.bodyXS}>Em andamento</Text>
            </View>
            <View style={[GlobalStyles.card, styles.summaryCard]}>
              <Text style={[styles.summaryValue, { color: Colors.accentGreen }]}>
                {totalCompleted}
              </Text>
              <Text style={GlobalStyles.bodyXS}>Concluídos</Text>
            </View>
          </View>

          {/* ── Filter tabs ── */}
          <View style={[GlobalStyles.row, styles.filterRow]}>
            {FILTER_TABS.map((tab) => {
              const active = activeFilter === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.filterTab, active && styles.filterTabActive]}
                  onPress={() => this.setState({ activeFilter: tab })}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.filterTabText, active && styles.filterTabTextActive]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ── Course list ── */}
          {filtered.length > 0 ? (
            filtered.map((course) => this.renderCourseCard(course))
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
}

// ─── Estilos locais ───────────────────────────────────────────────────────────

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

  // Summary
  summaryRow: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  summaryCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  summaryValue: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },

  // Filter tabs
  filterRow: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  filterTab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.md,
    alignItems: "center",
    backgroundColor: Colors.backgroundInput,
  },
  filterTabActive: {
    backgroundColor: Colors.primaryLight,
  },
  filterTabText: {
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
    color: Colors.textSecondary,
  },
  filterTabTextActive: {
    color: Colors.primary,
    fontWeight: Typography.semiBold,
  },

  // Course card
  courseCard: {
    marginBottom: Spacing.md,
    padding: Spacing.base,
  },

  // Thumb + info
  thumbSmall: {
    width: 56,
    height: 56,
    borderRadius: Radii.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  thumbEmoji: {
    fontSize: 28,
  },
  courseDetails: {
    flex: 1,
  },
  titleRow: {
    marginBottom: 2,
  },
  courseTitle: {
    flex: 1,
    marginRight: Spacing.sm,
  },

  // Meta
  meta: {
    marginTop: Spacing.xs,
  },
  metaText: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
  },
  metaDot: {
    fontSize: Typography.xs,
    color: Colors.textMuted,
  },

  // Inner divider
  innerDivider: {
    marginVertical: Spacing.md,
  },

  // Progress
  progressSection: {
    marginBottom: Spacing.md,
  },
  progressLabelRow: {
    marginBottom: Spacing.sm,
  },
  progressPct: {
    fontSize: Typography.xs,
    fontWeight: Typography.semiBold,
  },

  // Status badges
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: Colors.accentGreen + "18",
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radii.full,
  },
  completedBadgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.semiBold,
    color: Colors.accentGreen,
  },
  inProgressBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radii.full,
  },
  inProgressBadgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.semiBold,
    color: Colors.primary,
  },
  notStartedBadge: {
    backgroundColor: Colors.backgroundInput,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radii.full,
  },
  notStartedBadgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
    color: Colors.textMuted,
  },

  // Resume button
  resumeBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: Radii.md,
    paddingVertical: Spacing.sm + 2,
  },
  resumeBtnCompleted: {
    backgroundColor: Colors.primaryLight,
  },
  resumeBtnText: {
    fontSize: Typography.sm,
    fontWeight: Typography.semiBold,
    color: Colors.textOnPrimary,
  },
  resumeBtnTextCompleted: {
    color: Colors.primary,
  },

  // Empty state
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