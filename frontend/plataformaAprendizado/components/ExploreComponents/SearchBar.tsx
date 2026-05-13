import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Typography, Spacing, Radii } from "@/styles/GlobalStyles";

// ─── Props ────────────────────────────────────────────────────────────────────

interface SearchBarProps {
  value: string;
  onChangeText: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SearchBar({
  value,
  onChangeText,
  onClear,
  placeholder = "Buscar cursos ou instrutores...",
}: SearchBarProps) {
  return (
    <View style={styles.wrapper}>
      <Ionicons
        name="search-outline"
        size={18}
        color={Colors.textMuted}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} activeOpacity={0.7}>
          <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
        </TouchableOpacity>
      )}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundInput,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    marginBottom: Spacing.md,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: Typography.base,
    color: Colors.textPrimary,
  },
});