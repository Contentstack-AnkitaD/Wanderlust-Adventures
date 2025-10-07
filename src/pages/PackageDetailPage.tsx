import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { travelPackages } from '../data/travelData';
import './PackageDetailPage.scss';

const PackageDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const pkg = travelPackages.find(p => p.url === slug);

  if (!pkg) {
    return (
      <div className="package-detail">
        <div className="container">
          <div className="not-found">
            <h1 className="not-found__title">Package Not Found</h1>
            <p className="not-found__text">The package you're looking for doesn't exist.</p>
            <Link to="/travel_packages_listing_page" className="btn btn-primary">
              View All Packages
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDuration = (days: number) => {
    return `${days} ${days === 1 ? 'Day' : 'Days'}`;
  };

  const capitalizeWords = (str: string) => {
    return str.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="package-detail">
      <div className="container">
        {/* Hero Image */}
        <div className="package-detail__hero">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="package-detail__hero-image"
          />
          <div className="package-detail__hero-overlay">
            <div className="package-detail__hero-content">
              {pkg.featured && (
                <div className="package-detail__badge">Featured</div>
              )}
              <h1 className="package-detail__title">{pkg.title}</h1>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="package-detail__header">
          <div className="package-detail__breadcrumb">
            <Link to="/travel_home_page">Home</Link>
            <span>/</span>
            <Link to="/travel_packages_listing_page">Packages</Link>
            <span>/</span>
            <span>{pkg.title}</span>
          </div>
          
          <div className="package-detail__meta">
            <div className="package-detail__meta-item">
              <svg className="package-detail__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{pkg.destination_city}, {capitalizeWords(pkg.destination_country)}</span>
            </div>
            <div className="package-detail__meta-item">
              <svg className="package-detail__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDuration(pkg.package_duration)}</span>
            </div>
            <div className="package-detail__meta-item">
              <svg className="package-detail__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span>{capitalizeWords(pkg.package_category)}</span>
            </div>
            {pkg.difficulty_level && (
              <div className="package-detail__meta-item">
                <svg className="package-detail__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>{capitalizeWords(pkg.difficulty_level)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="package-detail__content">
          {/* Main Content */}
          <div className="package-detail__main">
            {/* Description */}
            <section className="content-section">
              <h2 className="content-section__title">Overview</h2>
              <p className="content-section__text">{pkg.package_description}</p>
            </section>

            {/* Highlights */}
            {pkg.highlights && pkg.highlights.length > 0 && (
              <section className="content-section">
                <h2 className="content-section__title">Highlights</h2>
                <ul className="highlights-list">
                  {pkg.highlights.map((highlight, index) => (
                    <li key={index} className="highlights-list__item">
                      <svg className="highlights-list__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Included */}
            {pkg.included && pkg.included.length > 0 && (
              <section className="content-section">
                <h2 className="content-section__title">What's Included</h2>
                <ul className="included-list">
                  {pkg.included.map((item, index) => (
                    <li key={index} className="included-list__item">
                      <svg className="included-list__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Itinerary */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <section className="content-section">
                <h2 className="content-section__title">Day by Day Itinerary</h2>
                <div className="itinerary">
                  {pkg.itinerary.map((day) => (
                    <div key={day.day} className="itinerary__item">
                      <div className="itinerary__day">Day {day.day}</div>
                      <div className="itinerary__content">
                        <h3 className="itinerary__title">{day.title}</h3>
                        <p className="itinerary__description">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="package-detail__sidebar">
            <div className="booking-card">
              <div className="booking-card__price">
                <span className="booking-card__price-label">From</span>
                <span className="booking-card__price-value">{formatPrice(pkg.package_price)}</span>
                <span className="booking-card__price-unit">per person</span>
              </div>

              <Link to="/travel_contact_page" className="btn btn-primary booking-card__btn">
                Book Now
              </Link>

              <div className="booking-card__info">
                <div className="booking-card__info-item">
                  <span className="booking-card__info-label">Duration:</span>
                  <span className="booking-card__info-value">{formatDuration(pkg.package_duration)}</span>
                </div>
                <div className="booking-card__info-item">
                  <span className="booking-card__info-label">Category:</span>
                  <span className="booking-card__info-value">{capitalizeWords(pkg.package_category)}</span>
                </div>
                {pkg.difficulty_level && (
                  <div className="booking-card__info-item">
                    <span className="booking-card__info-label">Difficulty:</span>
                    <span className="booking-card__info-value">{capitalizeWords(pkg.difficulty_level)}</span>
                  </div>
                )}
              </div>

              <div className="booking-card__contact">
                <p className="booking-card__contact-text">Have questions?</p>
                <Link to="/travel_contact_page" className="booking-card__contact-link">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailPage;

