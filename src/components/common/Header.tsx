import React from 'react';
import { Link, NavLink } from 'react-router-dom';

interface HeaderProps {
  onSearchClick: () => void;
  isSticky: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSearchClick, isSticky }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <header>
      <div className="header-top-section top-style-3">
        <div className="container">
          <div className="header-top-wrapper align-items-center">
            {/* START: Left side of the top bar */}
            <ul className="contact-list">
              <li>
                <i className="far fa-envelope me-2"></i>
                <a href="mailto:info@tanasvi.com" className="link">info@tanasvi.com</a>
              </li>
              <li>
                <i className="fa-solid fa-phone-volume me-2"></i>
                <a href="tel:+91-9392562193">+91-9392562193</a>
              </li>
            </ul>
            {/* END: Left side of the top bar */}
            
            {/* ========================================================== */}
            {/* START: This is the primary fix. The "top-right" div now contains the "Follow Us" section. */}
            {/* ========================================================== */}
            <div className="top-right">
              <div className="social-icon d-flex align-items-center">
                <span>Follow Us:</span>
                <a href="https://www.facebook.com/p/Tanasvi-Technologies-100077635476112/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                <a href="https://in.linkedin.com/company/tanasvi-technologies" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin-in"></i></a>
              </div>
            </div>
            {/* ========================================================== */}
            {/* END: Fix */}
            {/* ========================================================== */}
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
                  <div className={`main-menu ${isMobileMenuOpen ? 'show-menu' : ''}`}>
                    <nav id="mobile-menu">
                      <ul>
                        <li><NavLink to="/" end onClick={handleLinkClick}>Home</NavLink></li>
                        <li><NavLink to="/about.html" onClick={handleLinkClick}>About</NavLink></li>
                        <li><NavLink to="/service.html" onClick={handleLinkClick}>Services</NavLink></li>
                        <li><NavLink to="/project.html" onClick={handleLinkClick}>Projects</NavLink></li>
                        <li><NavLink to="/team.html" onClick={handleLinkClick}>Career</NavLink></li>
                        <li><NavLink to="/contact.html" onClick={handleLinkClick}>Contact</NavLink></li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <a href="#!" className="search-trigger search-icon" onClick={(e) => { e.preventDefault(); onSearchClick(); }}>
                  <i className="fal fa-search"></i>
                </a>
                <div className="header-button">
                  <Link to="/contact.html" className="theme-btn bg-white">
                    <span>Get A Quote<i className="fa-solid fa-arrow-right-long"></i></span>
                  </Link>
                </div>
                <div className="header__hamburger d-lg-none my-auto" onClick={toggleMobileMenu}>
                  <div className="sidebar__toggle">
                    <i className={isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;