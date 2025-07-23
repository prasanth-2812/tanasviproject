import React from 'react';
import { motion } from 'framer-motion';
import PageTitle from '../components/common/PageTitle';

const About: React.FC = () => {
  return (
    <>
      <PageTitle title="About Us" breadcrumb="About Us" />

      <section className="about-section section-padding fix">
        <div className="container">
          <div className="about-wrapper style-2">
            <div className="row">
              <div className="col-lg-6">
                <motion.div 
                  className="about-image-items"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                >
                  <div className="circle-shape"><img src="assets/img/about/circle.png" alt="shape" /></div>
                  <div className="counter-shape float-bob-y">
                    <div className="icon"><img src="assets/img/about/icon-1.svg" alt="icon" /></div>
                    <div className="content">
                      <h3><span className="count">25</span>Years</h3>
                      <p>Of Experience</p>
                    </div>
                  </div>
                  <div className="about-image-1 bg-cover wow fadeInLeft" style={{ backgroundImage: "url('assets/img/about/03.jpg')" }}></div>
                </motion.div>
              </div>
              <div className="col-lg-6 mt-4 mt-lg-0">
                <div className="about-content">
                  <div className="section-title">
                    <motion.div className="subtitle" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
                      <img src="assets/img/icon/arrowLeft.svg" alt="icon" />
                      <span>ABOUT TANASVI TECHNOLOGIES PVT LTD</span>
                      <img src="assets/img/icon/arrowRight.svg" alt="icon" />
                    </motion.div>
                    <motion.h2 className="title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}>
                      We Are Increasing Business Success With <span>Technology</span>
                    </motion.h2>
                  </div>
                  <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} viewport={{ once: true }}>
                    Tanasvi Technologies is the best in Product development and IT consultancy firm that provides a wide range of services in various domains of information technology. We have expertise in IT software, data communication, automation, artificial intelligence and natural language processing. We are committed to excellence in research and development, innovation and leadership in computer science and modern mathematics. We also aim to foster universal understanding and communication through our work.
                  </motion.p>
                  <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} viewport={{ once: true }}>
                    We believe that information technology is a powerful tool for transforming the world and creating a better future for humanity. We use our knowledge and skills to solve complex problems, create innovative solutions and deliver value to our clients.
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="offer-section fix section-bg-2">
            <div className="container">
                <div className="section-title title-area  mx-auto mb-15">
                    <div className="subtitle d-flex justify-content-center">
                        <img src="assets/img/icon/arrowLeftWhite.svg" alt="icon"/> 
                        <span className="text-white"> Our offering </span>
                        <img src="assets/img/icon/arrowRightWhite.svg" alt="icon"/>
                    </div>
                    <h2 className="title text-center text-white">Enhance and Pioneer Using<br/>
                        Technology Trends</h2>
                </div>
            </div>
      </section>
    </>
  );
};

export default About;