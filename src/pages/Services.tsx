import React from 'react';
import { motion } from 'framer-motion';

const servicesList = [
    { icon: "/assets/img/service/icon/s-icon-13.svg", title: "AI DEVELOPMENT", delay: 0.2 },
    { icon: "/assets/img/service/icon/s-icon-2.svg", title: "IT CONSULTANCY", delay: 0.3 },
    { icon: "/assets/img/service/icon/s-icon-3.svg", title: "CYBER SECURITY", delay: 0.4 },
    { icon: "/assets/img/service/icon/s-icon-4.svg", title: "MOBILE APP DEVELOPMENT", delay: 0.5 },
    { icon: "/assets/img/service/icon/s-icon-11.svg", title: "WEB DEVELOPMENT", delay: 0.6 },
    { icon: "/assets/img/service/icon/s-icon-1.svg", title: "ERP APPLICATIONS", delay: 0.7 },
    { icon: "/assets/img/service/icon/s-icon-12.svg", title: "DIGITAL MARKETING", delay: 0.8 },
    { icon: "/assets/img/service/icon/s-icon-10.svg", title: "BPO", delay: 0.9 },
];

const Services: React.FC = () => {
    return (
        <>
            <section className="service-section fix section-padding">
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
                                    className="col-xl-3 col-lg-4 col-md-6" 
                                    key={service.title}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: service.delay }}
                                    viewport={{ once: true }}
                                >
                                    <div className="service-box-items box-shadow">
                                        <div className="icon">
                                            <img src={service.icon} alt={`${service.title} icon`} />
                                        </div>
                                        <div className="content">
                                            <h4><a href="#!">{service.title}</a></h4>
                                        </div>
                                    </div>
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