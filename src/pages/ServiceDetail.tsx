import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getServiceBySlug } from '../data';
import SeoHelmet from '../components/common/SeoHelmet';
import ServiceHero from '../components/service/ServiceHero';
import ServiceSection from '../components/service/ServiceSection';
import SectionHeading from '../components/service/SectionHeading';

const ServiceDetail: React.FC = () => {
    const { serviceSlug } = useParams<{ serviceSlug: string }>();
    const service = getServiceBySlug(serviceSlug || '');

    if (!service) {
        return (
            <main className="service-detail-container">
                <div className="service-not-found">
                    <h1>Service Not Found</h1>
                    <p>The service you're looking for doesn't exist.</p>
                    <div className="service-cta">
                        <Link className="btn-primary" to="/service">
                            Back to Services
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <>
            <SeoHelmet
                title={`${service.title} | Tanasvi Technologies`}
                description={service.description}
                keywords={`${service.title}, Tanasvi Technologies, ${service.slug.replace('-', ' ')}`}
            />

            {/* Hero Banner */}
            <ServiceHero
                title={service.hero.title}
                subtitle={service.hero.subtitle}
                backgroundImage={service.hero.backgroundImage}
                backgroundSvg={service.hero.backgroundSvg}
            />

            {/* First Section: Image Left, Content Right */}
            {service.sections[0] && (
                <ServiceSection
                    heading={service.sections[0].heading}
                    content={service.sections[0].content}
                    image={service.sections[0].image}
                    imagePosition={service.sections[0].imagePosition}
                    listItems={service.sections[0].listItems}
                />
            )}

            {/* Section Heading Divider */}
            {service.sections.length > 1 && (
                <SectionHeading
                    text={service.sections[1]?.heading || 'Why Choose Us'}
                />
            )}

            {/* Second Section: Content Left, Image Right */}
            {service.sections[1] && (
                <ServiceSection
                    heading={service.sections[1].heading}
                    content={service.sections[1].content}
                    image={service.sections[1].image}
                    imagePosition={service.sections[1].imagePosition}
                    listItems={service.sections[1].listItems}
                />
            )}

            {/* Mission Section (if available) */}
            {service.mission && (
                <section className="service-mission-wrapper">
                    <div className="service-mission">
                        <h2 className="service-mission-heading">Our Mission</h2>
                        <p className="service-mission-text">{service.mission}</p>
                </div>
            </section>
            )}

            {/* CTA Footer */}
            <section className="service-footer-cta">
                <div className="service-footer-cta-content">
                    <Link to="/contact" className="btn-primary">
                        Contact Us
                    </Link>
                    <Link to="/quote" className="btn-outline">
                        Get Quote
                    </Link>
                    <Link to="/service" className="btn-outline">
                        Back to Services
                    </Link>
                </div>
            </section>
        </>
    );
};

export default ServiceDetail;
