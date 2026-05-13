# PlataformaAprendizado

Tecnologias Estudadas
1. JavaScript
 Visão Geral
JavaScript é a linguagem base da web, usada para criar interfaces dinâmicas, lógica de aplicação e comunicação com servidores. É a fundação sobre a qual React e TypeScript operam.

 Conceitos Dominados
Sintaxe moderna (ES6+): let, const, arrow functions, template literals.

Estruturas de dados: Arrays, objetos, Map, Set.

Funções assíncronas: async/await, fetch, tratamento de erros com try/catch.

Manipulação do DOM: Eventos, seletores, atualizações dinâmicas (em contextos web).

Modularização: Import/export de funções e componentes.

 Aplicações na Plataforma
Lógica de desafios e pontuação.

Validação de respostas dos usuários.

Comunicação com APIs REST para salvar progresso.

Animações e interações visuais (em contextos web ou híbridos).

2. TypeScript
 Visão Geral
TypeScript é uma extensão do JavaScript que adiciona tipagem estática, facilitando a manutenção, escalabilidade e segurança do código.

 Conceitos Dominados
Tipos primitivos e complexos: string, number, boolean, Array<T>, Record<K,V>.

Interfaces e tipos personalizados: Definição clara de estruturas de dados.

Generics: Componentes e funções reutilizáveis com tipagem flexível.

Enumerações e union types: Controle de fluxos e estados.

Tipagem em React: Props, estados, eventos e contextos.

 Aplicações na Plataforma
Tipagem de componentes e funções para evitar erros.

Autocompletar e documentação automática no editor.

Validação de dados recebidos de APIs.

Definição de modelos para usuários, desafios, conquistas.

3. React Native
 Visão Geral
React Native permite criar aplicativos móveis nativos usando JavaScript e React. Ideal para alcançar usuários Android e iOS com uma única base de código.

 Conceitos Dominados
Componentes funcionais: Reutilização e composição de UI.

Hooks: useState, useEffect, useContext, useRef.

Estilização com StyleSheet: Layouts responsivos e adaptáveis.

Navegação: React Navigation para múltiplas telas e rotas.

Integração nativa: Notificações push, armazenamento local, câmera.

 Aplicações na Plataforma
Interface do usuário com feedback visual e interativo.

Sistema de navegação entre módulos de aprendizado.

Persistência de progresso local e sincronização com servidor.

Notificações de novos desafios ou conquistas.

##

## Configuração do ambiente

Projeto inicializado com React Native e template TypeScript.

Gerenciador de pacotes Yarn configurado.

Dependências principais instaladas.

Arquivo tsconfig.json ajustado para uso com React Native e TypeScript.



## Estruturação das telas

Aqui, desenvolvemos uma estrutura antes de começarmos a trabalhar nos elementos. Criamos arquivos com os nomes de suas respectivas funções e fazer uma estruturação básica para nos guiarmos durante o processo de desenvolvimento. Além disso, foi criado um arquivo onde serão definidos os padrões de cada componente para melhor organização do código. Em cada tela, foi envolvido um componente para permitir a rolagem de tela caso os elementos dentro da tela ultrapassem as coordenadas normais da tela.