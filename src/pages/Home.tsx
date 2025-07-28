import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import AboutSection from '../components/home/AboutSection';
import ServiceSection from '../components/home/ServiceSection';
import WorkProcess from '../components/home/WorkProcess';
import SeoHelmet from '../components/common/SeoHelmet';



const Home: React.FC = () => {
  return (
    <>
     <SeoHelmet
  title="Tanasvi Technologies Pvt Ltd | Custom Software, AI, CRM & IoT Solutions"
  description="Tanasvi Technologies Pvt Ltd is a leading IT company delivering AI-powered software, mobile and web apps, CRM/HRM systems, and end-to-end digital transformation solutions for startups and enterprises."
  keywords="Tanasvi Technologies, custom software development, AI solutions, mobile app development, CRM software, IoT development, HRM systems, web development, IT consulting, business automation, digital transformation"
/>

      <HeroSlider />
      <AboutSection />
      <ServiceSection />
      <WorkProcess />
    </>
  );
};

export default Home;