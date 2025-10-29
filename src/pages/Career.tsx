import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SeoHelmet from '../components/common/SeoHelmet';

const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const initialForm = {
    name: '',
    email: '',
    phone: '',
    position: '',
    resume: null,
    message: ''
};

const Career: React.FC = () => {
    const [form, setForm] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            setForm({ ...form, [name]: (e.target as HTMLInputElement).files?.[0] || null });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    
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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate CAPTCHA
        if (captchaInput.trim().toUpperCase() !== captchaText.trim().toUpperCase()) {
            setError('CAPTCHA incorrect. Please try again.');
            setSubmissionMessage('');
            setCaptchaText(generateCaptchaText());
            setCaptchaInput('');
            return;
        }

        setLoading(true);
        setError('');
        setSubmissionMessage('');

        try {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('email', form.email);
            formData.append('phone', form.phone);
            formData.append('position', form.position);
            formData.append('message', form.message || '');
            
            if (form.resume) {
                formData.append('resume', form.resume);
            }

            const response = await fetch('/api/career/apply', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                setSubmissionMessage(responseData.message || 'Application submitted successfully! You will receive a confirmation email shortly.');
                setSubmitted(true);
                setForm(initialForm);
                setError('');
                setCaptchaText(generateCaptchaText());
                setCaptchaInput('');
                // Reset file input
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } else {
                let errorMessage = 'Failed to submit application. Please try again later.';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                    // Show validation errors if available
                    if (errorData.details && Array.isArray(errorData.details)) {
                        const validationErrors = errorData.details.map((err: any) => err.msg).join(', ');
                        if (validationErrors) {
                            errorMessage = validationErrors;
                        }
                    }
                } catch (e) {
                    errorMessage = `Server error (${response.status}). Please try again later.`;
                }
                setError(errorMessage);
                setSubmissionMessage('');
                setCaptchaText(generateCaptchaText());
                setCaptchaInput('');
            }
        } catch (error: any) {
            setError(error?.message || 'Network error. Please check your connection and try again.');
            setSubmissionMessage('');
            setCaptchaText(generateCaptchaText());
            setCaptchaInput('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
         <SeoHelmet
  title="Tanasvi Technologies Pvt Ltd | Custom Software, AI, CRM & IoT Solutions"
  description="Tanasvi Technologies Pvt Ltd is a leading IT company delivering AI-powered software, mobile and web apps, CRM/HRM systems, and end-to-end digital transformation solutions for startups and enterprises."
  keywords="Tanasvi Technologies, custom software development, AI solutions, mobile app development, CRM software, IoT development, HRM systems, web development, IT consulting, business automation, digital transformation"
/>

            <section className="contact-section fix section-padding">
                <div className="container">
                    <div className="section-title title-area mx-auto mb-20 text-center">
                        <div className="subtitle d-flex justify-content-center">
                            <img src="/assets/img/icon/arrowLeft.svg" alt="icon" />
                            <span> CAREER AT TANASVI </span>
                            <img src="/assets/img/icon/arrowRight.svg" alt="icon" />
                        </div>
                        <h2 className="title"> Join Our Team & Build Your Future </h2>
                    </div>

                    <div className="d-flex flex-column align-items-center justify-content-center career-center-wrap">
                        {/* Illustration/Visual */}
                        <motion.div 
                            className="text-center mb-4"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            variants={formVariants}
                        >
                            <p>
                                At Tanasvi Technologies, we are always looking for passionate, innovative, and dedicated individuals to join our team. Whether you're a fresher or an experienced professional, we offer challenging opportunities in various fields of technology.
                            </p>
                            <p>
                                To apply, email your updated resume to <a href="mailto:careers@tanasvi.com">careers@tanasvi.com</a> or fill out the form below.
                            </p>
                        </motion.div>
                        <div className="career-form-wrapper w-100" style={{maxWidth: 800}}>
                            {submitted ? (
                                <div className="alert alert-success text-center" role="alert">
                                    {submissionMessage || 'Thank you for applying! We have received your application and will get back to you soon.'}
                                </div>
                            ) : (
                            <motion.form 
                                className="contact-form-items"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
                                onSubmit={handleSubmit}
                                autoComplete="off"
                            >
                                <div className="row g-4">
                                    <motion.div className="col-lg-6" variants={formVariants}>
                                        <div className="form-clt">
                                            <label htmlFor="career-name" className="form-label-career">Full Name*</label>
                                            <input type="text" id="career-name" name="name" placeholder="Your Name" required value={form.name} onChange={handleChange} />
                                        </div>
                                    </motion.div>
                                    <motion.div className="col-lg-6" variants={formVariants}>
                                        <div className="form-clt">
                                            <label htmlFor="career-email" className="form-label-career">Email*</label>
                                            <input type="email" id="career-email" name="email" placeholder="Your Email" required value={form.email} onChange={handleChange} />
                                        </div>
                                    </motion.div>
                                    <motion.div className="col-lg-6" variants={formVariants}>
                                        <div className="form-clt">
                                            <label htmlFor="career-phone" className="form-label-career">Phone Number*</label>
                                            <input type="text" id="career-phone" name="phone" placeholder="Phone Number" required value={form.phone} onChange={handleChange} />
                                        </div>
                                    </motion.div>
                                    <motion.div className="col-lg-6" variants={formVariants}>
                                        <div className="form-clt">
                                            <label htmlFor="career-position" className="form-label-career">Position Applying For*</label>
                                            <input type="text" id="career-position" name="position" placeholder="Position" required value={form.position} onChange={handleChange} />
                                        </div>
                                    </motion.div>
                                    <motion.div className="col-lg-12" variants={formVariants}>
                                        <div className="form-clt">
                                            <label htmlFor='resume-upload' className="form-label-career">Upload Your Resume* (PDF, DOC, DOCX - Max 5MB)</label>
                                            <input type="file" id='resume-upload' name="resume" className="form-control" required onChange={handleChange} accept=".pdf,.doc,.docx" ref={fileInputRef} />
                                        </div>
                                    </motion.div>
                                    <motion.div className="col-lg-12" variants={formVariants}>
                                        <div className="form-clt">
                                            <label htmlFor="career-message" className="form-label-career">Message (Optional)</label>
                                            <textarea id="career-message" name="message" placeholder="Write a Message (Optional)" value={form.message} onChange={handleChange}></textarea>
                                        </div>
                                    </motion.div>
                                 
                                    {error && (
                                        <motion.div className="col-lg-12" variants={formVariants}>
                                            <div className="alert alert-danger text-center" role="alert">{error}</div>
                                        </motion.div>
                                    )}
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
                                    <motion.div className="col-lg-7 mx-auto" variants={formVariants}>
                                        <button type="submit" className="theme-btn w-100" disabled={loading}>
                                            {loading ? 'Submitting...' : (<><span>Submit Application</span> <i className="fa-solid fa-arrow-right-long"></i></>)}
                                        </button>
                                    </motion.div>
                                </div>
                            </motion.form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Career;