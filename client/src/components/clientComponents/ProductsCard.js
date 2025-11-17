import React, { useState } from 'react';
import '@esri/calcite-components/dist/calcite/calcite.css';

export default function ProductsComponent({ setPage }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Organized by Esri's three major product categories
  const productCategories = {
    online: {
      name: "ArcGIS Online",
      color: "#7b5fa6",
      description: "Cloud-based GIS platform for creating and sharing maps",
      products: [
        { 
          icon: "/assets/arcGISonline.png", 
          title: "ArcGIS Online", 
          desc: "Cloud-based mapping platform for creating, sharing, and managing web maps and spatial data across organizations.",
          features: ["Cloud Storage", "Collaboration", "Web Maps", "Data Management"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-online/overview"
        },
        { 
          icon: "/assets/survey.png", 
          title: "Survey123", 
          desc: "Create smart forms to collect field data quickly with customizable surveys that work online and offline.",
          features: ["Custom Forms", "Offline Mode", "Photo Capture", "GPS Integration"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-survey123/overview"
        },
        { 
          icon: "/assets/dashboards.png", 
          title: "ArcGIS Dashboards", 
          desc: "Build compelling data visualizations with interactive charts, maps, and indicators for real-time monitoring.",
          features: ["Real-time Data", "Interactive Charts", "KPI Indicators", "Custom Themes"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-dashboards/overview"
        },
        { 
          icon: "/assets/field-maps.png", 
          title: "Field Maps", 
          desc: "Mobile app for field data collection and asset management with offline capabilities and custom forms.",
          features: ["Offline Maps", "Asset Management", "Navigation", "Data Collection"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-field-maps/overview"
        },
        { 
          icon: "/assets/storymap.png", 
          title: "StoryMaps", 
          desc: "Transform your maps into immersive narrative experiences that combine text, multimedia, and interactive content.",
          features: ["Narrative Maps", "Multimedia", "Templates", "Sharing"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-storymaps/overview"
        },
        { 
          icon: "/assets/quickCapture.png", 
          title: "QuickCapture", 
          desc: "Rapidly collect field observations with one-tap buttons for fast data capture at walking or driving speeds.",
          features: ["One-tap Capture", "High-speed Collection", "Custom Buttons", "GPS Tracking"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-quickcapture/overview"
        },
        { 
          icon: "/assets/product6.png", 
          title: "ArcGIS Insights", 
          desc: "Perform spatial analytics and data science workflows with an intuitive drag-and-drop interface.",
          features: ["Spatial Analytics", "Data Science", "Visualization", "Drag & Drop"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-insights/overview"
        }
      ]
    },
    pro: {
      name: "ArcGIS Pro",
      color: "#6d4f96",
      description: "Professional desktop GIS for advanced analysis",
      products: [
        { 
          icon: "/assets/arcgis-pro.png", 
          title: "ArcGIS Pro", 
          desc: "Professional desktop GIS application for advanced mapping, spatial analysis, data management, and visualization workflows.",
          features: ["Advanced Analytics", "3D Mapping", "Geoprocessing", "Publishing"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-pro/overview"
        }
      ]
    },
    enterprise: {
      name: "ArcGIS Enterprise",
      color: "#8b4c9f",
      description: "On-premises GIS platform for organizations",
      products: [
        { 
          icon: "/assets/product1.png", 
          title: "ArcGIS Enterprise", 
          desc: "Complete enterprise GIS platform for secure deployment and management of geospatial services within your infrastructure.",
          features: ["On-Premise", "Security", "Scalability", "Enterprise Ready"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-enterprise/overview"
        },
        { 
          icon: "/assets/experience-builderlogo.png", 
          title: "Experience Builder", 
          desc: "Build custom web applications with drag-and-drop widgets without writing code for map-centric experiences.",
          features: ["No-code Builder", "Drag & Drop", "Custom Widgets", "Responsive Design"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-experience-builder/overview"
        },
        { 
          icon: "/assets/product2.png", 
          title: "ArcGIS Hub", 
          desc: "Community engagement platform to share data, apps, and initiatives with citizens and stakeholders.",
          features: ["Community Portal", "Data Sharing", "Collaboration", "Engagement"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-hub/overview"
        },
        { 
          icon: "/assets/product8.png", 
          title: "ArcGIS Velocity", 
          desc: "Real-time and big data analytics platform for processing streaming IoT and sensor data.",
          features: ["Real-time Analytics", "IoT Integration", "Stream Processing", "Big Data"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-velocity/overview"
        },
        { 
          icon: "/assets/product10.png", 
          title: "ArcGIS Indoors", 
          desc: "Indoor mapping and space management platform for facilities, campuses, and indoor navigation.",
          features: ["Indoor Maps", "Space Management", "Wayfinding", "Facilities"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-indoors/overview"
        },
        { 
          icon: "/assets/product9.png", 
          title: "ArcGIS Urban", 
          desc: "3D urban planning solution for designing, planning, and visualizing city development projects.",
          features: ["3D Planning", "Urban Design", "Visualization", "Zoning"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-urban/overview"
        }
      ]
    }
  };

  return (
    <div style={{ background: '#fff' }}>
      {/* Hero Section */}
      <div style={{
        position: 'relative',
        height: '500px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        overflow: 'hidden',
        background: '#fff'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: 'clamp(2rem, 6vw, 4rem)',
          zIndex: 10,
          position: 'relative',
          background: '#fff'
        }}>
          <div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: '400',
              color: '#2b2b2b',
              marginBottom: '1rem',
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}>
              Products
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#555',
              fontWeight: '300',
              lineHeight: '1.6',
              maxWidth: '450px',
              margin: 0
            }}>
              Comprehensive ArcGIS solutions for spatial intelligence
            </p>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          zIndex: 1
        }}>
          <img 
            src="https://www.esri.com/content/dam/esrisites/en-us/industries/2020/business/sector/assets/overview/business-banner-large-background.jpg"
            alt="Background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(167, 119, 227, 0.65) 0%, rgba(149, 104, 213, 0.75) 100%)',
            zIndex: 2
          }} />
        </div>

        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          zIndex: 5,
          pointerEvents: 'none'
        }}>
          <div style={{
            position: 'absolute',
            top: '8%',
            left: '15%',
            width: '60%',
            height: '65%',
            zIndex: 3,
            border: '12px solid #2b2b2b',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
          }}>
            <img 
              src="https://www.esri.com/content/dam/esrisites/en-us/industries/2020/business/sector/assets/overview/business-banner-foreground-overview.png"
              alt="GIS Map"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          <div style={{
            position: 'absolute',
            bottom: '12%',
            right: '8%',
            width: '35%',
            height: '32%',
            zIndex: 5,
            border: '8px solid #ffffff',
            boxShadow: '0 15px 40px rgba(0,0,0,0.3)'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
              alt="Person using laptop"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          <div style={{
            position: 'absolute',
            bottom: '18%',
            left: '8%',
            width: '32%',
            height: '28%',
            zIndex: 4,
            border: '6px solid #ffffff',
            boxShadow: '0 12px 35px rgba(0,0,0,0.25)'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
              alt="Field workers"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>

        <div style={{
          position: 'absolute',
          top: 0,
          left: '40%',
          width: '15%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
          zIndex: 3
        }} />
      </div>

      {/* Purple banner */}
      <div style={{
        background: 'linear-gradient(135deg, #7b5fa6 0%, #6d4f96 100%)',
        padding: '4rem 2rem',
        color: '#fff'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <p style={{
            fontSize: '1.125rem',
            lineHeight: '1.8',
            fontWeight: '300',
            margin: 0,
            opacity: 0.95
          }}>
            As the authorized distributor of ESRI products in Sri Lanka, we provide access to the complete suite of ArcGIS applications. 
            From professional desktop software to mobile field apps and cloud platforms, location intelligence informs key decisions with 
            answers to questions including: Where are markets shifting? Where are the best customers? Where are operations at risk? 
            In a constantly changing world, GIS technology provides greater intelligence for more successful, resilient organizations.
          </p>
        </div>
      </div>

      {/* Product Categories */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '5rem 2rem'
      }}>
        {Object.entries(productCategories).map(([key, category], catIndex) => (
          <div key={key} style={{ marginBottom: '5rem' }}>
            {/* Category Header */}
            <div style={{
              textAlign: 'center',
              marginBottom: '3rem'
            }}>
              <div style={{
                display: 'inline-block',
                padding: '0.5rem 1.5rem',
                background: `${category.color}15`,
                borderRadius: '24px',
                marginBottom: '1rem'
              }}>
                <span style={{
                  color: category.color,
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Platform {catIndex + 1}
                </span>
              </div>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                fontWeight: '400',
                color: '#2b2b2b',
                marginBottom: '0.5rem'
              }}>
                {category.name}
              </h2>
              <p style={{
                fontSize: '1.125rem',
                color: '#666',
                fontWeight: '300'
              }}>
                {category.description}
              </p>
            </div>

            {/* Products Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2rem'
            }}>
              {category.products.map((product, index) => {
                const cardKey = `${key}-${index}`;
                return (
                  <div
                    key={cardKey}
                    onMouseEnter={() => setHoveredCard(cardKey)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      background: '#fff',
                      borderRadius: '12px',
                      border: `2px solid ${hoveredCard === cardKey ? category.color : '#e0e0e0'}`,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      boxShadow: hoveredCard === cardKey 
                        ? `0 16px 48px ${category.color}30` 
                        : '0 2px 8px rgba(0,0,0,0.08)',
                      transform: hoveredCard === cardKey ? 'translateY(-8px)' : 'translateY(0)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {/* Color Bar */}
                    <div style={{
                      height: '6px',
                      background: `linear-gradient(90deg, ${category.color} 0%, ${category.color}80 100%)`,
                      width: hoveredCard === cardKey ? '100%' : '0%',
                      transition: 'width 0.4s ease'
                    }} />

                    {/* Card Content */}
                    <div style={{ 
                      padding: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1
                    }}>
                      {/* Product Icon */}
                      <div style={{
                        width: '90px',
                        height: '90px',
                        background: `linear-gradient(135deg, ${category.color}15 0%, ${category.color}05 100%)`,
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.5rem',
                        padding: '1.25rem',
                        border: `3px solid ${category.color}25`,
                        transition: 'all 0.3s ease',
                        transform: hoveredCard === cardKey ? 'scale(1.05)' : 'scale(1)'
                      }}>
                        <img 
                          src={product.icon} 
                          alt={product.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                          }}
                        />
                      </div>

                      {/* Title */}
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '500',
                        color: '#2b2b2b',
                        marginBottom: '1rem',
                        transition: 'color 0.3s ease'
                      }}>
                        {product.title}
                      </h3>

                      {/* Description */}
                      <p style={{
                        fontSize: '1rem',
                        color: '#666',
                        lineHeight: '1.7',
                        marginBottom: '1.5rem',
                        flex: 1
                      }}>
                        {product.desc}
                      </p>

                      {/* Features */}
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        marginBottom: '1.5rem'
                      }}>
                        {product.features.slice(0, hoveredCard === cardKey ? 4 : 2).map((feature, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              padding: '0.5rem 0.875rem',
                              background: `${category.color}10`,
                              borderRadius: '8px',
                              fontSize: '0.875rem',
                              color: category.color,
                              fontWeight: '500',
                              border: `1px solid ${category.color}20`
                            }}
                          >
                            <calcite-icon 
                              icon="check-circle-f" 
                              scale="s" 
                              style={{ color: category.color }}
                            />
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* Button */}
                      <calcite-button
                        width="full"
                        appearance={hoveredCard === cardKey ? 'solid' : 'outline'}
                        icon-end="arrow-right"
                        onClick={() => window.open(product.link, '_blank')}
                        style={{
                          '--calcite-button-background': category.color,
                          '--calcite-button-text-color': hoveredCard === cardKey ? '#fff' : category.color,
                          '--calcite-button-border-color': category.color,
                          cursor: 'pointer',
                          marginTop: 'auto'
                        }}
                      >
                        Learn More
                      </calcite-button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Full-Width Esri-Style Section with Image */}
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#f8f9fa'
      }}>
        {/* Background Image - Left Side */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '45%',
          height: '100%',
          zIndex: 1
        }}>
          <img 
            src="https://www.esri.com/content/dam/esrisites/en-us/industries/2020/business/sector/assets/overview/spatial-business-50-50.jpg"
            alt="Spatial Business Graphics"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Content - Right Side */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '45% 55%',
          minHeight: '500px'
        }}>
          {/* Left side - empty (for image) */}
          <div />

          {/* Right side - text content */}
          <div style={{
            background: '#fff',
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              background: '#7b5fa615',
              borderRadius: '24px',
              marginBottom: '2rem',
              alignSelf: 'flex-start'
            }}>
              <span style={{
                color: '#7b5fa6',
                fontWeight: '600',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Your Trusted Partner
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: '400',
              color: '#2b2b2b',
              marginBottom: '1.25rem',
              lineHeight: '1.2'
            }}>
              Why Choose GIS Solutions as Your ArcGIS Provider?
            </h2>

            <p style={{
              fontSize: '1.05rem',
              color: '#555',
              lineHeight: '1.7',
              marginBottom: '2rem',
              fontWeight: '300'
            }}>
              As the authorized ESRI distributor in Sri Lanka since 2012, we bring world-class GIS technology 
              combined with local expertise and dedicated support.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.25rem',
              marginBottom: '2rem'
            }}>
              {[
                { icon: 'ribbon', label: 'Authorized Distributor', desc: 'Official ESRI partner since 2012, providing genuine ArcGIS licenses and complete platform access.' },
                { icon: 'users', label: 'Expert Support', desc: 'Dedicated local technical team offering ongoing support and guidance.' },
                { icon: 'book', label: 'Training Programs', desc: 'Comprehensive certification courses to maximize capabilities.' },
                { icon: 'wrench', label: 'Implementation', desc: 'Full deployment support and custom solutions.' }
              ].map((item, idx) => (
                <div key={idx} style={{
                  padding: '1.25rem',
                  background: '#f8f9fa',
                  borderRadius: '10px',
                  border: '2px solid #e0e0e0',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#7b5fa6';
                  e.currentTarget.style.background = '#7b5fa608';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e0e0e0';
                  e.currentTarget.style.background = '#f8f9fa';
                }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.875rem',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      background: 'linear-gradient(135deg, #7b5fa615 0%, #7b5fa605 100%)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #7b5fa625',
                      flexShrink: 0
                    }}>
                      <calcite-icon 
                        icon={item.icon} 
                        scale="s" 
                        style={{ color: '#7b5fa6' }}
                      />
                    </div>
                    <div>
                      <h4 style={{
                        fontSize: '1.05rem',
                        color: '#2b2b2b',
                        fontWeight: '500',
                        marginBottom: '0.4rem'
                      }}>
                        {item.label}
                      </h4>
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#666',
                        lineHeight: '1.5',
                        margin: 0
                      }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <calcite-button
                appearance="solid"
                scale="l"
                icon-end="arrow-right"
                onClick={() => {
                  if (setPage) {
                    setPage('solutions');
                    window.scrollTo(0, 0);
                  }
                }}
                style={{
                  '--calcite-button-background': '#7b5fa6',
                  '--calcite-button-text-color': '#ffffff',
                  cursor: 'pointer'
                }}
              >
                Explore Solutions
              </calcite-button>
              <calcite-button
                appearance="outline"
                scale="l"
                icon-end="phone"
                onClick={() => {
                  if (setPage) {
                    setPage('contact');
                    window.scrollTo(0, 0);
                  }
                }}
                style={{
                  '--calcite-button-border-color': '#7b5fa6',
                  '--calcite-button-text-color': '#7b5fa6',
                  cursor: 'pointer'
                }}
              >
                Contact Sales
              </calcite-button>
            </div>
          </div>
        </div>
      </div>

      {/* View All Products Section */}
      <div style={{
        background: 'linear-gradient(135deg, #7b5fa6 0%, #6d4f96 100%)',
        padding: '5rem 2rem',
        color: '#ffffff'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: '400',
              marginBottom: '1.5rem'
            }}>
              Explore the Complete ArcGIS Platform
            </h2>
            <p style={{
              fontSize: '1.125rem',
              lineHeight: '1.7',
              fontWeight: '300',
              marginBottom: '2.5rem',
              opacity: 0.95,
              maxWidth: '800px',
              margin: '0 auto 2.5rem'
            }}>
              Discover all ArcGIS products and find the perfect solution for your organization's needs. 
              From mobile apps to enterprise platforms, Esri offers comprehensive tools for every aspect of GIS work.
            </p>
            <calcite-button
              appearance="outline-fill"
              scale="l"
              icon-end="launch"
              onClick={() => window.open('https://www.esri.com/en-us/arcgis/products/index', '_blank')}
              style={{
                '--calcite-button-border-color': '#ffffff',
                '--calcite-button-text-color': '#ffffff',
                cursor: 'pointer'
              }}
            >
              View All Esri Products
            </calcite-button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 968px) {
          div[style*="gridTemplateColumns: '1fr 1fr'"] {
            grid-template-columns: 1fr !important;
          }
          
          div[style*="height: '500px'"] {
            height: auto !important;
            min-height: 400px;
          }

          div[style*="width: '50%'"][style*="position: absolute"] {
            width: 100% !important;
            position: relative !important;
          }
          
          /* Full-width section responsive */
          div[style*="gridTemplateColumns: '45% 55%'"] {
            grid-template-columns: 1fr !important;
          }
          
          div[style*="gridTemplateColumns: '45% 55%'"] > div:first-child {
            display: none;
          }
          
          div[style*="gridTemplateColumns: 'repeat(2, 1fr)'"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}