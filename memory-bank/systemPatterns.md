# System Patterns: Clone Ticketmaster Hozier Event Page

## 1. Arquitetura Geral

*   **Frontend:** Aplicação de página única (SPA - Single Page Application) construída com React.
*   **Build Tool:** Vite é utilizado para o desenvolvimento e build da aplicação, oferecendo hot module replacement (HMR) rápido e otimizações de build.
*   **Linguagem:** TypeScript é usado para adicionar tipagem estática ao JavaScript, melhorando a robustez e a manutenibilidade do código.
*   **Estilização:** Tailwind CSS é empregado como framework CSS utility-first, permitindo a criação rápida de interfaces customizadas diretamente no HTML/JSX. PostCSS é usado para processar o Tailwind.
*   **Roteamento:** Configurado em `src/App.tsx` usando `BrowserRouter` e `Routes` do `react-router-dom` (v7.5.0). Rotas principais definidas: `/`, `/ingressos/:city`, `/ingressos/selecionar/:city`, `/checkout`.

## 2. Padrões de Design Chave

*   **Componentização:** A aplicação é dividida em componentes React reutilizáveis, organizados em `src/components`. Há uma subdivisão adicional por funcionalidade/página (e.g., `home`, `layout`, `ticketSelection`).
*   **Layout Consistente:** O componente `src/components/layout/Layout.tsx` atua como um wrapper padrão, renderizando `Header` e `Footer` e envolvendo o conteúdo da página (`children`). **Confirmado:** Este componente `Layout` é importado e utilizado individualmente por cada componente de página (como `Home.tsx`, `EventDetails.tsx`, etc.) para garantir a consistência visual, em vez de ser aplicado globalmente em `App.tsx`.
*   **Separação de Responsabilidades (Pages vs. Components):** O diretório `src/pages` contém componentes que representam páginas completas ou visualizações principais da aplicação (e.g., `Home.tsx`, `TicketSelection.tsx`). Estes provavelmente orquestram a montagem de componentes menores de `src/components`.
*   **Configuração Centralizada:** Arquivos como `tailwind.config.js`, `postcss.config.js`, `vite.config.ts`, e `tsconfig.json` centralizam as configurações de build, estilização e TypeScript.

## 3. Fluxo de Dados (Inferido)

*   O fluxo de dados provavelmente segue o padrão unidirecional do React, com o estado sendo passado de componentes pais para filhos via props.
*   Pode haver estado local gerenciado com `useState` e `useEffect` dentro dos componentes.
*   Não há indicação inicial de uma biblioteca de gerenciamento de estado global (como Redux ou Zustand), mas isso pode ser necessário se a complexidade aumentar.

## 4. Decisões Técnicas Críticas

*   **Escolha do Stack:** React + TypeScript + Vite + Tailwind representa uma escolha moderna e popular para desenvolvimento frontend, focada em performance de desenvolvimento e produtividade.
*   **Estrutura de Pastas:** A organização em `pages` e `components` (com subpastas) é um padrão comum em projetos React para manter o código organizado.

*Este documento descreve a estrutura técnica e os padrões observados ou inferidos. Será refinado à medida que o código for analisado mais profundamente.*
