import React from 'react';
import Navbar from '../../components/clientComponents/Navbar';
import Hero from '../../components/clientComponents/Hero';
import Services from '../../components/clientComponents/Services';
import Solutions from '../../components/clientComponents/Solutions';
import Contact from '../../components/clientComponents/Contact';
import Footer from '../../components/clientComponents/Footer';
import HomeArcGIS from '../../components/clientComponents/HomeArcGIS';
import HomeCapabilities from '../../components/clientComponents/HomeCapabilities';
import HomeInitiatives from '../../components/clientComponents/HomeInitiatives';

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