import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import VenueMap from '../components/ticketSelection/VenueMap';

const TicketSelection = () => {
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
      {/* Banner removido daqui */}

      <div className="bg-white py-4 px-4">
        <h1 className="text-xl font-bold mb-4">
          Hozier - {info.name} - {info.date}
        </h1>

        <div className="mb-6">
          <div className="text-sm">
            <p className="mb-1"><strong>Apresentação:</strong> {info.date}</p>
            <p className="mb-1"><strong>Abertura dos portões:</strong> {info.openingTime}</p>
            <p className="mb-1"><strong>Horário do show:</strong> {info.time}</p>
            <p className="mb-1"><strong>Local:</strong> {info.venue}</p>
            <p className="mb-1"><strong>Endereço:</strong> {info.address}</p>
            <p className="mb-1"><strong>Classificação:</strong> 16 anos. Menores de 06 a 15 anos, apenas acompanhados dos pais ou responsáveis legais. *Sujeito a alteração por Decisão Judicial.</p>
          </div>
        </div>
      </div>

      <VenueMap />
    </Layout>
  );
};

export default TicketSelection;
