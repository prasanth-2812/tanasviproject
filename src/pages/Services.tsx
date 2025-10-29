import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesList } from '../data/serviceData';
import SeoHelmet from '../components/common/SeoHelmet';

const Services: React.FC = () => {
    return (
        <>
            <SeoHelmet
                title="Our Services | Tanasvi Technologies - AI, Digital Transformation & IT Solutions"
                description="Empowering businesses with AI, digital transformation, and IT expertise. Explore our comprehensive services including IT consultancy, AI development, mobile apps, web development, ERP systems, digital marketing, BPO, and cloud services."
                keywords="Tanasvi Technologies services, IT consultancy, AI development, mobile app development, web development, ERP systems, digital marketing, BPO services, cloud services, business automation"
            />
            {/* Heading (match Projects page style) */}
            <section className="services-cards-section section-padding pt-0">
                <div className="container">
                    <div className="section-title title-area mx-auto mb-20">
                        <div className="subtitle d-flex justify-content-center">
                            <img src="/assets/img/icon/arrowLeft.svg" alt="arrow-left" />
                            <span> OUR SERVICES </span>
                            <img src="/assets/img/icon/arrowRight.svg" alt="arrow-right" />
                        </div>
                        <h2 className="title text-center">We Provide The Best Quality</h2>
                    </div>
                </div>
            </section>

            {/* Services Cards Grid */}
            <section className="services-cards-section section-padding pt-0">
                <div className="container">
                    
                    <div className="row g-4">
                        {servicesList.map((service, index) => (
                            <motion.div
                                key={service.slug}
                                className="col-xl-4 col-lg-4 col-md-6 col-12"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link 
                                    to={`/services/${service.slug}`} 
                                    className="service-card-link text-decoration-none d-block h-100"
                                >
                                    <div className="service-card h-100">
                                        <div className="service-card-header">
                                            <div className="service-head">
                                                <div className="service-icon">
                                                    <img src={service.icon} alt={`${service.title} icon`} />
                                                </div>
                                                <h3 className="service-title">{service.title}</h3>
                                            </div>
                                            <p className="service-summary">{service.description}</p>
                                        </div>
                                        <div className="service-card-footer">
                                            <span className="learn-more-btn">
                                                Learn More <i className="fas fa-arrow-right ms-2"></i>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section section-padding bg-primary text-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="cta-title mb-4">Ready to Transform Your Business?</h2>
                                <p className="cta-description mb-4">
                                    Let's discuss how our comprehensive IT solutions can drive your digital transformation and accelerate your growth.
                                </p>
                                <div className="cta-buttons">
                                    <Link to="/contact" className="btn btn-light btn-lg me-3">
                                        <i className="fas fa-rocket me-2"></i>
                                        Get Started Today
                                    </Link>
                                    <Link to="/about" className="btn btn-outline-light btn-lg">
                                        <i className="fas fa-users me-2"></i>
                                        Learn About Us
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Services;