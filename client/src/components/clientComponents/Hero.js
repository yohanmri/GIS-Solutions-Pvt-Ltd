import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-notice';
import '../../styles/clientStyles/hero.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export default function Hero({ setPage }) {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentNotifications();
  }, []);

  const fetchCurrentNotifications = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/notifications/current`);
      if (response.data && response.data.length > 0) {
        // Get the first active notification
        setNotification(response.data[0]);
        // Show notification after 1 second
        setTimeout(() => {
          setShowNotification(true);
        }, 1000);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToEvent = () => {
    setShowNotification(false);

    if (notification?.navigateTo) {
      // If navigateTo contains query params, navigate accordingly
      if (notification.navigateTo.includes('?event=')) {
        const eventId = notification.navigateTo.split('?event=')[1];
        sessionStorage.setItem('openEventsTab', 'true');
        sessionStorage.setItem('selectedEventId', eventId);
        if (setPage) {
          setPage('services');
        } else {
          navigate('/services');
        }
      } else {
        navigate(notification.navigateTo);
      }
    } else {
      // Fallback to old behavior
      sessionStorage.setItem('openEventsTab', 'true');
      if (setPage) {
        setPage('services');
      } else {
        navigate('/services');
      }
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = 64;
      const targetPosition = section.offsetTop - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleGetStarted = () => {
    scrollToSection('home-arcgis-section');
  };

  const handleLearnMore = () => {
    scrollToSection('home-capabilities-section');
  };

  return (
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
                onClick={handleGetStarted}
              >
                Get Started
              </calcite-button>
              <calcite-button
                appearance="outline"
                kind="neutral"
                scale="l"
                onClick={handleLearnMore}
              >
                Learn More
              </calcite-button>
            </div>
          </div>
        </div>
      </div>

      {showNotification && notification && (
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
              <div className="event-notification-image">
                <img
                  src={notification.image}
                  alt={notification.title}
                  onError={(e) => {
                    e.target.src = "https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-storymaps/assets/arcgis-storymaps.jpg";
                  }}
                />
              </div>

              <div className="event-notification-text">
                <div className="event-notification-header">
                  <calcite-icon icon="まつり" scale="s"></calcite-icon>
                  <span className="event-notification-badge">
                    {notification.badge || 'Upcoming Event'}
                  </span>
                </div>

                <h3 className="event-notification-title">
                  {notification.title}
                </h3>

                <p className="event-notification-description">
                  {notification.description}
                </p>

                {notification.serviceId && (
                  <div className="event-notification-details">
                    <div className="event-detail-item">
                      <calcite-icon icon="link" scale="s"></calcite-icon>
                      <span>Linked Event</span>
                    </div>
                  </div>
                )}

                <div className="event-notification-actions">
                  {notification.buttons && notification.buttons.map((button, index) => (
                    <calcite-button
                      key={index}
                      appearance={index === 0 ? 'solid' : 'outline'}
                      kind="brand"
                      scale="s"
                      icon-end={button.type === 'external' ? 'launch' : 'arrow-right'}
                      onClick={() => {
                        if (button.type === 'internal') {
                          if (index === 0) {
                            // First button navigates to event
                            handleNavigateToEvent();
                          } else {
                            navigate(button.link);
                          }
                        } else {
                          window.open(button.link, '_blank');
                        }
                      }}
                    >
                      {button.label}
                    </calcite-button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}