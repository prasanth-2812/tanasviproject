import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
    return (
        <footer className="footer-section pt-100 footer-bg">
            <div className="container">
                <div className="contact-info-area">
                    <motion.div className="contact-info-items" initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{delay: 0.3}}>
                        <div className="icon">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M16 1.6665C11.036 1.6665 7 5.7385 7 10.7612C7 12.4625 7.74933 14.5732 8.84 16.6785C11.2413 21.3145 15.2413 25.9838 15.2413 25.9838C15.3352 26.0932 15.4516 26.1809 15.5826 26.2411C15.7135 26.3012 15.8559 26.3324 16 26.3324C16.1441 26.3324 16.2865 26.3012 16.4174 26.2411C16.5484 26.1809 16.6648 26.0932 16.7587 25.9838C16.7587 25.9838 20.7587 21.3145 23.16 16.6785C24.2507 14.5732 25 12.4625 25 10.7612C25 5.7385 20.964 1.6665 16 1.6665ZM16 6.99984C15.0447 7.0256 14.1371 7.42322 13.4705 8.10804C12.8039 8.79286 12.4309 9.71081 12.4309 10.6665C12.4309 11.6222 12.8039 12.5401 13.4705 13.225C14.1371 13.9098 15.0447 14.3074 16 14.3332C16.9553 14.3074 17.8629 13.9098 18.5295 13.225C19.1961 12.5401 19.5691 11.6222 19.5691 10.6665C19.5691 9.71081 19.1961 8.79286 18.5295 8.10804C17.8629 7.42322 16.9553 7.0256 16 6.99984Z" fill="#3C72FC"></path><path fillRule="evenodd" clipRule="evenodd" d="M22.3788 23.1693C23.4628 23.4946 24.3562 23.8973 24.9735 24.3693C25.3735 24.6733 25.6668 24.9706 25.6668 25.3333C25.6668 25.5466 25.5455 25.74 25.3748 25.9333C25.0922 26.252 24.6722 26.5386 24.1522 26.8053C22.3148 27.7453 19.3442 28.3333 16.0002 28.3333C12.6562 28.3333 9.6855 27.7453 7.84816 26.8053C7.32816 26.5386 6.90816 26.252 6.6255 25.9333C6.45483 25.74 6.3335 25.5466 6.3335 25.3333C6.3335 24.9706 6.62683 24.6733 7.02683 24.3693C7.64416 23.8973 8.5375 23.4946 9.6215 23.1693C9.87557 23.0929 10.0889 22.9187 10.2146 22.6851C10.3402 22.4514 10.3679 22.1774 10.2915 21.9233C10.2151 21.6692 10.0409 21.4559 9.80726 21.3302C9.57359 21.2046 9.29957 21.1769 9.0455 21.2533C7.39483 21.7506 6.11216 22.432 5.3415 23.1853C4.66416 23.8453 4.3335 24.584 4.3335 25.3333C4.3335 26.2693 4.86283 27.2026 5.93883 27.9813C7.82683 29.3466 11.6188 30.3333 16.0002 30.3333C20.3815 30.3333 24.1735 29.3466 26.0615 27.9813C27.1375 27.2026 27.6668 26.2693 27.6668 25.3333C27.6668 24.584 27.3362 23.8453 26.6588 23.1853C25.8882 22.432 24.6055 21.7506 22.9548 21.2533C22.829 21.2155 22.697 21.2028 22.5663 21.216C22.4356 21.2292 22.3088 21.268 22.1931 21.3302C22.0774 21.3925 21.9751 21.4769 21.892 21.5786C21.8089 21.6804 21.7467 21.7975 21.7088 21.9233C21.671 22.0491 21.6583 22.1811 21.6715 22.3118C21.6847 22.4425 21.7236 22.5694 21.7858 22.6851C21.848 22.8008 21.9324 22.9031 22.0341 22.9862C22.1359 23.0692 22.253 23.1315 22.3788 23.1693Z" fill="#3C72FC"></path>
                            </svg>
                        </div>
                        <div className="content">
                            <p>Address</p>
                            <h3>Sunrise Startup Towers,Madhurawada, IT SEZ,Hill No:3,Visakhapatnam-48, Andhra Pradesh,India</h3>
                        </div>
                    </motion.div>
                     {/* Send Email Item - THIS WAS MISSING */}
                    <motion.div className="contact-info-items" initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{delay: 0.4}}>
                        <div className="icon">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.6498 10.8272C12.8023 10.914 12.976 10.9569 13.1514 10.9509C13.3312 10.9344 13.5053 10.8798 13.6623 10.7906L24.9217 4.22062C24.677 3.79416 24.3245 3.43955 23.8994 3.19239C23.4744 2.94523 22.9918 2.81422 22.5001 2.8125H3.75014C3.2583 2.81406 2.77554 2.94499 2.35032 3.19216C1.9251 3.43932 1.5724 3.79402 1.32764 4.22062L12.6498 10.8272Z" fill="#3C72FC"></path><path d="M25.3125 6.15918V12.6748C24.4104 12.3501 23.4587 12.1852 22.5 12.1873C20.2633 12.1908 18.1192 13.0808 16.5376 14.6624C14.956 16.244 14.066 18.3881 14.0625 20.6248C14.0623 20.9382 14.0811 21.2512 14.1188 21.5623H3.75C3.00476 21.5601 2.29069 21.263 1.76372 20.7361C1.23676 20.2091 0.939726 19.495 0.9375 18.7498V6.15918L11.7094 12.4498C12.1434 12.6872 12.6303 12.8116 13.125 12.8116C13.6197 12.8116 14.1066 12.6872 14.5406 12.4498L25.3125 6.15918Z" fill="#3C72FC"></path><path d="M22.5 14.0625C20.7595 14.0625 19.0903 14.7539 17.8596 15.9846C16.6289 17.2153 15.9375 18.8845 15.9375 20.625C15.9375 22.3655 16.6289 24.0347 17.8596 25.2654C19.0903 26.4961 20.7595 27.1875 22.5 27.1875C22.7486 27.1875 22.9871 27.0887 23.1629 26.9129C23.3387 26.7371 23.4375 26.4986 23.4375 26.25C23.4375 26.0014 23.3387 25.7629 23.1629 25.5871C22.9871 25.4113 22.7486 25.3125 22.5 25.3125C21.5729 25.3125 20.6666 25.0376 19.8958 24.5225C19.1249 24.0074 18.5241 23.2754 18.1693 22.4188C17.8145 21.5623 17.7217 20.6198 17.9026 19.7105C18.0834 18.8012 18.5299 17.966 19.1854 17.3104C19.841 16.6549 20.6762 16.2084 21.5855 16.0276C22.4948 15.8467 23.4373 15.9395 24.2938 16.2943C25.1504 16.6491 25.8824 17.2499 26.3975 18.0208C26.9126 18.7916 27.1875 19.6979 27.1875 20.625V21.5625C27.1875 21.8111 27.0887 22.0496 26.9129 22.2254C26.7371 22.4012 26.4986 22.5 26.25 22.5C26.0014 22.5 25.7629 22.4012 25.5871 22.2254C25.4113 22.0496 25.3125 21.8111 25.3125 21.5625V20.625C25.3125 20.0687 25.1476 19.525 24.8385 19.0625C24.5295 18.5999 24.0902 18.2395 23.5763 18.0266C23.0624 17.8137 22.4969 17.758 21.9513 17.8665C21.4057 17.9751 20.9046 18.2429 20.5113 18.6363C20.1179 19.0296 19.8501 19.5307 19.7415 20.0763C19.633 20.6219 19.6887 21.1874 19.9016 21.7013C20.1145 22.2152 20.4749 22.6545 20.9375 22.9635C21.4 23.2726 21.9437 23.4375 22.5 23.4375C22.9843 23.4344 23.4594 23.3048 23.8781 23.0616C24.2022 23.578 24.6856 23.9748 25.2552 24.1921C25.8248 24.4094 26.4496 24.4353 27.0353 24.266C27.621 24.0967 28.1356 23.7412 28.5013 23.2535C28.867 22.7657 29.064 22.1721 29.0625 21.5625V20.625C29.0605 18.8851 28.3685 17.2171 27.1382 15.9868C25.9079 14.7565 24.2399 14.0645 22.5 14.0625ZM22.5 21.5625C22.3146 21.5625 22.1333 21.5075 21.9792 21.4045C21.825 21.3015 21.7048 21.1551 21.6339 20.9838C21.5629 20.8125 21.5443 20.624 21.5805 20.4421C21.6167 20.2602 21.706 20.0932 21.8371 19.9621C21.9682 19.831 22.1352 19.7417 22.3171 19.7055C22.499 19.6693 22.6875 19.6879 22.8588 19.7589C23.0301 19.8298 23.1765 19.95 23.2795 20.1042C23.3825 20.2583 23.4375 20.4396 23.4375 20.625C23.4375 20.8736 23.3387 21.1121 23.1629 21.2879C22.9871 21.4637 22.7486 21.5625 22.5 21.5625Z" fill="#3C72FC"></path></svg>
                        </div>
                        <div className="content">
                            <p>Send Email</p>
                            <h3><a href="mailto:info@tanasvi.com">info@tanasvi.com</a></h3>
                        </div>
                    </motion.div>
                </div>
            </div>
            <div className="widget-area style1 footer-bg pb-80">
                <div className="container">
                    <div className="footer-layout style1">
                        <div className="row">
                            <div className="col-xl-3 col-md-6 col-12">
                                <div className="widget footer-widget">
                                    <div className="gt-widget-about">
                                        <div className="about-logo"><h3 className="widget_title">Tanasvi Technologies Pvt Ltd</h3></div>
                                        <p className="about-text">Empower your business with cutting-edge solutions tailored to your needs. Experience excellence at Tanasvi Technologies.</p>
                                        <div className="gt-social style2">
                                            <a href="https://www.facebook.com/p/Tanasvi-Technologies-100077635476112/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                                            <a href="https://in.linkedin.com/company/tanasvi-technologies" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
                                            <a href="https://www.instagram.com/tanasvitechnologies" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-2 col-md-6 col-12">
                                <div className="widget widget_nav_menu footer-widget">
                                    <h3 className="widget_title">Quick Links</h3>
                                    <div className="menu-all-pages-container">
                                        <ul className="menu">
                                            <li><Link to="/about"><i className="fa-solid fa-chevrons-right"></i>About</Link></li>
                                            <li><Link to="/service"><i className="fa-solid fa-chevrons-right"></i>Our Services</Link></li>
                                            <li><Link to="/project"><i className="fa-solid fa-chevrons-right"></i>Our Projects</Link></li>
                                            <li><Link to="/team"><i className="fa-solid fa-chevrons-right"></i>Career</Link></li>
                                            <li><Link to="/contact"><i className="fa-solid fa-chevrons-right"></i>Contact Us</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-2 col-md-6 col-12">
                                <div className="widget widget_nav_menu footer-widget">
                                    <h3 className="widget_title">Our Services</h3>
                                    <div className="menu-all-pages-container">
                                        <ul className="menu">
                                            <li><Link to="/service"><i className="fa-solid fa-chevrons-right"></i>IT Consultancy</Link></li>
                                            <li><Link to="/service"><i className="fa-solid fa-chevrons-right"></i>App Development</Link></li>
                                            <li><Link to="/service"><i className="fa-solid fa-chevrons-right"></i>Database Security</Link></li>
                                            <li><Link to="/service"><i className="fa-solid fa-chevrons-right"></i>AI and ML</Link></li>
                                            <li><Link to="/service"><i className="fa-solid fa-chevrons-right"></i>Cloud Services</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6 col-12">
                                <div className="widget widget_nav_menu footer-widget">
                                    <h3 className="widget_title">Contact Us</h3>
                                    <div className="checklist style2">
                                        <ul className="ps-0">
                                            <li className="text-white"><i className="fa-solid fa-envelope"></i></li>
                                            <li className="text-white">info@tanasvi.com</li>
                                        </ul>
                                        <ul className="ps-0">
                                            <li className="text-white"><i className="fa-solid fa-phone"></i></li>
                                            <li className="text-white">+91-9392562193</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-wrap bg-theme">
                <div className="container">
                    <div className="copyright-layout">
                        <div className="layout-text">
                            <p className="copyright">
                                <i className="fal fa-copyright"></i> All Copyright 2024 by <Link to="/">Tanasvi Technologies Pvt Ltd</Link>
                            </p>
                        </div>
                        <div className="layout-link">
                            <div className="link-wrapper">
                                <Link to="/contact">Terms & Condition</Link>
                                <Link to="/contact">Privacy Policy</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;