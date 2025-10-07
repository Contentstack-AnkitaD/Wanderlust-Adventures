import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PackagesListingPage from './pages/PackagesListingPage';
import PackageDetailPage from './pages/PackageDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import './styles/global.scss';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/travel_home_page" replace />} />
            <Route path="/travel_home_page" element={<HomePage />} />
            <Route path="/travel_packages_listing_page" element={<PackagesListingPage />} />
            <Route path="/travel_packages/:slug" element={<PackageDetailPage />} />
            <Route path="/travel_about_page" element={<AboutPage />} />
            <Route path="/travel_contact_page" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/travel_home_page" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

