import React from 'react';
import { motion } from 'framer-motion';
import AssetImage from './AssetImage';

interface ServiceHeroProps {
    title: string;
    subtitle: string;
    backgroundImage?: string;
    backgroundSvg?: string;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({
    title,
    subtitle,
    backgroundImage,
    backgroundSvg
}) => {
    return (
        <section className="service-hero-wrapper">
            <div className="service-hero">
                {/* Background Image/SVG */}
                <div className="service-hero-background">
                    {backgroundSvg ? (
                        <AssetImage
                            src={backgroundSvg}
                            alt={`${title} hero background`}
                            className="service-hero-bg-svg"
                            priority
                        />
                    ) : backgroundImage ? (
                        <AssetImage
                            src={backgroundImage}
                            alt={`${title} hero background`}
                            className="service-hero-bg-img"
                            priority
                        />
                    ) : (
                        <div className="service-hero-bg-fallback" />
                    )}
                    {/* Gradient Overlay */}
                    <div className="service-hero-overlay" />
                </div>

                {/* Content */}
                <div className="service-hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="service-hero-inner"
                    >
                        <h1 className="service-hero-title">{title}</h1>
                        <p className="service-hero-subtitle">{subtitle}</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ServiceHero;

