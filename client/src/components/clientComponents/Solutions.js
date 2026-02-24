import React, { useState, useEffect, useRef } from 'react';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-chip';
import solutionsData from '../../data/solutionsData.json';
import ProjectShowcase from './ProjectShowcase';
import '../../styles/clientStyles/solutions.css';

// ── Inline SVG icons — always visible, no dependency on calcite icon names ──
const SvgIcon = ({ name, color = 'currentColor', size = 24 }) => {
  const icons = {
    map: <><circle cx="12" cy="10" r="3" /><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></>,
    chart: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>,
    dashboard: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>,
    document: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></>,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>,
    filter: <><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></>,
    check: <><polyline points="20 6 9 17 4 12" /></>,
    info: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>,
    alert: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
    star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></>,
    link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>,
    group: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    globe: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
    compass: <><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>,
    target: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
    activity: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>,
    zap: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
  };

  // cycle through available icons if index exceeds list
  const iconKeys = Object.keys(icons);
  const paths = icons[name] || icons[iconKeys[0]];

  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths}
    </svg>
  );
};

// Icon pool for capability cards — cycles by index
const CAP_ICONS = ['map', 'chart', 'dashboard', 'document', 'layers', 'filter', 'target', 'activity', 'zap', 'eye', 'globe', 'settings'];
const TAB_ICONS = ['map', 'layers', 'grid', 'dashboard', 'document'];

