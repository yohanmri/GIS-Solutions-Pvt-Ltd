import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Solutions from '../components/Solutions';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import HomeArcGIS from '../components/HomeArcGIS';
import HomeCapabilities from '../components/HomeCapabilities';
import HomeInitiatives from '../components/HomeInitiatives';

export default function HomePage({ setPage }) {
  return (
    <div className="home-page" style={{ 
      margin: 0, 
      padding: 0, 
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <Navbar setPage={setPage} activePage="home" />
      <Hero />
      <HomeInitiatives />
      <HomeArcGIS />
      <HomeCapabilities />
      <Footer />
    </div>
  );
}