import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  ActivityIndicator, 
  Alert 
} from "react-native";
import { router } from "expo-router";
import api from "@/services/api";
import { getAccessToken } from "@/services/authService";

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface FormErrors {
  sectionId?: string;
  title?: string;
  content?: string;
  answers?: string;
  correct?: string;
}

const ANSWER_COUNT = 4;

const emptyAnswers = (): Answer[] =>
  Array.from({ length: ANSWER_COUNT }, () => ({ text: "", isCorrect: false }));

export default function Admin() {
  const [sectionId, setSectionId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [answers, setAnswers] = useState<Answer[]>(emptyAnswers());
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerText = (index: number, value: string) => {
    setAnswers((prev) =>
      prev.map((a, i) => (i === index ? { ...a, text: value } : a))
    );
    if (errors.answers) setErrors((e) => ({ ...e, answers: undefined }));
  };

  const handleSelectCorrect = (index: number) => {
    setAnswers((prev) =>
      prev.map((a, i) => ({ ...a, isCorrect: i === index }))
    );
    if (errors.correct) setErrors((e) => ({ ...e, correct: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!sectionId.trim()) newErrors.sectionId = "Informe o ID da Section (Mundo)";
    if (!title.trim()) newErrors.title = "Informe o título da fase";
    if (!content.trim()) newErrors.content = "Informe a pergunta";

    const filledAnswers = answers.filter((a) => a.text.trim());
    if (filledAnswers.length < ANSWER_COUNT)
      newErrors.answers = "Preencha todas as 4 respostas";

    const hasCorrect = answers.some((a) => a.isCorrect);
    if (!hasCorrect) newErrors.correct = "Selecione qual é a resposta correta";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const token = await getAccessToken();
      
      // Ajuste o Payload para bater com as propriedades que seu CreateClassRequest espera no C#
      const payload = {
        sectionId: parseInt(sectionId), 
        title: title.trim(),
        content: content.trim(),
        answers: answers.map((a) => ({
          text: a.text.trim(),
          isCorrect: a.isCorrect,
        })),
      };

      // Dispara o POST para o endpoint do seu Controller C#
      await api.post("/GameAdmin/Class", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSubmitted(true);
    } catch (error: any) {
      console.error("Erro ao criar fase:", error?.response?.data || error.message);
      Alert.alert("Erro", "Não foi possível salvar a fase no servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSectionId("");
    setTitle("");
    setContent("");
    setAnswers(emptyAnswers());
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <View style={styles.screen}>
        <View style={styles.successBox}>
          <Text style={styles.successIcon}>✓</Text>
          <Text style={styles.successTitle}>Fase criada com sucesso!</Text>
          <Text style={styles.successSub}>
            Os dados foram enviados para a API C#. Você pode criar outra agora.
          </Text>
          <TouchableOpacity style={styles.btnPrimary} onPress={handleReset}>
            <Text style={styles.btnText}>Criar nova fase</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Criar fase</Text>
        <Text style={styles.pageSubtitle}>
          Adicione uma nova fase vinculando-a a uma Section da sua API.
        </Text>

        {/* Section ID */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>ID da Section (Mundo)</Text>
          <TextInput
            style={[styles.input, errors.sectionId && styles.inputError]}
            placeholder="Ex: 1"
            keyboardType="numeric"
            value={sectionId}
            onChangeText={(txt) => {
              setSectionId(txt);
              if (errors.sectionId) setErrors((e) => ({ ...e, sectionId: undefined }));
            }}
          />
          {errors.sectionId && <Text style={styles.errorText}>{errors.sectionId}</Text>}
        </View>

        {/* Título */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Título da fase</Text>
          <TextInput
            style={[styles.input, errors.title && styles.inputError]}
            placeholder="Ex: Variáveis em JavaScript"
            value={title}
            onChangeText={(txt) => {
              setTitle(txt);
              if (errors.title) setErrors((e) => ({ ...e, title: undefined }));
            }}
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>

        {/* Pergunta */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Pergunta</Text>
          <TextInput
            style={[styles.textarea, errors.content && styles.inputError]}
            placeholder="Qual comando inicia uma variável?"
            value={content}
            multiline
            numberOfLines={3}
            onChangeText={(txt) => {
              setContent(txt);
              if (errors.content) setErrors((e) => ({ ...e, content: undefined }));
            }}
          />
          {errors.content && <Text style={styles.errorText}>{errors.content}</Text>}
        </View>

        {/* Respostas */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Respostas</Text>
          <Text style={styles.hint}>Preencha as 4 opções e marque a correta.</Text>

          <View style={styles.answersGrid}>
            {answers.map((answer, index) => (
              <View 
                key={index} 
                style={[styles.answerRow, answer.isCorrect && styles.answerRowCorrect]}
              >
                <TouchableOpacity
                  style={[styles.radioBtn, answer.isCorrect && styles.radioBtnActive]}
                  onPress={() => handleSelectCorrect(index)}
                >
                  {answer.isCorrect && <View style={styles.radioDot} />}
                </TouchableOpacity>

                <TextInput
                  style={styles.answerInput}
                  placeholder={`Opção ${index + 1}`}
                  value={answer.text}
                  onChangeText={(txt) => handleAnswerText(index, txt)}
                />
                {answer.isCorrect && <Text style={styles.correctBadge}>Correta</Text>}
              </View>
            ))}
          </View>
          {errors.answers && <Text style={styles.errorText}>{errors.answers}</Text>}
          {errors.correct && <Text style={styles.errorText}>{errors.correct}</Text>}
        </View>

        {/* Ações */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.btnSecondary} onPress={handleReset}>
            <Text style={styles.btnTextSecondary}>Limpar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.btnPrimary} onPress={handleSubmit} disabled={loading}>
            {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>Criar fase</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// ─── Styles Nativos ───────────────────────────────────────────────────────────
const colors = {
  primary: "#7C3AED",
  primaryLight: "#EDE9FE",
  border: "#E5E7EB",
  borderError: "#F87171",
  errorBg: "#FEF2F2",
  errorText: "#B91C1C",
  correctBg: "#F0FDF4",
  correctBorder: "#4ADE80",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  background: "#F9FAFB",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, paddingTop: 40 },
  container: { paddingHorizontal: 20 },
  pageTitle: { fontSize: 24, fontWeight: "700", color: colors.textPrimary, marginBottom: 4 },
  pageSubtitle: { fontSize: 14, color: colors.textSecondary, marginBottom: 24 },
  fieldGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: colors.textPrimary, marginBottom: 6 },
  hint: { fontSize: 12, color: colors.textMuted, marginBottom: 10 },
  input: { 
    backgroundColor: colors.white, padding: 12, borderRadius: 10, 
    borderWidth: 1.5, borderColor: colors.border, color: colors.textPrimary 
  },
  textarea: { 
    backgroundColor: colors.white, padding: 12, borderRadius: 10, 
    borderWidth: 1.5, borderColor: colors.border, color: colors.textPrimary,
    minHeight: 80, textAlignVertical: "top" 
  },
  inputError: { borderColor: colors.borderError, backgroundColor: colors.errorBg },
  errorText: { fontSize: 12, color: colors.errorText, marginTop: 4 },
  answersGrid: { gap: 10 },
  answerRow: { 
    flexDirection: "row", alignItems: "center", backgroundColor: colors.white, 
    padding: 10, borderRadius: 10, borderWidth: 1.5, borderColor: colors.border 
  },
  answerRowCorrect: { borderColor: colors.correctBorder, backgroundColor: colors.correctBg },
  radioBtn: { 
    width: 20, height: 20, borderRadius: 10, borderWidth: 2, 
    borderColor: colors.border, alignItems: "center", justifyContent: "center", marginRight: 10 
  },
  radioBtnActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  answerInput: { flex: 1, color: colors.textPrimary, padding: 0 },
  correctBadge: { fontSize: 11, fontWeight: "600", color: "#166534", backgroundColor: "#DCFCE7", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  actions: { flexDirection: "row", justifyContent: "flex-end", gap: 12, marginTop: 10 },
  btnPrimary: { backgroundColor: colors.primary, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12, minWidth: 120, alignItems: "center" },
  btnSecondary: { backgroundColor: colors.white, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12, borderWidth: 1.5, borderColor: colors.border },
  btnText: { color: "#FFF", fontWeight: "600", fontSize: 15 },
  btnTextSecondary: { color: colors.textSecondary, fontWeight: "500", fontSize: 15 },
  successBox: { flex: 1, alignItems: "center", justifyContent: "center", padding: 30, marginTop: 100 },
  successIcon: { fontSize: 40, color: "#166534", backgroundColor: "#DCFCE7", width: 60, height: 60, borderRadius: 30, textAlign: "center", textAlignVertical: "center", overflow: "hidden", marginBottom: 16 },
  successTitle: { fontSize: 20, fontWeight: "700", color: colors.textPrimary, marginBottom: 8 },
  successSub: { fontSize: 14, color: colors.textSecondary, textAlign: "center", marginBottom: 24 }
});