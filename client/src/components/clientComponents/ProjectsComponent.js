import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@esri/calcite-components/dist/calcite/calcite.css';
import '@esri/calcite-components/components/calcite-loader';
import '../../styles/clientStyles/projectsComponent.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// Inline SVG — no calcite icon dependency
const Icon = ({ name, size = 20, color = 'currentColor' }) => {
  const paths = {
    share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></>,
    activity: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>,
    graph: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>,
    dashboard: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>,
    gear: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
    alert: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
    bulb: <><line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" /></>,
    check: <><polyline points="20 6 9 17 4 12" /></>,
    chevdown: <><polyline points="6 9 12 15 18 9" /></>,
    chevup: <><polyline points="18 15 12 9 6 15" /></>,
    info: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name] || paths.info}
    </svg>
  );
};

const capabilities = [
  { icon: 'share', title: 'Share your successes', description: 'Communicate program impact with stakeholders through interactive maps and compelling visualizations' },
  { icon: 'activity', title: 'Collect accurate data', description: 'Gather reliable field data with GPS-enabled surveys that work online and offline' },
  { icon: 'graph', title: 'Develop program models', description: 'Build spatial models to analyze trends, predict outcomes, and optimize program delivery' },
  { icon: 'dashboard', title: 'Create dynamic reporting', description: 'Generate real-time dashboards and automated reports for continuous monitoring' },
];

export default function ProjectsComponent() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedProject, setExpanded] = useState(null);
  const [activeCategory, setCategory] = useState('all');

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/client/projects`);
      setProjects(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to load projects');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'Government', 'Municipal', 'Utilities', 'Agriculture', 'Private', 'NGO', 'Other'];

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pc-wrapper">

      {/* ── HERO ── */}
      <div className="pc-hero">
        <div className="pc-hero-inner">
          <div className="pc-hero-text">
            <h1>Measure Your Impact</h1>
            <p>Explore how our GIS-powered solutions have transformed programs across Sri Lanka and beyond.</p>
          </div>
          <div className="pc-hero-images">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" alt="GIS Dashboard" className="pc-hero-img-main" />
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80" alt="Team" className="pc-hero-img-sub" />
          </div>
        </div>
      </div>

      {/* ── INFO BAND ── */}
      <div className="pc-info-band">
        <div className="pc-info-inner">
          <h2>Assess program success with meaningful metrics</h2>
          <p>Organizations use GIS to develop indexes and models that set short- and long-term benchmarks and establish milestones. Maps and analysis allow teams to model alternative approaches and adjust programs as they monitor outcomes and impacts.</p>
        </div>
      </div>

      {/* ── CAPABILITIES ── */}
      <div className="pc-capabilities">
        <div className="pc-capabilities-inner">
          <h2>Understand outcomes and plan for the future with GIS</h2>
          <div className="pc-cap-grid">
            {capabilities.map((cap, i) => (
              <div key={i} className="pc-cap-card">
                <div className="pc-cap-icon">
                  <Icon name={cap.icon} size={32} color="#0079c1" />
                </div>
                <h3>{cap.title}</h3>
                <p>{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROJECTS SECTION ── */}
      <div className="pc-projects-section">
        <div className="pc-projects-inner">
          <h2 className="pc-projects-title">Our Success Stories</h2>

          {/* Category filter */}
          <div className="pc-category-filter">
            {categories.map(cat => (
              <button
                key={cat}
                className={`pc-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat === 'all' ? 'All Projects' : cat}
              </button>
            ))}
          </div>

          {/* States */}
          {loading && (
            <div className="pc-state-center">
              <calcite-loader active />
              <p>Loading projects...</p>
            </div>
          )}
          {error && !loading && (
            <div className="pc-state-center">
              <Icon name="alert" size={32} color="#d83020" />
              <p>{error}</p>
            </div>
          )}
          {!loading && !error && filtered.length === 0 && (
            <div className="pc-state-center">
              <Icon name="info" size={32} color="#888" />
              <p>No projects available{activeCategory !== 'all' ? ` in ${activeCategory}` : ''}.</p>
            </div>
          )}

          {/* ── CARDS GRID ── */}
          {!loading && !error && filtered.length > 0 && (
            <div className="pc-cards-grid">
              {filtered.map((project, index) => (
                <div key={project._id || index} className={`pc-card ${expandedProject === index ? 'expanded' : ''}`}>

                  {/* Image */}
                  <div className="pc-card-image-wrap">
                    <img
                      src={project.image?.startsWith('/uploads/') ? `${API_URL}${project.image}` : project.image}
                      alt={project.title}
                      className="pc-card-image"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'; }}
                    />
                    {project.year && <span className="pc-year-badge">{project.year}</span>}
                  </div>

                  {/* Body */}
                  <div className="pc-card-body">
                    {project.category && (
                      <span className="pc-cat-badge">{project.category}</span>
                    )}
                    <h3 className="pc-card-title">{project.title}</h3>
                    {project.client && <p className="pc-card-client">{project.client}</p>}
                    <p className="pc-card-desc">{project.description}</p>

                    {/* Technologies */}
                    {project.technologies?.length > 0 && (
                      <div className="pc-card-section">
                        <h4 className="pc-section-heading">
                          <Icon name="gear" size={14} color="#555" /> Technologies
                        </h4>
                        <div className="pc-tech-tags">
                          {project.technologies.slice(0, expandedProject === index ? 999 : 3).map((t, i) => (
                            <span key={i} className="pc-tech-tag">{t}</span>
                          ))}
                          {expandedProject !== index && project.technologies.length > 3 && (
                            <span className="pc-tech-tag more">+{project.technologies.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Expanded content */}
                    {expandedProject === index && (
                      <>
                        {project.challenge && (
                          <div className="pc-card-section">
                            <h4 className="pc-section-heading">
                              <Icon name="alert" size={14} color="#555" /> Challenge
                            </h4>
                            <p className="pc-section-text">{project.challenge}</p>
                          </div>
                        )}
                        {project.solution && (
                          <div className="pc-card-section">
                            <h4 className="pc-section-heading">
                              <Icon name="bulb" size={14} color="#555" /> Solution
                            </h4>
                            <p className="pc-section-text">{project.solution}</p>
                          </div>
                        )}
                        {project.impact?.length > 0 && (
                          <div className="pc-card-section">
                            <h4 className="pc-section-heading">
                              <Icon name="graph" size={14} color="#555" /> Impact
                            </h4>
                            <ul className="pc-impact-list">
                              {project.impact.map((item, i) => (
                                <li key={i}>
                                  <Icon name="check" size={13} color="#0079c1" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="pc-card-footer">
                    <button
                      className="pc-show-more-btn"
                      onClick={() => setExpanded(expandedProject === index ? null : index)}
                    >
                      {expandedProject === index ? (
                        <><Icon name="chevup" size={15} /> Show Less</>
                      ) : (
                        <><Icon name="chevdown" size={15} /> Show More</>
                      )}
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="pc-cta">
        <div className="pc-cta-inner">
          <h2>Ready to Transform Your Programs with GIS?</h2>
          <p>Let's discuss how we can help you measure impact, improve outcomes, and communicate your success.</p>
          <div className="pc-cta-buttons">
            <a href="/contact" className="pc-btn-primary">Contact Us</a>
            <a href="/projects" className="pc-btn-outline">View All Projects</a>
          </div>
        </div>
      </div>

    </div>
  );
}