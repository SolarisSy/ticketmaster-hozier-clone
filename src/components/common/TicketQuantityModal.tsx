import React, { useState, useEffect, useMemo } from 'react';

// Tipos para os dados do setor e quantidades
export interface SectorData {
  name: string;
  priceFull: number;
  feeFull: number;
  priceHalf: number;
  feeHalf: number;
  // Adicione mais campos se necessário (ex: cor, id)
}

export interface Quantities {
  full: number;
  half: number;
}

interface TicketQuantityModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectorData: SectorData | null; // Pode ser nulo se nenhum setor for selecionado
  onConfirm: (quantities: Quantities) => void;
}

const TicketQuantityModal: React.FC<TicketQuantityModalProps> = ({
  isOpen,
  onClose,
  sectorData,
  onConfirm,
}) => {
  const [quantities, setQuantities] = useState<Quantities>({ full: 0, half: 0 });

  // Reseta quantidades quando o modal abre com novos dados
  useEffect(() => {
    if (isOpen) {
      setQuantities({ full: 0, half: 0 });
    }
  }, [isOpen, sectorData]);

  const handleIncrement = (type: keyof Quantities) => {
    setQuantities((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const handleDecrement = (type: keyof Quantities) => {
    setQuantities((prev) => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }));
  };

  const totalAmount = useMemo(() => {
    if (!sectorData) return 0;
    const totalFull = quantities.full * (sectorData.priceFull + sectorData.feeFull);
    const totalHalf = quantities.half * (sectorData.priceHalf + sectorData.feeHalf);
    return totalFull + totalHalf;
  }, [quantities, sectorData]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleConfirm = () => {
    onConfirm(quantities);
    onClose(); // Fecha o modal após confirmar
  };

  if (!isOpen || !sectorData) {
    return null; // Não renderiza nada se estiver fechado ou sem dados
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="border-b px-4 py-3 flex justify-between items-center">
          <div className="font-bold text-lg">{sectorData.name}</div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Fechar modal"
          >
            {/* SVG do botão Fechar */}
            <svg xmlns="http://www.w3.org/2000/svg" width="14.828" height="14.828" viewBox="0 0 14.828 14.828">
              <path d="M6,18,18,6M6,6,18,18" transform="translate(-4.586 -4.586)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </button>
        </div>

        {/* Body - Opções de Ingresso */}
        <div className="px-4 py-3">
          {/* Inteira */}
          <div className="border-b last:border-0 py-3">
            <div className="flex justify-between items-center">
              <div>
                <h5 className="font-bold flex items-center">Inteira</h5>
                <span className="text-sm">
                  {formatCurrency(sectorData.priceFull)} + {formatCurrency(sectorData.feeFull)}
                </span>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleDecrement('full')}
                  disabled={quantities.full === 0}
                  className="w-8 h-8 flex items-center justify-center border rounded-l text-lg bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  aria-label="Diminuir quantidade inteira"
                >
                  -
                </button>
                <div className="w-10 h-8 flex items-center justify-center border-t border-b font-medium">
                  {quantities.full}
                </div>
                <button
                  type="button"
                  onClick={() => handleIncrement('full')}
                  className="w-8 h-8 flex items-center justify-center border rounded-r text-lg bg-gray-200 hover:bg-gray-300"
                  aria-label="Aumentar quantidade inteira"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Meia-Entrada */}
          <div className="border-b last:border-0 py-3">
            <div className="flex justify-between items-center">
              <div>
                <h5 className="font-bold flex items-center">
                  Meia-Entrada
                  {/* Botão Info Meia-Entrada (opcional, pode adicionar tooltip/modal depois) */}
                  <button type="button" className="ml-1 text-primary-blue" aria-label="Informações sobre meia-entrada">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                      <path d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9c0 4.14 3.36 7.5 7.5 7.5 4.14 0 7.5-3.36 7.5-7.5 0-4.14-3.36-7.5-7.5-7.5zM9 15c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"></path>
                      <path d="M9 6.5a1 1 0 100 2 1 1 0 000-2z"></path>
                      <path d="M9 8.5a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3A.75.75 0 009 8.5z"></path>
                    </svg>
                  </button>
                </h5>
                <span className="text-sm">
                  {formatCurrency(sectorData.priceHalf)} + {formatCurrency(sectorData.feeHalf)}
                </span>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleDecrement('half')}
                  disabled={quantities.half === 0}
                  className="w-8 h-8 flex items-center justify-center border rounded-l text-lg bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  aria-label="Diminuir quantidade meia-entrada"
                >
                  -
                </button>
                <div className="w-10 h-8 flex items-center justify-center border-t border-b font-medium">
                  {quantities.half}
                </div>
                <button
                  type="button"
                  onClick={() => handleIncrement('half')}
                  className="w-8 h-8 flex items-center justify-center border rounded-r text-lg bg-gray-200 hover:bg-gray-300"
                  aria-label="Aumentar quantidade meia-entrada"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-bold">{formatCurrency(totalAmount)}</span>
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-300 rounded text-center hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={totalAmount === 0}
              className="flex-1 py-2 px-4 bg-primary-blue text-white rounded text-center hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketQuantityModal;
