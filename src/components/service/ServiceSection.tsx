import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AssetImage from './AssetImage';

interface ServiceSectionProps {
    heading?: string;
    content: string | string[];
    image: string;
    imagePosition: 'left' | 'right';
    listItems?: string[];
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
    heading,
    content,
    image,
    imagePosition,
    listItems
}) => {
    const isImageLeft = imagePosition === 'left';
    const contentArray = Array.isArray(content) ? content : [content];

    return (
        <section className="service-section-wrapper">
            <div className={`service-section ${isImageLeft ? 'image-left' : 'image-right'}`}>
                {/* Image */}
                <motion.div
                    className="service-section-image"
                    initial={{ opacity: 0, x: isImageLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <div className="service-section-image-wrapper">
                        <AssetImage
                            src={image}
                            alt={heading || 'Service illustration'}
                            className="service-section-img"
                        />
                    </div>
                </motion.div>

                {/* Content */}
                <motion.div
                    className="service-section-content"
                    initial={{ opacity: 0, x: isImageLeft ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                >
                    {heading && <h2 className="service-section-heading">{heading}</h2>}
                    {contentArray.map((paragraph, index) => (
                        <p key={index} className="service-section-text">
                            {paragraph}
                        </p>
                    ))}
                    {listItems && listItems.length > 0 && (
                        <ul className="service-section-list">
                            {listItems.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    )}
                    <div className="service-section-cta">
                        <Link to="/contact" className="btn-primary">
                            Contact Us
                        </Link>
                        <Link to="/quote" className="btn-outline">
                            Get Quote
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ServiceSection;

