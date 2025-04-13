import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import TicketSelection from './pages/TicketSelection';
import InsuranceSelection from './pages/InsuranceSelection';
import TermsAndConditions from './pages/TermsAndConditions'; // Importa a página de termos
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ingressos/:city" element={<EventDetails />} />
        <Route path="/ingressos/selecionar/:city" element={<TicketSelection />} />
        <Route path="/selecionar-seguro" element={<InsuranceSelection />} />
        <Route path="/termos" element={<TermsAndConditions />} /> {/* Adiciona a rota de termos */}
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
