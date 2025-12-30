import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@esri/calcite-components/dist/calcite/calcite.css';
import '@esri/calcite-components/components/calcite-loader';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-button';
import '../../styles/clientStyles/projectsComponent.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export default function ProjectsComponent() {
  const [activeTab, setActiveTab] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/client/projects`);
      setProjects(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
      // Fallback to empty array if API fails
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

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

  const toggleProject = (index) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  return (
    <div className="projects-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          {/* Left Content */}
          <div>
            <h1 className="hero-title">
              Measure Your Impact
            </h1>
          </div>

          {/* Right Images */}
          <div className="hero-images">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
              alt="GIS Dashboard"
              className="hero-image-primary"
            />
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
              alt="Team collaboration"
              className="hero-image-secondary"
            />
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="info-section">
        <div className="info-content">
          <h2 className="info-title">
            Assess program success with meaningful metrics
          </h2>
          <p className="info-description">
            Organizations use GIS to develop indexes and models that set short- and long-term
            benchmarks and establish milestones. Maps and analysis allow teams to model alternative
            approaches and adjust programs as they monitor outcomes and impacts. Leverage GIS
            tools to better communicate with your network, use authoritative data, collect and analyze data,
            and validate your program strategy.
          </p>
        </div>
      </div>

      {/* Capabilities Section */}
      <div className="capabilities-section">
        <div className="capabilities-content">
          <h2 className="capabilities-title">
            Understand outcomes and plan for the future with GIS
          </h2>

          <div className="capabilities-grid">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="capability-card">
                <div className="capability-icon-wrapper">
                  <calcite-icon
                    icon={cap.icon}
                    scale="l"
                    className="capability-icon"
                  />
                </div>
                <h3 className="capability-title">
                  {cap.title}
                </h3>
                <p className="capability-description">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Project Section */}
      <div className="featured-section">
        <div className="featured-content">
          <div className="featured-grid">
            {/* Dashboard Image */}
            <div className="featured-image-wrapper">
              <div className="decorative-circle-large" />
              <div className="decorative-circle-small" />
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                alt="Dashboard"
                className="featured-image"
              />
            </div>

            {/* Text Content */}
            <div className="featured-text">
              <h2>
                Communicate your impact with stakeholders
              </h2>
              <p>
                Use maps and dashboards to share the measured success of your program
                evaluation with current and prospective changemakers.
              </p>
            </div>
          </div>

          {/* Projects Grid */}
          <h2 className="projects-title">
            Our Success Stories
          </h2>

          {/* Loading State */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <calcite-loader active></calcite-loader>
              <p style={{ marginTop: '16px', color: 'var(--calcite-ui-text-3)' }}>Loading projects...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <calcite-icon icon="exclamation-mark-triangle" scale="l" style={{ color: '#d83020' }}></calcite-icon>
              <p style={{ marginTop: '16px', color: 'var(--calcite-ui-text-3)' }}>{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && projects.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <calcite-icon icon="information" scale="l"></calcite-icon>
              <p style={{ marginTop: '16px', color: 'var(--calcite-ui-text-3)' }}>No projects available at the moment.</p>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && projects.length > 0 && (
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div key={index} className={`project-card ${expandedProject === index ? 'expanded' : ''}`}>
                  {/* Project Image */}
                  <div className="project-image-wrapper">
                    <img
                      src={project.image?.startsWith('/uploads/') ? `${API_URL}${project.image}` : project.image}
                      alt={project.title}
                      className="project-image"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80";
                      }}
                    />
                    <div className="project-year-badge">
                      {project.year}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="project-content">
                    <div className="project-category">
                      {project.category}
                    </div>

                    <h3 className="project-title">
                      {project.title}
                    </h3>

                    <p className="project-client">
                      {project.client}
                    </p>

                    <p className="project-description">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="project-technologies">
                        {project.technologies.slice(0, 4).map((tech, idx) => (
                          <span key={idx} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="tech-tag more">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Expanded Content */}
                    {expandedProject === index && (
                      <div className="expanded-content">
                        {/* Challenge */}
                        {project.challenge && (
                          <div className="project-detail-section">
                            <h4 className="detail-heading">
                              <calcite-icon icon="exclamation-mark-triangle" scale="s"></calcite-icon>
                              Challenge
                            </h4>
                            <p className="detail-text">{project.challenge}</p>
                          </div>
                        )}

                        {/* Solution */}
                        {project.solution && (
                          <div className="project-detail-section">
                            <h4 className="detail-heading">
                              <calcite-icon icon="lightbulb" scale="s"></calcite-icon>
                              Solution
                            </h4>
                            <p className="detail-text">{project.solution}</p>
                          </div>
                        )}

                        {/* Impact */}
                        {project.impact && project.impact.length > 0 && (
                          <div className="project-detail-section">
                            <h4 className="detail-heading">
                              <calcite-icon icon="graph-bar-horizontal" scale="s"></calcite-icon>
                              Impact
                            </h4>
                            <ul className="impact-list">
                              {project.impact.map((item, idx) => (
                                <li key={idx}>
                                  <calcite-icon icon="check" scale="s"></calcite-icon>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* All Technologies */}
                        {project.technologies && project.technologies.length > 4 && (
                          <div className="project-detail-section">
                            <h4 className="detail-heading">
                              <calcite-icon icon="gear" scale="s"></calcite-icon>
                              All Technologies
                            </h4>
                            <div className="project-technologies">
                              {project.technologies.map((tech, idx) => (
                                <span key={idx} className="tech-tag">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <calcite-button
                      width="full"
                      appearance="outline"
                      icon-end={expandedProject === index ? "chevron-up" : "chevron-down"}
                      onClick={() => toggleProject(index)}
                      style={{
                        '--calcite-button-text-color': '#004c74',
                        '--calcite-button-border-color': '#004c74',
                        marginTop: '16px'
                      }}
                    >
                      {expandedProject === index ? 'Show Less' : 'View Case Study'}
                    </calcite-button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">
            Ready to Transform Your Programs with GIS?
          </h2>
          <p className="cta-description">
            Let's discuss how we can help you measure impact, improve outcomes, and communicate your success
          </p>
          <div className="cta-buttons">
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