import React from 'react';
import { Link } from 'react-router-dom';
import { footerData } from '../data/travelData';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          {/* Company Info */}
          <div className="footer__section">
            <h3 className="footer__title">{footerData.company_name}</h3>
            <p className="footer__text">
              Your trusted travel partner for unforgettable adventures around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer__section">
            <h3 className="footer__title">Quick Links</h3>
            <nav className="footer__links">
              <Link to="/travel_home_page" className="footer__link">
                {footerData.quick_links_home_label}
              </Link>
              <Link to="/travel_packages_listing_page" className="footer__link">
                {footerData.quick_links_packages_label}
              </Link>
              <Link to="/travel_about_page" className="footer__link">
                About Us
              </Link>
              <Link to="/travel_contact_page" className="footer__link">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="footer__section">
            <h3 className="footer__title">Contact Info</h3>
            <div className="footer__contacts">
              <p className="footer__text">
                <span className="footer__label">Email:</span> {footerData.contact_email}
              </p>
              <p className="footer__text">
                <span className="footer__label">Phone:</span> {footerData.contact_phone}
              </p>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">{footerData.copyright_text}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

