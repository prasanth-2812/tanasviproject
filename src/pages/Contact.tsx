import React from 'react';
import { motion } from 'framer-motion';

const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const Contact: React.FC = () => {
    return (
        <>
            <section className="contact-section fix section-padding">
                <div className="container">
                    <div className="contact-wrapper-2">
                        <div className="row g-4 align-items-center">
                            <motion.div 
                                className="col-lg-6"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <div className="contact-info-area-2">
                                    {/* Contact Info Items */}
                                    <div className="contact-info-items mb-4">
                                        <div className="icon">
                                          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.7891 1.81641H16.7578C13.3658 1.81641 10.6055 4.5767 10.6055 7.96875C10.6055 11.063 12.9015 13.631 15.8789 14.0585V16.7578C15.8788 16.9317 15.9303 17.1016 16.0268 17.2462C16.1234 17.3907 16.2607 17.5033 16.4214 17.5697C16.7456 17.705 17.1258 17.6325 17.3793 17.3792L20.6374 14.1211H23.7891C27.1811 14.1211 30 11.3608 30 7.96875C30 4.5767 27.1811 1.81641 23.7891 1.81641ZM16.7578 8.84754C16.2723 8.84754 15.8789 8.45402 15.8789 7.96863C15.8789 7.48324 16.2723 7.08973 16.7578 7.08973C17.2432 7.08973 17.6367 7.48324 17.6367 7.96863C17.6367 8.45402 17.2432 8.84754 16.7578 8.84754ZM20.2734 8.84754C19.7879 8.84754 19.3945 8.45402 19.3945 7.96863C19.3945 7.48324 19.7879 7.08973 20.2734 7.08973C20.7588 7.08973 21.1523 7.48324 21.1523 7.96863C21.1523 8.45402 20.7588 8.84754 20.2734 8.84754ZM23.7891 8.84754C23.3036 8.84754 22.9102 8.45402 22.9102 7.96863C22.9102 7.48324 23.3036 7.08973 23.7891 7.08973C24.2745 7.08973 24.668 7.48324 24.668 7.96863C24.668 8.45402 24.2745 8.84754 23.7891 8.84754Z" fill="white"></path><path d="M19.7461 28.1836C21.2 28.1836 22.3828 27.0008 22.3828 25.5469V22.0312C22.3828 21.6527 22.1408 21.3171 21.782 21.1978L16.5209 19.44C16.2634 19.3533 15.9819 19.3928 15.7553 19.5421L13.5186 21.033C11.1496 19.9035 8.33871 17.0925 7.20914 14.7236L8.7 12.4868C8.77415 12.3754 8.82189 12.2485 8.83958 12.1158C8.85728 11.9831 8.84447 11.8482 8.80213 11.7212L7.04432 6.46014C6.98611 6.28516 6.87428 6.13295 6.72469 6.02512C6.5751 5.91728 6.39534 5.85929 6.21094 5.85938H2.63672C1.18277 5.85938 0 7.02979 0 8.48373C0 18.61 9.6198 28.1836 19.7461 28.1836Z" fill="white"></path></svg>
                                        </div>
                                        <div className="content">
                                            <p>Call Us 7/24</p>
                                            <h3><a href="tel:+91-9392562193">+91-9392562193</a></h3>
                                        </div>
                                    </div>
                                    <div className="contact-info-items border-none">
                                        <div className="icon">
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16 1.66675C11.036 1.66675 7 5.73875 7 10.7614C7 12.4627 7.74933 14.5734 8.84 16.6787C11.2413 21.3147 15.2413 25.9841 15.2413 25.9841C15.3352 26.0934 15.4516 26.1812 15.5826 26.2413C15.7135 26.3015 15.8559 26.3326 16 26.3326C16.1441 26.3326 16.2865 26.3015 16.4174 26.2413C16.5484 26.1812 16.6648 26.0934 16.7587 25.9841C16.7587 25.9841 20.7587 21.3147 23.16 16.6787C24.2507 14.5734 25 12.4627 25 10.7614C25 5.73875 20.964 1.66675 16 1.66675ZM16 7.00008C15.0447 7.02585 14.1371 7.42346 13.4705 8.10828C12.8039 8.79311 12.4309 9.71106 12.4309 10.6667C12.4309 11.6224 12.8039 12.5404 13.4705 13.2252C14.1371 13.91 15.0447 14.3076 16 14.3334C16.9553 14.3076 17.8629 13.91 18.5295 13.2252C19.1961 12.5404 19.5691 11.6224 19.5691 10.6667C19.5691 9.71106 19.1961 8.79311 18.5295 8.10828C17.8629 7.42346 16.9553 7.02585 16 7.00008Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M22.3774 23.1694C23.4614 23.4948 24.3547 23.8974 24.972 24.3694C25.372 24.6734 25.6654 24.9707 25.6654 25.3334C25.6654 25.5467 25.544 25.7401 25.3734 25.9334C25.0907 26.2521 24.6707 26.5387 24.1507 26.8054C22.3134 27.7454 19.3427 28.3334 15.9987 28.3334C12.6547 28.3334 9.68403 27.7454 7.8467 26.8054C7.3267 26.5387 6.9067 26.2521 6.62403 25.9334C6.45336 25.7401 6.33203 25.5467 6.33203 25.3334C6.33203 24.9707 6.62536 24.6734 7.02536 24.3694C7.6427 23.8974 8.53603 23.4948 9.62003 23.1694C9.87411 23.093 10.0874 22.9188 10.2131 22.6852C10.3387 22.4515 10.3664 22.1775 10.29 21.9234C10.2136 21.6693 10.0395 21.456 9.80579 21.3304C9.57212 21.2047 9.29811 21.177 9.04403 21.2534C7.39336 21.7507 6.1107 22.4321 5.34003 23.1854C4.6627 23.8454 4.33203 24.5841 4.33203 25.3334C4.33203 26.2694 4.86136 27.2027 5.93736 27.9814C7.82536 29.3467 11.6174 30.3334 15.9987 30.3334C20.38 30.3334 24.172 29.3467 26.06 27.9814C27.136 27.2027 27.6654 26.2694 27.6654 25.3334C27.6654 24.5841 27.3347 23.8454 26.6574 23.1854C25.8867 22.4321 24.604 21.7507 22.9534 21.2534C22.8276 21.2156 22.6955 21.2029 22.5648 21.2161C22.4341 21.2293 22.3073 21.2681 22.1916 21.3304C22.0759 21.3926 21.9736 21.477 21.8905 21.5787C21.8074 21.6805 21.7452 21.7976 21.7074 21.9234C21.6695 22.0492 21.6569 22.1812 21.6701 22.3119C21.6833 22.4427 21.7221 22.5695 21.7843 22.6852C21.8465 22.8009 21.9309 22.9032 22.0327 22.9863C22.1344 23.0694 22.2516 23.1316 22.3774 23.1694Z" fill="white"></path></svg>
                                        </div>
                                        <div className="content">
                                            <p>Location</p>
                                            <h3>Sunrise Startup Towers, Madhurawada, IT SEZ, Hill No:3, Visakhapatnam-48, Andhra Pradesh, India</h3>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            <div className="col-lg-6">
                                <motion.div 
                                    className="contact-content"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
                                >
                                    <h2>Ready to Get Started?</h2>
                                    <form action="#" id="contact-form" method="POST" className="contact-form-items">
                                        <div className="row g-4">
                                            <motion.div className="col-lg-6" variants={formVariants}>
                                                <div className="form-clt"><span>Your name*</span><input type="text" name="name" id="name" placeholder="Your Name" /></div>
                                            </motion.div>
                                            <motion.div className="col-lg-6" variants={formVariants}>
                                                <div className="form-clt"><span>Your Email*</span><input type="text" name="email" id="email" placeholder="Your Email" /></div>
                                            </motion.div>
                                            <motion.div className="col-lg-12" variants={formVariants}>
                                                <div className="form-clt"><span>Write Message*</span><textarea name="message" id="message" placeholder="Write Message"></textarea></div>
                                            </motion.div>
                                            <motion.div className="col-lg-7" variants={formVariants}>
                                                <button type="submit" className="theme-btn">Send Message <i className="fa-solid fa-arrow-right-long"></i></button>
                                            </motion.div>
                                        </div>
                                    </form>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;