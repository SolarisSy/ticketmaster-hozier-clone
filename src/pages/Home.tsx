import Hero from '../components/home/Hero';
import EventCards from '../components/home/EventCards';
import EventInfo from '../components/home/EventInfo';
import Layout from '../components/layout/Layout';

const Home = () => {
  return (
    <Layout>
      <Hero />
      <EventCards />
      <EventInfo />
    </Layout>
  );
};

export default Home;
