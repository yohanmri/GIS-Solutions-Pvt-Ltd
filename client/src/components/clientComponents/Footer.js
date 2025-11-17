import React from 'react';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-input';
import '../../styles/clientStyles/footer.css';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
<div className="footer-logo">
  <img 
    src="/assets/logoGIS.png" 
    alt="GIS Solutions Logo" 
    className="logo-image"
    style={{maxWidth: '60px'}}
  />
  <h3>GIS Solutions</h3>
</div>

            <p className="footer-description">
              Professional Geographic Information Systems solutions for businesses worldwide. 
              Transforming spatial data into strategic intelligence.
            </p>
            <div className="social-links">
              <calcite-button appearance="transparent" kind="neutral" icon-start="link"></calcite-button>
              <calcite-button appearance="transparent" kind="neutral" icon-start="share"></calcite-button>
              <calcite-button appearance="transparent" kind="neutral" icon-start="organization"></calcite-button>
              <calcite-button appearance="transparent" kind="neutral" icon-start="information"></calcite-button>
            </div>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><a href="#mapping">GIS Mapping</a></li>
              <li><a href="#analysis">Spatial Analysis</a></li>
              <li><a href="#remote">Remote Sensing</a></li>
              <li><a href="#consulting">GIS Consulting</a></li>
              <li><a href="#development">Custom Development</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Solutions</h4>
            <ul className="footer-links">
              <li><a href="#urban">Urban Planning</a></li>
              <li><a href="#agriculture">Agriculture</a></li>
              <li><a href="#environment">Environmental</a></li>
              <li><a href="#transport">Transportation</a></li>
              <li><a href="#utilities">Utilities</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#team">Our Team</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Newsletter</h4>
            <p>Subscribe to get the latest GIS insights and updates</p>
            <div className="newsletter-form">
              <calcite-input 
                type="email" 
                placeholder="Enter your email"
                scale="s"
              ></calcite-input>
              <calcite-button 
                appearance="solid" 
                kind="brand"
                scale="s"
                width="full"
                style={{marginTop: '8px'}}
              >
                Subscribe
              </calcite-button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 GIS Solutions Pvt Ltd. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Service</a>
            <span>•</span>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}