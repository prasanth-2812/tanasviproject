import React from 'react';
import { motion } from 'framer-motion';
import PageTitle from '../components/common/PageTitle';

const servicesList = [
    { icon: "assets/img/service/icon/s-icon-1.svg", title: "Database Security" },
    { icon: "assets/img/service/icon/s-icon-2.svg", title: "IT Consultancy", active: true },
    { icon: "assets/img/service/icon/s-icon-3.svg", title: "Cyber Security" },
    { icon: "assets/img/service/icon/s-icon-4.svg", title: "App Development" },
    { icon: "assets/img/service/icon/s-icon-10.svg", title: "UI/UX Design" },
    { icon: "assets/img/service/icon/s-icon-11.svg", title: "IT Management" },
    { icon: "assets/img/service/icon/s-icon-12.svg", title: "Digital Marketing" },
    { icon: "assets/img/service/icon/s-icon-13.svg", title: "Data Analysis" },
];

const Services: React.FC = () => {
    return (
        <>
            <PageTitle title="Our Services" breadcrumb="Services" />

            <section className="service-section fix section-padding">
                <div className="container">
                    <div className="section-title title-area mx-auto mb-20">
                        <div className="subtitle d-flex justify-content-center">
                            <img src="assets/img/icon/arrowLeft.svg" alt="icon" />
                            <span>OUR SERVICES</span>
                            <img src="assets/img/icon/arrowRight.svg" alt="icon" />
                        </div>
                        <h2 className="title text-center">We Provide the Best Quality</h2>
                    </div>
                    <div className="service-wrapper mb-0">
                        <div className="row">
                            {servicesList.map((service, index) => (
                                <motion.div 
                                    className="col-xl-3 col-lg-4 col-md-6" 
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className={`service-box-items box-shadow ${service.active ? 'active' : ''}`}>
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