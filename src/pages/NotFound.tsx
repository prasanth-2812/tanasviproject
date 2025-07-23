import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';

const NotFound: React.FC = () => {
  return (
    <>
      <PageTitle title="Page Not Found" breadcrumb="404" />
      <section className="Error-section section-padding fix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="error-items">
                <div className="error-image">
                  <img src="assets/img/404.png" alt="404 img" />
                </div>
                <h2>
                  Whoops! This Page got Lost <br />
                  in conversation
                </h2>
                <Link to="/" className="theme-btn">
                  Go Back Home
                  <i className="fa-solid fa-arrow-right-long"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;