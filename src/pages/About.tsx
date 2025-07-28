import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Marquee from '../components/common/Marquee';
import SeoHelmet from '../components/common/SeoHelmet';

// Import the SVG Icon components
import WebsiteIcon from '../components/icons/WebsiteIcon';
import AndroidIcon from '../components/icons/AndroidIcon';
import IosIcon from '../components/icons/IosIcon';
import WatchIcon from '../components/icons/WatchIcon';
import TvIcon from '../components/icons/TvIcon';
import IotIcon from '../components/icons/IotIcon';

// Helper component for the animated counter
const AnimatedCounter = ({ target }: { target: number }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start: number | null = null;
            const duration = 2000;
            const step = (timestamp: number) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                setCount(Math.floor(progress * target));
                if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        }
    }, [isInView, target]);

    return <span ref={ref}>{count}</span>;
};

// Data for the "Our offering" icons, now using the imported components
const offerings = [
    { icon: WebsiteIcon, title: "Website", delay: 0.2 },
    { icon: AndroidIcon, title: "Android", delay: 0.3 },
    { icon: IosIcon, title: "IOS", delay: 0.4, active: true },
    { icon: WatchIcon, title: "Watch", delay: 0.5 },
    { icon: TvIcon, title: "Tv", delay: 0.6 },
    { icon: IotIcon, title: "IOT", delay: 0.7 }
];

const About: React.FC = () => (
  <>
  <SeoHelmet
  title="Tanasvi Technologies Pvt Ltd | Custom Software, AI, CRM & IoT Solutions"
  description="Tanasvi Technologies Pvt Ltd is a leading IT company delivering AI-powered software, mobile and web apps, CRM/HRM systems, and end-to-end digital transformation solutions for startups and enterprises."
  keywords="Tanasvi Technologies, custom software development, AI solutions, mobile app development, CRM software, IoT development, HRM systems, web development, IT consulting, business automation, digital transformation"
/>

  
    <section className="about-section section-padding fix bg-cover" style={{ backgroundImage: "url('/assets/img/service/service-bg-2.jpg')" }}>
        <div className="container">
            <div className="about-wrapper style-2">
                <div className="row">
                    <motion.div className="col-lg-6" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <div className="about-image-items">
                            <div className="circle-shape"><img alt="shape-img" src="/assets/img/about/circle.png" /></div>
                            <div className="counter-shape float-bob-y">
                                <div className="icon"><img alt="icon-img" src="/assets/img/about/icon-1.svg" /></div>
                                <div className="content">
                                    <h3><AnimatedCounter target={25} />Years</h3>
                                    <p>Of Experience</p>
                                </div>
                            </div>
                            <div className="about-image-1 bg-cover" style={{ backgroundImage: "url('/assets/img/about/03.jpg')" }}></div>
                        </div>
                    </motion.div>
                    <div className="col-lg-6 mt-4 mt-lg-0">
                        <div className="about-content">
                            <motion.div className="section-title mb-3" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                                <div className="subtitle"><img alt="icon" src="/assets/img/icon/arrowLeft.svg" /> <span>ABOUT TANASVI TECHNOLOGIES PVT LTD </span><img alt="icon" src="/assets/img/icon/arrowRight.svg" /></div>
                                <h2 className="title">We Are Increasing Business Success With <span>Technology</span></h2>
                            </motion.div>
                            <motion.p className="mt-3" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                                Tanasvi Technologies is the best in Product development and IT consultancy firm that provides a wide range of services in various domains of information technology. We have expertise in IT software, data communication, automation, artificial intelligence and natural language processing. We are committed to excellence in research and development, innovation and leadership in computer science and modern mathematics. We also aim to foster universal understanding and communication through our work.
                            </motion.p>
                            <motion.p className="mt-3" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                                We believe that information technology is a powerful tool for transforming the world and creating a better future for humanity. We use our knowledge and skills to solve complex problems, create innovative solutions and deliver value to our clients. We work with various sectors and industries, such as education, healthcare, finance, manufacturing, retail, entertainment and more. We offer customized solutions that meet the specific needs and goals of our clients.
                            </motion.p>
                        </div>
                    </div>
                </div>
                {/* ==================================================== */}
                {/* START: The Missing Text Content is now RESTORED     */}
                {/* ==================================================== */}
                <div className="row mt-4">
                    <div className="col-12">
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                            <p>We conduct and participate in various events and activities to acquire and share technical knowledge, computer literature, technical data and best practices from both domestic and international sources. We use this information to enhance our standards and quality of manpower recruitment. We train and develop skilled personnel for developing, marketing and implementing systems, applications, software and related products for both domestic and export markets. We also provide IT services,consultancy, systems design, program implementation and training to our clients.</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                            <p className="mt-3">Our current career-wise goal is to provide recruitment and placement of all kinds of personnel including managers, professionals, executives, skilled, semi-skilled, un-skilled workers, laborers and other technical personnel in India and abroad. We have a large network of contacts and partners in various countries and regions. We help our clients to find the best talent for their projects and operations. We also help our candidates to find the best opportunities for their careers and growth.</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                            <p className="mt-3">We are a best IT Technology company that values integrity, professionalism, teamwork, diversity and customer satisfaction. We strive to maintain a high level of ethical standards and social responsibility in our business. We respect the culture, laws and regulations of the countries and regions where we operate. We also care for the environment and the society and contribute to their well-being.</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                            <p className="mt-3">We invite you to join us in our journey of excellence and innovation. We look forward to working with you and serving you with our best. Thank you for choosing Tanasvi Technologies.</p>
                        </motion.div>
                    </div>
                </div>
                {/* ==================================================== */}
                {/* END: Restored Text Content Section                 */}
                {/* ==================================================== */}
            </div>
        </div>
    </section>

    <section className="offer-section fix section-bg-2">
        <div className="line-shape"><img alt="shape-img" src="/assets/img/team/line-shape.png" /></div>
        <div className="mask-shape"><img alt="shape-img" src="/assets/img/team/mask-shape.png" /></div>
        <div className="container">
            <div className="section-title title-area mx-auto mb-15">
                <div className="subtitle d-flex justify-content-center"><img alt="icon" src="/assets/img/icon/arrowLeftWhite.svg" /> <span className="text-white"> Our offering </span><img alt="icon" src="/assets/img/icon/arrowRightWhite.svg" /></div>
                <h2 className="title text-center text-white">Enhance And Pioneer Using<br />Technology Trends</h2>
            </div>
            <div className="row">
                {offerings.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <motion.div className="col-xl-2 col-lg-4 col-md-4 col-sm-6" key={item.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: item.delay }}>
                            <div className={`offer-items ${item.active ? 'active' : ''}`}>
                                <div className="shape-top"><img alt="shape-img" src="/assets/img/shape/offer-top.png" /></div>
                                <div className="shape-bottom"><img alt="shape-img" src="/assets/img/shape/offer-bottom.png" /></div>
                                <div className="icon">
                                    <IconComponent />
                                </div>
                                <div className="content"><h5>{item.title}</h5></div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    </section>
    <Marquee />
  </>
);

export default About;