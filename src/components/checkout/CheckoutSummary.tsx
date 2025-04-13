import React from 'react';
import { QuantitiesState, TicketTypeDetails } from '../ticketSelection/TicketTypeList'; // Reutiliza tipos

// Tipos específicos para as props do resumo
interface CheckoutSummaryProps {
  sectorName: string;
  selectedQuantities: QuantitiesState;
  ticketTypesData: TicketTypeDetails[]; // Precisa dos dados detalhados para obter preços/taxas
  insuranceSelected: 'yes' | 'no' | null;
  insurancePrice?: number; // Preço do seguro, se aplicável
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  sectorName,
  selectedQuantities,
  ticketTypesData,
  insuranceSelected,
  insurancePrice = 46.08, // Valor padrão, pode ser passado como prop
}) => {

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Calcula subtotal dos ingressos e taxa de serviço total
  let subtotalTickets = 0;
  let totalServiceFee = 0;
  const selectedTicketItems = Object.entries(selectedQuantities)
    .map(([ticketTypeId, quantity]) => {
      if (quantity > 0) {
        const ticketInfo = ticketTypesData.find(t => t.id === ticketTypeId);
        if (ticketInfo) {
          subtotalTickets += quantity * ticketInfo.price;
          totalServiceFee += quantity * ticketInfo.fee;
          return {
            ...ticketInfo,
            quantity,
          };
        }
      }
      return null;
    })
    .filter((item): item is TicketTypeDetails & { quantity: number } => item !== null); // Filtra nulos e ajusta tipo

  const insuranceCost = insuranceSelected === 'yes' ? insurancePrice : 0;
  const finalTotal = subtotalTickets + totalServiceFee + insuranceCost;
  const totalQuantity = selectedTicketItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="buy-resume border rounded mb-6" id="checkoutSummary">
      {/* Header */}
      <div className="resume-header flex justify-between items-center p-3 border-b bg-gray-50" id="summaryHeader">
        <h2 className="font-bold text-lg">Resumo da seleção</h2>
        {/* Botão Cancelar pode ser adicionado aqui se necessário, com sua própria lógica */}
        {/* <a data-toggle="modal" data-target="#checkoutSummaryModal" id="cancelPurchase" className="cancel-buy text-sm text-primary-blue hover:underline cursor-pointer">Cancelar seleção</a> */}
        {/* Ícone de chevron pode ser usado para expandir/colapsar se necessário */}
        {/* <i className="fas fa-chevron-down"></i> */}
      </div>

      {/* Body */}
      <div className="resume-body p-3 text-sm">
        {/* Detalhes dos Ingressos */}
        <div className="resume-item mb-3 pb-3 border-b" id="summary-tickets">
          <h4 className="font-semibold mb-2">{sectorName}</h4> {/* Usando o nome do setor passado */}
          {selectedTicketItems.length > 0 ? (
            selectedTicketItems.map((item) => (
              <div key={item.id} className="resume-item-detail flex justify-between mb-1">
                <div>
                  <span className="item-qty">{item.quantity} x </span>
                  {item.name}
                  <span className="text-xs text-gray-600"> ({formatCurrency(item.price)})</span>
                </div>
                <div className="price">{formatCurrency(item.quantity * item.price)}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhum ingresso selecionado.</p>
          )}
        </div>

        {/* Taxas e Seguro */}
        <div className="resume-item mb-3 pb-3 border-b" id="service_info">
           {/* Taxa de Serviço */}
           {totalServiceFee > 0 && (
             <div className="resume-item-detail flex justify-between mb-1">
               <div className="service">Taxa de serviço</div>
               <div className="price">{formatCurrency(totalServiceFee)}</div>
             </div>
           )}
           {/* Seguro */}
           {insuranceSelected === 'yes' && (
             <div className="resume-item-detail flex justify-between">
               <div className="">Ingresso Seguro</div>
               <div className="price">{formatCurrency(insuranceCost)}</div>
             </div>
           )}
        </div>

        {/* Outros itens (Adicionais, Entrega, Desconto) podem ser adicionados aqui se necessário */}

      </div>

      {/* Footer */}
      <div className="resume-footer flex justify-between items-center p-3 border-t bg-gray-50" id="summaryFooter">
        {/* Botão Cancelar pode ir aqui também */}
        <div className="resume-total flex flex-col items-end">
          <div className="font-bold text-lg">
            <span>{totalQuantity}</span> <small className="font-normal text-base">Total</small>
          </div>
          <div className="font-bold text-xl">{formatCurrency(finalTotal)}</div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
