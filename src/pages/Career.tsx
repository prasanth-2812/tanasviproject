import React from 'react';
import { motion } from 'framer-motion';

const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const Career: React.FC = () => {
    return (
        <>
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

                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <motion.div 
                                className="text-center mb-5"
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

                            {/* ADDED a wrapper div for styling the form background and container */}
                            <div className="career-form-wrapper">
                                <motion.form 
                                    className="contact-form-items"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
                                    onSubmit={e => e.preventDefault()}
                                >
                                    <div className="row g-4">
                                        <motion.div className="col-lg-6" variants={formVariants}>
                                            <div className="form-clt">
                                                <input type="text" name="name" placeholder="Your Name*" required />
                                            </div>
                                        </motion.div>
                                        <motion.div className="col-lg-6" variants={formVariants}>
                                            <div className="form-clt">
                                                <input type="email" name="email" placeholder="Your Email*" required />
                                            </div>
                                        </motion.div>
                                        <motion.div className="col-lg-6" variants={formVariants}>
                                            <div className="form-clt">
                                                <input type="text" name="phone" placeholder="Phone Number*" required />
                                            </div>
                                        </motion.div>
                                        <motion.div className="col-lg-6" variants={formVariants}>
                                            <div className="form-clt">
                                                <input type="text" name="position" placeholder="Position Applying For*" required />
                                            </div>
                                        </motion.div>
                                        <motion.div className="col-lg-12" variants={formVariants}>
                                            <div className="form-clt">
                                                <label htmlFor='resume-upload' className="form-label">Upload Your Resume*</label>
                                                <input type="file" id='resume-upload' name="resume" className="form-control" required />
                                            </div>
                                        </motion.div>
                                        <motion.div className="col-lg-12" variants={formVariants}>
                                            <div className="form-clt">
                                                <textarea name="message" placeholder="Write a Message (Optional)"></textarea>
                                            </div>
                                        </motion.div>
                                        <motion.div className="col-lg-7" variants={formVariants}>
                                            <button type="submit" className="theme-btn">
                                                Submit Application <i className="fa-solid fa-arrow-right-long"></i>
                                            </button>
                                        </motion.div>
                                    </div>
                                </motion.form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Career;