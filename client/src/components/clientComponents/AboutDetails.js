import React, { useState, useRef, useEffect } from 'react';
import '@esri/calcite-components/dist/calcite/calcite.css';

const sections = [
  {
    id: 'overview',
    layout: 'media-left',
    title: 'About GIS Solutions (Pvt) Ltd',
    content: [
      "GIS Solutions (Pvt) Ltd is a Sri Lanka-based provider of geographic information systems (GIS), location analytics and mapping solutions. As the authorized distributor of the ArcGIS platform in Sri Lanka, we deliver comprehensive GIS software, consultancy, training and systems integration services.",
      "We serve government agencies, utilities and private sector clients across the country, helping them harness the power of spatial intelligence to make better decisions. Our expertise spans from software licensing and implementation to custom application development and professional training programs."
    ],
    media: {
      background: 'https://www.esri.com/content/dam/esrisites/en-us/common/imagery/about/gis-day-2023.jpg',
      foregroundImage: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1200&q=80',
      caption: 'Spatial Intelligence',
      description: 'Empowering organizations across Sri Lanka with location analytics and mapping solutions that drive better decision-making.'
    }
  },
  {
    id: 'vision-mission',
    layout: 'media-right',
    title: 'Our Vision & Mission',
    content: [
      "Our vision is to make spatial intelligence accessible to organizations across Sri Lanka so they can make better, data-driven decisions that improve services and infrastructure.",
      "We achieve this through our mission: to deliver reliable, scalable GIS solutions and professional services—including software licensing, customized applications, data management, and training—that enable customers to visualize, analyze and act on spatial information effectively.",
      "By combining cutting-edge technology with local expertise, we empower our clients to unlock the full potential of their geographic data."
    ],
    media: {
      background: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80',
      foregroundImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      caption: 'Data-Driven Decision Making',
      description: 'Transforming complex spatial data into actionable insights for better planning and operations.'
    },
    buttons: [
      { text: "Our Services", icon: "layers", variant: "solid" },
      { text: "Contact Us", icon: "arrow-right", variant: "outline" }
    ]
  },
  {
    id: 'history',
    layout: 'media-left',
    title: 'Where it all began',
    content: [
      "GIS Solutions (Pvt) Ltd was established to focus on GIS and location-analytics services in Sri Lanka. A major milestone came in 2012 when we were appointed by ESRI as the authorized distributor of ArcGIS for Sri Lanka.",
      "Since that pivotal moment, we have grown to serve hundreds of organizations across the country, delivering turnkey GIS deployments for municipal, utility and transport clients. As part of the Just In Time Group ecosystem of ICT companies, we leverage extensive experience in large systems integration projects.",
      "Our journey has been marked by consistent delivery of GIS projects for multiple government agencies and large enterprises, building local capacity and advancing spatial intelligence adoption throughout Sri Lanka."
    ],
    media: {
      background: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80',
      foregroundImage: 'https://images.unsplash.com/photo-1504197885-659d6c789323?w=1200&q=80',
      caption: 'Established in Sri Lanka',
      description: 'Since 2012, serving organizations nationwide with world-class GIS technology and local expertise.'
    }
  },
  {
    id: 'values',
    layout: 'media-right',
    title: 'Our Core Values',
    content: [
      "Technical Excellence and Quality Delivery: We maintain the highest standards in every project, ensuring our solutions are robust, reliable and built to last.",
      "Customer Focus and Practical Solutions: We listen to our clients' needs and deliver practical, real-world solutions that address their specific challenges.",
      "Integrity and Reliability: We build lasting relationships based on trust, transparency and consistent delivery.",
      "Continuous Learning and Innovation: We stay at the forefront of GIS technology, continuously expanding our capabilities to better serve our clients."
    ],
    media: {
      background: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80',
      foregroundImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
      caption: 'Partnership and Trust',
      description: 'Building strong relationships with clients through integrity, expertise and reliable service delivery.'
    }
  },
  {
    id: 'services',
    layout: 'media-left',
    title: 'Comprehensive GIS Services',
    content: [
      "As the sole authorized distributor for ArcGIS in Sri Lanka, we offer complete ArcGIS licensing and implementation services. Our expertise extends to custom GIS application development, systems integration, and seamless deployment of enterprise solutions.",
      "We provide end-to-end spatial data services including collection, data management and geodatabase design. Our location analytics and geospatial consultancy services help organizations extract maximum value from their geographic information.",
      "Through targeted training programs and capacity-building workshops, we empower teams with the skills to effectively use GIS tools and workflows, ensuring sustainable adoption of spatial intelligence across organizations."
    ],
    media: {
      background: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80',
      foregroundImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80',
      caption: 'Technology Solutions',
      description: 'From ArcGIS licensing to custom development and training—comprehensive services for every GIS need.'
    },
    buttons: [
      { text: "Explore Our Services", icon: "layers", variant: "solid" },
      { text: "Request a Demo", icon: "video", variant: "outline" }
    ]
  },
  {
    id: 'objectives',
    layout: 'media-right',
    title: 'Driving Spatial Intelligence Forward',
    content: [
      "Our strategic objectives focus on expanding the adoption of spatial analytics across both public and private sectors in Sri Lanka. We are committed to delivering turnkey GIS deployments that transform how municipal, utility and transport organizations operate.",
      "By building local capacity through comprehensive training programs and workshops, we ensure that spatial intelligence becomes an integral part of decision-making processes across industries.",
      "We continue to work towards making GIS technology accessible, practical and impactful for organizations of all sizes throughout Sri Lanka."
    ],
    media: {
      background: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=80',
      foregroundImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      caption: 'Infrastructure Planning',
      description: 'Supporting government and private sectors with GIS solutions for better infrastructure and service delivery.'
    },
    buttons: [
      { text: "Learn More", icon: "arrow-right", variant: "solid" }
    ]
  }
];

