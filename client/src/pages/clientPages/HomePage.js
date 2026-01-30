import React, { useEffect } from 'react';
import Navbar from '../../components/clientComponents/Navbar';
import Hero from '../../components/clientComponents/Hero';
import Footer from '../../components/clientComponents/Footer';
import HomeArcGIS from '../../components/clientComponents/HomeArcGIS';
import HomeCapabilities from '../../components/clientComponents/HomeCapabilities';
import HomeInitiatives from '../../components/clientComponents/HomeInitiatives';
import analyticsTracker from '../../utils/AnalyticsTracker';

export default function HomePage() {
  useEffect(() => {
    // Track page view when component mounts
    analyticsTracker.trackPageView('/');
  }, []);

  return (
    <div className="home-page" style={{
      margin: 0,
      padding: 0,
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <Navbar activePage="home" />
      <Hero />
      <HomeInitiatives />
      <HomeArcGIS />
      <HomeCapabilities />
      <Footer />
    </div>
  );
}