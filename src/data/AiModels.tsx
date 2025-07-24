import React from 'react';
import { Link } from 'react-router-dom';
import { projectList } from './projectData';

const AiModels: React.FC = () => {
    const project = projectList.find(p => p.slug === 'ai-based-models');
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
                                <h3>Areas of Expertise</h3>
                                <ul>
                                    <li><b>Natural Language Processing (NLP):</b> Develop models for sentiment analysis, chatbots, and automated text summarization.</li>
                                    <li><b>Computer Vision:</b> Implement systems for object detection, facial recognition, and automated quality control in manufacturing.</li>
                                    <li><b>Predictive Analytics:</b> Build models to forecast sales, predict customer churn, and optimize pricing strategies.</li>
                                    <li><b>Recommendation Engines:</b> Create personalized recommendation systems to enhance user experience and drive engagement.</li>
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
export default AiModels;