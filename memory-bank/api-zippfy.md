# Guia de Integração da API Zippfy

## Visão Geral
A API Zippfy é uma solução de pagamentos que permite gerar cobranças PIX de forma simples e segura. Este guia explica como integrar a API em seu projeto.

## Configuração Inicial

### Credenciais
Para começar, você precisará de:
- URL da API: `https://api.zippify.com.br/api/public/v1/transactions`
- API Token: Token de autenticação fornecido pela Zippfy

### Estrutura Básica
```javascript
const payment = {
    apiUrl: "https://api.zippify.com.br/api/public/v1/transactions",
    apiToken: "SEU_API_TOKEN",
    // ... resto do código
};
```

## Gerando um Pagamento PIX

### Dados Necessários
Para gerar um pagamento PIX, você precisa fornecer:

1. **Valor do Pagamento**
   - O valor deve ser enviado em centavos (ex: R$ 10,90 = 1090)

2. **Identificadores do Produto**
   - `offer_hash`: Identificador único da oferta (ex: "pdnczi9glx")
   - `product_hash`: Identificador único do produto (ex: "c3sw3gbybu")

3. **Dados do Cliente**
   - Nome completo
   - CPF
   - Email
   - Telefone

### Exemplo de Requisição
```javascript
const requestBody = {
    amount: 1090, // R$ 10,90
    offer_hash: "pdnczi9glx",
    payment_method: "pix",
    customer: {
        name: "Nome do Cliente",
        document: "123.456.789-00",
        email: "cliente@email.com",
        phone_number: "11999999999"
    },
    cart: [
        {
            product_hash: "c3sw3gbybu",
            title: "Nome do Produto",
            price: 1090,
            quantity: 1,
            operation_type: 1,
            tangible: false,
            cover: null
        }
    ],
    installments: 1
};
```

### Processo de Pagamento
1. Faça uma requisição POST para a API
2. A API retornará:
   - QR Code PIX
   - Código PIX para copiar e colar

### Exemplo de Implementação
```javascript
async gerarPix(total) {
    const amountInCents = Math.round(total * 100);
    
    const requestBody = {
        amount: amountInCents,
        offer_hash: "pdnczi9glx",
        payment_method: "pix",
        customer: {
            name: nomeGerado,
            document: cpfGerado,
            email: emailGerado,
            phone_number: telefoneGerado
        },
        cart: [
            {
                product_hash: "c3sw3gbybu",
                title: "Robux",
                price: amountInCents,
                quantity: 1,
                operation_type: 1,
                tangible: false,
                cover: null
            }
        ],
        installments: 1
    };

    try {
        const response = await fetch(`${this.apiUrl}?api_token=${this.apiToken}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || "Erro ao gerar Pix.");
        }

        return {
            qrCodeString: data.pix.pix_qr_code,
            copyPasteCode: data.pix.pix_qr_code
        };
    } catch (error) {
        console.error("Erro:", error);
        throw error;
    }
}
```

## Tratamento de Respostas

### Sucesso
A API retornará um objeto com:
- `pix.pix_qr_code`: Código QR e código PIX para copiar e colar
- Outros dados da transação

### Erros
Em caso de erro, a API retornará:
- Código de status HTTP apropriado
- Mensagem de erro explicativa

## Boas Práticas

1. **Validação de Dados**
   - Sempre valide os dados antes de enviar para a API
   - Verifique se o valor está em centavos
   - Confirme se todos os campos obrigatórios estão preenchidos

2. **Tratamento de Erros**
   - Implemente tratamento adequado de erros
   - Exiba mensagens claras para o usuário
   - Registre erros para análise

3. **Segurança**
   - Nunca exponha seu API Token no frontend
   - Use HTTPS para todas as requisições
   - Valide dados sensíveis do cliente

4. **Monitoramento**
   - Implemente logs de transações
   - Monitore o status das transações
   - Mantenha registro das vendas realizadas

## Exemplo de Monitoramento
```javascript
async registrarVenda(valor, produto) {
    try {
        await monitor.trackSale(valor, produto);
        console.log("Venda registrada com sucesso");
    } catch (error) {
        console.error("Erro ao registrar venda:", error);
    }
}
``` 