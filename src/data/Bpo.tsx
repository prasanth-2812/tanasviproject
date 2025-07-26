import React from 'react';
import { Link } from 'react-router-dom';
import { servicesList } from './serviceData';
import SeoHelmet from '../components/common/SeoHelmet';

const Bpo: React.FC = () => {
    const service = servicesList.find(s => s.slug === 'bpo');
    if (!service) return null;
    const { title, image, content } = service.details;

    return (
        <>
            <SeoHelmet title={`Tanasvi Technologies Pvt Ltd${service.title} | Tanasvi Service`} description={service.description} ogImage={image} />
            <div className="service-detail-page">
                <section className="service-detail-banner" style={{ backgroundImage: `url(${image})` }}>
                    <div className="container"><h1>{title}</h1></div>
                </section>
                <section className="service-detail-content section-padding">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <h3>Service Overview</h3>
                                <p>{content[0]}</p>
                                <p>{content[1]}</p>
                                <div className="text-center mt-5">
                                    <Link to="/contact" className="theme-btn">Get a Quote</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};
export default Bpo;