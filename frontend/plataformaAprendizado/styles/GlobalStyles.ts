import { StyleSheet, Platform } from "react-native";

// ─── Design Tokens ────────────────────────────────────────────────────────────

export const Colors = {
  // Backgrounds
  background: "#FFFFFF",
  backgroundSecondary: "#F7F8FC",
  backgroundInput: "#F2F4F8",

  // Brand
  primary: "#2563EB",
  primaryLight: "#EFF4FF",
  primaryMuted: "#BFCFFA",

  // Text
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  textOnPrimary: "#FFFFFF",

  // Borders
  border: "#E5E7EB",
  borderInput: "#D1D5DB",

  // Accent icons (like in the dashboard cards)
  accentBlue: "#2563EB",
  accentGreen: "#10B981",
  accentPurple: "#8B5CF6",
  accentOrange: "#F59E0B",

  // Semantic
  error: "#EF4444",
  errorLight: "#FEF2F2",
  success: "#10B981",

  // Progress bar
  progressFill: "#2563EB",
  progressTrack: "#E5E7EB",

  // Navigation bar
  navActive: "#2563EB",
  navInactive: "#9CA3AF",

  // Shadow (used via elevation / shadowColor)
  shadow: "#000000",
};

export const Typography = {
  fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",

  // Sizes
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  xxl: 30,

  // Weights
  regular: "400" as const,
  medium: "500" as const,
  semiBold: "600" as const,
  bold: "700" as const,
  extraBold: "800" as const,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const Radii = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 9999,
};

// ─── Shared / Reusable Styles ─────────────────────────────────────────────────

export const GlobalStyles = StyleSheet.create({
  // ── Containers ──────────────────────────────────────────────────────────────
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // ── Cards ───────────────────────────────────────────────────────────────────
  card: {
    backgroundColor: Colors.background,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  // ── Typography ──────────────────────────────────────────────────────────────
  headingXL: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  headingLG: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  headingMD: {
    fontSize: Typography.md,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  headingSM: {
    fontSize: Typography.base,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  bodyBase: {
    fontSize: Typography.base,
    fontWeight: Typography.regular,
    color: Colors.textPrimary,
  },
  bodySM: {
    fontSize: Typography.sm,
    fontWeight: Typography.regular,
    color: Colors.textSecondary,
  },
  bodyXS: {
    fontSize: Typography.xs,
    fontWeight: Typography.regular,
    color: Colors.textMuted,
  },
  label: {
    fontSize: Typography.xs,
    fontWeight: Typography.semiBold,
    color: Colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: Spacing.sm,
  },

  // ── Inputs ──────────────────────────────────────────────────────────────────
  inputWrapper: {
    marginBottom: Spacing.base,
  },
  inputLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: Colors.backgroundInput,
    borderWidth: 1,
    borderColor: Colors.backgroundInput,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    fontSize: Typography.base,
    color: Colors.textPrimary,
  },
  inputFocused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.background,
  },
  inputError: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorLight,
  },
  inputErrorText: {
    fontSize: Typography.xs,
    color: Colors.error,
    marginTop: Spacing.xs,
  },

  // ── Buttons ─────────────────────────────────────────────────────────────────
  buttonPrimary: {
    backgroundColor: Colors.primary,
    borderRadius: Radii.md,
    paddingVertical: Spacing.md + 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPrimaryText: {
    fontSize: Typography.base,
    fontWeight: Typography.semiBold,
    color: Colors.textOnPrimary,
  },
  buttonSecondary: {
    backgroundColor: Colors.background,
    borderRadius: Radii.md,
    paddingVertical: Spacing.md + 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  buttonSecondaryText: {
    fontSize: Typography.base,
    fontWeight: Typography.semiBold,
    color: Colors.primary,
  },
  buttonDisabled: {
    opacity: 0.5,
  },

  // ── Dividers ────────────────────────────────────────────────────────────────
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.lg,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    fontSize: Typography.sm,
    color: Colors.textMuted,
    marginHorizontal: Spacing.md,
  },

  // ── Rows ────────────────────────────────────────────────────────────────────
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // ── Progress Bar ────────────────────────────────────────────────────────────
  progressTrack: {
    height: 5,
    backgroundColor: Colors.progressTrack,
    borderRadius: Radii.full,
    overflow: "hidden",
  },
  progressFill: {
    height: 5,
    backgroundColor: Colors.progressFill,
    borderRadius: Radii.full,
  },

  // ── Header ──────────────────────────────────────────────────────────────────
  pageHeader: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.base,
    backgroundColor: Colors.background,
  },
  pageTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
    textAlign: "center",
  },

  // ── Link text ───────────────────────────────────────────────────────────────
  link: {
    fontSize: Typography.sm,
    fontWeight: Typography.semiBold,
    color: Colors.primary,
  },

  // ── Badges / Tags ───────────────────────────────────────────────────────────
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radii.sm,
    backgroundColor: Colors.primary,
  },
  badgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.semiBold,
    color: Colors.textOnPrimary,
  },
});