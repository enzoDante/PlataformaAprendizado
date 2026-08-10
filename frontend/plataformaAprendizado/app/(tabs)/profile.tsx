import React, { useEffect, useState } from "react";
import {
  View, Text, ScrollView, StatusBar, StyleSheet,
  KeyboardAvoidingView, Platform, TouchableOpacity,
} from "react-native";
import { GlobalStyles, Colors, Spacing } from "@/styles/GlobalStyles";
import { useProfile } from "@/hooks/useProfile";
import { ProfileAvatar } from "@/components/UserComponents/ProfileAvatar";
import { ProfileForm } from "@/components/UserComponents/ProfileForm";
import { ProfileActions } from "@/components/UserComponents/ProfileActions";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const {
    data, isEditing, errors, initials,
    setField, startEditing, cancelEditing, saveChanges, logout,
  } = useProfile();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkRole() {
      try {
        const raw = await AsyncStorage.getItem("@auth:user");
        if (!raw) return;
        const user = JSON.parse(raw);
        if (user?.accessLevel === "Admin") setIsAdmin(true);
      } catch (error) {
        console.error("Erro ao buscar role:", error);
      }
    }
    checkRole();
  }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={GlobalStyles.screen}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

        <View style={styles.header}>
          <Text style={GlobalStyles.pageTitle}>Perfil</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[GlobalStyles.scrollContent, styles.scrollContent]}
          keyboardShouldPersistTaps="handled"
        >
          <ProfileAvatar
            initials={initials}
            fullName={data.fullName}
            email={data.email}
            onEditPress={startEditing}
          />

          <ProfileForm
            data={data}
            isEditing={isEditing}
            errors={errors}
            onChangeField={setField}
          />

          {isAdmin && !isEditing && (
            <TouchableOpacity style={styles.adminButton} onPress={() => router.push("/admin")}>
              <Text style={styles.adminButtonText}>Painel Administrador</Text>
            </TouchableOpacity>
          )}

          {/* logout vem direto do hook — sem handleLogoutPress */}
          <ProfileActions
            isEditing={isEditing}
            onEdit={startEditing}
            onSave={saveChanges}
            onCancel={cancelEditing}
            onLogout={logout}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

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
  adminButton: {
    backgroundColor: "#7C3AED",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Spacing.base,
    marginBottom: Spacing.base,
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  adminButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});