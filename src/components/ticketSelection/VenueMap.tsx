import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import InfoModal from '../common/InfoModal'; // Importa o modal de informação
import TicketTypeList, { TicketTypeDetails, QuantitiesState } from './TicketTypeList'; // Importa a lista de tipos de ingresso

// Mantendo a definição do tipo SectorHighlight para o estado de highlight do canvas/botões
type SectorHighlight = 'frontstage' | 'pista' | 'mezanino' | 'camarote';

// Estrutura de dados detalhada para os tipos de ingresso por setor
// **ATENÇÃO:** Todos marcados como isAvailable: true conforme solicitado
const allSectorTicketTypes: Record<SectorHighlight, TicketTypeDetails[]> = {
  frontstage: [
    { id: 'fs-int', name: 'Inteira', price: 850.00, fee: 170.00, isAvailable: true, description: undefined },
    { id: 'fs-meia', name: 'Meia-Entrada', price: 425.00, fee: 85.00, isAvailable: true, description: 'Estudantes, jovens de baixa renda, pessoas com deficiência, professores, diretores, coordenadores pedagógicos, supervisores e titulares do quadro de apoio das escolas da rede pública estadual e municipal e aposentados.' },
    { id: 'fs-idoso', name: 'Desc. 50% - Estatuto Idoso', price: 425.00, fee: 85.00, isAvailable: true, description: 'Desconto de 50% destinado para maiores de 60 anos (Estatuto da Pessoa Idosa), em atendimento ao disposto no artigo 23 da Lei n° 10.741, de 01 de outubro de 2023.' },
    { id: 'fs-pcd', name: 'Meia-Entrada PCD', price: 425.00, fee: 85.00, isAvailable: true, description: 'Pessoas com deficiência.' },
  ],
  pista: [
    { id: 'p-int', name: 'Inteira', price: 640.00, fee: 128.00, isAvailable: true, description: undefined },
    { id: 'p-idoso', name: 'Desc. 50% - Estatuto Idoso', price: 320.00, fee: 64.00, isAvailable: true, description: 'Desconto de 50% destinado para maiores de 60 anos (Estatuto da Pessoa Idosa), em atendimento ao disposto no artigo 23 da Lei n° 10.741, de 01 de outubro de 2023.' },
    { id: 'p-meia', name: 'Meia-Entrada', price: 320.00, fee: 64.00, isAvailable: true, description: 'Estudantes, jovens de baixa renda, pessoas com deficiência, professores, diretores, coordenadores pedagógicos, supervisores e titulares do quadro de apoio das escolas da rede pública estadual e municipal e aposentados.' },
    { id: 'p-pcd', name: 'Meia-Entrada PCD', price: 320.00, fee: 64.00, isAvailable: true, description: 'Pessoas com deficiência.' },
  ],
  mezanino: [
    { id: 'mz-int', name: 'Inteira', price: 880.00, fee: 176.00, isAvailable: true, description: undefined },
    { id: 'mz-meia', name: 'Meia-Entrada', price: 440.00, fee: 88.00, isAvailable: true, description: 'Estudantes, jovens de baixa renda, pessoas com deficiência, professores, diretores, coordenadores pedagógicos, supervisores e titulares do quadro de apoio das escolas da rede pública estadual e municipal e aposentados.' },
    { id: 'mz-idoso', name: 'Desc. 50% - Estatuto Idoso', price: 440.00, fee: 88.00, isAvailable: true, description: 'Desconto de 50% destinado para maiores de 60 anos (Estatuto da Pessoa Idosa), em atendimento ao disposto no artigo 23 da Lei n° 10.741, de 01 de outubro de 2023.' },
    { id: 'mz-pcd', name: 'Meia-Entrada PCD', price: 440.00, fee: 88.00, isAvailable: true, description: 'Pessoas com deficiência.' },
  ],
  camarote: [ // Usando dados genéricos para todos os camarotes por enquanto
    { id: 'cam-int', name: 'Inteira', price: 890.00, fee: 89.00, isAvailable: true, description: undefined },
    { id: 'cam-meia', name: 'Meia-Entrada', price: 445.00, fee: 44.50, isAvailable: true, description: 'Estudantes, jovens de baixa renda, pessoas com deficiência, professores, diretores, coordenadores pedagógicos, supervisores e titulares do quadro de apoio das escolas da rede pública estadual e municipal e aposentados.' },
  ],
};

