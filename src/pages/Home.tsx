import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import AboutSection from '../components/home/AboutSection';
import ServiceSection from '../components/home/ServiceSection';
import WorkProcess from '../components/home/WorkProcess';

const Home: React.FC = () => {
  return (
    <>
      <HeroSlider />
      <AboutSection />
      <ServiceSection />
      <WorkProcess />
    </>
  );
};

export default Home;