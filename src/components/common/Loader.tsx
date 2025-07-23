import React from 'react';

const Loader: React.FC = () => {
  return (
    <div id="preloader" className="preloader">
      <div className="animation-preloader">
        <div className="spinner"></div>
        <div className="txt-loading">
          <span data-text-preloader="T" className="letters-loading">T</span>
          <span data-text-preloader="A" className="letters-loading">A</span>
          <span data-text-preloader="N" className="letters-loading">N</span>
          <span data-text-preloader="A" className="letters-loading">A</span>
          <span data-text-preloader="S" className="letters-loading">S</span>
          <span data-text-preloader="V" className="letters-loading">V</span>
          <span data-text-preloader="I" className="letters-loading">I</span>
        </div>
        <p className="text-center">Loading</p>
      </div>
      <div className="loader">
        <div className="row">
          <div className="col-3 loader-section section-left"><div className="bg"></div></div>
          <div className="col-3 loader-section section-left"><div className="bg"></div></div>
          <div className="col-3 loader-section section-right"><div className="bg"></div></div>
          <div className="col-3 loader-section section-right"><div className="bg"></div></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;