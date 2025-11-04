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

interface FormErrors {
    name: string;
    email: string;
    message: string;
    captcha: string;
}

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({ name: '', email: '', message: '', captcha: '' });
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

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

    // Validation functions
    const validateName = (name: string): string => {
        if (!name.trim()) {
            return 'Name is required';
        }
        if (name.trim().length < 2) {
            return 'Name must be at least 2 characters';
        }
        if (name.trim().length > 100) {
            return 'Name must be less than 100 characters';
        }
        if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) {
            return 'Name can only contain letters, spaces, hyphens, and apostrophes';
        }
        return '';
    };

    const validateEmail = (email: string): string => {
        if (!email.trim()) {
            return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return 'Please enter a valid email address';
        }
        return '';
    };

    const validateMessage = (message: string): string => {
        if (!message.trim()) {
            return 'Message is required';
        }
        if (message.trim().length < 10) {
            return 'Message must be at least 10 characters';
        }
        if (message.trim().length > 2000) {
            return 'Message must be less than 2000 characters';
        }
        return '';
    };

    const validateCaptcha = (captcha: string): string => {
        if (!captcha.trim()) {
            return 'CAPTCHA is required';
        }
        if (captcha.trim().toUpperCase() !== captchaText.trim().toUpperCase()) {
            return 'CAPTCHA does not match';
        }
        return '';
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateField(field);
    };

    const validateField = (field: string) => {
        let error = '';
        switch (field) {
            case 'name':
                error = validateName(formData.name);
                break;
            case 'email':
                error = validateEmail(formData.email);
                break;
            case 'message':
                error = validateMessage(formData.message);
                break;
            case 'captcha':
                error = validateCaptcha(captchaInput);
                break;
        }
        setErrors(prev => ({ ...prev, [field]: error }));
        return error === '';
    };

    const validateForm = (): boolean => {
        const nameValid = validateField('name');
        const emailValid = validateField('email');
        const messageValid = validateField('message');
        const captchaValid = validateField('captcha');

        setTouched({
            name: true,
            email: true,
            message: true,
            captcha: true
        });

        return nameValid && emailValid && messageValid && captchaValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCaptchaInput(value);
        
        // Clear error when user starts typing
        if (errors.captcha) {
            setErrors(prev => ({ ...prev, captcha: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields before submission
        if (!validateForm()) {
            setSubmissionMessage('Please fix the errors in the form before submitting.');
            setIsError(true);
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
            setErrors({ name: '', email: '', message: '', captcha: '' });
            setTouched({});
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
                    {/* Page Header - Matching Services and Projects style */}
                    <div className="section-title title-area mx-auto mb-8">
                        <div className="subtitle d-flex justify-content-center">
                            <img src="/assets/img/icon/arrowLeft.svg" alt="arrow-left" />
                            <span> CONTACT US </span>
                            <img src="/assets/img/icon/arrowRight.svg" alt="arrow-right" />
                        </div>
                        <h2 className="title text-center">Get In Touch With Us</h2>
                    </div>

                    <div className="row g-4">
                        <div className="col-lg-5">
                            <motion.div
                                className="contact-info-panel"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                viewport={{ once: true }}
                            >
                                <h3 className="contact-info-title">Contact Information</h3>
                                <p className="contact-info-description">Reach out to us through any of these channels</p>
                                <div className="contact-info-blocks">
                                    {contactInfo.map((item, index) => (
                                        <motion.div 
                                            className="contact-info-block" 
                                            key={index}
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="icon-wrapper"><i className={item.icon}></i></div>
                                            <div className="content-wrapper">
                                                <span>{item.title}</span>
                                                <h3><a href={item.href} target="_blank" rel="noopener noreferrer">{item.content}</a></h3>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Internships & Training Section */}
                                <div className="internship-section">
                                    <h4 className="internship-section-title">Internships & Training</h4>
                                    <p className="internship-section-description">Contact us for internship and training opportunities</p>
                                    <div className="internship-contacts">
                                        <motion.div 
                                            className="contact-info-block internship-block"
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="icon-wrapper"><i className="fa-solid fa-user-graduate"></i></div>
                                            <div className="content-wrapper">
                                                <span>Aswini</span>
                                                <h3><a href="tel:+919392562193" target="_blank" rel="noopener noreferrer">+91-9392562193</a></h3>
                                            </div>
                                        </motion.div>
                                        <motion.div 
                                            className="contact-info-block internship-block"
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="icon-wrapper"><i className="fa-solid fa-user-graduate"></i></div>
                                            <div className="content-wrapper">
                                                <span>Nageswar</span>
                                                <h3><a href="tel:+919392562193" target="_blank" rel="noopener noreferrer">+91-9392562193</a></h3>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
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
                                <motion.h2 className="form-title mb-3" variants={formVariants}>Send Us a Message</motion.h2>
                                <motion.p className="form-subtitle mb-4" variants={formVariants}>Fill out the form below and we'll get back to you promptly.</motion.p>
                                <form id="contact-form-page" onSubmit={handleSubmit} className="contact-form-items">
                                    <div className="row g-4">
                                        <motion.div className="col-md-6" variants={formVariants}>
                                            <div className="form-group">
                                                <label htmlFor="name">Your Name*</label>
                                                <div className="input-wrapper">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        required
                                                        placeholder='Enter Your Name'
                                                        className={`form-control style1 ${touched.name && errors.name ? 'error' : ''} ${touched.name && !errors.name && formData.name ? 'success' : ''}`}
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        onBlur={() => handleBlur('name')}
                                                    />
                                                    {touched.name && errors.name && (
                                                        <i className="fa-solid fa-circle-exclamation error-icon"></i>
                                                    )}
                                                    {touched.name && !errors.name && formData.name && (
                                                        <i className="fa-solid fa-circle-check success-icon"></i>
                                                    )}
                                                </div>
                                                {touched.name && errors.name && (
                                                    <div className="error-message">
                                                        <i className="fa-solid fa-exclamation-circle"></i>
                                                        {errors.name}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                        <motion.div className="col-md-6" variants={formVariants}>
                                            <div className="form-group">
                                                <label htmlFor="email">Your Email*</label>
                                                <div className="input-wrapper">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        required
                                                        placeholder='Enter Your Email'
                                                        className={`form-control style1 ${touched.email && errors.email ? 'error' : ''} ${touched.email && !errors.email && formData.email ? 'success' : ''}`}
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        onBlur={() => handleBlur('email')}
                                                    />
                                                    {touched.email && errors.email && (
                                                        <i className="fa-solid fa-circle-exclamation error-icon"></i>
                                                    )}
                                                    {touched.email && !errors.email && formData.email && (
                                                        <i className="fa-solid fa-circle-check success-icon"></i>
                                                    )}
                                                </div>
                                                {touched.email && errors.email && (
                                                    <div className="error-message">
                                                        <i className="fa-solid fa-exclamation-circle"></i>
                                                        {errors.email}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                        <motion.div className="col-12" variants={formVariants}>
                                            <div className="form-group">
                                                <label htmlFor="message">Write Message*</label>
                                                <div className="input-wrapper">
                                                    <textarea
                                                        name="message"
                                                        id="message"
                                                        required
                                                        placeholder='Message Description'
                                                        className={`form-control style1 ${touched.message && errors.message ? 'error' : ''} ${touched.message && !errors.message && formData.message ? 'success' : ''}`}
                                                        rows={5}
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        onBlur={() => handleBlur('message')}
                                                    ></textarea>
                                                    {touched.message && errors.message && (
                                                        <i className="fa-solid fa-circle-exclamation error-icon textarea-icon"></i>
                                                    )}
                                                    {touched.message && !errors.message && formData.message && (
                                                        <i className="fa-solid fa-circle-check success-icon textarea-icon"></i>
                                                    )}
                                                </div>
                                                {touched.message && errors.message && (
                                                    <div className="error-message">
                                                        <i className="fa-solid fa-exclamation-circle"></i>
                                                        {errors.message}
                                                    </div>
                                                )}
                                                {touched.message && !errors.message && formData.message && (
                                                    <div className="char-count">
                                                        {formData.message.trim().length} / 2000 characters
                                                    </div>
                                                )}
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
                                                    <button 
                                                        type="button" 
                                                        onClick={() => {
                                                            setCaptchaText(generateCaptchaText());
                                                            setCaptchaInput('');
                                                            setErrors(prev => ({ ...prev, captcha: '' }));
                                                        }} 
                                                        className="btn btn-sm btn-outline-primary"
                                                        aria-label="Refresh CAPTCHA"
                                                    >
                                                        <i className="fa fa-refresh"></i>
                                                    </button>
                                                </div>
                                                <div className="input-wrapper">
                                                    <input
                                                        type="text"
                                                        required
                                                        className={`form-control style1 ${touched.captcha && errors.captcha ? 'error' : ''} ${touched.captcha && !errors.captcha && captchaInput ? 'success' : ''}`}
                                                        placeholder="Type the CAPTCHA above"
                                                        value={captchaInput}
                                                        onChange={handleCaptchaChange}
                                                        onBlur={() => handleBlur('captcha')}
                                                    />
                                                    {touched.captcha && errors.captcha && (
                                                        <i className="fa-solid fa-circle-exclamation error-icon"></i>
                                                    )}
                                                    {touched.captcha && !errors.captcha && captchaInput && (
                                                        <i className="fa-solid fa-circle-check success-icon"></i>
                                                    )}
                                                </div>
                                                {touched.captcha && errors.captcha && (
                                                    <div className="error-message">
                                                        <i className="fa-solid fa-exclamation-circle"></i>
                                                        {errors.captcha}
                                                    </div>
                                                )}
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
