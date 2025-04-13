import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react'; // Importa o componente QR Code
import Layout from '../components/layout/Layout';
import { QuantitiesState, TicketTypeDetails } from '../components/ticketSelection/TicketTypeList'; // Importa tipos

// Interface para o estado recebido da página de Termos
interface CheckoutLocationState {
  tickets: QuantitiesState;
  total: number; // Não usado diretamente, recalculamos
  sectorName: string;
  insuranceSelected: 'yes' | 'no' | null;
  ticketTypesData: TicketTypeDetails[];
  insurancePrice?: number;
}

// Helper para formatar moeda
const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// --- Zippfy API Config ---
const ZIPPFY_API_URL = "https://api.zippify.com.br/api/public/v1/transactions";
const ZIPPFY_API_TOKEN = "xRTHdgR3fG79HHmixfIYuMwdVPYJRmuqK7PBpxJ31hcx8s5yTsEAGeYAZpS1"; // Substituir pelo token real se diferente
const ZIPPFY_OFFER_HASH = "zupxvoidec";
const ZIPPFY_PRODUCT_HASH = "tmnczim9vu";
// -------------------------

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as CheckoutLocationState | null;
  const insurancePrice = state?.insurancePrice ?? 46.08;

  // Calcula o total final e formata os tickets para exibição
  const { formattedTickets, finalTotalPriceString, finalTotalAmount } = useMemo(() => {
    if (!state || !state.tickets || !state.ticketTypesData) {
      return { formattedTickets: [], finalTotalPriceString: 'R$ 0,00', finalTotalAmount: 0 };
    }
    let subtotalTickets = 0;
    let totalServiceFee = 0;
    const ticketsToDisplay: Array<{ id: string; name: string; quantity: number; price: number; fee: number; sectorName: string }> = [];
    Object.entries(state.tickets).forEach(([ticketTypeId, quantity]) => {
      if (quantity > 0) {
        const ticketInfo = state.ticketTypesData.find(t => t.id === ticketTypeId);
        if (ticketInfo) {
          subtotalTickets += quantity * ticketInfo.price;
          totalServiceFee += quantity * ticketInfo.fee;
          ticketsToDisplay.push({ ...ticketInfo, quantity, sectorName: state.sectorName });
        }
      }
    });
    const insuranceCost = state.insuranceSelected === 'yes' ? insurancePrice : 0;
    const total = subtotalTickets + totalServiceFee + insuranceCost;
    return {
      formattedTickets: ticketsToDisplay,
      finalTotalPriceString: formatCurrency(total),
      finalTotalAmount: total
    };
  }, [state, insurancePrice]);

  // Estado do formulário - Removido campos de cartão, adicionado telefone
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '', // Adicionado telefone
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [pixCode, setPixCode] = useState<string | null>(null); // Estado para armazenar o código PIX
  const [apiError, setApiError] = useState<string | null>(null); // Estado para erros da API

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) setFormErrors({ ...formErrors, [name]: '' });
  };

  // Funções de formatação
  const formatCpf = (value: string) => value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 10) { // (XX) XXXX-XXXX
        return digits.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2');
    } else { // (XX) XXXXX-XXXX
        return digits.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'cpf') setFormData({ ...formData, cpf: formatCpf(value) });
    else if (name === 'phone') setFormData({ ...formData, phone: formatPhone(value) });
  };

  // Validação do formulário - Atualizada para incluir telefone e remover cartão
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) errors.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email inválido';
    if (!formData.cpf.trim()) errors.cpf = 'CPF é obrigatório';
    else if (formData.cpf.replace(/\D/g, '').length !== 11) errors.cpf = 'CPF inválido';
    if (!formData.phone.trim()) errors.phone = 'Telefone é obrigatório';
    else if (formData.phone.replace(/\D/g, '').length < 10) errors.phone = 'Telefone inválido'; // Validação simples

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Função para gerar o PIX
  const generatePixPayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    setApiError(null);
    setPixCode(null);

    const amountInCents = Math.round(finalTotalAmount * 100);
    const requestBody = {
        amount: amountInCents,
        offer_hash: ZIPPFY_OFFER_HASH,
        payment_method: "pix",
        customer: {
            name: formData.name.trim(),
            document: formData.cpf.replace(/\D/g, ''), // Envia apenas números
            email: formData.email.trim(),
            phone_number: formData.phone.replace(/\D/g, '') // Envia apenas números
        },
        cart: [
            {
                product_hash: ZIPPFY_PRODUCT_HASH,
                title: `Ingressos Hozier - ${state?.sectorName || 'Setor'}`, // Título descritivo
                price: amountInCents,
                quantity: 1, // Representa a compra total como 1 item no carrinho Zippfy
                operation_type: 1,
                tangible: false,
                cover: null
            }
        ],
        installments: 1
    };

    try {
        const response = await fetch(`${ZIPPFY_API_URL}?api_token=${ZIPPFY_API_TOKEN}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Erro ${response.status} ao gerar Pix.`);
        }

        if (data.pix && data.pix.pix_qr_code) {
            setPixCode(data.pix.pix_qr_code); // Armazena o código PIX copia-e-cola
        } else {
            throw new Error("Resposta da API não contém o código PIX esperado.");
        }

    } catch (error: any) {
        console.error("Erro ao gerar PIX:", error);
        setApiError(error.message || "Ocorreu um erro ao gerar o PIX. Tente novamente.");
    } finally {
        setIsProcessing(false);
    }
  };

  // Função para copiar o código PIX
  const copyPixCode = () => {
    if (pixCode) {
      navigator.clipboard.writeText(pixCode)
        .then(() => alert("Código PIX copiado!"))
        .catch(err => console.error('Erro ao copiar código PIX:', err));
    }
  };

  // Tela de Erro se não houver dados
  if (!state || formattedTickets.length === 0) {
    return (
      <Layout>
        <div className="bg-white p-4 max-w-lg mx-auto my-4 text-center">
          <h2 className="text-xl font-bold mb-4">Nenhum ingresso selecionado</h2>
          <p className="mb-6">Volte para a página de seleção de ingressos para continuar.</p>
          <button onClick={() => navigate(-1)} className="bg-primary-blue text-white py-2 px-4 rounded">
            Voltar
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white p-4 max-w-lg mx-auto my-4">
        <h1 className="text-xl font-bold mb-6">Finalizar Compra</h1>

        {/* Resumo do Pedido */}
        <div className="mb-6 border rounded p-4">
          <h2 className="font-bold mb-3">Resumo do Pedido</h2>
          {formattedTickets.map((item) => (
            <div key={item.id} className="flex justify-between py-2 border-b last:border-b-0 text-sm">
              <div>
                <p className="font-medium">{item.sectorName} - {item.name}</p>
                <p className="text-gray-600">{item.quantity} x {formatCurrency(item.price + item.fee)}</p>
              </div>
              <div className="text-right font-medium">
                {formatCurrency((item.price + item.fee) * item.quantity)}
              </div>
            </div>
          ))}
          {state?.insuranceSelected === 'yes' && (
            <div className="flex justify-between py-2 border-b last:border-b-0 text-sm">
              <div>Ingresso Seguro</div>
              <div className="text-right font-medium">{formatCurrency(insurancePrice)}</div>
            </div>
          )}
          <div className="flex justify-between mt-3 pt-3 border-t font-bold">
            <span>Total:</span>
            <span>{finalTotalPriceString}</span>
          </div>
        </div>

        {/* Exibição do PIX ou Formulário */}
        {pixCode ? (
            // --- Tela de Exibição do PIX ---
            <div className="border rounded p-4">
                <h2 className="font-bold text-lg mb-3 text-center">Pague com PIX</h2>
                <p className="text-sm text-center mb-4">Escaneie o QR Code ou copie o código abaixo para pagar:</p>
                {/* Renderiza o QR Code real */}
                <div className="flex justify-center mb-4">
                  <QRCodeCanvas value={pixCode || ''} size={160} bgColor={"#ffffff"} fgColor={"#000000"} level={"L"} includeMargin={false} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Código PIX (Copia e Cola):</label>
                    <textarea
                        readOnly
                        value={pixCode}
                        className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-xs break-all"
                        rows={4}
                    />
                </div>
                <button
                    type="button"
                    onClick={copyPixCode}
                    className="w-full bg-gray-600 text-white py-2 px-4 rounded font-semibold hover:bg-gray-700 mb-4"
                >
                    Copiar Código PIX
                </button>
                <p className="text-xs text-center text-gray-600">Após o pagamento, a confirmação será enviada para o seu e-mail.</p>
                 <button
                    type="button"
                    onClick={() => navigate('/')} // Ou para "Meus Pedidos"
                    className="w-full mt-4 bg-primary-blue text-white py-2 px-4 rounded font-semibold hover:bg-blue-700"
                >
                    Voltar para Home
                </button>
            </div>
        ) : (
            // --- Formulário de Informações Pessoais ---
            <form onSubmit={(e) => { e.preventDefault(); generatePixPayment(); }}>
              <div className="mb-6">
                <h2 className="font-bold mb-3">Informações Pessoais para PIX</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="name">Nome Completo</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={`w-full px-3 py-2 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded`} placeholder="Digite seu nome completo" />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full px-3 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded`} placeholder="seu.email@example.com" />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="cpf">CPF</label>
                  <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleInputChange} onBlur={handleBlur} maxLength={14} className={`w-full px-3 py-2 border ${formErrors.cpf ? 'border-red-500' : 'border-gray-300'} rounded`} placeholder="000.000.000-00" />
                  {formErrors.cpf && <p className="text-red-500 text-xs mt-1">{formErrors.cpf}</p>}
                </div>
                 <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="phone">Telefone (com DDD)</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} onBlur={handleBlur} maxLength={15} className={`w-full px-3 py-2 border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded`} placeholder="(XX) XXXXX-XXXX" />
                  {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                </div>
              </div>

              {/* Mensagem de erro da API */}
              {apiError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {apiError}
                </div>
              )}

              {/* Botão Gerar PIX */}
              <button type="submit" disabled={isProcessing} className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                {isProcessing ? 'Gerando PIX...' : 'GERAR PAGAMENTO PIX'}
              </button>
            </form>
        )}
      </div>
    </Layout>
  );
};

export default Checkout;
