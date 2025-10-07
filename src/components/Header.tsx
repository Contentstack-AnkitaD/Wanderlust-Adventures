import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { headerData } from '../data/travelData';
import './Header.scss';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <Link to="/travel_home_page" className="header__logo">
            {headerData.logo_text}
          </Link>

          {/* Desktop Navigation */}
          <nav className="header__nav">
            <Link 
              to="/travel_home_page" 
              className={`header__nav-link ${isActive('/travel_home_page') ? 'active' : ''}`}
            >
              {headerData.nav_home_label}
            </Link>
            <Link 
              to="/travel_packages_listing_page" 
              className={`header__nav-link ${isActive('/travel_packages_listing_page') ? 'active' : ''}`}
            >
              {headerData.nav_packages_label}
            </Link>
            <Link 
              to="/travel_about_page" 
              className={`header__nav-link ${isActive('/travel_about_page') ? 'active' : ''}`}
            >
              {headerData.nav_about_label}
            </Link>
            <Link 
              to="/travel_contact_page" 
              className={`header__nav-link ${isActive('/travel_contact_page') ? 'active' : ''}`}
            >
              {headerData.nav_contact_label}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="header__menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="header__mobile-nav">
            <Link 
              to="/travel_home_page" 
              className="header__mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {headerData.nav_home_label}
            </Link>
            <Link 
              to="/travel_packages_listing_page" 
              className="header__mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {headerData.nav_packages_label}
            </Link>
            <Link 
              to="/travel_about_page" 
              className="header__mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {headerData.nav_about_label}
            </Link>
            <Link 
              to="/travel_contact_page" 
              className="header__mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {headerData.nav_contact_label}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

