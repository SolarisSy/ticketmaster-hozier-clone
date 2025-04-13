# Tech Context: Clone Ticketmaster Hozier Event Page

## 1. Tecnologias Principais

*   **Framework/Biblioteca UI:** React
*   **Linguagem:** TypeScript
*   **Build Tool/Dev Server:** Vite
*   **CSS Framework:** Tailwind CSS
*   **CSS Processor:** PostCSS (usado pelo Tailwind)
*   **Package Manager:** `bun` é o gerenciador de pacotes preferencial (indicado por `bun.lock` e uso de `bunx` nos scripts `lint` e `format`). `package-lock.json` existe, mas pode ser legado.
*   **Linting/Formatting:** `biomejs/biome` é a ferramenta ativa para linting e formatação, conforme definido nos scripts `lint` e `format` em `package.json`. Existem dependências de ESLint e Prettier em `devDependencies`, mas parecem não ser usadas nos scripts principais (potencialmente redundantes ou legadas).

## 2. Dependências Chave (Inferidas do Stack e Estrutura)

*   `react`, `react-dom`: Core do React.
*   `typescript`: Suporte a TypeScript.
*   `vite`: Ferramenta de build e servidor de desenvolvimento.
*   `tailwindcss`, `postcss`, `autoprefixer`: Para estilização com Tailwind.
*   `@types/react`, `@types/react-dom`: Tipos TypeScript para React.
*   `react-router-dom`: **Confirmado** (v7.5.0) para roteamento SPA.
*   `tailwindcss-animate`: Plugin para animações com Tailwind.
*   `biomejs/biome`: Ferramenta de lint/format (confirmado por `biome.json` e scripts).

*Nota: Lista baseada no `package.json` analisado.*

## 3. Configuração do Ambiente de Desenvolvimento

*   **Instalação:** `bun install` (preferencialmente) ou `npm install`.
*   **Execução (Dev):** `bun run dev` (conforme script `dev` em `package.json`). Vite iniciará um servidor de desenvolvimento com HMR (`--host 0.0.0.0` permite acesso na rede local).
*   **Build (Produção):** `bun run build` (conforme script `build` em `package.json`). Executa `tsc -b` e `vite build --outDir dist`. A saída é no diretório `dist`.
*   **Linting:** `bun run lint` (executa `bunx biome lint --write && bunx tsc --noEmit`).
*   **Formatting:** `bun run format` (executa `bunx biome format --write`).
*   **Preview:** `bun run preview` (inicia um servidor local para visualizar o build de produção).

## 4. Configuração de Deploy

*   `netlify.toml`: Indica configuração para deploy na plataforma Netlify.
*   `public/_redirects`: Arquivo de configuração de redirecionamentos, comum em SPAs hospedadas na Netlify para lidar com roteamento no lado do cliente.

## 5. Assets e Recursos

*   **Fontes:** Fontes customizadas (Averta) estão localizadas em `public/fonts/`.
*   **Imagens:** Imagens estáticas (logo, banners, mapas) estão em `public/images/`. O diretório `public` é servido diretamente pelo Vite.

*Este documento detalha o stack tecnológico e o setup. Será atualizado com informações mais precisas após análise do `package.json` e outros arquivos de configuração.*
