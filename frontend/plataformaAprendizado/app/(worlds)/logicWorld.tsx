import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { GlobalStyles, Colors, Typography, Spacing, Radii } from "../../styles/GlobalStyles";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// 1. Definição do formato de cada fase
interface Phase {
  id: number;
  titulo: string;
  descricao: string;
  xpGanha: number;
}

export default function LogicWorld() {
  // 2. Dados Fictícios das fases do Mundo de Lógica
  const listaDeFases: Phase[] = [
    { id: 1, titulo: "Introdução à Lógica", descricao: "O que são algoritmos?", xpGanha: 100 },
    { id: 2, titulo: "Variáveis e Constantes", descricao: "Guardando dados na memória", xpGanha: 120 },
    { id: 3, titulo: "Estruturas Condicionais", descricao: "Trabalhando com Se e Senão", xpGanha: 150 },
    { id: 4, titulo: "Operadores Lógicos", descricao: "E, OU e NÃO (AND, OR, NOT)", xpGanha: 180 },
    { id: 5, titulo: "Estruturas de Repetição", descricao: "Dominando loops (Para e Enquanto)", xpGanha: 200 },
  ];

  // 3. A FASE ATUAL DO JOGADOR (Simulação)
  // Mude esse número para 1, 2, 3 ou 4 para ver o mapa se comportar e bloquear/liberar automaticamente!
  const faseAtualDoUsuario = 3; 

  // 4. Função disparada ao clicar em uma fase liberada
  const iniciarFase = (faseId: number) => {
    alert(`Iniciando a fase ${faseId}! Redirecionando para a tela do quiz...`);
    // Futuramente vocês mandam para a tela dinâmica do nível:
    // router.push({ pathname: "/levelScreen", params: { id: faseId } });
  };

  return (
    <View style={GlobalStyles.screen}>
      {/* Topo da Tela */}
      <View style={styles.header}>
        <Text style={GlobalStyles.headingXL}>Mundo de Lógica 🧠</Text>
        <Text style={GlobalStyles.bodySM}>Complete as fases para evoluir sua pontuação</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {listaDeFases.map((fase, index) => {
          // Descobre o status da fase com base no ID
          const concluida = fase.id < faseAtualDoUsuario;
          const atual = fase.id === faseAtualDoUsuario;
          const bloqueada = fase.id > faseAtualDoUsuario;

          return (
            <View key={fase.id} style={styles.faseWrapper}>
              
              {/* Linha conectora visual entre as fases (estilo Duolingo) */}
              {index < listaDeFases.length - 1 && <View style={styles.connectorLine} />}

              <TouchableOpacity
                style={[
                  styles.cardFase,
                  concluida && styles.cardConcluido,
                  atual && styles.cardAtual,
                  bloqueada && styles.cardBloqueado
                ]}
                disabled={bloqueada}
                onPress={() => iniciarFase(fase.id)}
                activeOpacity={0.8}
              >
                {/* Lado Esquerdo: Ícone de Status */}
                <View style={styles.iconContainer}>
                  {concluida && <Ionicons name="checkmark-circle" size={28} color={Colors.accentGreen} />}
                  {atual && <Ionicons name="play-circle" size={32} color={Colors.primary} />}
                  {bloqueada && <Ionicons name="lock-closed" size={24} color={Colors.textMuted} />}
                </View>

                {/* Lado Direito: Textos Informativos */}
                <View style={styles.infoContainer}>
                  <Text style={[
                    styles.tituloFase, 
                    bloqueada && { color: Colors.textMuted },
                    concluida && { textDecorationLine: 'line-through', color: Colors.textSecondary }
                  ]}>
                    Nível {fase.id}: {fase.titulo}
                  </Text>
                  
                  <Text style={[styles.descricaoFase, bloqueada && { color: Colors.textMuted }]}>
                    {bloqueada ? "Alcance a fase anterior para desbloquear" : fase.descricao}
                  </Text>

                  {!bloqueada && (
                    <Text style={styles.xpText}>+{fase.xpGanha} XP</Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

// ─── Estilos Customizados da Trilha ────────────────────────────
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