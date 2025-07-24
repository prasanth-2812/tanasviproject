import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link
import { servicesList } from '../data/serviceData'; // Import from the new data file

const Services: React.FC = () => {
    return (
        <>
            <section className="service-section info-card-section fix section-padding">
                <div className="container">
                    <div className="section-title title-area mx-auto mb-20">
                        <div className="subtitle d-flex justify-content-center">
                            <img src="/assets/img/icon/arrowLeft.svg" alt="icon" />
                            <span> OUR SERVICES </span>
                            <img src="/assets/img/icon/arrowRight.svg" alt="icon" />
                        </div>
                        <h2 className="title text-center"> We Provide the Best Quality </h2>
                    </div>
                    <div className="service-wrapper mb-0">
                        <div className="row">
                            {servicesList.map((service) => (
                                <motion.div 
                                    className="col-xl-4 col-lg-6 col-md-6 mb-4"
                                    key={service.title}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: service.delay }}
                                    viewport={{ once: true }}
                                >
                                    {/* ===== WRAP a Link around the card ===== */}
                                    <Link to={`/service/${service.slug}`} className="text-decoration-none d-block h-100">
                                        <div className="service-box-items box-shadow h-100">
                                            <div className="icon">
                                                <img src={service.icon} alt={`${service.title} icon`} />
                                            </div>
                                            <div className="content">
                                                <h4>{service.title}</h4>
                                                <p className="card-description">{service.description}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Services;