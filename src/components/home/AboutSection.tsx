import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
    return (
        <section className="about-section section-padding fix bg-cover">
            <div className="container">
                <div className="about-wrapper-2">
                    <div className="row">
                        <motion.div className="col-lg-6" initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                            <div className="about-image">
                                {/* CORRECTED PATHS HERE */}
                                <div className="shape-image"><img src="/assets/img/about/shape.png" alt="shape" /></div>
                                <div className="circle-shape"><img src="/assets/img/about/circle.png" alt="shape" /></div>
                                <img src="/assets/img/about/05.png" alt="about-img" />
                            </div>
                        </motion.div>
                        <div className="col-lg-6 mt-4 mt-lg-0">
                            <div className="about-content">
                                <motion.div className="section-title mb-3" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
                                    <div className="subtitle">
                                        <img src="/assets/img/icon/arrowLeft.svg" alt="icon" />
                                        <span>ABOUT TANASVI</span>
                                        <img src="/assets/img/icon/arrowRight.svg" alt="icon" />
                                    </div>
                                    <h2 className="title">We Can Clients with The About Solution</h2>
                                </motion.div>
                                <motion.p initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: true }}>
                                    Tanasvi Technologies is the best in Product development and IT consultancy firm that provides a wide range of services in various domains of information technology. We have expertise in IT software, data communication, automation, artificial intelligence and natural language processing.
                                </motion.p>
                                <div className="about-author">
                                    <motion.div className="about-button" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.6 }} viewport={{ once: true }}>
                                        <Link to="/about" className="theme-btn">Explore More<i className="fa-solid fa-arrow-right-long"></i></Link>
                                    </motion.div>
                                    <motion.div className="author-icon" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.8 }} viewport={{ once: true }}>
                                        <div className="icon"><i className="fa-solid fa-phone"></i></div>
                                        <div className="content">
                                            <span>Call Us Now</span>
                                            <h5><a href="tel:+91-9392562193">+91-9392562193</a></h5>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;