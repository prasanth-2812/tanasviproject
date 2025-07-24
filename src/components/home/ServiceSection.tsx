// Replace the original file content with this

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const services = [
    { imgSrc: "/assets/img/service/02.png", icon: "/assets/img/service/icon/s-icon-1.svg", title: "Cross-Platform (Hybrid) Desktop and Mobile Apps", description: "Experience seamless desktop and mobile applications that work across platforms, providing a unified user experience." },
    { imgSrc: "/assets/img/service/03.jpg", icon: "/assets/img/service/icon/s-icon-2.svg", title: "Application Maintenance & Support Services", description: "Ensure your applications run smoothly with our reliable maintenance and support services, keeping your software up-to-date and hassle-free." },
    { imgSrc: "/assets/img/service/04.jpg", icon: "/assets/img/service/icon/s-icon-5.svg", title: "Mobile Apps Development Services", description: "Turn your ideas into reality with our user-friendly and innovative mobile app development for iOS, Android, and cross-platform solutions." },
    { imgSrc: "/assets/img/service/05.jpg", icon: "/assets/img/service/icon/s-icon-3.svg", title: "Cloud Application Development Services", description: "Leverage the power of the cloud with our scalable and secure application development services tailored to your business needs." }
];

const ServiceSection: React.FC = () => {
    return (
        <section className="service-section-3 pb-0 fix section-padding bg-cover" style={{ backgroundImage: "url('/assets/img/service/service-bg-3.jpg')" }}>
            <div className="container">
                <div className="row d-flex align-items-end justify-content-between mb-20">
                    <div className="col-xl-7">
                        <div className="section-title">
                            <motion.div className="subtitle" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                                <img src="/assets/img/icon/arrowLeft.svg" alt="icon" />
                                <span>What We Do</span>
                                <img src="/assets/img/icon/arrowRight.svg" alt="icon" />
                            </motion.div>
                            <motion.h2 className="title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
                                We Solve IT Problems With Technology
                            </motion.h2>
                        </div>
                    </div>
                    <div className="col-xl-5 d-flex align-items-end justify-content-end">
                        <motion.div className="btn-wrapper" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: true }}>
                            <Link to="/service.html" className="theme-btn">
                                See all Services <i className="fa-solid fa-arrow-right-long"></i>
                            </Link>
                        </motion.div>
                    </div>
                </div>
                <div className="row">
                    {services.map((service, index) => (
                        <motion.div className="col-lg-3 col-md-6 col-12" key={index} // UPDATED CLASS
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="service-card-items">
                                <div className="service-image"><img src={service.imgSrc} alt={service.title} /></div>
                                <div className="icon-2"><img src={service.icon} alt="icon" /></div>
                                <div className="service-content">
                                    <div className="icon"><img src={service.icon} alt="icon" /></div>
                                    <h4><Link to="/service.html">{service.title}</Link></h4>
                                    <p>{service.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="cta-banner-2 section-padding">
                <div className="container">
                    <div className="cta-wrapper-2 border-radius">
                        <h3>Stay Connected With <br /> Cutting Edge IT</h3>
                        <div className="author-icon">
                            <div className="icon"><i className="fa-solid fa-phone"></i></div>
                            <div className="content">
                                <span>Call Us Now</span>
                                <h4><a href="tel:+91-9392562193">+91-9392562193</a></h4>
                            </div>
                        </div>
                        <Link to="/contact.html" className="theme-btn bg-white">
                            get A Quote <i className="fa-solid fa-arrow-right-long"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceSection;