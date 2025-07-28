import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesList } from '../data/serviceData';
import SeoHelmet from '../components/common/SeoHelmet';

const Services: React.FC = () => {
    return (
        <>
           <SeoHelmet
  title="Tanasvi Technologies Pvt Ltd | Custom Software, AI, CRM & IoT Solutions"
  description="Tanasvi Technologies Pvt Ltd is a leading IT company delivering AI-powered software, mobile and web apps, CRM/HRM systems, and end-to-end digital transformation solutions for startups and enterprises."
  keywords="Tanasvi Technologies, custom software development, AI solutions, mobile app development, CRM software, IoT development, HRM systems, web development, IT consulting, business automation, digital transformation"
/>

            
            {/* THIS IS THE KEY CHANGE: Added the unique "services-page" class */}
            <section className="services-page section-padding">
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
                                    className="col-lg-4 col-md-6 col-12 mb-4"
                                    key={service.title}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: service.delay }}
                                    viewport={{ once: true }}
                                >
                                    <Link to={`/service/${service.slug}`} className="text-decoration-none d-block h-100">
                                        <div className="service-box-items h-100">
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