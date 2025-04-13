import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout'; // Assumindo que queremos o layout padrão

import { QuantitiesState, TicketTypeDetails } from '../components/ticketSelection/TicketTypeList'; // Importa tipos

// Interface para os dados recebidos da página anterior
interface LocationState {
  tickets: QuantitiesState;
  total: number;
  sectorName: string;
  ticketTypesData: TicketTypeDetails[]; // Adiciona a propriedade esperada
  insurancePrice?: number; // Mantém opcional
}

const InsuranceSelection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null; // Tipagem para os dados recebidos

  const [selectedInsurance, setSelectedInsurance] = useState<'yes' | 'no' | null>(null);

  // Placeholder para dados do seguro (deveria vir do backend ou config)
  const insurancePrice = 46.08;
  const insuranceDescription = `
Veja informações gerais, condições e coberturas <a href="https://help.ticketmaster.com.br/hc/pt-br/articles/26613258549009-Informa%C3%A7%C3%B5es-Gerais-Ingresso-Seguro" target="_blank" rel="noopener noreferrer" class="text-primary-blue underline hover:text-blue-700">aqui</a>.

<table class="w-full my-4 border-collapse border border-gray-300 text-xs">
  <tbody>
    <tr class="bg-gray-100">
      <td class="border border-gray-300 p-2">Morte Acidental</td>
      <td class="border border-gray-300 p-2">Incapacidade Física Total e Temporária</td>
      <td class="border border-gray-300 p-2">Ausência por Questão Legal</td>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">Fratura Óssea</td>
      <td class="border border-gray-300 p-2">Internação Hospitalar</td>
      <td class="border border-gray-300 p-2">Inclusão de Acompanhante</td>
    </tr>
     <tr class="bg-gray-100">
      <td class="border border-gray-300 p-2">Doenças Graves</td>
      <td class="border border-gray-300 p-2">Desemprego Involuntário</td>
      <td class="border border-gray-300 p-2">Assistência em caso de dano a propriedade e Cancelamento de transporte</td>
    </tr>
  </tbody>
</table>

Para consultar a íntegra das condições gerais do seguro, acesse o site da <a href="https://ingressoseguro.com/condicaogeral/" target="_blank" rel="noopener noreferrer" class="text-primary-blue underline hover:text-blue-700">Ingresso Seguro.</a>

O produto “Ingresso Seguro” é comercializado pela INGRESSO SEGURO LTDA através da Ticketmaster... [Restante dos termos legais]...
  `; // Simplificado, idealmente viria formatado

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleSelection = (choice: 'yes' | 'no') => {
    setSelectedInsurance(choice);
  };

  const handleContinue = () => {
    if (selectedInsurance === null) {
      alert("Por favor, selecione uma opção de seguro.");
      return;
    }
    console.log("Opção de seguro selecionada:", selectedInsurance);
    console.log("Dados dos ingressos:", state); // Loga o estado completo recebido

      // Navega para a página de termos, passando o estado recebido E a escolha do seguro
      navigate('/termos', {
          state: {
              ...state, // Passa todos os dados anteriores (tickets, total, sectorName, ticketTypesData)
              insuranceSelected: selectedInsurance // Adiciona a escolha do seguro
          }
      });
  };

  // Verifica se temos os dados da seleção anterior, incluindo ticketTypesData
  if (!state || !state.tickets || !state.ticketTypesData || Object.keys(state.tickets).length === 0) {
    console.error("Dados da seleção de ingressos ou tipos de ingresso não encontrados em InsuranceSelection.");
    // navigate('/'); // Exemplo de redirecionamento
    return (
        <Layout>
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-xl font-bold text-red-600 mb-4">Erro</h1>
                <p>Não foi possível carregar os dados da sua seleção de ingressos.</p>
                <button onClick={() => navigate('/')} className="mt-4 bg-primary-blue text-white py-2 px-4 rounded">
                    Voltar para Home
                </button>
            </div>
        </Layout>
    );
  }


  return (
    <Layout>
      <div className="container mx-auto p-4 max-w-3xl"> {/* Limitando a largura */}
        {/* Resumo do Pedido (simplificado) */}
        <div className="bg-gray-100 p-4 rounded mb-6 border">
            <h2 className="text-lg font-bold mb-2">Resumo da seleção</h2>
            <p>Setor: {state.sectorName}</p>
            {/* Poderia iterar sobre state.tickets para mostrar detalhes */}
            <p>Quantidade Total: {Object.values(state.tickets).reduce((sum, q) => sum + q, 0)}</p>
            <p className="font-semibold mt-1">Subtotal Ingressos: {formatCurrency(state.total)}</p>
        </div>

        {/* Seleção do Seguro */}
        <div className="border rounded p-4">
            <h1 className="text-xl font-bold mb-4">Imprevistos acontecem! Que tal proteger o seu pedido por um valor acessível?</h1>

            <ul className="insurance-options space-y-4">
                {/* Opção SIM */}
                <li
                    id="addInsurance"
                    onClick={() => handleSelection('yes')}
                    className={`border rounded p-4 cursor-pointer transition-all ${selectedInsurance === 'yes' ? 'border-primary-blue ring-2 ring-primary-blue bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
                >
                    <div className="insurance-header flex justify-between items-start mb-2">
                        <div className="flex-1 pr-4">
                            <strong className="block text-base">Sim, quero contratar o seguro para me proteger de imprevistos que me impeçam de ir ao evento.</strong>
                            <span className="text-sm text-gray-700 block mt-1">Com o seguro você receberá reembolso do valor do ingresso + taxas nas situações cobertas pela apólice indicadas a seguir</span>
                        </div>
                        <div className="insurance-price text-green-600 font-semibold whitespace-nowrap">
                            {formatCurrency(insurancePrice)}
                        </div>
                    </div>
                    {/* Detalhes - Renderizado condicionalmente ou sempre visível */}
                    {selectedInsurance === 'yes' && ( // Mostra detalhes apenas se selecionado
                        <div className="insurance-details text-xs text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: insuranceDescription }}>
                            {/* Conteúdo HTML dos detalhes do seguro */}
                        </div>
                    )}
                </li>

                {/* Opção NÃO */}
                <li
                    id="removeInsurance"
                    onClick={() => handleSelection('no')}
                    className={`border rounded p-4 cursor-pointer transition-all ${selectedInsurance === 'no' ? 'border-primary-blue ring-2 ring-primary-blue bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
                >
                    <div className="insurance-header flex justify-between items-start">
                        <div className="flex-1 pr-4">
                            <strong className="block text-base">Não, com certeza irei ao evento e entendo que em caso de imprevistos ou emergências não tenho direito a qualquer reembolso por não comparecer.</strong>
                            <span className="text-sm text-gray-700 block mt-1">Em caso de emergências ou imprevistos de força maior*, entendo que não tenho direito a qualquer reembolso.</span>
                        </div>
                        <div className="insurance-price text-gray-500 font-semibold whitespace-nowrap">
                            {formatCurrency(0)}
                        </div>
                    </div>
                </li>
            </ul>

            {/* Botão Continuar */}
            <div className="options-cart process_action mt-6 text-right">
                <button
                    onClick={handleContinue}
                    disabled={selectedInsurance === null}
                    className="bg-primary-blue text-white py-2 px-6 rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Continuar
                </button>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default InsuranceSelection;