export default function Solutions() {
  const [activeTab, setActiveTab] = useState(solutionsData[0].id);
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [autoPlaying, setAutoPlaying] = useState(true);
  const timerRef = useRef(null);

  // Auto-rotate every 5 seconds while autoPlaying
  useEffect(() => {
    if (!autoPlaying) return;
    const ids = solutionsData.slice(0, 4).map(s => s.id);
    timerRef.current = setInterval(() => {
      setActiveTab(prev => {
        const idx = ids.indexOf(prev);
        return ids[(idx + 1) % ids.length];
      });
      setActiveSubTab(0);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [autoPlaying]);

  const handleThumbnailClick = (id) => {
    setAutoPlaying(false);          // stop auto-rotate on manual click
    clearInterval(timerRef.current);
    setActiveTab(id);
    setActiveSubTab(0);
  };

  const activeData = solutionsData.find(s => s.id === activeTab) || solutionsData[0];
  const theme = activeData.designTheme || 'green';

  // Update hero background whenever active solution changes
  const heroRef = useRef(null);
  useEffect(() => {
    if (!heroRef.current) return;
    if (activeData.heroImage) {
      heroRef.current.style.setProperty('background', `url('${activeData.heroImage}') center / cover no-repeat`, 'important');
    } else {
      heroRef.current.style.setProperty('background', `linear-gradient(135deg, #1b5e35 0%, #2d7d46 100%)`, 'important');
    }
  }, [activeData.heroImage]);

  const themeConfig = {
    green: { accent: '#2d7d46', light: '#e8f5eb', dark: '#1b5e35' },
    blue: { accent: '#0079c1', light: '#e3f2fb', dark: '#004f82' },
    red: { accent: '#c0392b', light: '#fdecea', dark: '#7f1c13' },
    orange: { accent: '#d4680a', light: '#fef3e2', dark: '#8a4100' },
    purple: { accent: '#6b4c9a', light: '#f0ebf8', dark: '#3d2060' },
  };

  const tc = themeConfig[theme] || themeConfig.green;

  return (
    <div className="solutions-page-wrapper">

      {/* ═══ HERO — clean image, no overlay ═══ */}
      <section
        ref={heroRef}
        className="solutions-hero-section"
      >
        <div className="hero-content-wrapper">
          <div className="hero-text-content">
            <h1>{activeData.title}</h1>
            {activeData.subtitle && <p className="hero-subtitle">{activeData.subtitle}</p>}
          </div>

          {/* Hero Right Arrow — cycles solutions */}
          <button
            className="hero-next-arrow"
            onClick={() => {
              const ids = solutionsData.slice(0, 4).map(s => s.id);
              const idx = ids.indexOf(activeTab);
              const next = ids[(idx + 1) % ids.length];
              handleThumbnailClick(next);
            }}
            title="Next solution"
          >
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              {/* Outer progress ring */}
              <circle cx="22" cy="22" r="19" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
              {autoPlaying && (
                <circle
                  cx="22" cy="22" r="19"
                  stroke="white" strokeWidth="2" fill="none"
                  strokeDasharray="119.4"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  style={{
                    transformOrigin: '22px 22px',
                    transform: 'rotate(-90deg)',
                    animation: 'thumbnail-progress 5s linear infinite'
                  }}
                />
              )}
              {/* Arrow */}
              <polyline points="17,13 27,22 17,31" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>

          {/* Thumbnail Nav */}
          <div className="thumbnail-nav-wrapper">
            <div className="thumbnail-container">
              {solutionsData.slice(0, 4).map((solution) => (
                <button
                  key={solution.id}
                  className={`thumbnail-item ${activeTab === solution.id ? 'active' : ''}`}
                  onClick={() => handleThumbnailClick(solution.id)}
                  style={activeTab === solution.id ? { boxShadow: `0 0 0 3px ${tc.accent}` } : {}}
                >
                  <div
                    className="thumbnail-image"
                    style={{ backgroundImage: solution.heroImage ? `url(${solution.heroImage})` : undefined }}
                  >
                    <div className="thumbnail-overlay" />
                    <span className="thumbnail-label">{solution.shortTitle || solution.title}</span>

                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="solutions-main-content">

        {/* ── 1. THREE-COL FEATURE STRIP ── */}
        {activeData.subSections?.length >= 3 && (
          <section className="esri-strip-section">
            <div className="esri-strip-inner">
              {activeData.subSections.slice(0, 3).map((sub, i) => (
                <div
                  key={i}
                  className={`esri-strip-col ${activeSubTab === i ? 'active' : ''}`}
                  onClick={() => setActiveSubTab(i)}
                  style={{ borderTopColor: activeSubTab === i ? tc.accent : 'transparent' }}
                >
                  <h3 style={{ color: tc.accent }}>{sub.title}</h3>
                  <p>{sub.problem || sub.description || ''}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 2. SPLIT SECTION ── */}
        {activeData.challenge && (
          <section className="esri-split-section">
            <div
              className="esri-split-image"
              style={{
                backgroundImage: activeData.solutionImage
                  ? `url(${activeData.solutionImage})`
                  : `linear-gradient(135deg, ${tc.dark}, ${tc.accent})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="esri-split-panel" style={{ background: tc.accent }}>
              <h2>{activeData.challengeTitle || 'The Challenge'}</h2>
              <p>{activeData.challenge}</p>
              {activeData.solution && (
                <>
                  <div className="esri-split-divider" />
                  <h2>{activeData.solutionTitle || 'Our Solution'}</h2>
                  <p>{activeData.solution}</p>
                </>
              )}
            </div>
          </section>
        )}

        {/* ── 3. KEY SOLUTION AREAS with TABS ── */}
        {activeData.subSections?.length > 0 && (
          <section className="esri-tabs-section">
            <h2 className="esri-section-title">Key Solution Areas</h2>

            {/* Tab Buttons */}
            <div className="esri-tab-buttons">
              {activeData.subSections.map((sub, i) => (
                <button
                  key={i}
                  className={`esri-tab-btn ${activeSubTab === i ? 'active' : ''}`}
                  onClick={() => setActiveSubTab(i)}
                  style={activeSubTab === i ? { borderBottomColor: tc.accent, color: tc.accent } : {}}
                >
                  <SvgIcon name={TAB_ICONS[i % TAB_ICONS.length]} color={activeSubTab === i ? tc.accent : '#888'} size={16} />
                  <span>{String.fromCharCode(65 + i)}. {sub.title.split(' ').slice(0, 4).join(' ')}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {(() => {
              const sub = activeData.subSections[activeSubTab];
              if (!sub) return null;
              return (
                <div className="esri-tab-content">

                  {/* Problem bar */}
                  {sub.problem && (
                    <div className="esri-problem-bar" style={{ borderLeftColor: tc.accent }}>
                      <SvgIcon name="alert" color={tc.accent} size={20} />
                      <div>
                        <strong>Problem Statement</strong>
                        <p>{sub.problem}</p>
                      </div>
                    </div>
                  )}

                  <div className="esri-tab-body">

                    {/* Capabilities — card grid */}
                    {sub.capabilities && (
                      <div className="esri-block">
                        <h4 style={{ color: tc.accent }}>Key Capabilities</h4>
                        <div className="esri-cap-grid">
                          {sub.capabilities.map((cap, ci) => (
                            <div key={ci} className="esri-cap-card" style={{ borderTopColor: tc.accent }}>
                              <SvgIcon name={CAP_ICONS[ci % CAP_ICONS.length]} color={tc.accent} size={22} />
                              <p>{cap}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Use Cases */}
                    {sub.useCases && (
                      <div className="esri-block">
                        <h4 style={{ color: tc.accent }}>Use Cases</h4>
                        <ul className="esri-usecases-list">
                          {sub.useCases.map((uc, ui) => (
                            <li key={ui}>
                              <span className="esri-uc-dot" style={{ background: tc.accent }} />
                              {uc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Ideal For — chips */}
                    {sub.idealFor && (
                      <div className="esri-block">
                        <h4 style={{ color: tc.accent }}>Ideal For</h4>
                        <div className="esri-chip-row">
                          {sub.idealFor.map((item, ii) => (
                            <span
                              key={ii}
                              className="esri-chip"
                              style={{ background: tc.light, color: tc.dark, borderColor: tc.accent }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              );
            })()}
          </section>
        )}

        {/* ── 4. PROJECT SHOWCASE ── */}
        {activeData.projectShowcase && (
          <section className="esri-showcase-section">
            <ProjectShowcase data={activeData.projectShowcase} theme={tc} />
          </section>
        )}

        {/* ── 5. OUTCOME BAND ── */}
        {activeData.outcome && (
          <section className="esri-outcome-band" style={{ background: tc.dark }}>
            <div className="esri-outcome-inner">
              <h2>{activeData.outcomeTitle || 'Measurable Outcomes'}</h2>
              <p>{activeData.outcome}</p>
            </div>
          </section>
        )}

        {/* ── 6. FRAMEWORK STEPS ── */}
        <section className="esri-framework-section">
          <h2 className="esri-section-title">Tailored GIS Solutions Built on a Proven Framework</h2>
          <p className="esri-section-sub">
            Every organization has unique spatial challenges. Our solutions are delivered using a
            structured framework that ensures scalability and long-term value.
          </p>
          <div className="esri-steps-row">
            {[
              { step: 'Spatial Needs Assessment', icon: 'compass' },
              { step: 'GIS & Data Architecture Design', icon: 'layers' },
              { step: 'Web & GIS Integration', icon: 'link' },
              { step: 'Analytics & Visualization', icon: 'chart' },
              { step: 'Deployment, Training & Support', icon: 'zap' },
            ].map((item, index) => (
              <div key={index} className="esri-step-item">
                <div className="esri-step-num" style={{ background: tc.accent }}>{index + 1}</div>
                <div className="esri-step-icon" style={{ borderColor: tc.accent }}>
                  <SvgIcon name={item.icon} color={tc.accent} size={24} />
                </div>
                <p>{item.step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. WHY CHOOSE US ── */}
        <section className="esri-why-section">
          <h2 className="esri-section-title">Why Choose GIS Solutions Pvt Ltd</h2>
          <div className="esri-why-grid">
            {[
              { text: 'Deep ESRI & ArcGIS expertise', icon: 'star' },
              { text: 'Strong GIS + web integration capability', icon: 'link' },
              { text: 'Proven government and enterprise deployments', icon: 'group' },
              { text: 'Local domain knowledge with global standards', icon: 'globe' },
              { text: 'Secure, scalable, future-ready architectures', icon: 'lock' },
            ].map((item, index) => (
              <div key={index} className="esri-why-item">
                <div className="esri-why-icon" style={{ background: tc.light }}>
                  <SvgIcon name={item.icon} color={tc.accent} size={22} />
                </div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}