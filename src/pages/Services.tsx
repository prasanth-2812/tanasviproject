import React from 'react';
import { motion } from 'framer-motion';

// UPDATED: Added a description to each service object
const servicesList = [
    { icon: "/assets/img/service/icon/s-icon-13.svg", title: "AI DEVELOPMENT", description: "Custom AI solutions to automate processes and derive intelligent insights.", delay: 0.2 },
    { icon: "/assets/img/service/icon/s-icon-2.svg", title: "IT CONSULTANCY", description: "Strategic guidance to optimize your IT infrastructure and digital transformation.", delay: 0.3 },
    { icon: "/assets/img/service/icon/s-icon-3.svg", title: "CYBER SECURITY", description: "Protect your digital assets with our advanced cybersecurity services.", delay: 0.4 },
    { icon: "/assets/img/service/icon/s-icon-4.svg", title: "MOBILE APP DEVELOPMENT", description: "Engaging and high-performance mobile applications for iOS and Android.", delay: 0.5 },
    { icon: "/assets/img/service/icon/s-icon-11.svg", title: "WEB DEVELOPMENT", description: "Responsive and scalable web solutions tailored to your business needs.", delay: 0.6 },
    { icon: "/assets/img/service/icon/s-icon-1.svg", title: "ERP APPLICATIONS", description: "Integrated ERP systems to streamline your core business operations.", delay: 0.7 },
    { icon: "/assets/img/service/icon/s-icon-12.svg", title: "DIGITAL MARKETING", description: "Boost your online presence and reach your target audience effectively.", delay: 0.8 },
    { icon: "/assets/img/service/icon/s-icon-10.svg", title: "BPO", description: "Reliable Business Process Outsourcing to enhance efficiency and reduce costs.", delay: 0.9 },
];

const Services: React.FC = () => {
    return (
        <>
            {/* ADDED a universal class for styling */}
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
                                    {/* UPDATED: Card structure now supports left alignment */}
                                    <div className="service-box-items box-shadow h-100">
                                        <div className="icon">
                                            <img src={service.icon} alt={`${service.title} icon`} />
                                        </div>
                                        <div className="content">
                                            <h4>{service.title}</h4>
                                            <p className="card-description">{service.description}</p>
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