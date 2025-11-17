import React from 'react';
import Navbar from '../../components/clientComponents/Navbar';
import Contact from '../../components/clientComponents/Contact';
import Footer from '../../components/clientComponents/Footer';

export default function ContactPage({ setPage }) {  // ← ADD { setPage }
  return (
    <div className="contact-page">
      <Navbar setPage={setPage} activePage="contact" />  {/* ← ADD setPage AND activePage */}
       <Contact />
      <Footer />
    </div>
  );
}