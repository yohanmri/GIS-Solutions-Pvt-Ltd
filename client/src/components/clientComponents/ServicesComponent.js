import React, { useState, useEffect } from 'react';
import { publicAPI } from '../../api/axios';

import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-chip';
import '@esri/calcite-components/components/calcite-tabs';
import '@esri/calcite-components/components/calcite-tab';
import '@esri/calcite-components/components/calcite-tab-nav';
import '@esri/calcite-components/components/calcite-tab-title';
import '@esri/calcite-components/components/calcite-input';
import '@esri/calcite-components/components/calcite-label';
import '@esri/calcite-components/components/calcite-card';
import '@esri/calcite-components/components/calcite-loader';
import '../../styles/clientStyles/servicesComponent.css';



export default function Services() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedService, setExpandedService] = useState(null);

  // State for fetched data
  const [services, setServices] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [servicesRes, eventsRes] = await Promise.all([
          publicAPI.get('/client/services/professional'),
          publicAPI.get('/client/services/events')
        ]);

        setServices(servicesRes.data || []);
        setEvents(eventsRes.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to determine event status based on date
  const getEventStatus = (eventDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day

    const eventDay = new Date(eventDate);
    eventDay.setHours(0, 0, 0, 0);

    if (eventDay < today) {
      return {
        text: 'Previous Event',
        backgroundColor: '#ff6b35', // Orange
        color: '#ffffff'
      };
    } else {
      return {
        text: 'Upcoming Event',
        backgroundColor: 'linear-gradient(135deg, #0079c1 0%, #005a8f 100%)', // Blue gradient
        color: '#ffffff'
      };
    }
  };

  const categories = [
    { id: 'all', label: 'All Services', icon: 'apps' },
    { id: 'mapping', label: 'Mapping', icon: 'map' },
    { id: 'analysis', label: 'Analysis', icon: 'layers' },
    { id: 'remote-sensing', label: 'Remote Sensing', icon: 'satellite-3' },
    { id: 'consulting', label: 'Consulting', icon: 'gear' },
    { id: 'development', label: 'Development', icon: 'code' },
    { id: 'data', label: 'Data', icon: 'data-check' }
  ];

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(service => service.category === activeCategory);

  useEffect(() => {
    const shouldOpenEvents = sessionStorage.getItem('openEventsTab');
    if (shouldOpenEvents === 'true') {
      sessionStorage.removeItem('openEventsTab');
      setTimeout(() => {
        const eventsTabs = document.querySelectorAll('calcite-tab-title');
        eventsTabs.forEach(tab => {
          if (tab.textContent.includes('Events')) {
            tab.click();
          }
        });
      }, 500);
    }
  }, []);
  return (
    <section className="services-section">
      {/* Hero Header */}
      <div className="services-hero">
        <div className="services-hero-grid">
          <div className="services-hero-content">
            <h1 className="services-hero-title">Our Services</h1>
            <p className="services-hero-subtitle">
              Comprehensive GIS solutions tailored to meet your organization's unique spatial data challenges. Connect with our experts to learn more about current opportunities and what it's like to work with us.
            </p>
          </div>
          <div className="services-hero-image">
            <img
              src="https://www.esri.com/content/dam/esrisites/en-us/industries/2022/telecommunications/assets/overview/industry-telecom-2024-overview-banner-medium-foreground.png"
              alt="GIS mapping and spatial analysis visualization"
              loading="eager"
            />
          </div>
        </div>
      </div>

      <div className="services-container">
        {/* Main Tabs */}
        <div className="main-tabs-wrapper">
          <calcite-tabs>
            <calcite-tab-nav slot="title-group">
              <calcite-tab-title active className="tab-title-large">
                <calcite-icon icon="briefcase" scale="m"></calcite-icon>
                Professional Services
              </calcite-tab-title>

              <calcite-tab-title className="tab-title-large tab-title-events">
                Events
              </calcite-tab-title>
            </calcite-tab-nav>

            {/* TAB 1: PROFESSIONAL SERVICES */}
            <calcite-tab active>
              <div className="tab-content">
                {/* Overview Section */}
                <div className="services-overview">
                  <h2 className="section-title">Professional GIS Services</h2>
                  <p className="section-description">
                    We offer a complete range of Geographic Information System services designed to help
                    organizations leverage spatial data for better decision-making. Our team of experienced
                    GIS professionals delivers high-quality solutions using industry-leading technologies
                    and best practices.
                  </p>

                  {/* Stats */}
                  <div className="services-stats">
                    <div className="stat-item">
                      <calcite-icon icon="check-circle" scale="l"></calcite-icon>
                      <h3 className="stat-number">500+</h3>
                      <p className="stat-label">Projects Delivered</p>
                    </div>
                    <div className="stat-item">
                      <calcite-icon icon="users" scale="l"></calcite-icon>
                      <h3 className="stat-number">150+</h3>
                      <p className="stat-label">Satisfied Clients</p>
                    </div>
                    <div className="stat-item">
                      <calcite-icon icon="award" scale="l"></calcite-icon>
                      <h3 className="stat-number">15+</h3>
                      <p className="stat-label">Years Experience</p>
                    </div>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="category-filter">
                  {categories.map((category) => (
                    <calcite-button
                      key={category.id}
                      appearance={activeCategory === category.id ? 'solid' : 'outline'}
                      kind="brand"
                      scale="m"
                      icon-start={category.icon}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.label}
                    </calcite-button>
                  ))}
                </div>

                {/* Loading State */}
                {loading && (
                  <div style={{ textAlign: 'center', padding: '40px' }}>
                    <calcite-loader active scale="l"></calcite-loader>
                    <p style={{ marginTop: '20px', color: '#64748b' }}>Loading services...</p>
                  </div>
                )}

                {/* Error State */}
                {error && !loading && (
                  <div className="events-coming-soon">
                    <calcite-icon icon="exclamation-mark-triangle" scale="l"></calcite-icon>
                    <h4>Error Loading Services</h4>
                    <p>{error}</p>
                  </div>
                )}

                {/* Services Grid */}
                <div className="services-grid">
                  {!loading && !error && filteredServices.map((service, index) => (
                    <div
                      key={index}
                      className={`service-card ${expandedService === index ? 'expanded' : ''}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Card Header */}
                      <div className="service-header">
                        <div
                          className="service-icon"
                          style={{ backgroundColor: `${service.color}15` }}
                        >
                          <calcite-icon
                            icon={service.icon}
                            scale="l"
                            style={{ color: service.color }}
                          ></calcite-icon>
                        </div>

                        <h3 className="service-title">{service.title}</h3>
                        <p className="service-description">{service.description}</p>
                      </div>

                      {/* Card Body */}
                      <div className="service-body">
                        {/* Features */}
                        <div className="service-section">
                          <h4 className="section-heading">
                            <calcite-icon icon="check-circle" scale="s"></calcite-icon>
                            Key Features
                          </h4>
                          <div
                            className="chips-container"
                            style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                          >
                            {service.features.map((feature, idx) => (
                              <calcite-chip
                                key={idx}
                                scale="m"
                                appearance="solid"
                                class="chip-inline"
                                style={{

                                }}
                              >
                                {feature}
                              </calcite-chip>
                            ))}
                          </div>


                        </div>

                        {/* Expanded Content */}
                        {expandedService === index && (
                          <>
                            {/* Benefits */}
                            <div className="service-section">
                              <h4 className="section-heading">
                                <calcite-icon icon="lightbulb" scale="s"></calcite-icon>
                                Benefits
                              </h4>
                              <ul className="benefits-list">
                                {service.benefits.map((benefit, idx) => (
                                  <li key={idx}>
                                    <calcite-icon
                                      icon="check"
                                      scale="s"
                                      style={{ color: service.color }}
                                    ></calcite-icon>
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Applications */}
                            <div className="service-section">
                              <h4 className="section-heading">
                                <calcite-icon icon="apps" scale="s"></calcite-icon>
                                Applications
                              </h4>
                              <div className="chips-container">
                                {service.applications.map((app, idx) => (
                                  <calcite-chip key={idx} scale="s" kind="brand">
                                    {app}
                                  </calcite-chip>
                                ))}
                              </div>
                            </div>

                            {/* Technologies */}
                            <div className="service-section">
                              <h4 className="section-heading">
                                <calcite-icon icon="gear" scale="s"></calcite-icon>
                                Technologies Used
                              </h4>
                              <div className="tech-tags">
                                {service.technologies.map((tech, idx) => (
                                  <span
                                    key={idx}
                                    className="tech-tag"
                                    style={{
                                      backgroundColor: `${service.color}15`,
                                      color: service.color
                                    }}
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="service-footer">
                        <calcite-button
                          appearance="outline"
                          kind="brand"
                          width="full"
                          icon-end={expandedService === index ? "chevron-up" : "chevron-down"}
                          onClick={() => setExpandedService(expandedService === index ? null : index)}
                        >
                          {expandedService === index ? 'Show Less' : 'Learn More'}
                        </calcite-button>
                        <calcite-button
                          appearance="solid"
                          kind="brand"
                          width="full"
                          icon-end="arrow-right"
                        >
                          Request Quote
                        </calcite-button>
                      </div>
                    </div>
                  ))}
                </div>


              </div>
            </calcite-tab>


            {/* TAB 3: EVENTS */}
            <calcite-tab>
              <div className="tab-content events-tab-content">
                <div className="events-header">
                  <h2 className="section-title">Upcoming Events</h2>
                  <p className="section-description">
                    Join us in celebrating innovation, creativity, and the power of geographic storytelling.
                    Explore our upcoming events and competitions designed to inspire the GIS community.
                  </p>
                </div>

                {/* Loading State */}
                {loading && (
                  <div style={{ textAlign: 'center', padding: '40px' }}>
                    <calcite-loader active scale="l"></calcite-loader>
                    <p style={{ marginTop: '20px', color: '#64748b' }}>Loading events...</p>
                  </div>
                )}

                {/* Error State */}
                {error && !loading && (
                  <div className="events-coming-soon">
                    <calcite-icon icon="exclamation-mark-triangle" scale="l"></calcite-icon>
                    <h4>Error Loading Events</h4>
                    <p>{error}</p>
                  </div>
                )}

                {/* Events List */}
                {!loading && !error && events.length > 0 && events.map((event, index) => {
                  const eventStatus = getEventStatus(event.eventDate);

                  return (
                    <calcite-card key={event._id || index} class="event-main-card">
                      <div className="event-card-grid">
                        {/* Left Side - Event Details */}
                        <div className="event-details-side">
                          <div
                            className="event-celebration-header"
                            style={{
                              background: eventStatus.backgroundColor,
                              color: eventStatus.color
                            }}
                          >
                            <calcite-icon icon="globe" scale="s"></calcite-icon>
                            {eventStatus.text}
                            <calcite-icon icon="まつり" scale="s"></calcite-icon>
                          </div>

                          <h3 className="event-card-title">{event.title}</h3>
                          <p className="event-theme">{event.theme}</p>

                          <div className="event-card-description">
                            <p>{event.description}</p>
                            {event.prizes && (
                              <div className="event-prize-highlight">
                                <calcite-icon icon="star" scale="s"></calcite-icon>
                                {event.prizes}
                              </div>
                            )}
                          </div>

                          <div className="event-info-grid">
                            <div className="event-info-item">
                              <calcite-icon icon="organization" scale="s"></calcite-icon>
                              <div className="event-info-text">
                                <h4>Organized By</h4>
                                <p>{event.organizer || 'GIS Solutions (Pvt) Ltd'}</p>
                              </div>
                            </div>

                            <div className="event-info-item">
                              <calcite-icon icon="calendar" scale="s"></calcite-icon>
                              <div className="event-info-text">
                                <h4>Date</h4>
                                <p>{new Date(event.eventDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}</p>
                              </div>
                            </div>

                            <div className="event-info-item">
                              <calcite-icon icon="globe" scale="s"></calcite-icon>
                              <div className="event-info-text">
                                <h4>Theme</h4>
                                <p>{event.theme}</p>
                              </div>
                            </div>

                            {event.prizes && (
                              <div className="event-info-item">
                                <calcite-icon icon="award" scale="s"></calcite-icon>
                                <div className="event-info-text">
                                  <h4>Prizes</h4>
                                  <p>{event.prizes}</p>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="event-card-actions">
                            {event.registrationLink && (
                              <calcite-button
                                appearance="solid"
                                kind="brand"
                                scale="l"
                                icon-end="rocket"
                                onClick={() => window.open(event.registrationLink, '_blank')}
                              >
                                Register Now
                              </calcite-button>
                            )}
                            {event.websiteLink && (
                              <calcite-button
                                appearance="outline"
                                kind="brand"
                                scale="l"
                                icon-end="launch"
                                onClick={() => window.open(event.websiteLink, '_blank')}
                              >
                                Event Website
                              </calcite-button>
                            )}
                          </div>
                        </div>

                        {/* Right Side - Event Poster */}
                        <div className="event-poster-side">
                          {(() => {
                            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
                            const imageSrc = event.posterImage
                              ? (event.posterImage.startsWith('/uploads/') ? `${API_URL}${event.posterImage}` : event.posterImage)
                              : "/assets/storymap.jpeg";

                            return (
                              <img
                                src={imageSrc}
                                alt={`${event.title} Poster`}
                                className="event-poster-image"
                                onError={(e) => {
                                  e.target.src = "https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-storymaps/assets/arcgis-storymaps.jpg";
                                }}
                              />
                            );
                          })()}
                        </div>
                      </div>
                    </calcite-card>
                  );
                })}

                {/* No Events State */}
                {!loading && !error && events.length === 0 && (
                  <div className="events-coming-soon">
                    <calcite-icon icon="information" scale="l"></calcite-icon>
                    <h4>No Events Available</h4>
                    <p>Stay tuned for upcoming workshops, webinars, and community events.</p>
                  </div>
                )}
              </div>
            </calcite-tab>
          </calcite-tabs>
        </div>

        {/* CTA Section */}
        <div className="services-cta">
          <div className="services-cta-grid">
            <div className="services-cta-content">
              <img
                src="/assets/logoGIS.png"
                alt="GIS Solutions Logo"
                className="cta-logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <h2 className="cta-title">Let's Work Together</h2>
              <p className="cta-description">
                Partner with us to unlock the full potential of your spatial data. Our expert team is ready to deliver innovative GIS solutions tailored to your unique challenges.
              </p>
              <div className="cta-buttons">
                <calcite-button
                  appearance="solid"
                  kind="inverse"
                  scale="l"
                >
                  Get in Touch
                </calcite-button>
                <calcite-button
                  appearance="outline"
                  kind="inverse"
                  scale="l"
                  icon-start="book"
                >
                  View Our Work
                </calcite-button>
              </div>
            </div>
            <div className="services-cta-image">
            </div>
          </div>
        </div>
      </div>

      <link rel="stylesheet" href="./styles/services.css" />
    </section>
  );
}