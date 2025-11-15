import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';

export default function ContactPage({ setPage }) {  // ← ADD { setPage }
  return (
    <div className="contact-page">
      <Navbar setPage={setPage} activePage="contact" />  {/* ← ADD setPage AND activePage */}
       <Contact />
      <Footer />
    </div>
  );
}