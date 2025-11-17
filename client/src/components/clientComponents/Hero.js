import React, { useState } from 'react';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-icon';

export default function Hero() {
  const [showContent, setShowContent] = useState(false);

  const handleStartExperience = () => {
    setTimeout(() => {
      setShowContent(true);
    }, 300);
  };

  return (
    <>
      {!showContent && (
        <div className="gis-start-screen">
          <div className="gis-start-content">
            <img 
              src="/assets/logoGIS.png" 
              alt="GIS Solutions Logo" 
              className="gis-start-logo"
            />
            <h2 className="gis-start-title">GIS Solutions</h2>
            <p className="gis-start-subtitle">Experience Geographic Intelligence</p>
            <calcite-button 
              appearance="solid" 
              kind="brand" 
              scale="l"
              onClick={handleStartExperience}
            >
              Enter Site
            </calcite-button>
          </div>
        </div>
      )}

      <div className={`gis-main-content ${showContent ? 'visible' : ''}`}>
        {/* <nav className="gis-secondary-nav">
          <div className="gis-nav-container">
            <div className="gis-nav-left">
              <img 
                src="/assets/logoGIS.png" 
                alt="GIS Solutions Logo" 
                className="gis-nav-logo"
              />
              <span className="gis-nav-section-title">GIS Solutions</span>
            </div>
            <div className="gis-nav-links">
              <a href="#overview" className="gis-nav-link active">Overview</a>
              <a href="#focus-areas" className="gis-nav-link">Focus Areas</a>
              <a href="#events" className="gis-nav-link">Events</a>
              <a href="#community" className="gis-nav-link">Community</a>
              <a href="#program" className="gis-nav-link">Program</a>
            </div>
            <div className="gis-nav-right">
              <calcite-button appearance="solid" kind="brand" scale="s">
                Apply Now
              </calcite-button>
            </div>
          </div>
        </nav> */}

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
        </section>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .gis-start-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0a2540 0%, #1a365d 50%, #2d4a6e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .gis-start-content {
          text-align: center;
          animation: slideUp 0.8s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gis-start-logo {
          width: 180px;
          height: auto;
          margin-bottom: 2rem;
          filter: drop-shadow(0 4px 12px rgba(0, 212, 255, 0.3));
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 4px 12px rgba(0, 212, 255, 0.3));
          }
          50% {
            transform: scale(1.05);
            filter: drop-shadow(0 8px 20px rgba(0, 212, 255, 0.5));
          }
        }

        .gis-start-title {
          font-size: 3.5rem;
          font-weight: 300;
          color: #ffffff;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .gis-start-subtitle {
          font-size: 1.25rem;
          color: #b0d4f1;
          font-weight: 300;
          margin-bottom: 3rem;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        }

        .gis-main-content {
          opacity: 0;
          transition: opacity 0.8s ease-in;
        }

        .gis-main-content.visible {
          opacity: 1;
        }

        .gis-secondary-nav {
          background-color: rgba(21, 21, 21, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
          margin: 0;
        }

        .gis-nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 60px;
        }

        .gis-nav-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .gis-nav-logo {
          height: 35px;
          width: auto;
          filter: brightness(1.1);
        }

        .gis-nav-section-title {
          color: #ffffff;
          font-size: 1.1rem;
          font-weight: 500;
          margin-left: 0.5rem;
        }

        .gis-nav-links {
          display: flex;
          align-items: center;
          gap: 0;
          flex: 1;
          margin-left: 3rem;
        }

        .gis-nav-link {
          color: #d4d4d4;
          text-decoration: none;
          padding: 1.25rem 1.5rem;
          font-size: 0.95rem;
          font-weight: 400;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
          height: 60px;
          display: flex;
          align-items: center;
        }

        .gis-nav-link:hover {
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.08);
        }

        .gis-nav-link.active {
          color: #ffffff;
          border-bottom-color: #00d4ff;
          background-color: rgba(0, 212, 255, 0.1);
        }

        .gis-nav-right {
          margin-left: auto;
        }

.gis-hero-section {
  position: relative;
  width: 100%;
  height: 100vh;      /* FULL SCREEN */
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
  width: 100%;        /* ensures full width */
  height: 100vh;      /* video takes full height */
  object-fit: cover;  /* keeps proportions */
  transform: translate(-50%, -50%); /* centers correctly */
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

        @media (max-width: 1024px) {
          .gis-nav-links {
            margin-left: 2rem;
          }

          .gis-nav-link {
            padding: 1rem 1rem;
            font-size: 0.9rem;
          }

          .gis-video-background {
            width: 50%;
          }

          .gis-hero-title {
            font-size: 3.5rem;
          }

          .gis-hero-logo-main {
            width: 100px;
          }

          .gis-start-title {
            font-size: 2.75rem;
          }

          .gis-start-logo {
            width: 140px;
          }
        }

        @media (max-width: 768px) {
          .gis-nav-container {
            flex-wrap: wrap;
            height: auto;
            padding: 0.75rem 1.5rem;
          }

          .gis-nav-left {
            width: 100%;
            justify-content: center;
            margin-bottom: 0.75rem;
          }

          .gis-nav-links {
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            margin-left: 0;
            justify-content: flex-start;
          }

          .gis-nav-link {
            white-space: nowrap;
            padding: 0.85rem 1rem;
            font-size: 0.875rem;
          }

          .gis-nav-right {
            display: none;
          }

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

          .gis-start-title {
            font-size: 2.25rem;
          }

          .gis-start-logo {
            width: 120px;
          }

          .gis-hero-actions {
            flex-direction: column;
            width: 100%;
          }

          calcite-button {
            width: 100%;
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

          .gis-start-title {
            font-size: 1.875rem;
          }

          .gis-start-subtitle {
            font-size: 1rem;
          }

          .gis-start-logo {
            width: 100px;
          }
        }
      `}</style>
    </>
  );
}