export default function AboutDetails() {
  const renderMedia = (section) => {
    const hasImage = section.media.foregroundImage;

    return (
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '700px',
        overflow: 'hidden'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}>
          <img 
            src={section.media.background}
            alt="Background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Foreground Image Overlay */}
        {hasImage && (
          <div style={{
            position: 'absolute',
            top: '15%',
            right: section.layout === 'media-left' ? '5%' : 'auto',
            left: section.layout === 'media-right' ? '10%' : 'auto',
            width: '50%',
            height: '55%',
            zIndex: 2,
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <img 
              src={section.media.foregroundImage}
              alt={section.media.caption}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        )}

        {/* Caption Box */}
        <div style={{
          position: 'absolute',
          bottom: '8%',
          left: section.layout === 'media-left' ? '8%' : 'auto',
          right: section.layout === 'media-right' ? '8%' : 'auto',
          width: '400px',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '2rem',
          borderRadius: '4px',
          backdropFilter: 'blur(10px)',
          zIndex: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '500',
            marginBottom: '0.75rem',
            color: '#2b2b2b'
          }}>
            {section.media.caption}
          </h3>
          <p style={{
            fontSize: '0.95rem',
            color: '#555',
            margin: 0,
            lineHeight: '1.6'
          }}>
            {section.media.description}
          </p>
        </div>
      </div>
    );
  };

  const renderSection = (section, index) => {
    const isMediaLeft = section.layout === 'media-left';

    const textContent = (
      <div style={{
        padding: 'clamp(2.5rem, 6vw, 5rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: index % 2 === 0 ? '#fff' : '#f8f8f8'
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          fontWeight: '400',
          lineHeight: '1.2',
          marginBottom: '2rem',
          color: '#2b2b2b'
        }}>
          {section.title}
        </h2>

        {section.content.map((paragraph, idx) => (
          <p key={idx} style={{
            fontSize: '1.0625rem',
            lineHeight: '1.8',
            color: '#444',
            marginBottom: '1.5rem',
            maxWidth: '650px'
          }}>
            {paragraph}
          </p>
        ))}

        {section.buttons && (
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {section.buttons.map((button, idx) => (
              <calcite-button
                key={idx}
                appearance={button.variant === 'solid' ? 'solid' : 'outline'}
                icon-end={button.icon}
                scale="l"
                style={button.variant === 'solid' ? {
                  '--calcite-button-background': '#2b2b2b',
                  '--calcite-button-text-color': '#fff'
                } : {
                  '--calcite-button-border-color': '#2b2b2b',
                  '--calcite-button-text-color': '#2b2b2b'
                }}
              >
                {button.text}
              </calcite-button>
            ))}
          </div>
        )}
      </div>
    );

    const mediaContent = renderMedia(section);

    return (
      <div 
        key={section.id} 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
          minHeight: '700px'
        }}
      >
        {isMediaLeft ? (
          <>
            {mediaContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {mediaContent}
          </>
        )}
      </div>
    );
  };

  const renderFirstSection = () => {
    const section = sections[0];
    const hasImage = section.media.foregroundImage;
    
    return (
      <div 
        key={section.id} 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
          minHeight: '700px'
        }}
      >
        {/* Media side with logo overlay */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: '700px',
          overflow: 'hidden'
        }}>
          {/* Background Image */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1
          }}>
            <img 
              src={section.media.background}
              alt="Background"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Logo Overlay - NO BACKGROUND */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '30%',
            zIndex: 4,
            filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))'
          }}>
            <img 
              src="/assets/logoGIS.png" 
              alt="GIS Solutions Logo"
              style={{
                maxWidth: '250px',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>

          {/* Foreground Image */}
          {hasImage && (
            <div style={{
              position: 'absolute',
              top: '15%',
              right: '5%',
              width: '50%',
              height: '55%',
              zIndex: 2,
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}>
              <img 
                src={section.media.foregroundImage}
                alt={section.media.caption}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          )}

          {/* Caption Box */}
          <div style={{
            position: 'absolute',
            bottom: '8%',
            left: '8%',
            width: '400px',
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '2rem',
            borderRadius: '4px',
            backdropFilter: 'blur(10px)',
            zIndex: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '500',
              marginBottom: '0.75rem',
              color: '#2b2b2b'
            }}>
              {section.media.caption}
            </h3>
            <p style={{
              fontSize: '0.95rem',
              color: '#555',
              margin: 0,
              lineHeight: '1.6'
            }}>
              {section.media.description}
            </p>
          </div>
        </div>
        
        {/* Text content side */}
        <div style={{
          padding: 'clamp(2.5rem, 6vw, 5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#fff'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: '400',
            lineHeight: '1.2',
            marginBottom: '2rem',
            color: '#2b2b2b'
          }}>
            {section.title}
          </h2>

          {section.content.map((paragraph, idx) => (
            <p key={idx} style={{
              fontSize: '1.0625rem',
              lineHeight: '1.8',
              color: '#444',
              marginBottom: '1.5rem',
              maxWidth: '650px'
            }}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ background: '#fff' }}>
      {renderFirstSection()}
      {sections.slice(1).map((section, index) => renderSection(section, index + 1))}
    </div>
  );
}