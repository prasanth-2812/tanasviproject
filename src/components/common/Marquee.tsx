// src/components/common/Marquee.tsx

import React from 'react';
import { motion } from 'framer-motion';

const Marquee: React.FC = () => {
    // The content is repeated to create a seamless loop
    const marqueeContent = (
        <>
            <span className="text-slider"><img alt="img" src="/assets/img/asterisk.svg" /></span>
            <span className="text-slider text-style">Cyber Security</span>
            <span className="text-slider"><img alt="img" src="/assets/img/asterisk.svg" /></span>
            <span className="text-slider text-style">IT Solution</span>
            <span className="text-slider"><img alt="img" src="/assets/img/asterisk.svg" /></span>
            <span className="text-slider text-style">Technology</span>
            <span className="text-slider"><img alt="img" src="/assets/img/asterisk.svg" /></span>
            <span className="text-slider text-style">Data Security</span>
        </>
    );

    return (
        <motion.div 
            className="marque-section-3 section-padding"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="container-fluid">
                <div className="marquee-wrapper style-2 text-slider">
                    <div className="marquee-inner to-left">
                        <ul className="marqee-list d-flex">
                            <li className="marquee-item style-2">
                                {marqueeContent}{marqueeContent}{marqueeContent}{marqueeContent}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Marquee;