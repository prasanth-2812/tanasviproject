import React from 'react';
import { Link } from 'react-router-dom';
import { servicesList } from './serviceData';

const ErpApplications: React.FC = () => {
    const service = servicesList.find(s => s.slug === 'erp-applications');
    if (!service) return <div className="container section-padding">Service details not found!</div>;
    const { title, image, content } = service.details;

    return (
        <div className="project-detail-page">
            <section className="project-banner" style={{ backgroundImage: `url(${image})` }}>
                <div className="container"><h1>{title}</h1></div>
            </section>
            <section className="project-content-section section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="project-content-card">
                                <h3>Service Overview</h3>
                                <p>{content[0]}</p>
                                <p>{content[1]}</p>
                                <div className="text-center mt-4">
                                    <Link to="/contact.html" className="btn-modern">Get a Quote</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default ErpApplications;