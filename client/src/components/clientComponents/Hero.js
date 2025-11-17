import React, { useState, useEffect } from 'react';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-notice';

export default function Hero() {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Show notification after 1 second
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

const handleNavigateToEvents = () => {
  setShowNotification(false);
  // Navigate to events section
  setTimeout(() => {
    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
      // Trigger the Events tab after scrolling
      setTimeout(() => {
        const eventsTabs = document.querySelectorAll('calcite-tab-title');
        eventsTabs.forEach(tab => {
          if (tab.textContent.includes('Events')) {
            tab.click();
          }
        });
      }, 1000);
    }
  }, 100);
};

  return (
    <>
      <div className="gis-main-content visible">
        <section className="gis-hero-section">
          <video 
            className="gis-video-background" 
            autoPlay 
            muted 
            loop 
            playsInline
            preload="metadata"
          >
            <source 
              src="https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-online/assets/arcgis-online-banner.mp4" 
              type="video/mp4" 
            />
          </video>
          
          <div className="gis-hero-container">
            <div className="gis-hero-content">
              <div className="gis-hero-text">
                <div className="gis-hero-logo-wrapper">
                  <img 
                    src="/assets/logoGIS.png" 
                    alt="GIS Solutions Logo" 
                    className="gis-hero-logo-main"
                  />
                </div>
                <h1 className="gis-hero-title">
                  GIS Solutions
                  <br />
                  (Private) Limited
                </h1>
                <p className="gis-hero-subtitle">
                  Transforming data into actionable insights with cutting-edge geographic intelligence and spatial analysis solutions
                </p>
                <div className="gis-hero-actions">
                  <calcite-button 
                    appearance="solid" 
                    kind="brand" 
                    scale="l"
                  >
                    Get Started
                  </calcite-button>
                  <calcite-button 
                    appearance="outline" 
                    kind="neutral" 
                    scale="l"
                  >
                    Learn More
                  </calcite-button>
                </div>
              </div>
            </div>
          </div>

          {/* Event Notification Popup */}
          {showNotification && (
            <div className="event-notification-popup">
              <div className="event-notification-content">
                <button 
                  className="event-notification-close"
                  onClick={() => setShowNotification(false)}
                  aria-label="Close notification"
                >
                  <calcite-icon icon="x" scale="s"></calcite-icon>
                </button>
                
                <div className="event-notification-grid">
  {/* Left - Image */}
  <div className="event-notification-image">
    <img 
      src="/assets/storymap.jpeg" 
      alt="GIS Day 2025 Event"
      onError={(e) => {
        e.target.src = "https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-storymaps/assets/arcgis-storymaps.jpg";
      }}
    />
  </div>

  {/* Right - Content */}
  <div className="event-notification-text">
    <div className="event-notification-header">
      <calcite-icon icon="まつり" scale="s"></calcite-icon>
      <span className="event-notification-badge">Upcoming Event</span>
    </div>
    
    <h3 className="event-notification-title">
      GIS Day 2025 Celebration
    </h3>
    
    <p className="event-notification-description">
      Join our StoryMaps Competition & Online Webinar celebrating the beauty of Sri Lanka!
    </p>

    <div className="event-notification-details">
      <div className="event-detail-item">
        <calcite-icon icon="calendar" scale="s"></calcite-icon>
        <span>November 19, 2025</span>
      </div>
      <div className="event-detail-item">
        <calcite-icon icon="award" scale="s"></calcite-icon>
        <span>Win Exciting Prizes</span>
      </div>
    </div>

    <div className="event-notification-actions">
      <calcite-button
        appearance="solid"
        kind="brand"
        scale="s"
        icon-end="arrow-right"
        onClick={handleNavigateToEvents}
      >
        View Event Details
      </calcite-button>
      <calcite-button
        appearance="outline"
        kind="brand"
        scale="s"
        icon-end="launch"
        onClick={() => window.open('https://arcg.is/0DvGT4', '_blank')}
      >
        Register Now
      </calcite-button>
      <calcite-button
        appearance="outline"
        kind="neutral"
        scale="s"
        icon-end="launch"
        onClick={() => window.open('https://storymaps.gislk.com/', '_blank')}
      >
        Competition Website
      </calcite-button>
    </div>
  </div>
</div>
              </div>
            </div>
          )}
        </section>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .gis-main-content {
          opacity: 1;
        }

        .gis-hero-section {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          padding: 0;
          margin: 0;
          display: flex;
          align-items: center;
        }

        .gis-video-background {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100vh;
          object-fit: cover;
          transform: translate(-50%, -50%);
          z-index: 1;
        }

        .gis-hero-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem;
          width: 100%;
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          height: 100%;
        }

        .gis-hero-content {
          display: flex;
          align-items: center;
          width: 100%;
        }

        .gis-hero-text {
          max-width: 600px;
          text-align: left;
          animation: fadeInUp 1s ease-out 0.2s both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gis-hero-logo-wrapper {
          margin-bottom: 2rem;
          animation: fadeInScale 1s ease-out both;
          text-align: left;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .gis-hero-logo-main {
          width: 120px;
          height: auto;
          filter: drop-shadow(0 4px 12px rgba(0, 122, 194, 0.3));
        }

        .gis-hero-title {
          font-size: 4rem;
          font-weight: 300;
          color: #151515;
          margin: 0 0 1.5rem 0;
          line-height: 1.15;
          letter-spacing: -0.03em;
        }

        .gis-hero-subtitle {
          font-size: 1.25rem;
          color: #6a6a6a;
          font-weight: 300;
          line-height: 1.8;
          margin: 0 0 2.5rem 0;
        }

        .gis-hero-actions {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
          justify-content: flex-start;
        }

        calcite-button {
          --calcite-button-padding-x-l: 2.5rem;
          --calcite-button-padding-y-l: 1rem;
        }

        calcite-button::part(button) {
          font-size: 1.05rem;
          font-weight: 500;
          transition: all 0.3s ease;
          letter-spacing: 0.3px;
        }

        calcite-button[appearance="solid"]::part(button) {
          background: linear-gradient(135deg, #007ac2 0%, #005a8f 100%);
          border: none;
          box-shadow: 0 4px 15px rgba(0, 122, 194, 0.4);
        }

        calcite-button[appearance="solid"]:hover::part(button) {
          background: linear-gradient(135deg, #0090e0 0%, #007ac2 100%);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 122, 194, 0.6);
        }

        calcite-button[appearance="outline"]::part(button) {
          border: 2px solid #6a6a6a;
          color: #151515;
          background-color: transparent;
        }

        calcite-button[appearance="outline"]:hover::part(button) {
          background-color: rgba(0, 0, 0, 0.05);
          border-color: #151515;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        /* Event Notification Popup Styles */
        .event-notification-popup {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 1000;
          animation: slideInRight 0.6s ease-out;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

.event-notification-content {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid #e0e0e0;
  overflow: hidden;
  position: relative;
  max-width: 620px;
}

        .event-notification-close {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid #d4d4d4;
          border-radius: 4px;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.2s ease;
          padding: 0;
        }

        .event-notification-close:hover {
          background: #f0f0f0;
          border-color: #323232;
        }

        .event-notification-close calcite-icon {
          color: #323232;
        }

.event-notification-grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 0;
}

.event-notification-image {
  background: #f8f9fa;
  overflow: hidden;
  padding: 0.75rem;
}

.event-notification-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

        .event-notification-text {
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .event-notification-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .event-notification-header calcite-icon {
          color: #0079c1;
        }

        .event-notification-badge {
          background: linear-gradient(135deg, #0079c1 0%, #005a8f 100%);
          color: #ffffff;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .event-notification-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #151515;
          margin: 0;
          line-height: 1.3;
        }

        .event-notification-description {
          font-size: 0.875rem;
          color: #6a6a6a;
          margin: 0;
          line-height: 1.5;
        }

        .event-notification-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.75rem 0;
          border-top: 1px solid #e0e0e0;
          border-bottom: 1px solid #e0e0e0;
        }

        .event-detail-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: #323232;
        }

        .event-detail-item calcite-icon {
          color: #0079c1;
        }

.event-notification-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

        .event-notification-actions calcite-button {
          --calcite-button-padding-x-s: 1rem;
          --calcite-button-padding-y-s: 0.5rem;
        }

        .event-notification-actions calcite-button::part(button) {
          font-size: 0.875rem;
        }

        @media (max-width: 1024px) {
          .gis-video-background {
            width: 50%;
          }

          .gis-hero-title {
            font-size: 3.5rem;
          }

          .gis-hero-logo-main {
            width: 100px;
          }

          .event-notification-popup {
            right: 1rem;
            bottom: 1rem;
          }

          .event-notification-content {
            max-width: 450px;
          }
        }

        @media (max-width: 768px) {
          .gis-hero-section {
            height: auto;
            min-height: 100vh;
          }

          .gis-video-background {
            width: 90%;
            height: 20vh;
            position: relative;
            top: 0;
          }

          .gis-hero-container {
            padding: 3rem 2rem 4rem 2rem;
          }

          .gis-hero-title {
            font-size: 2.5rem;
          }

          .gis-hero-subtitle {
            font-size: 1.1rem;
          }

          .gis-hero-logo-main {
            width: 90px;
          }

          .gis-hero-actions {
            flex-direction: column;
            width: 100%;
          }

          calcite-button {
            width: 100%;
          }

          .event-notification-popup {
            left: 1rem;
            right: 1rem;
            bottom: 1rem;
          }

          .event-notification-content {
            max-width: 100%;
          }

          .event-notification-grid {
            grid-template-columns: 120px 1fr;
          }

          .event-notification-text {
            padding: 1rem;
          }

          .event-notification-title {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .gis-hero-container {
            padding: 2rem 1.5rem 3rem 1.5rem;
          }

          .gis-hero-title {
            font-size: 2rem;
          }

          .gis-hero-subtitle {
            font-size: 1rem;
          }

          .gis-hero-logo-main {
            width: 80px;
          }

          .event-notification-grid {
            grid-template-columns: 1fr;
          }

          .event-notification-image {
            height: 120px;
          }

          .event-notification-text {
            padding: 1rem;
          }
        }
      `}</style>
    </>
  );
}