import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const sliderData = [
  {
    bgImage: 'assets/img/hero/hero-2.jpg',
    subtitle: 'best it company',
    titleLine1: 'Innovative Solutions at',
    titleLine2: 'Tanasvi Technologies',
    description: "At Tanasvi Technologies, we believe IT is more than just tools – it's the invisible magic that transforms businesses, empowers people, and shapes a brighter digital tomorrow."
  },
  {
    bgImage: 'assets/img/hero/hero-1.jpg',
    subtitle: 'best it company',
    titleLine1: 'Innovative Solutions at',
    titleLine2: 'Tanasvi Technologies',
    description: "At Tanasvi Technologies, we believe IT is more than just tools – it's the invisible magic that transforms businesses, empowers people, and shapes a brighter digital tomorrow."
  },
  {
    bgImage: 'assets/img/hero/hero-3.jpg',
    subtitle: 'best it company',
    titleLine1: 'Innovative Solutions at',
    titleLine2: 'Tanasvi Technologies',
    description: "At Tanasvi Technologies, we believe IT is more than just tools – it's the invisible magic that transforms businesses, empowers people, and shapes a brighter digital tomorrow."
  }
];

const HeroSlider: React.FC = () => {
  return (
    
    <section className="hero-section fix hero-3">
      <div className="bottom-shape">
        <img src="assets/img/hero/bottom-shape.png" alt="shape-img" />
      </div>

      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        navigation={{
          nextEl: '.array-next',
          prevEl: '.array-prev',
        }}
        className="hero-slider"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slider-image bg-cover" style={{ backgroundImage: `url(${slide.bgImage})` }}>
              {/* Decorative shapes can be added here if needed */}
            </div>
            <div className="container">
              <div className="row g-4 align-items-center">
                <div className="col-lg-8">
                  <div className="hero-content">
                    <h5 data-animation="slideInRight" data-duration="2s" data-delay=".3s">{slide.subtitle}</h5>
                    <h1 data-animation="slideInRight" data-duration="2s" data-delay=".5s">
                      {slide.titleLine1} <br /> {slide.titleLine2}
                    </h1>
                    <p data-animation="slideInRight" data-duration="2s" data-delay=".9s">
                      {slide.description}
                    </p>
                    <div className="hero-button">
                      <Link to="/about.html" data-animation="slideInRight" data-duration="2s" data-delay=".9s" className="theme-btn hover-white">
                        Explore More
                        <i className="fa-solid fa-arrow-right-long"></i>
                      </Link>
                      <Link to="/contact.html" data-animation="slideInRight" data-duration="2s" data-delay=".9s" className="theme-btn border-white">
                        Contact Us
                        <i className="fa-solid fa-arrow-right-long"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="array-button">
        <button className="array-prev"><i className="fal fa-arrow-left"></i></button>
        <button className="array-next"><i className="fal fa-arrow-right"></i></button>
      </div>
    </section>
  );
};

export default HeroSlider;