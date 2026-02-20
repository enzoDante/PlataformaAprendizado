import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
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
  rating: number;
  students: string;
  duration: string;
  emoji: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
}

interface ExploreState {
  search: string;
  selectedCategory: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const CATEGORIES = ["Todos", "Programação", "Web", "Mobile", "Banco de Dados"];

const ALL_COURSES: Course[] = [
  {
    id: "1",
    title: "Python",
    instructor: "João Santos",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    rating: 4.9,
    students: "6.921",
    duration: "31h",
    emoji: "🐍",
    level: "Iniciante",
  },
  {
    id: "2",
    title: "Lógica de Programação",
    instructor: "Ana Costa",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    rating: 4.7,
    students: "12.4k",
    duration: "23h",
    emoji: "🧩",
    level: "Iniciante",
  },
  {
    id: "3",
    title: "Java",
    instructor: "Maria Silva",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    rating: 4.8,
    students: "15.2k",
    duration: "40h",
    emoji: "☕",
    level: "Intermediário",
  },
  {
    id: "4",
    title: "C",
    instructor: "Carlos Lima",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    rating: 4.6,
    students: "20.1k",
    duration: "18h",
    emoji: "🌐",
    level: "Iniciante",
  },
];


const LEVEL_COLORS: Record<string, string> = {
  Iniciante: Colors.accentGreen,
  Intermediário: Colors.accentOrange,
  Avançado: Colors.error,
};

// ─── Component ────────────────────────────────────────────────────────────────

export default class Explore extends React.Component<{}, ExploreState> {
  state: ExploreState = {
    search: "",
    selectedCategory: "Todos",
  };

  getFilteredCourses = (): Course[] => {
    const { search, selectedCategory } = this.state;
    return ALL_COURSES.filter((course) => {
      const matchesCategory =
        selectedCategory === "Todos" || course.category === selectedCategory;
      const matchesSearch =
        search.trim() === "" ||
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  renderCourseCard = (course: Course) => (
    <TouchableOpacity
      key={course.id}
      style={[GlobalStyles.card, styles.courseCard]}
      activeOpacity={0.85}
    >
      {/* Thumbnail */}
      <View style={styles.thumbnail}>
        <Text style={styles.thumbnailEmoji}>{course.emoji}</Text>
        <View style={[styles.categoryBadge, { backgroundColor: course.categoryColor }]}>
          <Text style={styles.categoryBadgeText}>{course.category}</Text>
        </View>
      </View>

      {/* Info */}
      <View style={styles.courseInfo}>
        <View style={GlobalStyles.rowBetween}>
          <Text style={[GlobalStyles.headingSM, styles.courseTitle]} numberOfLines={1}>
            {course.title}
          </Text>
          <View style={[styles.levelBadge, { backgroundColor: LEVEL_COLORS[course.level] + "20" }]}>
            <Text style={[styles.levelText, { color: LEVEL_COLORS[course.level] }]}>
              {course.level}
            </Text>
          </View>
        </View>

        <Text style={[GlobalStyles.bodySM, styles.instructor]}>
          por {course.instructor}
        </Text>

        <View style={[GlobalStyles.row, styles.meta]}>
          <Ionicons name="star" size={12} color={Colors.accentOrange} />
          <Text style={styles.metaText}> {course.rating}</Text>
          <Text style={styles.metaDot}>  ·  </Text>
          <Ionicons name="people-outline" size={12} color={Colors.textMuted} />
          <Text style={styles.metaText}> {course.students}</Text>
          <Text style={styles.metaDot}>  ·  </Text>
          <Ionicons name="time-outline" size={12} color={Colors.textMuted} />
          <Text style={styles.metaText}> {course.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { search, selectedCategory } = this.state;
    const filtered = this.getFilteredCourses();

    return (
      <View style={GlobalStyles.screen}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

        {/* ── Header fixo ── */}
        <View style={styles.header}>
          <Text style={GlobalStyles.pageTitle}>Pesquisar</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[GlobalStyles.scrollContent, styles.scrollContent]}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Search bar ── */}
          <View style={styles.searchWrapper}>
            <Ionicons
              name="search-outline"
              size={18}
              color={Colors.textMuted}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar cursos ou instrutores..."
              placeholderTextColor={Colors.textMuted}
              value={search}
              onChangeText={(v) => this.setState({ search: v })}
              returnKeyType="search"
              autoCorrect={false}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => this.setState({ search: "" })}>
                <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>

          {/* ── Filtros de categoria ── */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesRow}
          >
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryChip, active && styles.categoryChipActive]}
                  onPress={() => this.setState({ selectedCategory: cat })}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.categoryChipText, active && styles.categoryChipTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* ── Resultado ── */}
          <View style={[GlobalStyles.rowBetween, styles.resultsHeader]}>
            <Text style={GlobalStyles.headingSM}>
              {selectedCategory === "Todos" ? "Todos os cursos" : selectedCategory}
            </Text>
            <Text style={GlobalStyles.bodyXS}>{filtered.length} cursos</Text>
          </View>

          {/* ── Lista de cursos ── */}
          {filtered.length > 0 ? (
            filtered.map((course) => this.renderCourseCard(course))
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

  // Search
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundInput,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    marginBottom: Spacing.md,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.base,
    color: Colors.textPrimary,
  },

  // Categories
  categoriesRow: {
    paddingRight: Spacing.lg,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  categoryChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryChipText: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.textSecondary,
  },
  categoryChipTextActive: {
    color: Colors.textOnPrimary,
    fontWeight: Typography.semiBold,
  },

  // Results header
  resultsHeader: {
    marginBottom: Spacing.md,
  },

  // Course card
  courseCard: {
    padding: 0,
    overflow: "hidden",
    marginBottom: Spacing.md,
  },
  thumbnail: {
    height: 120,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  thumbnailEmoji: {
    fontSize: 48,
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
    color: Colors.textOnPrimary,
  },
  courseInfo: {
    padding: Spacing.md,
  },
  courseTitle: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  instructor: {
    marginTop: 2,
    marginBottom: Spacing.sm,
  },
  meta: {
    gap: 2,
  },
  metaText: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
  },
  metaDot: {
    fontSize: Typography.xs,
    color: Colors.textMuted,
  },

  // Level badge
  levelBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radii.sm,
  },
  levelText: {
    fontSize: Typography.xs,
    fontWeight: Typography.semiBold,
  },

  // Empty state
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