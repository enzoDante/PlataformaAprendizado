import React from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors, Spacing, Radii, Typography } from "@/styles/GlobalStyles";
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
    loading,
    error,
    setSearch,
    clearSearch,
    setCategory,
    onCoursePress,
    checkingEnrollment,
    enrollModal,
    confirmEnroll,
    dismissModal,
  } = useExplore();
 
  return (
    <View style={GlobalStyles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
 
      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={GlobalStyles.pageTitle}>Pesquisar</Text>
      </View>
 
      {/* ── Overlay de verificação de matrícula ── */}
      {checkingEnrollment && (
        <View style={styles.checkingOverlay}>
          <ActivityIndicator size="small" color={Colors.primary} />
        </View>
      )}
 
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
 
        {/* ── Loading inicial ── */}
        {loading && (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        )}
 
        {/* ── Erro de carregamento ── */}
        {!loading && error && (
          <View style={styles.errorBanner}>
            <Ionicons name="alert-circle-outline" size={16} color="#B91C1C" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
 
        {/* ── Conteúdo ── */}
        {!loading && !error && (
          <>
            {/* Results header */}
            <View style={[GlobalStyles.rowBetween, styles.resultsHeader]}>
              <Text style={GlobalStyles.headingSM}>
                {selectedCategory === "Todos" ? "Todos os cursos" : selectedCategory}
              </Text>
              <Text style={GlobalStyles.bodyXS}>{filteredCourses.length} cursos</Text>
            </View>
 
            {/* Course list or empty state */}
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
          </>
        )}
      </ScrollView>
 
      {/* ── Modal de matrícula ── */}
      <Modal
        visible={enrollModal.visible}
        transparent
        animationType="fade"
        onRequestClose={dismissModal}
      >
        <TouchableWithoutFeedback onPress={dismissModal}>
          <View style={styles.modalBackdrop}>
            <TouchableWithoutFeedback>
              <View style={styles.modalSheet}>
                {/* Pill de drag */}
                <View style={styles.modalPill} />
 
                {/* Emoji do curso */}
                <Text style={styles.modalEmoji}>
                  {enrollModal.course?.emoji ?? "📚"}
                </Text>
 
                <Text style={styles.modalTitle}>
                  {enrollModal.course?.title}
                </Text>
 
                <Text style={styles.modalBody}>
                  Você ainda não está matriculado neste curso. Deseja se matricular agora?
                </Text>
 
                {/* Erro de matrícula */}
                {enrollModal.error && (
                  <View style={styles.errorBanner}>
                    <Ionicons name="alert-circle-outline" size={14} color="#B91C1C" />
                    <Text style={styles.errorText}>{enrollModal.error}</Text>
                  </View>
                )}
 
                {/* Botões */}
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.btnSecondary}
                    onPress={dismissModal}
                    disabled={enrollModal.enrolling}
                    activeOpacity={0.75}
                  >
                    <Text style={styles.btnSecondaryText}>Agora não</Text>
                  </TouchableOpacity>
 
                  <TouchableOpacity
                    style={[
                      styles.btnPrimary,
                      enrollModal.enrolling && styles.btnDisabled,
                    ]}
                    onPress={confirmEnroll}
                    disabled={enrollModal.enrolling}
                    activeOpacity={0.85}
                  >
                    {enrollModal.enrolling ? (
                      <ActivityIndicator size="small" color={Colors.textOnPrimary} />
                    ) : (
                      <Text style={styles.btnPrimaryText}>Matricular</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
 
  // Checking overlay (spinner sobre a tela enquanto verifica matrícula)
  checkingOverlay: {
    position: "absolute",
    top: 110,
    right: Spacing.lg,
    zIndex: 10,
  },
 
  // Loading / erro
  centered: {
    paddingTop: Spacing.xxxl,
    alignItems: "center",
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    backgroundColor: "#FEE2E2",
    borderRadius: Radii.sm,
    padding: Spacing.sm,
    marginBottom: Spacing.md,
  },
  errorText: {
    fontSize: Typography.sm,
    color: "#B91C1C",
    flex: 1,
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
 
  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: Radii.xl,
    borderTopRightRadius: Radii.xl,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
    alignItems: "center",
  },
  modalPill: {
    width: 36,
    height: 4,
    borderRadius: Radii.full,
    backgroundColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  modalEmoji: {
    fontSize: 52,
    marginBottom: Spacing.md,
  },
  modalTitle: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  modalBody: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  modalActions: {
    flexDirection: "row",
    gap: Spacing.md,
    width: "100%",
    marginTop: Spacing.sm,
  },
  btnSecondary: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: Radii.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: "center",
  },
  btnSecondaryText: {
    fontSize: Typography.base,
    fontWeight: Typography.semiBold,
    color: Colors.textSecondary,
  },
  btnPrimary: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: Radii.md,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  btnPrimaryText: {
    fontSize: Typography.base,
    fontWeight: Typography.semiBold,
    color: Colors.textOnPrimary,
  },
  btnDisabled: {
    opacity: 0.6,
  },
});