// Componente principal
const VenueMap = () => {
  const navigate = useNavigate(); // Hook para navegação
  const [selectedSectorHighlight, setSelectedSectorHighlight] = useState<SectorHighlight | null>(null); // Para highlight visual
  const [displayedTicketTypes, setDisplayedTicketTypes] = useState<TicketTypeDetails[]>([]); // Tipos de ingresso a exibir
  const [selectedQuantities, setSelectedQuantities] = useState<QuantitiesState>({}); // Quantidades selecionadas
  const [infoModalState, setInfoModalState] = useState({ isOpen: false, title: '', description: '' }); // Estado do modal de info
  const [selectionModeActive, setSelectionModeActive] = useState(false); // NOVO ESTADO: controla a visibilidade
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Lista principal de setores para exibição inicial
  const sectorsList = [
    { id: '273464', name: 'Frontstage', price: 'R$425,00', fee: 'R$85,00', color: '#134ee0', type: 'Sem lugar marcado', highlightKey: 'frontstage' as SectorHighlight },
    { id: '273452', name: 'Pista', price: 'R$320,00', fee: 'R$64,00', color: '#a733ff', type: 'Sem lugar marcado', highlightKey: 'pista' as SectorHighlight },
    { id: '273468', name: 'Mezanino', price: 'R$440,00', fee: 'R$88,00', color: '#25fff2', type: 'Sem lugar marcado', highlightKey: 'mezanino' as SectorHighlight },
    { id: '273466', name: 'Camarote 2B', price: 'R$445,00', fee: 'R$89,00', color: '#ffd72e', type: 'Sem lugar marcado', highlightKey: 'camarote' as SectorHighlight },
    { id: '273470', name: 'Camarote 3A', price: 'R$445,00', fee: 'R$89,00', color: '#f19a38', type: 'Sem lugar marcado', highlightKey: 'camarote' as SectorHighlight },
    { id: '273467', name: 'Camarote 3B', price: 'R$445,00', fee: 'R$89,00', color: '#ffd72e', type: 'Sem lugar marcado', highlightKey: 'camarote' as SectorHighlight },
    { id: '273461', name: 'Camarote 4A', price: 'R$445,00', fee: 'R$89,00', color: '#f19a38', type: 'Sem lugar marcado', highlightKey: 'camarote' as SectorHighlight },
    { id: '273463', name: 'Camarote 4B', price: 'R$445,00', fee: 'R$89,00', color: '#ffd72e', type: 'Sem lugar marcado', highlightKey: 'camarote' as SectorHighlight },
    { id: '273457', name: 'Camarote 7B', price: 'R$445,00', fee: 'R$89,00', color: '#ffd72e', type: 'Sem lugar marcado', highlightKey: 'camarote' as SectorHighlight },
    { id: '273474', name: 'Camarote 11A', price: 'R$445,00', fee: 'R$89,00', color: '#f19a38', type: 'Sem lugar marcado', highlightKey: 'camarote' as SectorHighlight },
    { id: '273475', name: 'Camarote 12A', price: 'R$445,00', fee: 'R$89,00', color: '#f19a38', type: 'Sem lugar marcado', highlightKey: 'camarote' as SectorHighlight },
    { id: '273473', name: 'Camarote 13A', price: 'R$445,00', fee: 'R$89,00', color: '#f19a38', type: 'Sem lugar marcado', highlightKey: 'camarote' as SectorHighlight },
  ];

  // Mapeamento de cores para o canvas
  const sectorColors: Record<SectorHighlight, string> = {
    frontstage: '#134ee0',
    pista: '#a733ff',
    mezanino: '#25fff2',
    camarote: '#ffd72e',
  };

  // Efeito para desenhar o canvas
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = 860;
        canvas.height = 830;
        drawVenueMap(ctx);
      }
    }
  }, [selectedSectorHighlight]);

  // Função para desenhar o mapa
  const drawVenueMap = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const defaultColor = '#cccccc';
    const highlightStroke = '#ffffff';
    const defaultStroke = '#aaaaaa';

    // Palco
    ctx.fillStyle = '#333333'; ctx.fillRect(280, 150, 300, 80);
    ctx.fillStyle = '#ffffff'; ctx.font = '24px Averta, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('PALCO', 430, 195);

    // Frontstage
    ctx.beginPath(); ctx.fillStyle = selectedSectorHighlight === 'frontstage' ? sectorColors.frontstage : defaultColor;
    ctx.moveTo(280, 250); ctx.lineTo(580, 250); ctx.lineTo(650, 350); ctx.lineTo(210, 350); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = selectedSectorHighlight === 'frontstage' ? highlightStroke : defaultStroke; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#ffffff'; ctx.font = '16px Averta, sans-serif'; ctx.fillText('FRONTSTAGE', 430, 300);

    // Pista
    ctx.beginPath(); ctx.fillStyle = selectedSectorHighlight === 'pista' ? sectorColors.pista : defaultColor;
    ctx.moveTo(210, 370); ctx.lineTo(650, 370); ctx.lineTo(700, 600); ctx.lineTo(160, 600); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = selectedSectorHighlight === 'pista' ? highlightStroke : defaultStroke; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#ffffff'; ctx.font = '20px Averta, sans-serif'; ctx.fillText('PISTA', 430, 480);

    // Mezanino
    ctx.beginPath(); ctx.fillStyle = selectedSectorHighlight === 'mezanino' ? sectorColors.mezanino : defaultColor;
    ctx.arc(430, 700, 250, Math.PI, 0, false); ctx.lineTo(680, 600); ctx.lineTo(180, 600); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = selectedSectorHighlight === 'mezanino' ? highlightStroke : defaultStroke; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#333'; ctx.font = '16px Averta, sans-serif'; ctx.fillText('MEZANINO', 430, 700);

    // Camarotes
    ctx.beginPath(); ctx.fillStyle = selectedSectorHighlight === 'camarote' ? sectorColors.camarote : defaultColor; ctx.rect(100, 370, 50, 230); ctx.fill();
    ctx.strokeStyle = selectedSectorHighlight === 'camarote' ? highlightStroke : defaultStroke; ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath(); ctx.fillStyle = selectedSectorHighlight === 'camarote' ? sectorColors.camarote : defaultColor; ctx.rect(710, 370, 50, 230); ctx.fill();
    ctx.strokeStyle = selectedSectorHighlight === 'camarote' ? highlightStroke : defaultStroke; ctx.lineWidth = 2; ctx.stroke();

    // Labels Camarotes
    ctx.save(); ctx.translate(125, 480); ctx.rotate(-Math.PI/2); ctx.fillStyle = '#333'; ctx.font = '14px Averta, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('CAMAROTE A', 0, 0); ctx.restore();
    ctx.save(); ctx.translate(735, 480); ctx.rotate(Math.PI/2); ctx.fillStyle = '#333'; ctx.font = '14px Averta, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('CAMAROTE B', 0, 0); ctx.restore();
  };

  // Função chamada ao clicar em um item da lista de setores
  const handleSectorItemClick = (sectorHighlightKey: SectorHighlight) => {
    setSelectedSectorHighlight(sectorHighlightKey);
    setDisplayedTicketTypes(allSectorTicketTypes[sectorHighlightKey] || []);
    setSelectedQuantities({});
    setSelectionModeActive(true); // ATIVA O MODO DE SELEÇÃO DETALHADA
  };

  // Função para limpar a seleção e voltar à lista principal
  const handleClearSelection = () => {
    setSelectionModeActive(false); // DESATIVA O MODO DE SELEÇÃO DETALHADA
    setSelectedSectorHighlight(null); // Limpa o highlight
    setDisplayedTicketTypes([]);
    setSelectedQuantities({});
  };

  // Função para atualizar a quantidade de um tipo de ingresso
  const handleQuantityChange = (ticketTypeId: string, newQuantity: number) => {
    setSelectedQuantities(prev => ({
      ...prev,
      [ticketTypeId]: newQuantity,
    }));
  };

  // Função para mostrar o modal de informação
  const handleShowInfo = (title: string, description: string) => {
    setInfoModalState({ isOpen: true, title, description });
  };

  // Função para fechar o modal de informação
  const handleCloseInfoModal = () => {
    setInfoModalState({ isOpen: false, title: '', description: '' });
  };

  // Calcula o total com base nas quantidades e tipos de ingresso exibidos
  const totalAmount = useMemo(() => {
    // Certifica-se de que displayedTicketTypes é um array antes de usar reduce
    if (!Array.isArray(displayedTicketTypes)) return 0;
    return displayedTicketTypes.reduce((total, ticketType) => {
      const quantity = selectedQuantities[ticketType.id] || 0;
      return total + quantity * (ticketType.price + ticketType.fee);
    }, 0);
  }, [selectedQuantities, displayedTicketTypes]);


  // Calcula a quantidade total de ingressos selecionados
  const totalQuantity = useMemo(() => {
      return Object.values(selectedQuantities).reduce((sum, q) => sum + q, 0);
  }, [selectedQuantities]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Função para o botão Continuar - AGORA NAVEGA
  const handleContinue = () => {
      console.log("Continuar clicado!");
      console.log("Quantidades selecionadas:", selectedQuantities);
      console.log("Total:", formatCurrency(totalAmount));
      console.log("Nome do Setor:", selectedSectorName);

      // Navega para a página de seguro, passando os dados
      navigate('/selecionar-seguro', {
          state: {
              tickets: selectedQuantities,       // Passa as quantidades selecionadas
              total: totalAmount,              // Passa o valor total calculado
              sectorName: selectedSectorName,    // Passa o nome do setor selecionado
              ticketTypesData: displayedTicketTypes // **ADICIONADO: Passa os dados detalhados dos tipos**
          }
      });
  };

  // Determina o nome do setor selecionado para o título
  const selectedSectorName = useMemo(() => {
      if (!selectedSectorHighlight) return '';
      // Tenta encontrar na lista original para pegar o nome exato (ex: Camarote 2B)
      const sectorInfo = sectorsList.find(s => s.highlightKey === selectedSectorHighlight);
      // Fallback para o nome da chave capitalizado
      return sectorInfo ? sectorInfo.name : selectedSectorHighlight.charAt(0).toUpperCase() + selectedSectorHighlight.slice(1);
  }, [selectedSectorHighlight, sectorsList]);


  return (
    <div className="bg-white p-4">
      <h2 className="text-lg font-bold mb-4">Escolha seu ingresso</h2>

      {/* Canvas e Botões de Seleção Rápida - Sempre visíveis */}
      <div className="mb-6">
        <div className="relative mb-6">
          <canvas
            ref={canvasRef}
            className="w-full h-auto border rounded cursor-default touch-none select-none"
            style={{ maxWidth: '430px', height: 'auto', backgroundColor: '#f8f8f8' }}
          ></canvas>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {(['frontstage', 'pista', 'mezanino', 'camarote'] as SectorHighlight[]).map((sectorKey) => {
             const color = sectorColors[sectorKey] || '#cccccc';
             const displayName = sectorKey.charAt(0).toUpperCase() + sectorKey.slice(1);
             return (
                <button
                  key={sectorKey}
                  type="button"
                  className={`py-2 px-3 rounded text-white text-sm capitalize transition-colors duration-150 ease-in-out ${selectedSectorHighlight === sectorKey ? 'ring-2 ring-offset-1 ring-black' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleSectorItemClick(sectorKey)} // Atualiza highlight E entra no modo de seleção
                >
                  {displayName}
                </button>
             );
          })}
        </div>
      </div>

      {/* Renderização Condicional: Lista Principal OU Detalhes do Setor */}
      {!selectionModeActive ? (
        // MODO 1: Lista Principal de Setores
        <div className="mb-6">
          <h3 className="font-bold mb-3">Opções de setores</h3>
          {sectorsList.map((sector) => (
            <div
              key={sector.id}
              className={`mb-3 p-3 border-l-4 rounded shadow-sm bg-white hover:bg-blue-50 transition-colors duration-150 ease-in-out cursor-pointer ${selectedSectorHighlight === sector.highlightKey ? 'ring-2 ring-blue-300' : ''}`}
              style={{ borderLeftColor: sector.color }}
              onClick={() => handleSectorItemClick(sector.highlightKey)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSectorItemClick(sector.highlightKey); }}
            >
              <div>
                <h5 className="font-bold text-base mb-1">{sector.name}</h5>
                <span className="block text-sm">A partir de {sector.price} + {sector.fee}</span>
                <span className="block text-sm mt-1 text-gray-600">{sector.type}</span>
              </div>
            </div>
          ))}
           {/* Placeholder se nenhum setor foi clicado ainda */}
           <div className="text-center p-4 border border-gray-300 rounded mt-6">
             <p className="text-gray-500">Clique em um setor acima ou nos botões de seleção rápida para ver os tipos de ingresso</p>
           </div>
        </div>
      ) : (
        // MODO 2: Detalhes do Setor Selecionado
        <>
          <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg">Selecione os ingressos para: {selectedSectorName}</h3>
              <button
                type="button"
                onClick={handleClearSelection}
                className="text-sm text-primary-blue hover:underline"
              >
                Limpar seleção
              </button>
          </div>
          <TicketTypeList
            ticketTypes={displayedTicketTypes}
            quantities={selectedQuantities}
            onQuantityChange={handleQuantityChange}
            onShowInfo={handleShowInfo}
          />
          {/* Seção Total e Botão Continuar */}
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-lg">Total:</span>
              <span className="font-bold text-lg">{formatCurrency(totalAmount)}</span>
            </div>
            <button
              type="button"
              onClick={handleContinue}
              disabled={totalQuantity === 0}
              className="w-full py-3 px-4 bg-primary-blue text-white rounded text-center font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Continuar
            </button>
          </div>
        </>
      )}

      {/* Notas de rodapé - Sempre visíveis */}
      <div className="mt-8 text-xs text-gray-500">
        <p className="mb-1">* Taxa de serviço online: 20%</p>
        <p>* Sujeito a disponibilidade</p>
      </div>

      {/* Renderiza o Modal de Informação - Sempre disponível no DOM para ser ativado */}
      <InfoModal
        isOpen={infoModalState.isOpen}
        onClose={handleCloseInfoModal}
        title={infoModalState.title}
        description={infoModalState.description}
      />
    </div>
  );
};

export default VenueMap;
