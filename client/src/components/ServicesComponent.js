import React, { useState } from 'react';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-chip';

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedService, setExpandedService] = useState(null);
  const [hoveredTraining, setHoveredTraining] = useState(null);
  const [trainingFilter, setTrainingFilter] = useState('all');
  const [trainingView, setTrainingView] = useState('card'); // 'card' or 'list'

  const trainings = [
    {
      icon: 'desktop',
      title: 'ArcGIS Pro Fundamentals',
      duration: '3 Days',
      level: 'Beginner',
      description: 'Master the essentials of ArcGIS Pro including mapping, spatial analysis, and data management workflows.',
      color: '#0079c1',
      topics: [
        'Interface & Navigation',
        'Map Creation & Symbology',
        'Spatial Analysis Tools',
        'Data Management',
        'Layout & Printing',
        'Geoprocessing'
      ],
      outcomes: [
        'Create professional maps',
        'Perform spatial analysis',
        'Manage geodatabases',
        'Share GIS content'
      ]
    },
    {
      icon: 'code',
      title: 'Python for GIS',
      duration: '4 Days',
      level: 'Intermediate',
      description: 'Learn to automate GIS workflows and perform advanced spatial analysis using Python and ArcPy.',
      color: '#8b4789',
      topics: [
        'Python Basics',
        'ArcPy Module',
        'Scripting Geoprocessing',
        'Data Manipulation',
        'Automation Workflows',
        'Custom Tools'
      ],
      outcomes: [
        'Write Python scripts for GIS',
        'Automate repetitive tasks',
        'Build custom tools',
        'Process batch operations'
      ]
    },
    {
      icon: 'globe',
      title: 'ArcGIS Online Administration',
      duration: '2 Days',
      level: 'Intermediate',
      description: 'Manage and configure ArcGIS Online for your organization including users, content, and security.',
      color: '#00897b',
      topics: [
        'Organization Setup',
        'User Management',
        'Content Management',
        'Security & Permissions',
        'Groups & Collaboration',
        'Configuring Settings'
      ],
      outcomes: [
        'Administer ArcGIS Online',
        'Manage users and roles',
        'Configure organization settings',
        'Implement best practices'
      ]
    },
    {
      icon: 'mobile',
      title: 'Field Data Collection',
      duration: '2 Days',
      level: 'Beginner',
      description: 'Design and deploy field data collection solutions using Survey123, Field Maps, and QuickCapture.',
      color: '#d84315',
      topics: [
        'Survey123 Design',
        'Field Maps Configuration',
        'QuickCapture Setup',
        'Offline Workflows',
        'Data Quality',
        'Dashboard Integration'
      ],
      outcomes: [
        'Create field surveys',
        'Configure mobile apps',
        'Collect data offline',
        'Monitor field activities'
      ]
    }
  ];

  const getLevelColor = (level) => {
    switch(level) {
      case 'Beginner': return '#35ac46';
      case 'Intermediate': return '#f89927';
      case 'Advanced': return '#d84315';
      default: return '#666';
    }
  };

  const filteredTrainings = trainingFilter === 'all' 
    ? trainings 
    : trainings.filter(training => training.level === trainingFilter);

  const services = [
    {
      icon: 'map',
      title: 'GIS Mapping & Cartography',
      category: 'mapping',
      description: 'Professional mapping solutions with precision and clarity for all your spatial data needs.',
      color: '#35ac46',
      features: [
        'Topographic Mapping',
        'Digital Map Production',
        'Custom Cartography',
        'Web Map Services',
        '3D Mapping',
        'Thematic Mapping'
      ],
      benefits: [
        'High-quality visual representation of spatial data',
        'Enhanced decision-making capabilities',
        'Professional cartographic design',
        'Multi-format output (PDF, Web, Print)'
      ],
      applications: ['Urban Planning', 'Infrastructure', 'Real Estate', 'Tourism'],
      technologies: ['ArcGIS Pro', 'QGIS', 'Adobe Illustrator', 'Mapbox']
    },
    {
      icon: 'layers',
      title: 'Spatial Analysis',
      category: 'analysis',
      description: 'Transform complex data into actionable geographic insights and intelligent decisions.',
      color: '#149ece',
      features: [
        'Site Suitability Analysis',
        'Network Analysis',
        'Buffer & Proximity Analysis',
        'Hotspot Analysis',
        'Overlay Analysis',
        'Terrain Analysis'
      ],
      benefits: [
        'Data-driven decision making',
        'Identify optimal locations and routes',
        'Understand spatial patterns and relationships',
        'Risk assessment and mitigation'
      ],
      applications: ['Site Selection', 'Route Optimization', 'Market Analysis', 'Risk Assessment'],
      technologies: ['ArcGIS Spatial Analyst', 'PostGIS', 'Python', 'R']
    },
    {
      icon: 'satellite-3',
      title: 'Remote Sensing',
      category: 'remote-sensing',
      description: 'Advanced satellite imagery processing and interpretation for environmental monitoring.',
      color: '#a6ce39',
      features: [
        'Land Cover Mapping',
        'Change Detection',
        'Image Classification',
        'NDVI Analysis',
        'Multispectral Analysis',
        'Temporal Analysis'
      ],
      benefits: [
        'Monitor large areas efficiently',
        'Cost-effective data collection',
        'Historical and real-time analysis',
        'Environmental change detection'
      ],
      applications: ['Agriculture', 'Forestry', 'Environmental Monitoring', 'Disaster Management'],
      technologies: ['ENVI', 'ERDAS Imagine', 'Google Earth Engine', 'Sentinel Hub']
    },
    {
      icon: 'gear',
      title: 'GIS Consulting',
      category: 'consulting',
      description: 'Expert guidance for implementing and optimizing your GIS infrastructure and workflows.',
      color: '#007ac2',
      features: [
        'GIS Strategy Development',
        'Database Design',
        'Workflow Optimization',
        'Training Programs',
        'Best Practices Implementation',
        'Technology Assessment'
      ],
      benefits: [
        'Maximize ROI on GIS investments',
        'Improved operational efficiency',
        'Staff capability development',
        'Strategic technology roadmap'
      ],
      applications: ['Enterprise GIS', 'System Implementation', 'Staff Training', 'Process Improvement'],
      technologies: ['ArcGIS Enterprise', 'PostgreSQL/PostGIS', 'Custom Solutions', 'Cloud Platforms']
    },
    {
      icon: 'code',
      title: 'Custom Development',
      category: 'development',
      description: 'Tailored GIS applications and tools built specifically for your business requirements.',
      color: '#8b4789',
      features: [
        'Web GIS Applications',
        'Mobile GIS Solutions',
        'API Integration',
        'Custom Tools & Widgets',
        'Dashboard Development',
        'Automation Scripts'
      ],
      benefits: [
        'Solutions tailored to your needs',
        'Enhanced user experience',
        'Integration with existing systems',
        'Improved productivity and efficiency'
      ],
      applications: ['Field Data Collection', 'Asset Management', 'Public Portals', 'Decision Support'],
      technologies: ['ArcGIS API for JavaScript', 'Leaflet', 'React', 'Python', 'Node.js']
    },
    {
      icon: 'data-check',
      title: 'Data Management',
      category: 'data',
      description: 'Comprehensive spatial data management, quality control, and database administration.',
      color: '#f89927',
      features: [
        'Data Migration',
        'Quality Assurance/Quality Control',
        'Database Administration',
        'Data Conversion',
        'Metadata Management',
        'Data Standardization'
      ],
      benefits: [
        'Reliable and accurate data',
        'Improved data accessibility',
        'Reduced data redundancy',
        'Compliance with standards'
      ],
      applications: ['Data Integration', 'Legacy System Migration', 'Multi-source Data', 'Data Warehousing'],
      technologies: ['PostgreSQL', 'SQL Server', 'FME', 'ArcGIS Data Interoperability']
    }
  ];

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
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop" 
              alt="Professional giving thumbs up with map background"
              loading="eager"
            />
          </div>
        </div>
      </div>

      <div className="services-container">
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

        {/* Services Grid */}
        <div className="services-grid">
          {filteredServices.map((service, index) => (
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
                  <div className="chips-container">
                    {service.features.map((feature, idx) => (
                      <calcite-chip key={idx} scale="s" appearance="outline">
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
                  console.log('Logo failed to load from /assets/logoGIS.png');
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
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop" 
                alt="GIS data visualization and analytics"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Training Section */}
        <div className="training-section">
          <div className="training-hero-banner">
            <div className="training-hero-content">
              <div className="training-hero-text">
                <calcite-icon icon="learning" scale="l"></calcite-icon>
                <h2 className="training-hero-title">Professional Training Programs</h2>
                <p className="training-hero-subtitle">
                  Empower your team with expert-led GIS training. From beginners to advanced users, 
                  our comprehensive courses deliver hands-on skills that drive real results.
                </p>
              </div>
              <div className="training-hero-stats">
                <div className="training-hero-stat">
                  <span className="training-hero-stat-number">500+</span>
                  <span className="training-hero-stat-label">Professionals Trained</span>
                </div>
                <div className="training-hero-stat">
                  <span className="training-hero-stat-number">20+</span>
                  <span className="training-hero-stat-label">Course Offerings</span>
                </div>
                <div className="training-hero-stat">
                  <span className="training-hero-stat-number">15+</span>
                  <span className="training-hero-stat-label">Years Experience</span>
                </div>
              </div>
            </div>
          </div>

          {/* Training Cards - New Design */}
          <div className="training-cards-wrapper">
            {trainings.map((training, index) => (
              <div
                key={index}
                className={`training-card-new ${hoveredTraining === index ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredTraining(index)}
                onMouseLeave={() => setHoveredTraining(null)}
              >
                <div className="training-card-left" style={{ borderLeft: `5px solid ${training.color}` }}>
                  <div className="training-card-header">
                    <div 
                      className="training-icon-circle"
                      style={{ background: `${training.color}20` }}
                    >
                      <calcite-icon 
                        icon={training.icon} 
                        scale="m"
                        style={{ color: training.color }}
                      />
                    </div>
                    <div className="training-meta">
                      <span 
                        className="training-level-pill"
                        style={{
                          background: getLevelColor(training.level),
                          color: '#fff'
                        }}
                      >
                        {training.level}
                      </span>
                      <span className="training-duration-text">
                        <calcite-icon icon="clock" scale="s" />
                        {training.duration}
                      </span>
                    </div>
                  </div>

                  <h3 className="training-card-title-new">{training.title}</h3>
                  <p className="training-card-desc">{training.description}</p>

                  <div className="training-highlights">
                    <div className="training-highlight-col">
                      <h4 className="training-highlight-title">
                        <calcite-icon icon="list-check" scale="s" style={{ color: training.color }} />
                        What You'll Learn
                      </h4>
                      <ul className="training-highlight-list">
                        {training.topics.slice(0, 3).map((topic, idx) => (
                          <li key={idx}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="training-highlight-col">
                      <h4 className="training-highlight-title">
                        <calcite-icon icon="lightbulb" scale="s" style={{ color: training.color }} />
                        Key Outcomes
                      </h4>
                      <ul className="training-highlight-list">
                        {training.outcomes.slice(0, 3).map((outcome, idx) => (
                          <li key={idx}>{outcome}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="training-card-right">
                  <div className="training-price-box">
                    <span className="training-price-label">Starting from</span>
                    <span className="training-price">Contact Us</span>
                  </div>
                  <calcite-button
                    width="full"
                    appearance="solid"
                    icon-end="arrow-right"
                    style={{
                      '--calcite-button-background': training.color,
                      '--calcite-button-text-color': '#fff'
                    }}
                  >
                    Enroll Now
                  </calcite-button>
                  <calcite-button
                    width="full"
                    appearance="outline"
                    icon-start="information"
                    style={{
                      '--calcite-button-border-color': training.color,
                      '--calcite-button-text-color': training.color
                    }}
                  >
                    Learn More
                  </calcite-button>
                </div>
              </div>
            ))}
          </div>

          {/* Training CTA - New Design */}
          <div className="training-cta-new">
            <div className="training-cta-content">
              <h3 className="training-cta-title-new">Custom Training Solutions</h3>
              <p className="training-cta-text">
                Need tailored training for your organization? We create customized programs designed 
                around your specific workflows, data, and business objectives. Available on-site or virtual.
              </p>
              <div className="training-cta-features">
                <div className="training-cta-feature">
                  <calcite-icon icon="users" scale="m" />
                  <span>On-site & Virtual Options</span>
                </div>
                <div className="training-cta-feature">
                  <calcite-icon icon="gear" scale="m" />
                  <span>Customized Curriculum</span>
                </div>
                <div className="training-cta-feature">
                  <calcite-icon icon="certificate" scale="m" />
                  <span>Certification Programs</span>
                </div>
              </div>
              <div className="training-cta-actions">
                <calcite-button
                  appearance="solid"
                  scale="l"
                  icon-end="arrow-right"
                  style={{
                    '--calcite-button-background': '#0079c1',
                    '--calcite-button-text-color': '#fff'
                  }}
                >
                  Request Custom Training
                </calcite-button>
                <calcite-button
                  appearance="outline"
                  scale="l"
                  icon-start="download"
                  style={{
                    '--calcite-button-border-color': '#0079c1',
                    '--calcite-button-text-color': '#0079c1'
                  }}
                >
                  Download Catalog
                </calcite-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .services-section {
          background: #ffffff;
          margin: 0;
          padding: 0;
        }

        .services-hero {
          background: linear-gradient(135deg, #005e95 0%, #0079c1 100%);
          padding: 0;
          position: relative;
          overflow: hidden;
          min-height: 500px;
          display: flex;
          align-items: center;
        }

        .services-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(53, 172, 70, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(0, 121, 193, 0.2) 0%, transparent 50%);
          z-index: 1;
        }

        .services-hero-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 3rem;
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .services-hero-content {
          text-align: left;
        }

        .services-hero-title {
          font-size: 3.5rem;
          font-weight: 300;
          color: #ffffff;
          margin: 0 0 1.5rem 0;
          line-height: 1.2;
        }

        .services-hero-subtitle {
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 300;
          margin: 0;
          line-height: 1.6;
        }

        .services-hero-image {
          position: relative;
          z-index: 2;
        }

        .services-hero-image img {
          width: 100%;
          height: auto;
          display: block;
          max-width: 600px;
          margin-left: auto;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .services-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 5rem 2rem;
        }

        .services-overview {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 400;
          color: #151515;
          margin: 0 0 1.5rem 0;
        }

        .section-description {
          font-size: 1.125rem;
          color: #6a6a6a;
          max-width: 800px;
          margin: 0 auto 3rem;
          line-height: 1.8;
        }

        .services-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 3rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .stat-item {
          text-align: center;
          padding: 2rem;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .stat-item calcite-icon {
          color: #35ac46;
          margin-bottom: 1rem;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #35ac46 0%, #2d8f3a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 0.5rem 0;
        }

        .stat-label {
          font-size: 1rem;
          color: #6a6a6a;
          margin: 0;
        }

        .category-filter {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 3rem;
        }

        calcite-button[appearance="solid"]::part(button) {
          background: linear-gradient(135deg, #35ac46 0%, #2d8f3a 100%);
          border-color: #35ac46;
        }

        calcite-button[appearance="solid"]:hover::part(button) {
          background: linear-gradient(135deg, #2d8f3a 0%, #257a2e 100%);
          border-color: #2d8f3a;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(53, 172, 70, 0.3);
        }

        calcite-button[appearance="outline"]::part(button) {
          border-color: #35ac46;
          color: #35ac46;
        }

        calcite-button[appearance="outline"]:hover::part(button) {
          background-color: rgba(53, 172, 70, 0.1);
          transform: translateY(-2px);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 2rem;
          margin-bottom: 5rem;
        }

        .service-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease-out backwards;
          display: flex;
          flex-direction: column;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .service-card.expanded {
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }

        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
          border-color: #35ac46;
        }

        .service-header {
          padding: 2rem;
          border-bottom: 1px solid #e0e0e0;
          background: #ffffff;
        }

        .service-icon {
          width: 64px;
          height: 64px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }

        .service-card:hover .service-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .service-title {
          font-size: 1.5rem;
          font-weight: 500;
          color: #151515;
          margin: 0 0 0.75rem 0;
        }

        .service-description {
          font-size: 1rem;
          color: #6a6a6a;
          line-height: 1.6;
          margin: 0;
        }

        .service-body {
          padding: 2rem;
          flex-grow: 1;
        }

        .service-section {
          margin-bottom: 1.5rem;
        }

        .service-section:last-child {
          margin-bottom: 0;
        }

        .section-heading {
          font-size: 0.875rem;
          font-weight: 600;
          color: #151515;
          margin: 0 0 1rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .chips-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .benefits-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .benefits-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
          color: #555;
        }

        .benefits-list li calcite-icon {
          margin-top: 2px;
          flex-shrink: 0;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-tag {
          padding: 0.375rem 0.75rem;
          font-size: 0.875rem;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .tech-tag:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .service-footer {
          padding: 1rem 2rem 2rem;
          display: flex;
          gap: 0.75rem;
          background: #ffffff;
        }

        .services-cta {
          background: linear-gradient(135deg, #005e95 0%, #0079c1 100%);
          padding: 0;
          position: relative;
          overflow: hidden;
          min-height: 500px;
          display: flex;
          align-items: center;
        }

        .services-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(53, 172, 70, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(0, 121, 193, 0.2) 0%, transparent 50%);
          z-index: 1;
        }

        .services-cta-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 3rem;
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem;
          width: 100%;
        }

        .services-cta-content {
          text-align: left;
        }

        .cta-logo {
          width: 120px;
          height: auto;
          margin: 0 0 2rem 0;
          display: block;
        }

        .services-cta calcite-icon {
          color: #ffffff;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .cta-title {
          font-size: 3rem;
          font-weight: 300;
          margin: 0 0 1.5rem 0;
          color: #ffffff;
          line-height: 1.2;
        }

        .cta-description {
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 300;
          margin: 0 0 2rem 0;
          line-height: 1.6;
        }

        .services-cta-image {
          position: relative;
          z-index: 2;
        }

        .services-cta-image img {
          width: 100%;
          height: auto;
          display: block;
          max-width: 600px;
          margin-left: auto;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cta-buttons calcite-button::part(button) {
          background-color: #ffffff;
          border-color: #ffffff;
          color: #005e95;
          font-weight: 500;
        }

        .cta-buttons calcite-button:hover::part(button) {
          background-color: #f0f0f0;
          border-color: #f0f0f0;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .cta-buttons calcite-button[appearance="outline"]::part(button) {
          border-color: #ffffff;
          color: #ffffff;
          background: transparent;
        }

        .cta-buttons calcite-button[appearance="outline"]:hover::part(button) {
          background-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          .services-hero {
            min-height: auto;
          }

          .services-hero-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 3rem 1.5rem;
          }

          .services-hero-content {
            text-align: center;
          }

          .services-hero-image img {
            margin: 0 auto;
            max-width: 100%;
          }

          .services-hero-title {
            font-size: 2.5rem;
          }

          .services-hero-subtitle {
            font-size: 1.1rem;
          }

          .services-container {
            padding: 3rem 1.5rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .services-stats {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .services-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .services-cta {
            min-height: auto;
          }

          .services-cta-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 3rem 1.5rem;
          }

          .services-cta-content {
            text-align: center;
          }

          .cta-logo {
            margin: 0 auto 2rem;
          }

          .services-cta-image img {
            margin: 0 auto;
            max-width: 100%;
          }

          .services-cta {
            padding: 3rem 2rem;
          }

          .cta-title {
            font-size: 2rem;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .cta-buttons calcite-button {
            width: 100%;
          }

          .training-grid {
            grid-template-columns: 1fr;
          }

          .training-stats {
            grid-template-columns: 1fr;
          }

          .training-card-new {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .training-card-right {
            border-left: none;
            border-top: 1px solid #e0e0e0;
            padding-left: 0;
            padding-top: 2rem;
          }

          .training-highlights {
            grid-template-columns: 1fr;
          }

          .training-cta-features {
            flex-direction: column;
            gap: 1rem;
          }

          .training-controls {
            flex-direction: column;
            align-items: stretch;
          }

          .training-view-toggle {
            width: 100%;
          }

          .training-view-toggle calcite-button {
            flex: 1;
          }

          .training-list-item {
            flex-direction: column;
            align-items: stretch;
          }

          .training-list-left {
            flex-direction: column;
          }

          .training-list-actions {
            width: 100%;
            min-width: auto;
          }

          .training-list-actions calcite-button {
            width: 100%;
          }
        }

        /* Training Section Styles - New Design */
        .training-section {
          margin-top: 6rem;
          padding-top: 0;
          border-top: none;
        }

        .training-hero-banner {
          background: linear-gradient(135deg, #0079c1 0%, #00a9e0 100%);
          padding: 4rem 2rem;
          margin-bottom: 4rem;
        }

        .training-hero-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        .training-hero-text {
          text-align: center;
          margin-bottom: 3rem;
        }

        .training-hero-text calcite-icon {
          color: #fff;
          margin-bottom: 1rem;
        }

        .training-hero-title {
          font-size: 3rem;
          font-weight: 300;
          color: #fff;
          margin: 0 0 1rem 0;
        }

        .training-hero-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.95);
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.7;
          font-weight: 300;
        }

        .training-hero-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .training-hero-stat {
          text-align: center;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .training-hero-stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #fff;
        }

        .training-hero-stat-label {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .training-cards-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .training-card-new {
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 2rem;
          padding: 2.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .training-card-new.hovered {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
        }

        .training-card-left {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-left: 1.5rem;
        }

        .training-card-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .training-icon-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .training-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .training-level-pill {
          padding: 0.35rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .training-duration-text {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.95rem;
          color: #666;
          font-weight: 500;
        }

        .training-card-title-new {
          font-size: 1.75rem;
          font-weight: 500;
          color: #2b2b2b;
          margin: 0;
        }

        .training-card-desc {
          font-size: 1.05rem;
          color: #666;
          line-height: 1.7;
          margin: 0;
        }

        .training-highlights {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 0.5rem;
        }

        .training-highlight-col {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .training-highlight-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: #2b2b2b;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .training-highlight-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .training-highlight-list li {
          font-size: 0.95rem;
          color: #555;
          padding-left: 1.25rem;
          position: relative;
        }

        .training-highlight-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #0079c1;
          font-weight: bold;
        }

        .training-card-right {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          min-width: 200px;
          padding-left: 2rem;
          border-left: 1px solid #e0e0e0;
        }

        .training-price-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          border-radius: 8px;
          margin-bottom: 0.5rem;
        }

        .training-price-label {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 0.5rem;
        }

        .training-price {
          font-size: 1.5rem;
          font-weight: 600;
          color: #0079c1;
        }

        .training-cta-new {
          max-width: 1400px;
          margin: 4rem auto 0;
          padding: 0 2rem;
        }

        .training-cta-content {
          background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%);
          border: 2px solid #0079c1;
          border-radius: 12px;
          padding: 4rem 3rem;
          text-align: center;
        }

        .training-cta-title-new {
          font-size: 2.25rem;
          font-weight: 500;
          color: #2b2b2b;
          margin: 0 0 1rem 0;
        }

        .training-cta-text {
          font-size: 1.125rem;
          color: #555;
          max-width: 800px;
          margin: 0 auto 2.5rem;
          line-height: 1.7;
        }

        .training-cta-features {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .training-cta-feature {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1rem;
          color: #2b2b2b;
          font-weight: 500;
        }

        .training-cta-feature calcite-icon {
          color: #0079c1;
        }

        .training-cta-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Training Controls */
        .training-controls {
          max-width: 1400px;
          margin: 0 auto 3rem;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .training-filters {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .training-view-toggle {
          display: flex;
          gap: 0.5rem;
        }

        /* List View Styles */
        .training-list-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        .training-list-item {
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          gap: 2rem;
        }

        .training-list-item.hovered {
          transform: translateX(8px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .training-list-left {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
          flex: 1;
        }

        .training-list-icon {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .training-list-content {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex: 1;
        }

        .training-list-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .training-list-title {
          font-size: 1.5rem;
          font-weight: 500;
          color: #2b2b2b;
          margin: 0;
        }

        .training-list-badges {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .training-list-badge {
          padding: 0.35rem 1rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .training-list-duration {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.9rem;
          color: #666;
          font-weight: 500;
        }

        .training-list-description {
          font-size: 1rem;
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        .training-list-topics {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .training-list-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #2b2b2b;
        }

        .training-list-tag {
          padding: 0.25rem 0.75rem;
          background: #f5f5f5;
          border-radius: 6px;
          font-size: 0.85rem;
          color: #555;
        }

        .training-list-more {
          padding: 0.25rem 0.75rem;
          background: #0079c1;
          color: #fff;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .training-list-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          min-width: 180px;
        }

        .training-list-price {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .training-list-price-label {
          font-size: 0.8rem;
          color: #666;
        }

        .training-list-price-value {
          font-size: 1.25rem;
          font-weight: 600;
          color: #0079c1;
        }
      `}</style>
    </section>
  );
}