# Documentação do Pixel do Google Ads

*Este arquivo documenta a implementação do pixel do Google Ads neste projeto.*

## Status da Implementação

**Implementado (12/04/2025)**

## Detalhes da Implementação

A implementação do rastreamento do Google Ads foi realizada da seguinte forma:

**1. Configuração via Painel de Administração:**
*   O arquivo `admin/index.html` foi modificado para incluir campos na aba "Configurações" onde o administrador pode inserir:
    *   **ID de Conversão do Google Ads (AW-ID):** O identificador da conta (`AW-XXXXXXXXXX`).
    *   **Rótulo de Conversão de Compra:** O rótulo específico para a ação de conversão de compra (`YY_YYYYYYYY...`).
*   Esses valores são salvos no `localStorage` do navegador sob a chave `adminConfig`.
*   Um botão "Remover Pixel" permite limpar essas configurações do `localStorage`.

**2. Injeção Dinâmica da Tag Global (gtag.js):**
*   O script `js/monitor.js`, na sua função `init()`, agora chama `injectGoogleAdsTag()`.
*   A função `injectGoogleAdsTag()` verifica se `googleAdsConversionId` existe no `localStorage`.
*   Se existir, ela injeta dinamicamente o script `gtag.js` (de `https://www.googletagmanager.com/gtag/js?id=AW-ID`) e o script de configuração (`gtag('config', 'AW-ID');`) no `<head>` da página atual. Isso garante que a tag global esteja presente em todas as páginas onde o `monitor.js` é carregado, habilitando o remarketing básico e preparando para eventos de conversão.

**3. Rastreamento do Evento de Compra (Conversão):**
*   O script `js/payment.js`, na função `gerarPix`, após receber uma resposta bem-sucedida da API Zippify, extrai o `hash` da transação (assumido como `transaction_id`).
*   Ele então chama a função `monitor.registrarVenda`, passando o valor da compra, nome do produto e o `transactionId` (o hash).
*   A função `monitor.trackSale` (em `js/monitor.js`) foi atualizada para receber o `transactionId`.
*   Dentro de `monitor.trackSale`, é chamada a função `trackGoogleAdsPurchase(amount, productName, transactionId)`.
*   A função `trackGoogleAdsPurchase` verifica se os IDs do Google Ads (`googleAdsConversionId` e `googleAdsPurchaseLabel`) estão configurados no `localStorage` e se a função `gtag` está disponível globalmente.
*   Se as condições forem atendidas, ela dispara o evento de conversão para o Google Ads:
    ```javascript
    gtag('event', 'conversion', {
        'send_to': `${this.googleAdsConversionId}/${this.googleAdsPurchaseLabel}`,
        'value': amount, // Valor da compra
        'currency': 'BRL', // Moeda
        'transaction_id': transactionId || '' // ID da transação (hash da Zippify)
    });
    ```
*   Isso envia a informação da compra concluída para a conta do Google Ads configurada no painel.

**Observações:**
*   O `transaction_id` é usado para ajudar o Google Ads a evitar a contagem duplicada de conversões.
*   A injeção da tag e o disparo do evento dependem da correta configuração dos IDs no painel de administração. Se os campos estiverem vazios ou forem removidos, o rastreamento do Google Ads não ocorrerá.
*   A implementação assume que o script `monitor.js` é carregado em todas as páginas relevantes onde a tag global é necessária.

---
*Este documento reflete o estado da implementação em 12/04/2025.*
