import React from 'react';
import { Link } from 'react-router-dom';
import { projectList } from './projectData'; // Adjust path if needed

const Hrm: React.FC = () => {
    // Find the specific project from your data source
    const project = projectList.find(p => p.slug === 'human-resource-management');

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
                                
                                <h3>Core Features</h3>
                                <ul>
                                    <li><b>Employee Self-Service:</b> Empower employees to manage their personal information, leave requests, and payslips.</li>
                                    <li><b>Automated Payroll:</b> Reduce errors and save time with a fully automated payroll system that handles calculations and compliance.</li>
                                    <li><b>Recruitment & Onboarding:</b> Manage job postings, track applicants, and streamline the onboarding process for new hires.</li>
                                    <li><b>Performance Analytics:</b> Utilize powerful dashboards to monitor employee performance, track KPIs, and make data-driven decisions.</li>
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

export default Hrm;