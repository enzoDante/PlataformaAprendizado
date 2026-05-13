import React from "react";
import { View, Text, ScrollView, StatusBar, StyleSheet } from "react-native";
import { GlobalStyles, Colors, Spacing } from "@/styles/GlobalStyles";
import { useProfile } from "@/hooks/useProfile";
import { ProfileAvatar } from "@/components/UserComponents/ProfileAvatar";
import { ProfileForm } from "@/components/UserComponents/ProfileForm";
import { ProfileActions } from "@/components/UserComponents/ProfileActions";

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function Profile() {
  const {
    data,
    isEditing,
    showPassword,
    errors,
    initials,
    setField,
    startEditing,
    cancelEditing,
    saveChanges,
    toggleShowPassword,
    logout,
  } = useProfile();

  return (
    <View style={GlobalStyles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={GlobalStyles.pageTitle}>Perfil</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[GlobalStyles.scrollContent, styles.scrollContent]}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Avatar + nome + email ── */}
        <ProfileAvatar
          initials={initials}
          fullName={data.fullName}
          email={data.email}
          onEditPress={startEditing}
        />

        {/* ── Campos do formulário ── */}
        <ProfileForm
          data={data}
          isEditing={isEditing}
          showPassword={showPassword}
          errors={errors}
          onChangeField={setField}
          onTogglePassword={toggleShowPassword}
        />

        {/* ── Botões de ação + logout ── */}
        <ProfileActions
          isEditing={isEditing}
          onEdit={startEditing}
          onSave={saveChanges}
          onCancel={cancelEditing}
          onLogout={logout}
        />
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  header: {
    paddingTop: 52,
    paddingBottom: Spacing.base,
    paddingHorizontal: Spacing.base,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    alignItems: "center",
  },
  scrollContent: {
    paddingTop: Spacing.xl,
  },
});