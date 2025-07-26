import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';

const NotFound: React.FC = () => {
  return (
    <>
        
      <section className="Error-section section-padding fix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="error-items">
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