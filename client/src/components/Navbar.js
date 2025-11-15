import React, { useState, useEffect } from 'react';
import '@esri/calcite-components/components/calcite-navigation';
import '@esri/calcite-components/components/calcite-navigation-logo';
import '@esri/calcite-components/components/calcite-menu';
import '@esri/calcite-components/components/calcite-menu-item';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-action';
import '../styles/navbar.css';

export default function Navbar({ setPage, activePage = 'home' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { page: 'home', text: 'Home' },
     { page: 'products', text: 'Products' },
    { page: 'services', text: 'Services' },
       
    { page: 'solutions', text: 'Solutions' },

    { page: 'projects', text: 'Projects' },
    { page: 'about', text: 'About' },
    { page: 'contact', text: 'Contact' }
  ];

  const handleNavClick = (page) => {
    if (setPage) {
      setPage(page);
      setMobileMenuOpen(false);
      window.scrollTo(0, 0);
    }
  };

  return (
    <calcite-navigation 
      slot="header" 
      className={`main-nav ${scrolled ? 'scrolled' : ''}`}
    >
<calcite-navigation-logo
  slot="logo"
  heading="GIS Solutions"
  description="Professional GIS Services"
  thumbnail="/assets/logoGIS.png"
  onClick={() => handleNavClick('home')}
  style={{
    '--calcite-navigation-logo-width': '100px',   
    '--calcite-navigation-logo-height': '100px',
    cursor: 'pointer'
  }}
/>


      
      <div slot="content-end" className="nav-menu">
        <calcite-menu className="desktop-menu">
          {menuItems.map((item, index) => (
            <calcite-menu-item 
              key={index}
              text={item.text}
              active={activePage === item.page}
              onClick={() => handleNavClick(item.page)}
            ></calcite-menu-item>
          ))}
        </calcite-menu>
        
        <calcite-button 
          className="cta-button" 
          appearance="solid" 
          kind="brand"
          scale="s"
          onClick={() => handleNavClick('contact')}
        >
          Get Started
        </calcite-button>

        <calcite-action 
          className="mobile-menu-toggle"
          icon="hamburger"
          text="Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        ></calcite-action>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu-dropdown">
          <calcite-menu>
            {menuItems.map((item, index) => (
              <calcite-menu-item 
                key={index}
                text={item.text}
                onClick={() => handleNavClick(item.page)}
              ></calcite-menu-item>
            ))}
          </calcite-menu>
        </div>
      )}
    </calcite-navigation>
  );
}