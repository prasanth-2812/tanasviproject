import React from 'react';
import PageTitle from '../components/common/PageTitle';

const Projects: React.FC = () => {
  return (
    <>
      <PageTitle title="Our Projects" breadcrumb="Projects" />
      <section className="project-section section-padding fix">
        <div className="container">
          <h1 style={{ textAlign: 'center' }}>Coming Soon</h1>
        </div>
      </section>
    </>
  );
};

export default Projects;