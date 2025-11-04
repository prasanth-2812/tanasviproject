import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectList, Project } from '../data/projectData';
import SeoHelmet from '../components/common/SeoHelmet';

const Projects: React.FC = () => {
  return (
    <>
      <SeoHelmet
  title="Tanasvi Technologies Pvt Ltd | Custom Software, AI, CRM & IoT Solutions"
  description="Tanasvi Technologies Pvt Ltd is a leading IT company delivering AI-powered software, mobile and web apps, CRM/HRM systems, and end-to-end digital transformation solutions for startups and enterprises."
  keywords="Tanasvi Technologies, custom software development, AI solutions, mobile app development, CRM software, IoT development, HRM systems, web development, IT consulting, business automation, digital transformation"
/>

      
      {/* THIS IS THE KEY: We are using a unique class for this page */}
      <section className="projects-page section-padding">
        <div className="container">
          <div className="section-title title-area mx-auto mb-8">
            <div className="subtitle d-flex justify-content-center">
              <img src="/assets/img/icon/arrowLeft.svg" alt="arrow-left" />
              <span> OUR PROJECTS </span>
              <img src="/assets/img/icon/arrowRight.svg" alt="arrow-right" />
            </div>
            <h2 className="title text-center">We Delivered Innovative and Customized Solutions</h2>
          </div>

          <div className="service-wrapper mb-0">
            <div className="row">
              {projectList.map((project: Project) => (
                <motion.div
                  className="col-lg-4 col-md-6 col-12 mb-4"
                  key={project.slug}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: project.delay }}
                  viewport={{ once: true }}
                >
                  <Link to={`/project/${project.slug}`} className="text-decoration-none d-block h-100 project-card-link">
                    <div className="service-box-items h-100">
                      <div className="icon">
                        <img
                          src={project.icon}
                          alt={`${project.name} icon`}
                        />
                      </div>
                      <div className="content">
                        <h4>{project.name}</h4>
                        <p className="card-description">
                            {project.cardDescription}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;