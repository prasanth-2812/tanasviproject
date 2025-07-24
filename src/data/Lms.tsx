import React from 'react';
import { Link } from 'react-router-dom';
import { projectList } from './projectData';
const Lms: React.FC = () => {
const project = projectList.find(p => p.slug === 'learning-management-system');
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
                            <h3>Platform Features</h3>
                            <ul>
                                <li><b>Interactive Course Builder:</b> Easily create and manage courses with videos, quizzes, assignments, and documents.</li>
                                <li><b>Automated Grading & Proctoring:</b> Save time with auto-graded quizzes and ensure integrity with AI-powered exam proctoring.</li>
                                <li><b>Analytics & Reporting:</b> Track student progress, engagement levels, and course effectiveness with detailed analytics.</li>
                                <li><b>Certification & Gamification:</b> Automatically issue certificates upon completion and use gamification to motivate learners.</li>
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
export default Lms;