import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// Make sure the import path is correct for your project structure
import { projectList, Project } from '../data/projectData';

const Projects: React.FC = () => {
  return (
    <>
      <section className="service-section fix section-padding">
        <div className="container">
          <div className="section-title title-area mx-auto mb-20">
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
                  className="col-xl-4 col-lg-6 col-md-6" // Using a 3-column layout for better spacing
                  key={project.slug} // Use a unique identifier like slug for the key
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: project.delay }}
                  viewport={{ once: true }}
                >
                  <Link to={`/project/${project.slug}`} className="text-decoration-none d-block h-100">
                    <div className="service-box-items box-shadow h-100">
                      <div className="icon">
                        <img
                          src={project.image} // CORRECTED: Changed from project.icon to project.image
                          alt={`${project.name} icon`}
                        />
                      </div>
                      <div className="content">
                        <h4>{project.name}</h4>
                        <p style={{ fontSize: "0.9rem", marginTop: '10px' }}>
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