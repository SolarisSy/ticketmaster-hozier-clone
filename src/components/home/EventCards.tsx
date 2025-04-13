import { Link } from 'react-router-dom';

interface EventCardProps {
  city: string;
  date: string;
  venue: string;
  saleInfo: string;
  image: string;
  link: string;
}

const EventCard: React.FC<EventCardProps> = ({
  city,
  date,
  venue,
  saleInfo,
  image,
  link,
}) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex">
        <div className="w-1/3 mr-4">
          <img src={image} alt={`Hozier ${city}`} className="w-full rounded" />
        </div>
        <div className="w-2/3 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg">{city}</h3>
            <p className="text-sm">{date}</p>
            <p className="text-sm">{venue}</p>
            <p className="text-sm text-gray-600">{saleInfo}</p>
          </div>
          <Link
            to={link}
            className="bg-primary-blue text-white text-center py-2 px-4 rounded text-sm mt-2"
          >
            INGRESSOS
          </Link>
        </div>
      </div>
    </div>
  );
};

const EventCards = () => {
  const events = [
    {
      city: "São Paulo",
      date: "30 de Maio",
      venue: "Espaço Unimed",
      saleInfo: "Venda Geral: 29/01 às 10h",
      image: "/images/sao-paulo-card.webp",
      link: "/ingressos/sao-paulo",
    },
    {
      city: "Rio de Janeiro",
      date: "01 de Junho",
      venue: "Qualistage",
      saleInfo: "Venda Geral: 29/01 às 10h",
      image: "/images/rio-card.webp",
      link: "/ingressos/rio-de-janeiro",
    },
  ];

  return (
    <div className="bg-white">
      {events.map((event) => (
        <EventCard key={event.city} {...event} />
      ))}
    </div>
  );
};

export default EventCards;
