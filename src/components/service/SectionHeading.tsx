import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
    text: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ text }) => {
    return (
        <section className="section-heading-wrapper">
            <motion.div
                className="section-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="section-heading-pill">
                    {text}
                </div>
                <svg
                    className="section-heading-wave"
                    viewBox="0 0 1440 140"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4F46E5" />
                            <stop offset="60%" stopColor="#2563EB" />
                            <stop offset="100%" stopColor="#06B6D4" />
                        </linearGradient>
                    </defs>
                    <path
                        fill="url(#waveGradient)"
                        fillOpacity="0.12"
                        d="M0,80 C240,20 480,20 720,80 C960,140 1200,140 1440,80 L1440,140 L0,140 Z"
                    />
                </svg>
            </motion.div>
        </section>
    );
};

export default SectionHeading;

