import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SeoHelmet from '../components/common/SeoHelmet';
import { contactService, ApiClientError } from '../services';

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
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const [captchaText, setCaptchaText] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');

    const generateCaptchaText = (length: number = 5): string => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Skipped similar characters
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    useEffect(() => {
        setCaptchaText(generateCaptchaText());
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (captchaInput.trim().toUpperCase() !== captchaText.trim().toUpperCase()) {
            setSubmissionMessage('CAPTCHA incorrect. Please try again.');
            setIsError(true);
            setCaptchaText(generateCaptchaText());
            setCaptchaInput('');
            return;
        }

        setIsSubmitting(true);
        setSubmissionMessage('');
        setIsError(false);

        try {
            const response = await contactService.sendContact({ ...formData });
            setSubmissionMessage(response.message || 'Your message has been sent successfully! You will receive a confirmation email shortly.');
            setIsError(false);
            setFormData({ name: '', email: '', message: '' });
            setCaptchaText(generateCaptchaText());
            setCaptchaInput('');
        } catch (error: any) {
            let errorMessage = 'Failed to send message. Please try again later.';
            
            if (error instanceof ApiClientError) {
                errorMessage = error.message;
                // Show validation errors if available
                if (error.details && Array.isArray(error.details)) {
                    const validationErrors = error.details.map((err: any) => err.msg).join(', ');
                    if (validationErrors) {
                        errorMessage = validationErrors;
                    }
                }
            } else {
                errorMessage = error?.message || 'Network error. Please check your connection and try again.';
            }
            
            setSubmissionMessage(errorMessage);
            setIsError(true);
            setCaptchaText(generateCaptchaText());
            setCaptchaInput('');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                                        <div className="icon-wrapper"><i className={item.icon}></i></div>
                                        <div className="content-wrapper">
                                            <span>{item.title}</span>
                                            <h3><a href={item.href} target="_blank" rel="noopener noreferrer">{item.content}</a></h3>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        <div className="col-lg-7">
                            <motion.div
                                className="contact-form-wrapper style1"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ staggerChildren: 0.2 }}
                            >
                                <motion.h2 className="form-title mb-4" variants={formVariants}>Ready to Get Started?</motion.h2>
                                <form id="contact-form-page" onSubmit={handleSubmit} className="contact-form-items">
                                    <div className="row g-4">
                                        <motion.div className="col-md-6" variants={formVariants}>
                                            <div className="form-group">
                                                <label htmlFor="name">Your Name*</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    required
                                                    placeholder='Enter Your Name'
                                                    className="form-control style1"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </motion.div>
                                        <motion.div className="col-md-6" variants={formVariants}>
                                            <div className="form-group">
                                                <label htmlFor="email">Your Email*</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    required
                                                    placeholder='Enter Your Email'
                                                    className="form-control style1"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </motion.div>
                                        <motion.div className="col-12" variants={formVariants}>
                                            <div className="form-group">
                                                <label htmlFor="message">Write Message*</label>
                                                <textarea
                                                    name="message"
                                                    id="message"
                                                    required
                                                    placeholder='Message Description'
                                                    className="form-control style1"
                                                    rows={5}
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                ></textarea>
                                            </div>
                                        </motion.div>
                                        <motion.div className="col-12" variants={formVariants}>
                                            <div className="form-group">
                                                <label>Enter CAPTCHA:</label>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px',
                                                    marginBottom: '10px'
                                                }}>
                                                    <span style={{
                                                        fontFamily: 'monospace',
                                                        background: '#f1f1f1',
                                                        color: '#000',
                                                        padding: '8px 16px',
                                                        fontSize: '1.25rem',
                                                        borderRadius: '6px',
                                                        letterSpacing: '3px',
                                                        userSelect: 'none',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                    }}>{captchaText}</span>
                                                    <button type="button" onClick={() => setCaptchaText(generateCaptchaText())} className="btn btn-sm btn-outline-primary">
                                                        <i className="fa fa-refresh"></i>
                                                    </button>
                                                </div>
                                                <input
                                                    type="text"
                                                    required
                                                    className="form-control style1"
                                                    placeholder="Type the CAPTCHA above"
                                                    value={captchaInput}
                                                    onChange={(e) => setCaptchaInput(e.target.value)}
                                                />
                                            </div>
                                        </motion.div>
                                        <motion.div className="col-12" variants={formVariants}>
                                            <button
                                                type="submit"
                                                className="theme-btn w-100"
                                                style={{ padding: '16px 0', fontSize: '1.15rem', borderRadius: '8px', marginTop: '10px' }}
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? 'Sending...' : 'Send Message'} <i className="fa-solid fa-arrow-right-long"></i>
                                            </button>
                                        </motion.div>

                                        {submissionMessage && (
                                            <motion.div
                                                className={`col-12 text-center mt-3 ${isError ? 'text-danger' : 'text-success'}`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {submissionMessage}
                                            </motion.div>
                                        )}
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
