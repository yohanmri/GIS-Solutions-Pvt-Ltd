import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutPeople from '../components/AboutPeople';
import AboutDetails from '../components/AboutDetails';
import AboutExperts from '../components/AboutExperts';

export default function AboutPage({ setPage }) {  // ← ADD { setPage }
  return (
    <div className="about-page">
      <Navbar setPage={setPage} activePage="about" />  {/* ← ADD setPage AND activePage */}
       <AboutDetails />
       <AboutExperts/>
       <AboutPeople />
      <Footer />
    </div>
  );
}