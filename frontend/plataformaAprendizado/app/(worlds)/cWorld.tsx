import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { GlobalStyles, Colors, Typography, Spacing, Radii } from "../../styles/GlobalStyles";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface Fase {
  id: number;
  titulo: string;
  descricao: string;
  xpGanha: number;
}

export default function CWorld() {
  const listaDeFases: Fase[] = [
    { id: 1, titulo: "Sintaxe e Printf", descricao: "O teu primeiro Olá Mundo em C", xpGanha: 100 },
    { id: 2, titulo: "Tipos de Dados", descricao: "Int, float, char e double", xpGanha: 120 },
    { id: 3, titulo: "Estruturas de Decisão", descricao: "IF, ELSE e o comando SWITCH", xpGanha: 150 },
    { id: 4, titulo: "Vetores e Arrays", descricao: "Agrupando dados numa mesma variável", xpGanha: 180 },
    { id: 5, titulo: "Ponteiros Básicos", descricao: "Entendendo endereços de memória", xpGanha: 250 },
  ];

  const faseAtualDoUsuario = 1; 

  const iniciarFase = (faseId: number) => {
    alert(`A abrir o nível ${faseId} de C...`);
  };

  return (
    <View style={GlobalStyles.screen}>
      <View style={styles.header}>
        <Text style={GlobalStyles.headingXL}>Linguagem C 🤖</Text>
        <Text style={GlobalStyles.bodySM}>Domina a gestão de memória e a sintaxe base</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {listaDeFases.map((fase, index) => {
          const concluida = fase.id < faseAtualDoUsuario;
          const atual = fase.id === faseAtualDoUsuario;
          const bloqueada = fase.id > faseAtualDoUsuario;

          return (
            <View key={fase.id} style={styles.faseWrapper}>
              {index < listaDeFases.length - 1 && <View style={styles.connectorLine} />}
              <TouchableOpacity
                style={[styles.cardFase, concluida && styles.cardConcluido, atual && styles.cardAtual, bloqueada && styles.cardBloqueado]}
                disabled={bloqueada}
                onPress={() => iniciarFase(fase.id)}
                activeOpacity={0.8}
              >
                <View style={styles.iconContainer}>
                  {concluida && <Ionicons name="checkmark-circle" size={28} color={Colors.accentGreen} />}
                  {atual && <Ionicons name="play-circle" size={32} color={Colors.primary} />}
                  {bloqueada && <Ionicons name="lock-closed" size={24} color={Colors.textMuted} />}
                </View>
                <View style={styles.infoContainer}>
                  <Text style={[styles.tituloFase, bloqueada && { color: Colors.textMuted }, concluida && { textDecorationLine: 'line-through', color: Colors.textSecondary }]}>
                    Nível {fase.id}: {fase.titulo}
                  </Text>
                  <Text style={[styles.descricaoFase, bloqueada && { color: Colors.textMuted }]}>
                    {bloqueada ? "Bloqueado" : fase.descricao}
                  </Text>
                  {!bloqueada && <Text style={styles.xpText}>+{fase.xpGanha} XP</Text>}
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  scrollContainer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  faseWrapper: {
    alignItems: "center",
    position: "relative",
    marginBottom: Spacing.lg,
  },
  connectorLine: {
    position: "absolute",
    bottom: -Spacing.lg,
    width: 4,
    height: Spacing.lg + 10,
    backgroundColor: Colors.border,
    zIndex: -1,
  },
  cardFase: {
    flexDirection: "row",
    width: "100%",
    padding: Spacing.md,
    borderRadius: Radii.md,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  cardConcluido: {
    borderColor: Colors.accentGreen + "40",
    backgroundColor: Colors.accentGreen + "05",
  },
  cardAtual: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight + "10",
    elevation: 3,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardBloqueado: {
    borderColor: Colors.border,
    backgroundColor: Colors.backgroundInput,
    opacity: 0.7,
  },
  iconContainer: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.sm,
  },
  infoContainer: {
    flex: 1,
  },
  tituloFase: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  descricaoFase: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  xpText: {
    fontSize: Typography.xs,
    fontWeight: Typography.semiBold,
    color: Colors.accentOrange,
  },
});