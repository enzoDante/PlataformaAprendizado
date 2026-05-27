import React, { useState } from "react";

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface FormErrors {
  title?: string;
  content?: string;
  answers?: string;
  correct?: string;
}

const ANSWER_COUNT = 4;

const emptyAnswers = (): Answer[] =>
  Array.from({ length: ANSWER_COUNT }, () => ({ text: "", isCorrect: false }));

export default function Admin() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [answers, setAnswers] = useState<Answer[]>(emptyAnswers());
  const [errors, setErrors] = useState<FormErrors>({});
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

  const handleSubmit = () => {
    if (!validate()) return;

    const payload = {
      title: title.trim(),
      content: content.trim(),
      answers: answers.map((a) => ({
        text: a.text.trim(),
        isCorrect: a.isCorrect,
      })),
    };

    // TODO: integrar com o endpoint quando estiver disponível
    console.log("Fase criada:", payload);
    setSubmitted(true);
  };

  const handleReset = () => {
    setTitle("");
    setContent("");
    setAnswers(emptyAnswers());
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div style={styles.screen}>
        <div style={styles.successBox}>
          <span style={styles.successIcon}>✓</span>
          <h2 style={styles.successTitle}>Fase criada com sucesso!</h2>
          <p style={styles.successSub}>
            Os dados foram enviados. Você pode criar uma nova fase agora.
          </p>
          <button style={styles.btnPrimary} onClick={handleReset}>
            Criar nova fase
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.screen}>
      <div style={styles.container}>
        <h1 style={styles.pageTitle}>Criar fase</h1>
        <p style={styles.pageSubtitle}>
          Preencha os campos abaixo para adicionar uma nova fase ao app.
        </p>

        {/* Título */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Título da fase</label>
          <input
            style={{
              ...styles.input,
              ...(errors.title ? styles.inputError : {}),
            }}
            placeholder="Ex: Variáveis em JavaScript"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((e) => ({ ...e, title: undefined }));
            }}
          />
          {errors.title && <span style={styles.errorText}>{errors.title}</span>}
        </div>

        {/* Pergunta */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Pergunta</label>
          <textarea
            style={{
              ...styles.textarea,
              ...(errors.content ? styles.inputError : {}),
            }}
            placeholder="Ex: Qual das opções abaixo é usada para declarar uma variável em JavaScript?"
            value={content}
            rows={3}
            onChange={(e) => {
              setContent(e.target.value);
              if (errors.content)
                setErrors((e) => ({ ...e, content: undefined }));
            }}
          />
          {errors.content && (
            <span style={styles.errorText}>{errors.content}</span>
          )}
        </div>

        {/* Respostas */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Respostas</label>
          <p style={styles.hint}>
            Preencha as 4 opções e marque qual é a correta.
          </p>

          <div style={styles.answersGrid}>
            {answers.map((answer, index) => (
              <div
                key={index}
                style={{
                  ...styles.answerRow,
                  ...(answer.isCorrect ? styles.answerRowCorrect : {}),
                }}
              >
                <button
                  style={{
                    ...styles.radioBtn,
                    ...(answer.isCorrect ? styles.radioBtnActive : {}),
                  }}
                  onClick={() => handleSelectCorrect(index)}
                  title="Marcar como correta"
                  aria-label={`Marcar opção ${index + 1} como correta`}
                >
                  {answer.isCorrect && <span style={styles.radioDot} />}
                </button>

                <input
                  style={{
                    ...styles.answerInput,
                    ...(errors.answers ? styles.inputError : {}),
                  }}
                  placeholder={`Opção ${index + 1}`}
                  value={answer.text}
                  onChange={(e) => handleAnswerText(index, e.target.value)}
                />

                {answer.isCorrect && (
                  <span style={styles.correctBadge}>Correta</span>
                )}
              </div>
            ))}
          </div>

          {errors.answers && (
            <span style={styles.errorText}>{errors.answers}</span>
          )}
          {errors.correct && (
            <span style={styles.errorText}>{errors.correct}</span>
          )}
        </div>

        {/* Preview */}
        {(title || content || answers.some((a) => a.text)) && (
          <div style={styles.preview}>
            <p style={styles.previewLabel}>Pré-visualização</p>
            <div style={styles.previewCard}>
              {title && <p style={styles.previewTitle}>{title}</p>}
              {content && <p style={styles.previewContent}>{content}</p>}
              <div style={styles.previewOptions}>
                {answers
                  .filter((a) => a.text)
                  .map((a, i) => (
                    <div
                      key={i}
                      style={{
                        ...styles.previewOption,
                        ...(a.isCorrect ? styles.previewOptionCorrect : {}),
                      }}
                    >
                      <span
                        style={{
                          ...styles.previewOptionLetter,
                          ...(a.isCorrect
                            ? styles.previewOptionLetterCorrect
                            : {}),
                        }}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span style={styles.previewOptionText}>{a.text}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Ações */}
        <div style={styles.actions}>
          <button style={styles.btnSecondary} onClick={handleReset}>
            Limpar
          </button>
          <button style={styles.btnPrimary} onClick={handleSubmit}>
            Criar fase
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const colors = {
  primary: "#7C3AED",
  primaryLight: "#EDE9FE",
  primaryDark: "#5B21B6",
  border: "#E5E7EB",
  borderError: "#F87171",
  errorBg: "#FEF2F2",
  errorText: "#B91C1C",
  successBg: "#F0FDF4",
  successText: "#166534",
  correctBg: "#F0FDF4",
  correctBorder: "#4ADE80",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  background: "#F9FAFB",
  white: "#FFFFFF",
};

const styles: Record<string, React.CSSProperties> = {
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    minHeight: "100vh",
    padding: "32px 16px",
  },
  container: {
    maxWidth: 600,
    marginLeft: "auto",
    marginRight: "auto",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: colors.textPrimary,
    margin: "0 0 4px 0",
  },
  pageSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    margin: "0 0 32px 0",
  },

  // Fields
  fieldGroup: {
    marginBottom: 24,
  },
  label: {
    display: "block",
    fontSize: 14,
    fontWeight: 600,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  hint: {
    fontSize: 13,
    color: colors.textMuted,
    margin: "0 0 10px 0",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    fontSize: 15,
    borderRadius: 10,
    border: `1.5px solid ${colors.border}`,
    outline: "none",
    color: colors.textPrimary,
    backgroundColor: colors.white,
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "10px 14px",
    fontSize: 15,
    borderRadius: 10,
    border: `1.5px solid ${colors.border}`,
    outline: "none",
    color: colors.textPrimary,
    backgroundColor: colors.white,
    resize: "vertical",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  inputError: {
    borderColor: colors.borderError,
    backgroundColor: colors.errorBg,
  },
  errorText: {
    display: "block",
    fontSize: 12,
    color: colors.errorText,
    marginTop: 4,
  },

  // Answers
  answersGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  answerRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    borderRadius: 10,
    border: `1.5px solid ${colors.border}`,
    backgroundColor: colors.white,
  },
  answerRowCorrect: {
    borderColor: colors.correctBorder,
    backgroundColor: colors.correctBg,
  },
  radioBtn: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    border: `2px solid ${colors.border}`,
    backgroundColor: colors.white,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    padding: 0,
  },
  radioBtnActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: colors.primary,
  },
  answerInput: {
    flex: 1,
    fontSize: 15,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    color: colors.textPrimary,
    padding: 0,
  },
  correctBadge: {
    fontSize: 11,
    fontWeight: 600,
    color: "#166534",
    backgroundColor: "#DCFCE7",
    borderRadius: 6,
    padding: "2px 8px",
    whiteSpace: "nowrap",
  },

  // Preview
  preview: {
    marginBottom: 24,
  },
  previewLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  previewCard: {
    backgroundColor: colors.white,
    border: `1.5px solid ${colors.border}`,
    borderRadius: 14,
    padding: "20px 16px",
  },
  previewTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: colors.textMuted,
    marginBottom: 6,
    margin: "0 0 6px 0",
  },
  previewContent: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.textPrimary,
    marginBottom: 16,
    lineHeight: 1.4,
    margin: "0 0 16px 0",
  },
  previewOptions: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  previewOption: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    borderRadius: 10,
    border: `1.5px solid ${colors.border}`,
  },
  previewOptionCorrect: {
    borderColor: colors.correctBorder,
    backgroundColor: colors.correctBg,
  },
  previewOptionLetter: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    backgroundColor: colors.background,
    border: `1.5px solid ${colors.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 600,
    color: colors.textSecondary,
    flexShrink: 0,
  },
  previewOptionLetterCorrect: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
    color: colors.primary,
  },
  previewOptionText: {
    fontSize: 15,
    color: colors.textPrimary,
  },

  // Actions
  actions: {
    display: "flex",
    gap: 12,
    justifyContent: "flex-end",
  },
  btnPrimary: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 28,
    paddingRight: 28,
    borderRadius: 12,
    backgroundColor: colors.primary,
    border: "none",
    color: colors.white,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
  },
  btnSecondary: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 28,
    paddingRight: 28,
    borderRadius: 12,
    backgroundColor: colors.white,
    border: `1.5px solid ${colors.border}`,
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
  },

  // Success
  successBox: {
    maxWidth: 400,
    margin: "80px auto",
    textAlign: "center",
    padding: 32,
    backgroundColor: colors.white,
    borderRadius: 16,
    border: `1.5px solid ${colors.border}`,
  },
  successIcon: {
    display: "inline-flex",
    width: 56,
    height: 56,
    borderRadius: "50%",
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    color: "#166534",
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: colors.textPrimary,
    margin: "0 0 8px 0",
  },
  successSub: {
    fontSize: 14,
    color: colors.textSecondary,
    margin: "0 0 24px 0",
  },
};