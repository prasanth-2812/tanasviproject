import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

interface HeaderProps {
  onSearchClick: () => void;
  isSticky: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSearchClick, isSticky }) => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const toggleOffcanvas = () => setIsOffcanvasOpen(!isOffcanvasOpen);
  const handleLinkClick = () => setIsOffcanvasOpen(false);

  return (
    <>
      <header className="header-section-wrapper">
        <div className="header-top-section top-style-3">
          <div className="container">
            <div className="header-top-wrapper align-items-center">
              <ul className="contact-list">
                <li><i className="far fa-envelope me-2"></i><a href="mailto:info@tanasvi.com" className="link">info@tanasvi.com</a></li>
                <li><i className="fa-solid fa-phone-volume me-2"></i><a href="tel:+91-9392562193">+91-9392562193</a></li>
              </ul>
              <div className="top-right">
                <div className="social-icon d-flex align-items-center">
                  <span>Follow Us:</span>
                  <a href="https://www.facebook.com/p/Tanasvi-Technologies-100077635476112/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                  <a href="https://in.linkedin.com/company/tanasvi-technologies" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div id="header-sticky" className={`header-3 ${isSticky ? 'sticky' : ''}`}>
          <div className="container">
            <div className="mega-menu-wrapper">
              <div className="header-main">
                <div className="header-left">
                  <div className="logo">
                    <Link to="/" className="header-logo">
                      <img src="/assets/img/logo.jpg" alt="logo-img" /> 
                    </Link>
                  </div>
                </div>
                <div className="header-right d-flex justify-content-end align-items-center">
                  <div className="mean__menu-wrapper">
                    <div className="main-menu">
                      <nav>
                        <ul>
                          <li><NavLink to="/" end>Home</NavLink></li>
                          <li><NavLink to="/about">About</NavLink></li>
                          <li><NavLink to="/service">Services</NavLink></li>
                          <li><NavLink to="/project">Projects</NavLink></li>
                          <li><NavLink to="/team">Career</NavLink></li>
                          <li><NavLink to="/blog">Blog</NavLink></li>
                          <li><NavLink to="/contact">Contact</NavLink></li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <a href="#!" className="search-trigger search-icon" onClick={(e) => { e.preventDefault(); onSearchClick(); }}>
                    <i className="fal fa-search"></i>
                  </a>
                  <div className="header-button">
                    <Link to="/contact" className="theme-btn bg-white">
                      <span>Get A Quote<i className="fa-solid fa-arrow-right-long"></i></span>
                    </Link>
                  </div>
                  <div className="header__hamburger d-lg-none my-auto" onClick={toggleOffcanvas}>
                    <div className="sidebar__toggle">
                      <i className="fas fa-bars"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={`offcanvas__info ${isOffcanvasOpen ? 'active' : ''}`}>
        <div className="offcanvas__wrapper">
          <div className="offcanvas__content">
            <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
              <div className="offcanvas__logo">
                <Link to="/" onClick={handleLinkClick}>
                  <img src="/assets/img/logo.jpg" alt="logo-img" />
                </Link>
              </div>
              <div className="offcanvas__close" onClick={toggleOffcanvas}>
                <button><i className="fas fa-times"></i></button>
              </div>
            </div>
            <div className="mobile-menu-offcanvas">
              <nav>
                <ul>
                  <li><NavLink to="/" end onClick={handleLinkClick}>Home</NavLink></li>
                  <li><NavLink to="/about" onClick={handleLinkClick}>About</NavLink></li>
                  <li><NavLink to="/service" onClick={handleLinkClick}>Services</NavLink></li>
                  <li><NavLink to="/project" onClick={handleLinkClick}>Projects</NavLink></li>
                  <li><NavLink to="/team" onClick={handleLinkClick}>Career</NavLink></li>
                  <li><NavLink to="/blog" onClick={handleLinkClick}>Blog</NavLink></li>
                  <li><NavLink to="/contact" onClick={handleLinkClick}>Contact</NavLink></li>
                </ul>
              </nav>
            </div>
            <div className="offcanvas__contact mt-5">
              <h4>Contact Info</h4>
              <ul>
                <li className="d-flex align-items-center"><i className="fa-solid fa-location-dot"></i><span>Visakhapatnam, AP, India</span></li>
                <li className="d-flex align-items-center"><i className="fa-solid fa-phone"></i><a href="tel:+919392562193">+91-9392562193</a></li>
                <li className="d-flex align-items-center"><i className="fa-regular fa-envelope"></i><a href="mailto:info@tanasvi.com">info@tanasvi.com</a></li>
              </ul>
            </div>
            <div className="header-button mt-4">
              <Link to="/contact" className="theme-btn text-center" onClick={handleLinkClick}>
                <span>Get A Quote</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={`offcanvas__overlay ${isOffcanvasOpen ? 'active' : ''}`} onClick={toggleOffcanvas}></div>
    </>
  );
};

export default Header;