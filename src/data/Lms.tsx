import React from 'react';
import { Link } from 'react-router-dom';
import { projectList } from './projectData';
import SeoHelmet from '../components/common/SeoHelmet';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Lms: React.FC = () => {
    const project = projectList.find(p => p.slug === 'learning-management-system');
    if (!project) return null;
    const { title, bannerImage, sections, galleryImages } = project.details;

    return (
        <>
            <SeoHelmet title={`Tanasvi Technologies Pvt Ltd${project.name} | Tanasvi Project`} description={project.cardDescription} ogImage={bannerImage} />
            <div className="detail-page-alternating-layout">
                <section className="project-banner-cyient" style={{ backgroundImage: `url(${bannerImage})` }}>
                    <div className="container"><div className="banner-content"><p className="breadcrumb-link"><Link to="/project">Projects</Link> / {project.name}</p><h1>{title}</h1></div></div>
                </section>
                <section className="content-section-cyient section-padding">
                    <div className="container">
                        {sections.map((section, index) => (
                            <div className="alternating-content-block" key={index}>
                                <div className={`row align-items-center ${section.layout === 'imageRight' ? 'flex-row-reverse' : ''}`}>
                                     <motion.div className="col-lg-6" initial={{ opacity: 0, x: section.layout === 'imageRight' ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                                                                            {/* THIS IS THE KEY CHANGE: The img is now inside a wrapper div */}
                                                                            <div className="content-image-wrapper">
                                                                                <img src={section.image} alt={section.title} className="content-image" />
                                                                            </div>
                                                                        </motion.div>
                                    <motion.div className="col-lg-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
                                        <div className="content-text"><h3>{section.title}</h3>{section.text.map((p, i) => <p key={i}>{p}</p>)}</div>
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                        <motion.div className="detail-page-gallery" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                            <Swiper modules={[Navigation, Pagination, Autoplay]} spaceBetween={20} slidesPerView={1} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} pagination={{ clickable: true }} navigation={true} className="detail-gallery-slider">
                                {galleryImages.map((imgSrc, index) => (<SwiperSlide key={index}>
                                    <div className="gallery-image-bg" style={{ backgroundImage: `url(${imgSrc})` }}></div>
                                    </SwiperSlide>))}
                            </Swiper>
                        </motion.div>
                        <motion.div className="text-center mt-5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}><Link to="/contact" className="btn-modern">Discuss a Similar Project</Link></motion.div>
                    </div>
                </section>
            </div>
        </>
    );
};
export default Lms;