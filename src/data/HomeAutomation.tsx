import React from 'react';
import { Link } from 'react-router-dom';
import { projectList } from './projectData';

const HomeAutomation: React.FC = () => {
    const project = projectList.find(p => p.slug === 'home-automation');
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
                                <h3>Smart Features</h3>
                                <ul>
                                    <li><b>Unified Control Dashboard:</b> Manage all your smart devices—lights, thermostats, locks, cameras—from one intuitive app.</li>
                                    <li><b>Energy Efficiency Suite:</b> Monitor energy consumption in real-time and create automated schedules to reduce waste.</li>
                                    <li><b>Advanced Security & Monitoring:</b> Receive instant alerts for unusual activity and access live camera feeds from anywhere.</li>
                                    <li><b>Voice Assistant Integration:</b> Control your home with simple voice commands using Amazon Alexa or Google Assistant.</li>
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
export default HomeAutomation;