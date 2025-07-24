import React from 'react';
import { Link } from 'react-router-dom';
import { projectList } from './projectData';

const Shipping: React.FC = () => {
    const project = projectList.find(p => p.slug === 'shipping-company-models');

    if (!project) {
        return <div className="container section-padding">Project details not found!</div>;
    }

    const { title, image, content } = project.details;

    return (
        <div className="project-detail-page">
            <section className="project-banner" style={{ backgroundImage: `url(${image})` }}>
                <div className="container">
                    <h1>{title}</h1>
                </div>
            </section>

            <section className="project-content-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="project-content-card">
                                <h3>Project Overview</h3>
                                <p>{content[0]}</p>
                                <p>{content[1]}</p>

                                <h3>Operational Features</h3>
                                <ul>
                                    <li><b>Real-Time GPS Tracking:</b> Monitor your entire fleet on a live map with up-to-the-minute location data.</li>
                                    <li><b>AI-Powered Route Optimization:</b> Automatically calculate the most efficient routes to reduce fuel costs and delivery times.</li>
                                    <li><b>Cargo & Freight Management:</b> Track shipments from origin to destination, manage documentation, and automate billing.</li>
                                    <li><b>Predictive Maintenance:</b> Receive alerts for vehicle maintenance needs based on usage data to prevent breakdowns.</li>
                                 </ul>
                                <div className="text-center mt-4">
                                     <Link to="/" className="btn-modern">Back to Home</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Shipping;