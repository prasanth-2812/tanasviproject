import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const sliderData = [
    { bgImage: '/assets/img/hero/hero-2.jpg' },
    { bgImage: '/assets/img/hero/hero-1.jpg' },
    { bgImage: '/assets/img/hero/hero-3.jpg' },
];

const HeroSlider: React.FC = () => {
    return (
        <section className="hero-section fix hero-3">
            <div className="bottom-shape">
                <img src="/assets/img/hero/bottom-shape.png" alt="shape-img" />
            </div>
            <Swiper
                modules={[Navigation, Autoplay, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                effect="fade"
                navigation={{ nextEl: '.array-next', prevEl: '.array-prev' }}
                className="hero-slider"
            >
                {sliderData.map((slide, index) => (
                    <SwiperSlide key={index}>
                        {/* CORRECTED PATH HERE */}
                        <div className="slider-image bg-cover" style={{ backgroundImage: `url(${slide.bgImage})` }}></div>
                        <div className="container">
                            <div className="row g-4 align-items-center">
                                <div className="col-lg-8">
                                    <div className="hero-content">
                                        <motion.h5 initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}>
                                            best it company
                                        </motion.h5>
                                        <motion.h1 initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5 }} viewport={{ once: true }}>
                                            Innovative Solutions at <br /> Tanasvi Technologies
                                        </motion.h1>
                                        <motion.p initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.7 }} viewport={{ once: true }}>
                                            At Tanasvi Technologies, we believe IT is more than just tools – it's the invisible magic that transforms businesses,<br /> empowers people, and shapes a brighter digital tomorrow.
                                        </motion.p>
                                        <motion.div className="hero-button" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.9 }} viewport={{ once: true }}>
                                            <Link to="/about.html" className="theme-btn hover-white">Explore More<i className="fa-solid fa-arrow-right-long"></i></Link>
                                            <Link to="/contact.html" className="theme-btn border-white">Contact Us<i className="fa-solid fa-arrow-right-long"></i></Link>
                                        </motion.div>
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
