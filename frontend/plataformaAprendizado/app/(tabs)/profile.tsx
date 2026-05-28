import React from "react";
import { View, Text, ScrollView, StatusBar, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { GlobalStyles, Colors, Spacing } from "@/styles/GlobalStyles";
import { useProfile } from "@/hooks/useProfile";
import { ProfileAvatar } from "@/components/UserComponents/ProfileAvatar";
import { ProfileForm } from "@/components/UserComponents/ProfileForm";
import { ProfileActions } from "@/components/UserComponents/ProfileActions";
import { router } from "expo-router";

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function Profile() {
  const {
    data,
    isEditing,
    errors,
    initials,
    setField,
    startEditing,
    cancelEditing,
    saveChanges,
    logout,
  } = useProfile();
  const handleLogoutPress = async () => {
    try {
      if (logout) {
        logout(); // Executa a limpeza de sessão do hook de vocês
      }
      router.replace("/login"); // Força o app a sair das abas e ir para a tela de Login
    } catch (error) {
      console.error("Erro ao deslogar:", error);
      // Garante o redirecionamento mesmo se o backend falhar
      router.replace("/login"); 
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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
          errors={errors}
          onChangeField={setField}
        />

        {/* ── Botões de ação + logout ── */}
        <ProfileActions
          isEditing={isEditing}
          onEdit={startEditing}
          onSave={saveChanges}
          onCancel={cancelEditing}
          onLogout={handleLogoutPress}
        />
      </ScrollView>
    </View>
    </KeyboardAvoidingView>
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