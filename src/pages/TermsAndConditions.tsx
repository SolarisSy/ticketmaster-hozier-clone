import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import CheckoutSummary from '../components/checkout/CheckoutSummary';
import { QuantitiesState, TicketTypeDetails } from '../components/ticketSelection/TicketTypeList'; // Importa tipos necessários

// Interface para os dados recebidos da página anterior
interface LocationState {
  tickets: QuantitiesState;
  total: number; // Este é o subtotal dos ingressos + taxas, antes do seguro
  sectorName: string;
  insuranceSelected: 'yes' | 'no' | null;
  // Precisamos também dos dados detalhados dos tipos de ingresso para o resumo
  ticketTypesData: TicketTypeDetails[];
}

const TermsAndConditions: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  const handleAcceptTerms = () => {
    console.log("Termos aceitos!");
    console.log("Dados finais para checkout:", state);

    // Navega para a página de checkout, passando o estado atual
    // A página Checkout.tsx espera 'tickets' e 'totalPrice' no estado.
    // Vamos garantir que estamos passando o que ela precisa, adaptando se necessário.
    // O 'total' no estado atual é antes do seguro, o Checkout.tsx pode precisar recalcular ou receber o total final.
    // Por simplicidade, passaremos o estado como está, mas o Checkout.tsx pode precisar de ajustes.
    navigate('/checkout', { state: state });
  };

  // Verifica se temos os dados da seleção anterior
  if (!state || !state.tickets || !state.ticketTypesData) {
    console.error("Dados da seleção de seguro ou tipos de ingresso não encontrados.");
    return (
        <Layout>
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-xl font-bold text-red-600 mb-4">Erro</h1>
                <p>Não foi possível carregar os dados da sua seleção.</p>
                <button onClick={() => navigate('/')} className="mt-4 bg-primary-blue text-white py-2 px-4 rounded">
                    Voltar para Home
                </button>
            </div>
        </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">

        {/* Coluna Principal (Termos) */}
        <div className="flex-grow md:w-2/3">
          <div className="checkout-actions border rounded p-4 bg-white">
            <h1 className="text-xl font-bold mb-4">Termos e Condições</h1>
            <div className="terms text-sm space-y-3 text-gray-700 mb-6">
              <p>
                Declaro que li e ACEITO os termos e condições, além dos <a href="https://www.ticketmaster.com.br/static/termos-de-uso" target="_blank" rel="noopener noreferrer" className="text-primary-blue underline hover:text-blue-700">Termos de Uso</a>, <a href="https://www.ticketmaster.com.br/static/politica-de-compra" target="_blank" rel="noopener noreferrer" className="text-primary-blue underline hover:text-blue-700">Termos de Compra</a>, <a href="https://www.ticketmaster.com.br/static/politica-de-cookies" target="_blank" rel="noopener noreferrer" className="text-primary-blue underline hover:text-blue-700">Política de Cookies</a> e <a href="https://www.ticketmaster.com.br/static/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className="text-primary-blue underline hover:text-blue-700">Política de Privacidade</a> da Ticketmaster Brasil.
              </p>
              <p>
                Em caso de constatação de fraude relacionada à aquisição do ingresso, especialmente se adquirido em canal não oficial ou se for utilizado algum benefício de meia-entrada que o adquirente não tiver direito, o mesmo poderá ser cancelado e não será permitida a entrada no evento por parte do cliente.
              </p>
              <p>
                Autorizo o compartilhamento dos meus dados pessoais com parceiros e patrocinadores do Evento/Show para que eles possam me enviar, por qualquer meio, inclusive eletronicamente, ofertas de produtos e serviços e comunicações comerciais, próprias e de terceiros, de forma personalizada e que possam ser de meu interesse. Se mudar de ideia, você pode cancelar a inscrição a qualquer momento, entrando em contato diretamente com o parceiro ou patrocinador do evento.
              </p>
            </div>

            <div className="options-cart process_action text-right">
              <button
                onClick={handleAcceptTerms}
                className="bg-primary-blue text-white py-2 px-6 rounded font-semibold hover:bg-blue-700"
              >
                Eu aceito
              </button>
            </div>
          </div>
        </div>

        {/* Coluna Lateral (Resumo) */}
        <div className="md:w-1/3">
          <CheckoutSummary
            sectorName={state.sectorName}
            selectedQuantities={state.tickets}
            ticketTypesData={state.ticketTypesData} // Passa os dados detalhados
            insuranceSelected={state.insuranceSelected}
            // insurancePrice={/* Pode passar um preço diferente se necessário */}
          />
        </div>

      </div>
    </Layout>
  );
};

export default TermsAndConditions;
