import React, { useState, useEffect } from 'react';
import { travelPackages, TravelPackage } from '../data/travelData';
import PackageCard from '../components/PackageCard';
import './PackagesListingPage.scss';

const PackagesListingPage: React.FC = () => {
  const [packages] = useState<TravelPackage[]>(travelPackages);
  const [filteredPackages, setFilteredPackages] = useState<TravelPackage[]>(travelPackages);
  const [filters, setFilters] = useState({
    category: '',
    country: '',
    priceRange: '',
    duration: '',
  });

  useEffect(() => {
    let filtered = [...packages];

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(pkg => pkg.package_category === filters.category);
    }
    if (filters.country) {
      filtered = filtered.filter(pkg => pkg.destination_country === filters.country);
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(pkg => {
        if (max) {
          return pkg.package_price >= min && pkg.package_price <= max;
        } else {
          return pkg.package_price >= min;
        }
      });
    }
    if (filters.duration) {
      const [min, max] = filters.duration.split('-').map(Number);
      filtered = filtered.filter(pkg => {
        if (max) {
          return pkg.package_duration >= min && pkg.package_duration <= max;
        } else {
          return pkg.package_duration >= min;
        }
      });
    }

    // Sort featured first
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

    setFilteredPackages(filtered);
  }, [filters, packages]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      country: '',
      priceRange: '',
      duration: '',
    });
  };

  const capitalizeWords = (str: string) => {
    return str.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const uniqueCategories = [...new Set(packages.map(pkg => pkg.package_category))];
  const uniqueCountries = [...new Set(packages.map(pkg => pkg.destination_country))];

  return (
    <div className="packages-listing">
      <div className="container">
        {/* Page Header */}
        <div className="packages-listing__header">
          <h1 className="packages-listing__title">Explore Our Travel Packages</h1>
          <p className="packages-listing__description">
            Discover amazing destinations and experiences tailored to your preferences. 
            Filter by category, destination, price, or duration to find your perfect adventure.
          </p>
        </div>

        {/* Filters */}
        <div className="filters">
          <div className="filters__header">
            <h3 className="filters__title">Filter Packages</h3>
            <button
              onClick={clearFilters}
              className="filters__clear-btn"
            >
              Clear All
            </button>
          </div>

          <div className="filters__grid">
            {/* Category Filter */}
            <div className="filter-group">
              <label className="filter-group__label">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="filter-group__select"
              >
                <option value="">All Categories</option>
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>
                    {capitalizeWords(category)}
                  </option>
                ))}
              </select>
            </div>

            {/* Country Filter */}
            <div className="filter-group">
              <label className="filter-group__label">Destination</label>
              <select
                value={filters.country}
                onChange={(e) => handleFilterChange('country', e.target.value)}
                className="filter-group__select"
              >
                <option value="">All Destinations</option>
                {uniqueCountries.map(country => (
                  <option key={country} value={country}>
                    {capitalizeWords(country)}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="filter-group">
              <label className="filter-group__label">Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="filter-group__select"
                defaultValue="1000-3000"
              >
                <option value="">Any Price</option>
                <option value="0-1000">Under $1,000</option>
                <option value="1000-3000" >$1,000 - $3,000</option>
                <option value="3000-5000">$3,000 - $5,000</option>
                <option value="5000">$5,000+</option>
              </select>
            </div>

            {/* Duration Filter */}
            <div className="filter-group">
              <label className="filter-group__label">Duration</label>
              <select
                value={filters.duration}
                onChange={(e) => handleFilterChange('duration', e.target.value)}
                className="filter-group__select"
              >
                <option value="">Any Duration</option>
                <option value="1-3">1-3 Days</option>
                <option value="4-7">4-7 Days</option>
                <option value="8-14">8-14 Days</option>
                <option value="15">15+ Days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <p className="results-summary__text">
            Showing {filteredPackages.length} of {packages.length} packages
          </p>
        </div>

        {/* Packages Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results__icon">
              <svg className="no-results__svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="no-results__title">No packages found</h3>
            <p className="no-results__text">Try adjusting your filters to see more results.</p>
            <button
              onClick={clearFilters}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackagesListingPage;

