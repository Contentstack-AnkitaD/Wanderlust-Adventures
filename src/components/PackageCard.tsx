import React from 'react';
import { Link } from 'react-router-dom';
import { TravelPackage } from '../data/travelData';
import './PackageCard.scss';

interface PackageCardProps {
  package: TravelPackage;
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg }) => {
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
    <div className="package-card">
      <div className="package-card__image-wrapper">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="package-card__image"
        />
        {pkg.featured && (
          <div className="package-card__badge">
            Featured
          </div>
        )}
      </div>
      <div className="package-card__content">
        <h3 className="package-card__title">
          {pkg.title}
        </h3>
        
        <div className="package-card__location">
          <span className="package-card__location-text">
            {pkg.destination_city}, {capitalizeWords(pkg.destination_country)}
          </span>
          <span className="package-card__duration">
            {formatDuration(pkg.package_duration)}
          </span>
        </div>
        
        <p className="package-card__description">
          {pkg.package_description}
        </p>
        
        <div className="package-card__meta">
          <span className="package-card__category">
            {capitalizeWords(pkg.package_category)}
          </span>
          {pkg.difficulty_level && (
            <span className="package-card__difficulty">
              {capitalizeWords(pkg.difficulty_level)}
            </span>
          )}
        </div>
        
        <div className="package-card__footer">
          <span className="package-card__price">
            {formatPrice(pkg.package_price)}
          </span>
          <Link
            to={`/travel_packages/${pkg.url}`}
            className="btn btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;

