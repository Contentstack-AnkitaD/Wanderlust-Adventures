import React, { useState } from 'react';
import { contactPageData } from '../data/travelData';
import './ContactPage.scss';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-page">
      <div className="container">
        {/* Page Header */}
        <div className="contact-page__header">
          <h1 className="contact-page__title">{contactPageData.title}</h1>
          <p className="contact-page__description">
            Ready to plan your next adventure? Get in touch with our travel experts and let us help you create unforgettable memories.
          </p>
        </div>

        <div className="contact-page__content">
          {/* Contact Information */}
          <div className="contact-info">
            {/* Email */}
            <div className="contact-card">
              <div className="contact-card__icon contact-card__icon--primary">
                <svg className="contact-card__svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="contact-card__content">
                <h3 className="contact-card__title">Email Us</h3>
                <p className="contact-card__text">Send us an email and we'll get back to you within 24 hours.</p>
                <a href={`mailto:${contactPageData.contact_email}`} className="contact-card__link">
                  {contactPageData.contact_email}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="contact-card">
              <div className="contact-card__icon contact-card__icon--secondary">
                <svg className="contact-card__svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="contact-card__content">
                <h3 className="contact-card__title">Call Us</h3>
                <p className="contact-card__text">Speak directly with our travel consultants.</p>
                <a href={`tel:${contactPageData.contact_phone}`} className="contact-card__link">
                  {contactPageData.contact_phone}
                </a>
              </div>
            </div>

            {/* Office Address */}
            <div className="contact-card">
              <div className="contact-card__icon contact-card__icon--primary">
                <svg className="contact-card__svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="contact-card__content">
                <h3 className="contact-card__title">Visit Our Office</h3>
                <p className="contact-card__text contact-card__text--address">
                  {contactPageData.office_address}
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="contact-card">
              <div className="contact-card__icon contact-card__icon--secondary">
                <svg className="contact-card__svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="contact-card__content">
                <h3 className="contact-card__title">Business Hours</h3>
                <p className="contact-card__text contact-card__text--hours">
                  {contactPageData.business_hours}
                </p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="contact-card contact-card--emergency">
              <div className="contact-card__icon contact-card__icon--emergency">
                <svg className="contact-card__svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="contact-card__content">
                <h3 className="contact-card__title contact-card__title--emergency">Emergency Contact</h3>
                <p className="contact-card__text">24/7 emergency support while traveling</p>
                <a href={`tel:${contactPageData.emergency_contact}`} className="contact-card__link contact-card__link--emergency">
                  {contactPageData.emergency_contact}
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <div className="contact-form">
              <h2 className="contact-form__title">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="form">
                <div className="form__row">
                  <div className="form__group">
                    <label htmlFor="firstName" className="form__label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="form__input"
                      required
                    />
                  </div>
                  <div className="form__group">
                    <label htmlFor="lastName" className="form__label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="form__input"
                      required
                    />
                  </div>
                </div>

                <div className="form__group">
                  <label htmlFor="email" className="form__label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form__input"
                    required
                  />
                </div>

                <div className="form__group">
                  <label htmlFor="phone" className="form__label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form__input"
                  />
                </div>

                <div className="form__group">
                  <label htmlFor="subject" className="form__label">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form__select"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="booking">Booking Information</option>
                    <option value="custom">Custom Package Request</option>
                    <option value="support">Customer Support</option>
                  </select>
                </div>

                <div className="form__group">
                  <label htmlFor="message" className="form__label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="form__textarea"
                    placeholder="Tell us about your travel plans, preferences, or any questions you have..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary form__submit">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

