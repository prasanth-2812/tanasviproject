import React from 'react';
import { motion } from 'framer-motion';

const processes = [
    { icon: "assets/img/process/01.svg", title: "Choose A Service", number: "1" },
    { icon: "assets/img/process/02.svg", title: "Define Requirements", number: "2", reverse: true },
    { icon: "assets/img/process/03.svg", title: "Request A Meeting", number: "3" },
    { icon: "assets/img/process/04.svg", title: "Final Solution", number: "4", reverse: true },
];

const WorkProcess: React.FC = () => {
    return (
        <section className="work-process-section fix section-padding pt-0">
            <div className="container">
                <div className="section-title title-area mx-auto mb-25">
                    <div className="subtitle d-flex justify-content-center">
                        <img src="assets/img/icon/arrowLeft.svg" alt="icon" />
                        <span>How Tanasvi Works</span>
                        <img src="assets/img/icon/arrowRight.svg" alt="icon" />
                    </div>
                    <h2 className="title text-center">Standard Work Process</h2>
                </div>
                <div className="process-work-wrapper">
                    <div className="line-shape"><img src="assets/img/process/linepng.png" alt="line" /></div>
                    <div className="row">
                        {processes.map((process, index) => (
                            <motion.div className="col-xl-3 col-lg-4 col-md-6" key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="work-process-items text-center">
                                    {process.reverse ? (
                                        <>
                                            <div className="content style-2"><h4>{process.title}</h4></div>
                                            <div className="icon">
                                                <img src={process.icon} alt="icon" />
                                                <h6 className="number">{process.number}</h6>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="icon">
                                                <img src={process.icon} alt="icon" />
                                                <h6 className="number">{process.number}</h6>
                                            </div>
                                            <div className="content"><h4>{process.title}</h4></div>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkProcess;