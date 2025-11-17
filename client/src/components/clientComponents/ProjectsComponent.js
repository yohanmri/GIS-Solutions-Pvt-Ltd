import React, { useState } from 'react';
import '@esri/calcite-components/dist/calcite/calcite.css';

export default function ProjectsComponent() {
  const [activeTab, setActiveTab] = useState(0);

  const projects = [
    {
      title: "MRV System for Environmental Ministry",
      client: "Ministry of Environment, Sri Lanka",
      description: "Comprehensive Monitoring, Reporting, and Verification (MRV) system for tracking environmental initiatives and measuring climate impact across Sri Lanka.",
      challenge: "The Ministry needed a robust system to monitor environmental programs, collect accurate field data, and report progress on climate commitments to international bodies.",
      solution: "Implemented an integrated GIS solution using ArcGIS Online, Survey123 for field data collection, and ArcGIS Dashboards for real-time monitoring and reporting.",
      impact: [
        "Enabled tracking of 500+ environmental projects nationwide",
        "Reduced reporting time by 60% with automated dashboards",
        "Improved data accuracy with GPS-enabled field surveys",
        "Provided transparent reporting to stakeholders and international partners"
      ],
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&q=80",
      dashboardImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      technologies: ["ArcGIS Online", "Survey123", "Dashboards", "Field Maps"],
      year: "2023",
      category: "Government"
    },
    {
      title: "Smart City Infrastructure Management",
      client: "Colombo Municipal Council",
      description: "Integrated GIS platform for managing urban infrastructure, utilities, and city planning with real-time monitoring capabilities.",
      challenge: "Managing diverse city infrastructure data across multiple departments with outdated systems and limited coordination.",
      solution: "Deployed ArcGIS Enterprise with custom web applications for asset management, public service delivery, and urban planning workflows.",
      impact: [
        "Unified infrastructure data from 8 departments",
        "Reduced service response time by 40%",
        "Enabled data-driven urban planning decisions",
        "Improved citizen service delivery through online portals"
      ],
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80",
      dashboardImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      technologies: ["ArcGIS Enterprise", "Experience Builder", "Mobile Apps", "Web Maps"],
      year: "2023",
      category: "Municipal"
    },
    {
      title: "Utility Network Management System",
      client: "Ceylon Electricity Board",
      description: "Advanced GIS system for electricity distribution network management, outage tracking, and asset maintenance planning.",
      challenge: "Managing a complex electricity distribution network with limited visibility into asset conditions and outage patterns.",
      solution: "Implemented ArcGIS Utility Network with mobile field applications for inspection, maintenance tracking, and real-time outage management.",
      impact: [
        "Mapped 15,000+ km of distribution network",
        "Reduced outage response time by 50%",
        "Optimized maintenance scheduling with predictive analytics",
        "Improved network reliability and customer satisfaction"
      ],
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80",
      dashboardImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      technologies: ["ArcGIS Enterprise", "Utility Network", "Field Maps", "Python"],
      year: "2022",
      category: "Utilities"
    },
    {
      title: "Agricultural Land Management Portal",
      client: "Department of Agriculture",
      description: "Web-based GIS portal for agricultural land monitoring, crop management, and farmer support services across districts.",
      challenge: "Limited visibility into agricultural land use patterns and difficulty in delivering targeted support to farming communities.",
      solution: "Created a comprehensive web portal using ArcGIS Online with dashboards for crop monitoring, land suitability analysis, and farmer registration.",
      impact: [
        "Registered 50,000+ farmers on digital platform",
        "Monitored 200,000 hectares of agricultural land",
        "Enabled precision agriculture advisory services",
        "Improved subsidy distribution efficiency by 35%"
      ],
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80",
      dashboardImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      technologies: ["ArcGIS Online", "StoryMaps", "Survey123", "Remote Sensing"],
      year: "2022",
      category: "Agriculture"
    }
  ];

  const capabilities = [
    {
      icon: 'share',
      title: 'Share your successes',
      description: 'Communicate program impact with stakeholders through interactive maps and compelling visualizations'
    },
    {
      icon: 'data-check',
      title: 'Collect accurate data',
      description: 'Gather reliable field data with GPS-enabled surveys that work online and offline'
    },
    {
      icon: 'graph-time-series',
      title: 'Develop program models',
      description: 'Build spatial models to analyze trends, predict outcomes, and optimize program delivery'
    },
    {
      icon: 'dashboard',
      title: 'Create dynamic reporting',
      description: 'Generate real-time dashboards and automated reports for continuous monitoring'
    }
  ];

  return (
    <div style={{ background: '#fff' }}>
      {/* Hero Section */}
      <div style={{
        position: 'relative',
        minHeight: '500px',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '4rem 2rem'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center'
        }}>
          {/* Left Content */}
          <div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: '400',
              color: '#2b2b2b',
              lineHeight: '1.2',
              marginBottom: '2rem'
            }}>
              Measure Your Impact
            </h1>
          </div>

          {/* Right Images */}
          <div style={{
            position: 'relative',
            height: '400px'
          }}>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
              alt="GIS Dashboard"
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                width: '70%',
                height: '60%',
                objectFit: 'cover',
                borderRadius: '8px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                zIndex: 2
              }}
            />
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
              alt="Team collaboration"
              style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '50%',
                height: '45%',
                objectFit: 'cover',
                borderRadius: '8px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                zIndex: 1
              }}
            />
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div style={{
        background: '#004c74',
        color: '#fff',
        padding: '5rem 2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: '400',
            marginBottom: '2rem',
            lineHeight: '1.3'
          }}>
            Assess program success with meaningful metrics
          </h2>
          <p style={{
            fontSize: '1.125rem',
            lineHeight: '1.8',
            opacity: 0.95,
            maxWidth: '900px'
          }}>
            Organizations use GIS to develop indexes and models that set short- and long-term 
            benchmarks and establish milestones. Maps and analysis allow teams to model alternative 
            approaches and adjust programs as they monitor outcomes and impacts. Leverage GIS 
            tools to better communicate with your network, use authoritative data, collect and analyze data, 
            and validate your program strategy.
          </p>
        </div>
      </div>

      {/* Capabilities Section */}
      <div style={{
        padding: '5rem 2rem',
        background: '#fff'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: '400',
            color: '#2b2b2b',
            marginBottom: '3rem',
            textAlign: 'center'
          }}>
            Understand outcomes and plan for the future with GIS
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}>
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: 'center',
                  padding: '1.5rem'
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <calcite-icon 
                    icon={cap.icon} 
                    scale="l"
                    style={{ color: '#00bfb3', fontSize: '3rem' }}
                  />
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '500',
                  color: '#2b2b2b',
                  marginBottom: '1rem'
                }}>
                  {cap.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#666',
                  lineHeight: '1.7'
                }}>
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Project Section */}
      <div style={{
        padding: '5rem 2rem',
        background: '#f8f9fa'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
            marginBottom: '5rem'
          }}>
            {/* Dashboard Image */}
            <div style={{
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                border: '3px dashed #00bfb3',
                top: '-20px',
                left: '-20px',
                opacity: 0.3
              }} />
              <div style={{
                position: 'absolute',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: '3px dashed #00bfb3',
                bottom: '-10px',
                right: '50px',
                opacity: 0.3
              }} />
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                alt="Dashboard"
                style={{
                  width: '100%',
                  border: '8px solid #2b2b2b',
                  borderRadius: '4px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                  position: 'relative',
                  zIndex: 1
                }}
              />
            </div>

            {/* Text Content */}
            <div>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                fontWeight: '400',
                color: '#2b2b2b',
                marginBottom: '2rem',
                lineHeight: '1.3'
              }}>
                Communicate your impact with stakeholders
              </h2>
              <p style={{
                fontSize: '1.125rem',
                color: '#555',
                lineHeight: '1.8',
                marginBottom: '2rem'
              }}>
                Use maps and dashboards to share the measured success of your program 
                evaluation with current and prospective changemakers.
              </p>
            </div>
          </div>

          {/* Projects Grid */}
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: '400',
            color: '#2b2b2b',
            marginBottom: '3rem',
            textAlign: 'center'
          }}>
            Our Success Stories
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {projects.map((project, index) => (
              <div
                key={index}
                style={{
                  background: '#fff',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.1)';
                }}
              >
                {/* Project Image */}
                <div style={{
                  height: '200px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: '#004c74',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {project.year}
                  </div>
                </div>

                {/* Project Content */}
                <div style={{ padding: '2rem' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    background: '#e8f5f5',
                    color: '#00796b',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    borderRadius: '12px',
                    marginBottom: '1rem',
                    textTransform: 'uppercase'
                  }}>
                    {project.category}
                  </div>

                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '500',
                    color: '#2b2b2b',
                    marginBottom: '0.5rem'
                  }}>
                    {project.title}
                  </h3>

                  <p style={{
                    fontSize: '0.95rem',
                    color: '#00796b',
                    marginBottom: '1rem',
                    fontWeight: '500'
                  }}>
                    {project.client}
                  </p>

                  <p style={{
                    fontSize: '1rem',
                    color: '#666',
                    lineHeight: '1.7',
                    marginBottom: '1.5rem'
                  }}>
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '0.375rem 0.75rem',
                          background: '#f0f5f9',
                          color: '#004c74',
                          fontSize: '0.8rem',
                          borderRadius: '4px',
                          fontWeight: '500'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <calcite-button
                    width="full"
                    appearance="outline"
                    icon-end="arrow-right"
                    style={{
                      '--calcite-button-text-color': '#004c74',
                      '--calcite-button-border-color': '#004c74'
                    }}
                  >
                    View Case Study
                  </calcite-button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        padding: '5rem 2rem',
        background: 'linear-gradient(135deg, #004c74 0%, #006994 100%)',
        color: '#fff',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: '400',
            marginBottom: '1.5rem'
          }}>
            Ready to Transform Your Programs with GIS?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            marginBottom: '2.5rem',
            opacity: 0.95
          }}>
            Let's discuss how we can help you measure impact, improve outcomes, and communicate your success
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <calcite-button
              appearance="solid"
              kind="inverse"
              scale="l"
            >
              Contact Us
            </calcite-button>
            <calcite-button
              appearance="outline"
              kind="inverse"
              scale="l"
              icon-start="book"
            >
              View All Projects
            </calcite-button>
          </div>
        </div>
      </div>
    </div>
  );
}