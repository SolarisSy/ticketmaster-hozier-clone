# Active Context: Clone Ticketmaster Hozier Event Page (Initial Setup)

## 1. Foco Atual

*   Inicialização do Memory Bank.
*   Análise inicial da estrutura do projeto e tecnologias com base nos nomes de arquivos e diretórios.

## 2. Mudanças Recentes

*   Criação dos arquivos iniciais do Memory Bank e análise inicial.
*   Criação dos componentes `InfoModal.tsx`, `TicketTypeList.tsx`, e `CheckoutSummary.tsx`.
*   Refatoração de `VenueMap.tsx` para fluxo de seleção em duas etapas.
*   Criação da página `InsuranceSelection.tsx`.
*   Criação da página `TermsAndConditions.tsx`.
*   Refatoração da página `Checkout.tsx` para pagamento PIX via API Zippfy.
*   Instalação da biblioteca `qrcode.react`.
*   Implementação da exibição do QR Code PIX em `Checkout.tsx` usando `qrcode.react`.
*   Adição das rotas `/selecionar-seguro` e `/termos` em `App.tsx`.
*   Implementação da navegação completa do fluxo: `VenueMap` -> `InsuranceSelection` -> `TermsAndConditions` -> `Checkout` (PIX com QR Code).
*   Correção da passagem de `ticketTypesData` entre as etapas.
*   Movido o banner do evento para `EventDetails.tsx`.
*   Criação do arquivo `nixpacks.toml` para configuração de deploy.
*   Adição do pacote `serve` às `dependencies` em `package.json` como tentativa de correção do erro de build do Nixpacks.
*   Atualização de `systemPatterns.md` e `progress.md`.

## 3. Próximas Etapas Imediatas

1.  **Atualizar `progress.md`:** Refletir a adição de `serve` ao `package.json`.
2.  **Testar Deploy:** **Prioridade Alta.** Tentar realizar o deploy na VPS novamente para verificar se o erro de build foi resolvido.
3.  **Testar Funcionalidade (Pós-Deploy):** Verificar o fluxo completo da aplicação no ambiente de deploy.
4.  **Revisar Disponibilidade:** Ajustar `isAvailable` nos dados `allSectorTicketTypes`.
5.  **Analisar Página Principal (`Home.tsx`):** Continuar a análise do código.

## 4. Decisões Ativas e Considerações

*   **Gerenciador de Pacotes:** Confirmado o uso de `bun` como padrão.
*   **Ferramentas:** Confirmado `biome` para lint/format e `react-router-dom` para roteamento.
*   **Prioridade:** Testar o deploy na VPS após a adição do `serve`.

## 5. Padrões e Preferências Emergentes

*   A estrutura do projeto segue convenções comuns do ecossistema React/Vite.
*   O uso de Biome para linting/formatting é confirmado pelos scripts no `package.json`.
*   A presença de dependências de ESLint/Prettier pode indicar uma migração para Biome ou configuração incompleta/legada.

## 6. Aprendizados e Insights

*   O fluxo de pagamento PIX foi implementado usando a API Zippfy e `qrcode.react`.
*   A confirmação automática do pagamento PIX continua sendo uma limitação do frontend.
*   Erros de build no deploy (como o `exit code 1` do Docker/Nixpacks) podem ocorrer por diversas razões, incluindo falhas nos comandos `install`, `build` ou `start` definidos no `nixpacks.toml`. Adicionar dependências explícitas (`serve`) pode ajudar.
*   É crucial manter o `package-lock.json` para garantir consistência de dependências entre o ambiente local e o de deploy.

*Este documento rastreia o estado atual do trabalho e será atualizado frequentemente.*
