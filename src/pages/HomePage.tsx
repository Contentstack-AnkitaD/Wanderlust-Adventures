import React from 'react';
import { Link } from 'react-router-dom';
import { homePageData, travelPackages } from '../data/travelData';
import PackageCard from '../components/PackageCard';
import './HomePage.scss';

const HomePage: React.FC = () => {
  const featuredPackages = travelPackages.filter(pkg => pkg.featured).slice(0, 6);

  const popularDestinations = [
    { 
      name: 'Iceland', 
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format' 
    },
    { 
      name: 'Santorini', 
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop&auto=format' 
    },
    { 
      name: 'Kyoto', 
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop&auto=format' 
    },
    { 
      name: 'Bali', 
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop&auto=format' 
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero__content">
            <h1 className="hero__title">{homePageData.hero_title}</h1>
            <p className="hero__subtitle">{homePageData.hero_subtitle}</p>
            <Link to="/travel_packages_listing_page" className="btn btn-primary hero__cta">
              {homePageData.cta_text}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="featured-packages">
        <div className="container">
          <h2 className="section-title">{homePageData.featured_packages_title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
          <div className="featured-packages__cta">
            <Link to="/travel_packages_listing_page" className="btn btn-primary">
              View All Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="popular-destinations">
        <div className="container">
          <h2 className="section-title">{homePageData.popular_destinations_title}</h2>
          <div className="destinations-grid">
            {popularDestinations.map((destination) => (
              <div key={destination.name} className="destination-card">
                <div className="destination-card__image-wrapper">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="destination-card__image"
                  />
                  <div className="destination-card__overlay">
                    <h3 className="destination-card__name">{destination.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-section__content">
            <h2 className="cta-section__title">Ready for Your Next Adventure?</h2>
            <p className="cta-section__text">
              Let us help you create unforgettable memories with our expertly crafted travel packages.
            </p>
            <div className="cta-section__buttons">
              <Link to="/travel_packages_listing_page" className="btn btn-primary">
                Browse Packages
              </Link>
              <Link to="/travel_contact_page" className="btn btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

