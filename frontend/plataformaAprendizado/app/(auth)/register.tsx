import React, { useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator 
} from "react-native";
import { GlobalStyles, Colors, Typography, Spacing, Radii } from "../../styles/GlobalStyles";
import { router } from "expo-router";
import { signUp } from "../../services/authService"; // O serviço da IA
import { Ionicons } from "@expo/vector-icons";

export default function Register() {
  // ─── Nossos Estados (Substitutos do this.state) ────────────────
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Campos da data de nascimento separados
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");

  // Controle da tela (carregamento, erros e mostrar/esconder senha)
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const handleRegister = async () => {
    // Limpa qualquer erro de uma tentativa anterior
    setApiError("");
    setIsLoading(true);

    try {
      // 1. Pega os textos de dia, mês e ano e transforma em uma Data real
      const birthdateObj = new Date(
        parseInt(birthYear),
        parseInt(birthMonth) - 1, // Janeiro é 0 no JavaScript
        parseInt(birthDay)
      );

      // 2. Chama a função signUp do authService (exatamente como nos seus testes)
      await signUp(username, email, password, birthdateObj);

      // 3. Se o servidor aceitou, avisa e manda para a tela de Login
      alert("Conta criada com sucesso!");
      router.replace("/login");

    } catch (error: any) {
      // Se o servidor der erro (ex: e-mail já cadastrado), cai aqui
      setApiError(error.message || "Erro ao cadastrar");
    } finally {
      // Desliga a animação de carregamento do botão
      setIsLoading(false);
    }
  };
  return (
    <View style={GlobalStyles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={GlobalStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Cabeçalho da página */}
        <View style={styles.headerContainer}>
          <Text style={GlobalStyles.headingXL}>Criar Conta</Text>
          <Text style={GlobalStyles.bodySM}>Preencha os dados abaixo para começar</Text>
        </View>

        {/* Caixa de Erro da API (Aparece se o servidor rejeitar o cadastro) */}
        {!!apiError && (
          <View style={styles.apiErrorBox}>
            <Text style={styles.apiErrorText}>{apiError}</Text>
          </View>
        )}

        {/* Campo: Nome de Usuário */}
        <View style={GlobalStyles.inputWrapper}>
          <Text style={GlobalStyles.inputLabel}>Nome de Usuário</Text>
          <TextInput
            style={GlobalStyles.input}
            placeholder="ex: pedro_laqua"
            placeholderTextColor={Colors.textMuted}
            value={username}
            onChangeText={setUsername} // Atualiza o estado 'username' diretamente
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Campo: E-mail */}
        <View style={GlobalStyles.inputWrapper}>
          <Text style={GlobalStyles.inputLabel}>E-mail</Text>
          <TextInput
            style={GlobalStyles.input}
            placeholder="seuemail@exemplo.com"
            placeholderTextColor={Colors.textMuted}
            value={email}
            onChangeText={setEmail} // Atualiza o estado 'email'
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Seção de Data de Nascimento (Dividida em 3 caixas pequenas) */}
        <View style={GlobalStyles.inputWrapper}>
          <Text style={GlobalStyles.inputLabel}>Data de Nascimento</Text>
          <View style={GlobalStyles.row}>
            <TextInput
              style={[GlobalStyles.input, styles.dateFieldSmall]}
              placeholder="DD"
              placeholderTextColor={Colors.textMuted}
              keyboardType="number-pad"
              maxLength={2}
              value={birthDay}
              onChangeText={setBirthDay}
            />
            <Text style={styles.dateSep}>/</Text>
            <TextInput
              style={[GlobalStyles.input, styles.dateFieldSmall]}
              placeholder="MM"
              placeholderTextColor={Colors.textMuted}
              keyboardType="number-pad"
              maxLength={2}
              value={birthMonth}
              onChangeText={setBirthMonth}
            />
            <Text style={styles.dateSep}>/</Text>
            <TextInput
              style={[GlobalStyles.input, styles.dateFieldYear]}
              placeholder="ANO"
              placeholderTextColor={Colors.textMuted}
              keyboardType="number-pad"
              maxLength={4}
              value={birthYear}
              onChangeText={setBirthYear}
            />
          </View>
        </View>

        {/* Campo: Senha */}
        <View style={GlobalStyles.inputWrapper}>
          <Text style={GlobalStyles.inputLabel}>Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[GlobalStyles.input, styles.passwordInput]}
              placeholder={showPassword ? "suasenha123" : "••••••••"}
              placeholderTextColor={Colors.textMuted}
              secureTextEntry={!showPassword} // Esconde o texto se showPassword for falso
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {/* Botão do Olho para mostrar/esconder senha */}
            <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={Colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão de Enviar */}
        <TouchableOpacity
          style={[GlobalStyles.buttonPrimary, styles.submitBtn, isLoading && GlobalStyles.buttonDisabled]}
          onPress={handleRegister} // Chama a função que criamos no Passo 3
          disabled={isLoading}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.textOnPrimary} />
          ) : (
            <Text style={GlobalStyles.buttonPrimaryText}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        {/* Link para voltar ao Login */}
        <View style={styles.footerLinkRow}>
          <Text style={GlobalStyles.bodySM}>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={GlobalStyles.link}>Faça Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    marginTop: Spacing.xxl,
    marginBottom: Spacing.xl,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeBtn: {
    position: "absolute",
    right: Spacing.base,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  dateFieldSmall: {
    flex: 1,
    textAlign: "center",
  },
  dateFieldYear: {
    flex: 1.6,
    textAlign: "center",
  },
  dateSep: {
    fontSize: Typography.md,
    color: Colors.textMuted,
    marginHorizontal: Spacing.sm,
  },
  submitBtn: {
    marginTop: Spacing.md,
  },
  footerLinkRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing.xl,
  },
  apiErrorBox: {
    backgroundColor: Colors.errorLight,
    borderRadius: Radii.md,
    padding: Spacing.base,
    marginBottom: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  apiErrorText: {
    color: Colors.error,
    fontSize: Typography.sm,
    textAlign: "center",
    fontWeight: Typography.medium,
  },
});