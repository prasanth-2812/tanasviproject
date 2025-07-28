import React from 'react';
import { motion } from 'framer-motion';
import SeoHelmet from '../components/common/SeoHelmet';

const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const contactInfo = [
    {
        icon: "fa-solid fa-phone",
        title: "Call Us 7/24",
        content: "+91-9392562193",
        href: "tel:+919392562193"
    },
    {
        icon: "fa-regular fa-envelope",
        title: "Make a Quote",
        content: "info@tanasvi.com",
        href: "mailto:info@tanasvi.com"
    },
    {
        icon: "fa-solid fa-location-dot",
        title: "Location",
        content: "Sunrise Startup Towers, Madhurawada, IT SEZ, Hill No:3, Visakhapatnam-48, Andhra Pradesh, India",
        href: "https://www.google.com/maps/place/Sunrise+Incubation+Hub/@17.7998,83.351244,15z/data=!4m6!3m5!1s0x3a395b3d73355555:0x4a9d705c755317b3!8m2!3d17.7997999!4d83.3512393!16s%2Fg%2F11g9vk_x31?hl=en&entry=ttu"
    }
];

const Contact: React.FC = () => {
    return (
        <>
            <SeoHelmet
  title="Tanasvi Technologies Pvt Ltd | Custom Software, AI, CRM & IoT Solutions"
  description="Tanasvi Technologies Pvt Ltd is a leading IT company delivering AI-powered software, mobile and web apps, CRM/HRM systems, and end-to-end digital transformation solutions for startups and enterprises."
  keywords="Tanasvi Technologies, custom software development, AI solutions, mobile app development, CRM software, IoT development, HRM systems, web development, IT consulting, business automation, digital transformation"
/>

            
            <section className="contact-page-section section-padding">
                <div className="container">
                    <div className="row g-0">
                        {/* Left Column: Blue Info Panel */}
                        <div className="col-lg-5">
                            <motion.div 
                                className="contact-info-panel"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                viewport={{ once: true }}
                            >
                                {contactInfo.map((item, index) => (
                                    <div className="contact-info-block" key={index}>
                                        <div className="icon-wrapper">
                                            <i className={item.icon}></i>
                                        </div>
                                        <div className="content-wrapper">
                                            <span>{item.title}</span>
                                            <h3><a href={item.href} target="_blank" rel="noopener noreferrer">{item.content}</a></h3>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right Column: Contact Form */}
                        <div className="col-lg-7">
                            <motion.div 
                                className="contact-form-wrapper"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ staggerChildren: 0.2 }}
                            >
                                <motion.h2 className="form-title" variants={formVariants}>Ready to Get Started?</motion.h2>
                                <form id="contact-form-page" method="POST" className="contact-form-items">
                                    <div className="row g-4">
                                        <motion.div className="col-md-6" variants={formVariants}>
                                            <div className="form-group">
                                                <label htmlFor="name">Your Name*</label>
                                                <input type="text" name="name" id="name" required placeholder='Enter Your Name '/>
                                            </div>
                                        </motion.div>
                                        <motion.div className="col-md-6" variants={formVariants}>
                                            <div className="form-group">
                                                <label htmlFor="email">Your Email*</label>
                                                <input type="email" name="email" id="email" required placeholder='Enter Your Email' />
                                            </div>
                                        </motion.div>
                                        <motion.div className="col-12" variants={formVariants}>
                                            <div className="form-group">
                                                <label htmlFor="message">Write Message*</label>
                                                <textarea name="message" id="message" required placeholder='Message Description'></textarea>
                                            </div>
                                        </motion.div>
                                        <motion.div className="col-12" variants={formVariants}>
                                            <button type="submit" className="theme-btn">
                                                Send Message <i className="fa-solid fa-arrow-right-long"></i>
                                            </button>
                                        </motion.div>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;