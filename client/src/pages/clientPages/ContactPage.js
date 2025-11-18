import React from 'react';
import Navbar from '../../components/clientComponents/Navbar';
import Contact from '../../components/clientComponents/Contact';
import Footer from '../../components/clientComponents/Footer';

export default function ContactPage({ setPage }) {  // ← ADD { setPage }
  return (
    <div className="contact-page"  style={{
      margin: 0,
      padding: 0,
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <Navbar setPage={setPage} activePage="contact" />  {/* ← ADD setPage AND activePage */}
       <Contact />
      <Footer />
    </div>
  );
}