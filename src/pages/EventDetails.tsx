import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const EventDetails = () => {
  const { city } = useParams<{ city: string }>();

  const cityInfo = {
    'sao-paulo': {
      name: 'São Paulo',
      date: '30 de Maio de 2025',
      venue: 'Espaço Unimed',
      time: '21:00',
      address: 'R. Tagipuru, 795 - Barra Funda, São Paulo - SP, 01156-000',
      openingTime: '19h',
    },
    'rio-de-janeiro': {
      name: 'Rio de Janeiro',
      date: '01 de Junho de 2025',
      venue: 'Qualistage',
      time: '21:00',
      address: 'Av. Ayrton Senna, 3000 - Barra da Tijuca, Rio de Janeiro - RJ',
      openingTime: '19h',
    },
  };

  const info = city ? cityInfo[city as keyof typeof cityInfo] : cityInfo['sao-paulo'];

  return (
    <Layout>
      {/* Adiciona o banner aqui */}
      <img src="/images/hozier-banner.gif" alt="Hozier - Unreal Unearth Tour 2025" className="w-full object-cover" />

      <div className="bg-white">
        <div className="relative">
          {/* Adiciona padding superior para separar do banner */}
          <h1 className="px-4 pt-4 pb-2 text-xl font-semibold">
            Hozier - {info.name} - {info.date.split(' de ')[0]}/{info.date.split(' de ')[1].slice(0, 3)}/2025
          </h1>

          <div className="dropdown-selector border-t border-b py-3 px-4 mb-4">
            <div className="selector-value text-base font-medium">
              Hozier - {info.name} - {info.date.split(' de ')[0]}/{info.date.split(' de ')[1].slice(0, 3)}/2025 - {info.time}
            </div>
          </div>
        </div>

        <Link
          to={`/ingressos/selecionar/${city}`}
          className="mx-4 block bg-primary-blue text-white text-center py-3 px-4 rounded mb-6"
        >
          Ingressos
        </Link>

        <div className="px-4 mb-6">
          <div className="text-sm">
            <p className="mb-1"><strong>Apresentação:</strong> {info.date} (sexta-feira)</p>
            <p className="mb-1"><strong>Abertura dos portões:</strong> {info.openingTime}</p>
            <p className="mb-1"><strong>Horário do show:</strong> {info.time}</p>
            <p className="mb-1"><strong>Local:</strong> {info.venue}</p>
            <p className="mb-1"><strong>Endereço:</strong> {info.address}</p>
            <p className="mb-1"><strong>Classificação:</strong> 16 anos. Menores de 06 a 15 anos, apenas acompanhados dos pais ou responsáveis legais. *Sujeito a alteração por Decisão Judicial.</p>
          </div>
        </div>

        <div className="px-4 mb-6">
          <h2 className="font-bold text-sm mb-1">Bilheteria Oficial - sem taxa de serviço</h2>
          <h3 className="font-bold text-sm">Shopping Ibirapuera</h3>
          <p className="text-sm mb-1">Bilheteria Ticketmaster - Piso Jurupis (subsolo)</p>
          <p className="text-sm mb-3">Endereço: Avenida Ibirapuera, 3103, Indianópolis - São Paulo - SP, CEP: 04029-902 - Entrada pela Avenida Moaci, lateral do shopping.</p>

          <h3 className="font-bold text-sm mb-1">Atendimento:</h3>
          <p className="text-sm">Terça a sábado: das 10h às 22h.</p>
          <p className="text-sm">Domingos e feriados: das 14h às 20h.</p>
          <p className="text-sm">*No dia 29/01 o atendimento inicia às 11h</p>
          <p className="text-sm italic mb-3">Atenção: fechado em todas as segundas-feiras.</p>
        </div>

        <div className="px-4 mb-4">
          <img src="/images/seating-chart.png" alt="Mapa de assentos" className="w-full mb-4" />
        </div>

        <div className="px-4 mb-6">
          <h2 className="text-base font-bold mb-2">SETORES E PREÇOS</h2>
          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Setor</th>
                <th className="text-right py-2">Inteira</th>
                <th className="text-right py-2">Meia-entrada</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 text-left">Frontstage</td>
                <td className="py-2 text-right">R$850,00</td>
                <td className="py-2 text-right">R$425,00</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 text-left">Pista</td>
                <td className="py-2 text-right">R$640,00</td>
                <td className="py-2 text-right">R$320,00</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 text-left">Mezanino</td>
                <td className="py-2 text-right">R$880,00</td>
                <td className="py-2 text-right">R$440,00</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 text-left">Camarote A/B</td>
                <td className="py-2 text-right">R$890,00</td>
                <td className="py-2 text-right">R$445,00</td>
              </tr>
            </tbody>
          </table>

          <div className="mb-4">
            <p className="text-xs mb-1">Legenda PCD:</p>
            <p className="text-xs mb-3">As áreas selecionadas no mapa são áreas preferenciais para PCD (em qualquer de suas modalidades) e a disponibilidade é só do que está identificada no mapa.</p>
          </div>
        </div>

        <div className="px-4 mb-6">
          <h2 className="text-base font-bold mb-2">CAPACIDADE TOTAL:</h2>
          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">SETOR</th>
                <th className="text-center py-2">CAPACIDADE</th>
                <th className="text-right py-2">MEIA-ENTRADA*</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 text-left">FRONTSTAGE</td>
                <td className="py-2 text-center">2.500</td>
                <td className="py-2 text-right">1.000</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 text-left">PISTA</td>
                <td className="py-2 text-center">5.500</td>
                <td className="py-2 text-right">2.200</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 text-left">MEZANINO</td>
                <td className="py-2 text-center">300</td>
                <td className="py-2 text-right">120</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 text-left">CAMAROTE A/B</td>
                <td className="py-2 text-center">198</td>
                <td className="py-2 text-right">79</td>
              </tr>
            </tbody>
          </table>

          <p className="text-xs mb-4">*Cota de ingressos do tipo meia-entrada, limitada a 40% da capacidade, conforme a Lei Federal n° 12.933/2013. Idosos não fazem parte destes números e não estão submetidos à limitação, por estarem enquadrados na Lei 10.741/2003.</p>

          <p className="text-sm mb-2"><strong>Taxa de Serviço Online:</strong> 20%</p>
          <p className="text-sm mb-4"><strong>Limite de ingressos por CPF:</strong> Clientes podem comprar até 06 ingressos sendo 02 meias-entradas.</p>

          <div className="mb-4">
            <h3 className="font-bold text-sm mb-1">VENDA GERAL</h3>
            <p className="text-sm mb-3"><strong>Início das Vendas</strong>: 29/01/2025 às 10h em www.ticketmaster.com.br e a partir das 11h na Bilheteria Oficial.</p>
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-sm mb-1">FORMA DE PAGAMENTO:</h3>
            <p className="text-sm mb-3">Para compras online: PIX</p>
          </div>
        </div>

        <div className="px-4 pb-6">
          <h2 className="text-base font-bold mb-2">Outras Informações</h2>
          <ul className="text-sm list-none">
            <li className="mb-2">
              Se você precisar de informações sobre meia-entrada,
              <a href="#" className="text-primary-blue"> acesse esta página.</a>
            </li>
            <li className="mb-2">
              Para auxílio sobre perfil/cadastro,
              <a href="#" className="text-primary-blue"> clique aqui.</a>
            </li>
            <li className="mb-2">
              As informações sobre o processo de compra,
              <a href="#" className="text-primary-blue"> estão neste artigo.</a>
            </li>
            <li className="mb-2">
              Para acessar informações sobre o Ingresso Seguro e a cobertura oferecida,
              <a href="#" className="text-primary-blue"> acesse esta página.</a>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetails;
