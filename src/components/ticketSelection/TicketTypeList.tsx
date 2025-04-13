import React from 'react';

// Tipo para representar um único tipo de ingresso detalhado
export interface TicketTypeDetails {
  id: string; // Ex: "frontstage-meia"
  name: string; // Ex: "Meia-Entrada"
  price: number;
  fee: number;
  isAvailable: boolean;
  description?: string;
}

// Tipo para o estado das quantidades
export type QuantitiesState = Record<string, number>; // { "frontstage-meia": 1, "frontstage-idoso": 0 }

interface TicketTypeListProps {
  ticketTypes: TicketTypeDetails[];
  quantities: QuantitiesState;
  onQuantityChange: (ticketTypeId: string, newQuantity: number) => void;
  onShowInfo: (title: string, description: string) => void;
  maxTotalTickets?: number; // Limite opcional total de ingressos
}

const TicketTypeList: React.FC<TicketTypeListProps> = ({
  ticketTypes,
  quantities,
  onQuantityChange,
  onShowInfo,
  maxTotalTickets = 6, // Limite padrão de 6 ingressos no total
}) => {

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const currentTotalTickets = Object.values(quantities).reduce((sum, q) => sum + q, 0);

  const handleIncrement = (ticketTypeId: string) => {
    if (currentTotalTickets < maxTotalTickets) {
      const currentQuantity = quantities[ticketTypeId] || 0;
      onQuantityChange(ticketTypeId, currentQuantity + 1);
    } else {
      // Opcional: Adicionar feedback visual/mensagem sobre limite atingido
      console.warn(`Limite total de ${maxTotalTickets} ingressos atingido.`);
    }
  };

  const handleDecrement = (ticketTypeId: string) => {
    const currentQuantity = quantities[ticketTypeId] || 0;
    if (currentQuantity > 0) {
      onQuantityChange(ticketTypeId, currentQuantity - 1);
    }
  };

  if (!ticketTypes || ticketTypes.length === 0) {
    return <p className="text-center text-gray-500 py-4">Nenhum tipo de ingresso disponível para este setor.</p>;
  }

  return (
    <div id="rates" className="border rounded mb-6"> {/* Adicionado border e mb-6 */}
      {ticketTypes.map((ticket) => (
        <div
          key={ticket.id}
          // data-view, data-value, etc. do HTML original podem ser adicionados se necessário para alguma lógica externa
          className={`item item-rate multi-rate border-b last:border-b-0 px-4 py-3 flex justify-between items-center ${!ticket.isAvailable ? 'item-inactive opacity-50 bg-gray-50' : ''}`}
        >
          {/* Informações do Ingresso (Nome, Preço, Info) */}
          <div className="flex-1 pr-4">
            <h5 className="font-bold flex items-center text-base mb-1">
              {ticket.name}
              {ticket.description && (
                <button
                  type="button"
                  onClick={() => onShowInfo(ticket.name, ticket.description || '')}
                  className="ml-1 text-primary-blue hover:text-blue-700"
                  aria-label={`Informações sobre ${ticket.name}`}
                >
                  {/* SVG Ícone Info */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                    <path d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9c0 4.14 3.36 7.5 7.5 7.5 4.14 0 7.5-3.36 7.5-7.5 0-4.14-3.36-7.5-7.5-7.5zM9 15c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"></path>
                    <path d="M9 6.5a1 1 0 100 2 1 1 0 000-2z"></path>
                    <path d="M9 8.5a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3A.75.75 0 009 8.5z"></path>
                  </svg>
                </button>
              )}
            </h5>
            <span className="text-sm block">
              {formatCurrency(ticket.price)} + {formatCurrency(ticket.fee)}
            </span>
          </div>

          {/* Controles de Quantidade ou Status Esgotado */}
          <div>
            {!ticket.isAvailable ? (
              <span className="sold-out text-sm font-semibold text-red-500 px-2 py-1 bg-red-100 rounded">
                Esgotado
              </span>
            ) : (
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleDecrement(ticket.id)}
                  disabled={(quantities[ticket.id] || 0) === 0}
                  className="w-8 h-8 flex items-center justify-center border rounded-l text-lg bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                  aria-label={`Diminuir quantidade ${ticket.name}`}
                >
                  -
                </button>
                <div className="w-10 h-8 flex items-center justify-center border-t border-b font-medium text-center">
                  {quantities[ticket.id] || 0}
                </div>
                <button
                  type="button"
                  onClick={() => handleIncrement(ticket.id)}
                  disabled={currentTotalTickets >= maxTotalTickets}
                  className="w-8 h-8 flex items-center justify-center border rounded-r text-lg bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                  aria-label={`Aumentar quantidade ${ticket.name}`}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketTypeList;
