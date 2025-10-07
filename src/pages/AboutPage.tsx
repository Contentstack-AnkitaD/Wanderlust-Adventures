import React from 'react';
import { aboutPageData } from '../data/travelData';
import './AboutPage.scss';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <div className="container">
        {/* Page Header */}
        <div className="about-page__header">
          <h1 className="about-page__title">{aboutPageData.title}</h1>
        </div>

        {/* Main Content */}
        <div className="about-page__content">
          <p className="about-page__text">{aboutPageData.about_content}</p>
        </div>

        {/* Stats and Info Cards */}
        <div className="info-cards">
          {/* Mission Statement */}
          <div className="info-card">
            <h3 className="info-card__title">Our Mission</h3>
            <p className="info-card__text">{aboutPageData.mission_statement}</p>
          </div>

          {/* Years of Experience */}
          <div className="info-card info-card--center">
            <div className="info-card__number">{aboutPageData.years_experience}+</div>
            <h3 className="info-card__subtitle">Years of Experience</h3>
            <p className="info-card__text">
              Crafting extraordinary travel experiences for adventurous souls worldwide.
            </p>
          </div>
        </div>

        {/* Team Description */}
        <div className="team-section">
          <h3 className="team-section__title">Meet Our Team</h3>
          <p className="team-section__text">{aboutPageData.team_description}</p>
        </div>

        {/* Features Grid */}
        <div className="features">
          <div className="feature">
            <div className="feature__icon feature__icon--primary">
              <svg className="feature__svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
            </div>
            <h4 className="feature__title">Global Reach</h4>
            <p className="feature__text">Destinations across all continents</p>
          </div>

          <div className="feature">
            <div className="feature__icon feature__icon--secondary">
              <svg className="feature__svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h4 className="feature__title">Personalized Service</h4>
            <p className="feature__text">Tailored experiences for every traveler</p>
          </div>

          <div className="feature">
            <div className="feature__icon feature__icon--primary">
              <svg className="feature__svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h4 className="feature__title">Quality Assured</h4>
            <p className="feature__text">Vetted partners and premium experiences</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

