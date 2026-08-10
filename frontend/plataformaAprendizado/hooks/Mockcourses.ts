import { Colors } from "@/styles/GlobalStyles";
import { EnrolledCourse } from "@/hooks/useCourses";
import { ExploreCourse } from "@/hooks/useExplore";
import { CourseDetail } from "@/types/courseTypes";

// ─────────────────────────────────────────────────────────────────────────────
// Cursos matriculados — usados em useCourses (aba "Meus Cursos")
// ─────────────────────────────────────────────────────────────────────────────

export const MOCK_ENROLLED_COURSES: EnrolledCourse[] = [
  {
    id: "c",
    title: "Linguagem C",
    instructor: "Carlos Lima",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    emoji: "🤖",
    progress: 60,
    totalLessons: 35,
    completedLessons: 21,
    duration: "18h",
    lastAccessedLesson: "Ponteiros Básicos",
    status: "in_progress",
  },
  {
    id: "java",
    title: "Java",
    instructor: "Maria Silva",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    emoji: "☕",
    progress: 100,
    totalLessons: 80,
    completedLessons: 80,
    duration: "40h",
    lastAccessedLesson: "Orientação a Objetos",
    status: "completed",
  },
  {
    id: "python",
    title: "Python",
    instructor: "João Santos",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    emoji: "🐍",
    progress: 45,
    totalLessons: 62,
    completedLessons: 28,
    duration: "31h",
    lastAccessedLesson: "Funções e Módulos",
    status: "in_progress",
  },
  {
    id: "logic",
    title: "Lógica de Programação",
    instructor: "Ana Costa",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    emoji: "🧩",
    progress: 30,
    totalLessons: 40,
    completedLessons: 12,
    duration: "23h",
    lastAccessedLesson: "Estruturas de Repetição",
    status: "in_progress",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Todos os cursos disponíveis — usados em useExplore (aba "Pesquisar")
// ─────────────────────────────────────────────────────────────────────────────

export const MOCK_EXPLORE_COURSES: ExploreCourse[] = [
  {
    id: "c",
    title: "Linguagem C",
    instructor: "Carlos Lima",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    rating: 4.6,
    students: "20.1k",
    duration: "18h",
    emoji: "🤖",
    level: "Iniciante",
  },
  {
    id: "java",
    title: "Java",
    instructor: "Maria Silva",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    rating: 4.8,
    students: "15.2k",
    duration: "40h",
    emoji: "☕",
    level: "Intermediário",
  },
  {
    id: "python",
    title: "Python",
    instructor: "João Santos",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    rating: 4.9,
    students: "6.9k",
    duration: "31h",
    emoji: "🐍",
    level: "Iniciante",
  },
  {
    id: "logic",
    title: "Lógica de Programação",
    instructor: "Ana Costa",
    category: "Programação",
    categoryColor: Colors.accentBlue,
    rating: 4.7,
    students: "12.4k",
    duration: "23h",
    emoji: "🧩",
    level: "Iniciante",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Detalhe de cada curso (fases + exercícios) — usados em useCourseDetail
// ─────────────────────────────────────────────────────────────────────────────

export const MOCK_COURSE_DETAILS: Record<string, CourseDetail> = {
  c: {
    id: "c",
    title: "Linguagem C",
    emoji: "🤖",
    categoryColor: "#2563EB",
    completedLevelIds: ["c-1", "c-2"],
    totalXp: 220,
    levels: [
      {
        id: "c-1",
        number: 1,
        title: "Sintaxe e Printf",
        description: "O seu primeiro Olá Mundo em C",
        xp: 100,
        exercises: [
          {
            id: "c-1-1",
            question: "Qual função é usada para imprimir texto em C?",
            correctOptionId: "a",
            explanation: "printf() é a função padrão de saída em C, definida em <stdio.h>.",
            options: [
              { id: "a", text: "printf()" },
              { id: "b", text: "print()" },
              { id: "c", text: "cout" },
              { id: "d", text: "System.out.println()" },
            ],
          },
          {
            id: "c-1-2",
            question: "Qual é a extensão correta de um arquivo C?",
            correctOptionId: "b",
            explanation: "Arquivos em C usam a extensão .c, como main.c.",
            options: [
              { id: "a", text: ".java" },
              { id: "b", text: ".c" },
              { id: "c", text: ".cpp" },
              { id: "d", text: ".py" },
            ],
          },
        ],
      },
      {
        id: "c-2",
        number: 2,
        title: "Tipos de Dados",
        description: "Int, float, char e double",
        xp: 120,
        exercises: [
          {
            id: "c-2-1",
            question: "Qual tipo de dado armazena números inteiros em C?",
            correctOptionId: "a",
            explanation: "O tipo int armazena números inteiros, positivos ou negativos.",
            options: [
              { id: "a", text: "int" },
              { id: "b", text: "float" },
              { id: "c", text: "char" },
              { id: "d", text: "double" },
            ],
          },
        ],
      },
      {
        id: "c-3",
        number: 3,
        title: "Estruturas de Decisão",
        description: "IF, ELSE e o comando SWITCH",
        xp: 150,
        exercises: [
          {
            id: "c-3-1",
            question: "Qual palavra-chave inicia uma estrutura condicional em C?",
            correctOptionId: "b",
            explanation: "A palavra-chave 'if' inicia uma estrutura condicional em C.",
            options: [
              { id: "a", text: "when" },
              { id: "b", text: "if" },
              { id: "c", text: "check" },
              { id: "d", text: "case" },
            ],
          },
        ],
      },
      {
        id: "c-4",
        number: 4,
        title: "Vetores e Arrays",
        description: "Agrupando dados numa mesma variável",
        xp: 180,
        exercises: [
          {
            id: "c-4-1",
            question: "Como declarar um array de 5 inteiros em C?",
            correctOptionId: "c",
            explanation: "int arr[5] declara um array de 5 elementos do tipo int.",
            options: [
              { id: "a", text: "array int[5]" },
              { id: "b", text: "int arr(5)" },
              { id: "c", text: "int arr[5]" },
              { id: "d", text: "int[5] arr" },
            ],
          },
        ],
      },
      {
        id: "c-5",
        number: 5,
        title: "Ponteiros Básicos",
        description: "Entendendo endereços de memória",
        xp: 250,
        exercises: [
          {
            id: "c-5-1",
            question: "O que o operador & faz em C?",
            correctOptionId: "a",
            explanation: "O operador & retorna o endereço de memória de uma variável.",
            options: [
              { id: "a", text: "Retorna o endereço de memória" },
              { id: "b", text: "Multiplica dois valores" },
              { id: "c", text: "Acessa o valor de um ponteiro" },
              { id: "d", text: "Declara uma variável" },
            ],
          },
        ],
      },
    ],
  },

  java: {
    id: "java",
    title: "Java",
    emoji: "☕",
    categoryColor: "#E85D04",
    completedLevelIds: [],
    totalXp: 0,
    levels: [
      {
        id: "java-1",
        number: 1,
        title: "Introdução ao Java",
        description: "Hello World e estrutura básica",
        xp: 100,
        exercises: [
          {
            id: "java-1-1",
            question: "Qual método é o ponto de entrada de um programa Java?",
            correctOptionId: "b",
            explanation: "O método main com a assinatura public static void main(String[] args) é o ponto de entrada.",
            options: [
              { id: "a", text: "start()" },
              { id: "b", text: "main()" },
              { id: "c", text: "run()" },
              { id: "d", text: "init()" },
            ],
          },
        ],
      },
      {
        id: "java-2",
        number: 2,
        title: "Orientação a Objetos",
        description: "Classes, objetos e métodos",
        xp: 150,
        exercises: [
          {
            id: "java-2-1",
            question: "O que é uma classe em Java?",
            correctOptionId: "a",
            explanation: "Uma classe é um molde que define atributos e comportamentos de objetos.",
            options: [
              { id: "a", text: "Um molde para criar objetos" },
              { id: "b", text: "Uma função isolada" },
              { id: "c", text: "Um tipo primitivo" },
              { id: "d", text: "Um arquivo de configuração" },
            ],
          },
        ],
      },
      {
        id: "java-3",
        number: 3,
        title: "Herança e Polimorfismo",
        description: "Reutilizando e estendendo classes",
        xp: 200,
        exercises: [
          {
            id: "java-3-1",
            question: "Qual palavra-chave é usada para herança em Java?",
            correctOptionId: "c",
            explanation: "A palavra-chave 'extends' indica que uma classe herda de outra.",
            options: [
              { id: "a", text: "implements" },
              { id: "b", text: "inherits" },
              { id: "c", text: "extends" },
              { id: "d", text: "super" },
            ],
          },
        ],
      },
    ],
  },

  python: {
    id: "python",
    title: "Python",
    emoji: "🐍",
    categoryColor: "#16A34A",
    completedLevelIds: ["python-1"],
    totalXp: 100,
    levels: [
      {
        id: "python-1",
        number: 1,
        title: "Introdução ao Python",
        description: "Sintaxe básica e primeiro programa",
        xp: 100,
        exercises: [
          {
            id: "python-1-1",
            question: "Qual função imprime texto no console em Python?",
            correctOptionId: "a",
            explanation: "A função print() exibe texto no console em Python.",
            options: [
              { id: "a", text: "print()" },
              { id: "b", text: "printf()" },
              { id: "c", text: "echo()" },
              { id: "d", text: "console.log()" },
            ],
          },
        ],
      },
      {
        id: "python-2",
        number: 2,
        title: "Listas e Dicionários",
        description: "Estruturas de dados essenciais",
        xp: 130,
        exercises: [
          {
            id: "python-2-1",
            question: "Como criar uma lista vazia em Python?",
            correctOptionId: "b",
            explanation: "Uma lista vazia é criada com [] ou list().",
            options: [
              { id: "a", text: "{}" },
              { id: "b", text: "[]" },
              { id: "c", text: "()" },
              { id: "d", text: "<>" },
            ],
          },
        ],
      },
      {
        id: "python-3",
        number: 3,
        title: "Funções e Módulos",
        description: "Organizando e reutilizando código",
        xp: 150,
        exercises: [
          {
            id: "python-3-1",
            question: "Qual palavra-chave define uma função em Python?",
            correctOptionId: "d",
            explanation: "A palavra-chave 'def' é usada para definir funções em Python.",
            options: [
              { id: "a", text: "function" },
              { id: "b", text: "fun" },
              { id: "c", text: "func" },
              { id: "d", text: "def" },
            ],
          },
        ],
      },
    ],
  },

  logic: {
    id: "logic",
    title: "Lógica de Programação",
    emoji: "🧩",
    categoryColor: "#7C3AED",
    completedLevelIds: ["logic-1", "logic-2"],
    totalXp: 220,
    levels: [
      {
        id: "logic-1",
        number: 1,
        title: "Introdução à Lógica",
        description: "O que são algoritmos?",
        xp: 100,
        exercises: [
          {
            id: "logic-1-1",
            question: "O que é um algoritmo?",
            correctOptionId: "a",
            explanation: "Um algoritmo é uma sequência finita de passos para resolver um problema.",
            options: [
              { id: "a", text: "Uma sequência de passos para resolver um problema" },
              { id: "b", text: "Um tipo de linguagem de programação" },
              { id: "c", text: "Um componente de hardware" },
              { id: "d", text: "Um banco de dados" },
            ],
          },
        ],
      },
      {
        id: "logic-2",
        number: 2,
        title: "Variáveis e Constantes",
        description: "Guardando dados na memória",
        xp: 120,
        exercises: [
          {
            id: "logic-2-1",
            question: "O que é uma variável?",
            correctOptionId: "c",
            explanation: "Uma variável é um espaço na memória que armazena um valor que pode mudar.",
            options: [
              { id: "a", text: "Um valor fixo que nunca muda" },
              { id: "b", text: "Uma função matemática" },
              { id: "c", text: "Um espaço na memória para guardar valores" },
              { id: "d", text: "Um tipo de loop" },
            ],
          },
        ],
      },
      {
        id: "logic-3",
        number: 3,
        title: "Estruturas Condicionais",
        description: "Trabalhando com Se e Senão",
        xp: 150,
        exercises: [
          {
            id: "logic-3-1",
            question: "O que faz uma estrutura condicional?",
            correctOptionId: "b",
            explanation: "Uma estrutura condicional executa blocos de código diferentes dependendo de uma condição.",
            options: [
              { id: "a", text: "Repete um bloco de código" },
              { id: "b", text: "Executa código dependendo de uma condição" },
              { id: "c", text: "Declara uma variável" },
              { id: "d", text: "Importa um módulo" },
            ],
          },
        ],
      },
      {
        id: "logic-4",
        number: 4,
        title: "Operadores Lógicos",
        description: "E, OU e NÃO (AND, OR, NOT)",
        xp: 180,
        exercises: [
          {
            id: "logic-4-1",
            question: "O operador AND retorna verdadeiro quando:",
            correctOptionId: "a",
            explanation: "O AND só retorna verdadeiro quando ambas as condições são verdadeiras.",
            options: [
              { id: "a", text: "Ambas as condições são verdadeiras" },
              { id: "b", text: "Pelo menos uma condição é verdadeira" },
              { id: "c", text: "Nenhuma condição é verdadeira" },
              { id: "d", text: "A primeira condição é falsa" },
            ],
          },
        ],
      },
      {
        id: "logic-5",
        number: 5,
        title: "Estruturas de Repetição",
        description: "Dominando loops",
        xp: 200,
        exercises: [
          {
            id: "logic-5-1",
            question: "Qual estrutura repete um bloco enquanto uma condição for verdadeira?",
            correctOptionId: "c",
            explanation: "O while repete o bloco de código enquanto a condição permanecer verdadeira.",
            options: [
              { id: "a", text: "if" },
              { id: "b", text: "switch" },
              { id: "c", text: "while" },
              { id: "d", text: "return" },
            ],
          },
        ],
      },
    ],
  },
};