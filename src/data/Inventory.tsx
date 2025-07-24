import React from 'react';
import { Link } from 'react-router-dom';
import { projectList } from './projectData';

const Inventory: React.FC = () => {
    const project = projectList.find(p => p.slug === 'inventory-models');
    if (!project) return <div className="container section-padding">Project details not found!</div>;
    const { title, image, content } = project.details;

    return (
        <div className="project-detail-page">
            <section className="project-banner" style={{ backgroundImage: `url(${image})` }}>
                <div className="container"><h1>{title}</h1></div>
            </section>
            <section className="project-content-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="project-content-card">
                                <h3>Project Overview</h3>
                                <p>{content[0]}</p>
                                <p>{content[1]}</p>
                                <h3>System Highlights</h3>
                                <ul>
                                    <li><b>Multi-Warehouse Sync:</b> Manage and monitor stock levels across all your locations in real-time.</li>
                                    <li><b>Demand Forecasting:</b> Use historical data and predictive analytics to anticipate future demand and prevent stockouts.</li>
                                    <li><b>Automated Reordering:</b> Set automatic reorder points to maintain optimal inventory levels without manual effort.</li>
                                    <li><b>Supplier & Integration Hub:</b> Manage supplier information and seamlessly integrate with sales and accounting platforms.</li>
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
export default Inventory;