import React from 'react';
import { Link } from 'react-router-dom';
import { projectList } from './projectData';

const Crm: React.FC = () => {
    const project = projectList.find(p => p.slug === 'customer-relationship-management');

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

                                <h3>Key Capabilities</h3>
                                <ul>
                                    <li><b>360-Degree Customer View:</b> Consolidate all customer interactions, history, and data into a single, unified profile.</li>
                                    <li><b>Sales Pipeline Automation:</b> Automate tasks, track deals through stages, and forecast revenue with precision.</li>
                                    <li><b>Marketing Integration:</b> Manage campaigns, capture leads from multiple channels, and measure marketing ROI.</li>
                                    <li><b>Customer Service & Support:</b> Streamline support tickets, manage cases, and provide faster, more personalized service.</li>
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

export default Crm;