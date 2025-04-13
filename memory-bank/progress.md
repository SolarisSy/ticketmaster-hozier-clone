# Progress: Clone Ticketmaster Hozier Event Page (Initial Setup)

## 1. O Que Funciona (Estado Atual)

*   **Estrutura do Projeto:** Estrutura de pastas e arquivos básicos.
*   **Configuração:** Configurações de Build (Vite, TS, Tailwind, Biome), Deploy (Netlify, Nixpacks).
*   **Memory Bank:** Iniciado e atualizado com análises, refatorações e correções.
*   **Assets:** Fontes e imagens disponíveis.
*   **Componentes Comuns:** `InfoModal.tsx`, `CheckoutSummary.tsx` criados.
*   **Fluxo de Compra:** Implementado até a geração e exibição do PIX (código e QR Code).
*   **Página de Detalhes (`EventDetails.tsx`):** Banner do evento adicionado.
*   **Roteamento (`App.tsx`):** Rotas `/selecionar-seguro` e `/termos` adicionadas.
*   **Dependências:** Pacote `serve` adicionado às `dependencies` para o `startCmd` do Nixpacks.

## 2. O Que Falta Construir/Analisar (Próximas Etapas)

*   **Análise Detalhada do Código:**
    *   ~~Verificar `package.json`~~ (Concluído)
    *   ~~Analisar `src/main.tsx`~~ (Concluído)
    *   ~~Analisar `src/App.tsx`~~ (Concluído)
    *   ~~Analisar componentes de Layout~~ (Concluído)
    *   ~~Refatorar `VenueMap.tsx`~~ (Concluído)
    *   ~~Criar `InsuranceSelection.tsx`~~ (Concluído)
    *   ~~Criar `TermsAndConditions.tsx`~~ (Concluído)
    *   ~~Criar `CheckoutSummary.tsx`~~ (Concluído)
    *   ~~Atualizar Roteamento e Navegação~~ (Concluído)
    *   ~~Refatorar `Checkout.tsx` para PIX~~ (Concluído)
    *   ~~Corrigir passagem de dados (`ticketTypesData`)~~ (Concluído)
    *   ~~Mover banner para `EventDetails.tsx`~~ (Concluído)
    *   ~~Instalar `qrcode.react`~~ (Concluído)
    *   ~~Implementar exibição do QR Code em `Checkout.tsx`~~ (Concluído)
    *   ~~Adicionar `serve` às dependências~~ (Concluído)
    *   Analisar página `Home.tsx` e componentes relacionados (Próxima etapa após teste de deploy).
    *   Inspecionar outras páginas (`EventDetails`).
*   **Funcionalidade:**
    *   **Fluxo de Compra:** Implementado até a geração e exibição do PIX (copia-e-cola e QR Code).
    *   **Pagamento PIX:** Chamada à API Zippfy implementada; exibição do código e QR Code.
    *   **Disponibilidade:** Dados de disponibilidade precisam ser revisados/atualizados.
    *   Implementar/Completar lógica de exibição de informações do evento.
    *   Implementar/Completar navegação entre páginas (outros links).
*   **Testes:** Nenhuma estrutura de teste é evidente inicialmente; pode ser necessário adicionar.
*   **Responsividade:** Verificar e garantir que a aplicação seja responsiva em diferentes tamanhos de tela.

## 3. Status Atual

*   **Fase:** Análise Inicial e Configuração do Memory Bank.
*   **Bloqueios:** Nenhum bloqueio no momento.
*   **Próximo Marco:** **Testar** o deploy na VPS com a nova configuração.

## 4. Problemas Conhecidos (Neste Momento)

*   Confirmação automática do pagamento PIX não implementada (requer backend/webhook).
*   Dados de disponibilidade (`allSectorTicketTypes`) estão forçados como `true`.
*   Dados dos tipos de ingresso são estáticos.
*   Ícones FontAwesome não estão sendo usados.
*   O componente `TicketQuantityModal.tsx` pode ser removido.
*   Erro de build anterior no Nixpacks (exit code 1) - tentativa de correção adicionando `serve`.

## 5. Histórico de Decisões (Evolução)

*   *(Ainda vazio - será preenchido conforme as decisões forem tomadas durante o desenvolvimento/análise)*

*Este documento acompanha o progresso geral e o estado do projeto.*
