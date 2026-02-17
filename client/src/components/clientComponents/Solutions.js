import React, { useState } from 'react';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-card';
import solutionsData from '../../data/solutionsData.json';
import '../../styles/clientStyles/solutions.css';

export default function Solutions() {
  const [activeTab, setActiveTab] = useState(solutionsData[0].id);
  const activeData = solutionsData.find(s => s.id === activeTab) || solutionsData[0];

  return (
    <div className="solutions-page-wrapper">
      {/* Hero Section with Background Image and Dynamic Title */}
      <section
        className="solutions-hero-section"
        style={{ backgroundImage: `url(${activeData.heroImage})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content-wrapper">
          <div className="hero-text-content">
            <h1>{activeData.title}</h1>
          </div>

          {/* Thumbnail Navigation - Inside Hero at Bottom */}
          <div className="thumbnail-nav-wrapper">
            <div className="thumbnail-container">
              {solutionsData.slice(0, 4).map((solution) => (
                <div
                  key={solution.id}
                  className={`thumbnail-item ${activeTab === solution.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(solution.id)}
                >
                  <div
                    className="thumbnail-image"
                    style={{ backgroundImage: `url(${solution.navImage})` }}
                  >
                    <div className="thumbnail-overlay"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area - Scrollable */}
      <section className="solutions-main-content">
        <div className="content-container">



          {/* Challenge & Solution Grid */}
          <div className="challenge-solution-grid">
            <calcite-card className="cs-card challenge-card">
              <h3 slot="heading">The Challenge</h3>
              <span slot="description">{activeData.challenge}</span>
            </calcite-card>

            <calcite-card className="cs-card solution-card">
              <h3 slot="heading">Our GIS-Powered Solution</h3>
              <span slot="description">{activeData.solution}</span>
            </calcite-card>
          </div>

          {/* Sub-sections (A, B, C) */}
          <div className="subsections-grid">
            {activeData.subSections && activeData.subSections.map((sub, index) => (
              <calcite-card key={index} className="subsection-card">
                <h3 slot="heading">
                  {String.fromCharCode(65 + index)}. {sub.title}
                </h3>

                <div slot="description" className="subsection-content">
                  {sub.problem && (
                    <div className="subsection-problem">
                      <strong>Problem:</strong> {sub.problem}
                    </div>
                  )}

                  {sub.useCases && (
                    <div className="subsection-list">
                      <h4>Use Cases</h4>
                      <ul>
                        {sub.useCases.map((uc, i) => <li key={i}>{uc}</li>)}
                      </ul>
                    </div>
                  )}

                  {sub.capabilities && (
                    <div className="subsection-list">
                      <h4>Key Capabilities</h4>
                      <ul>
                        {sub.capabilities.map((cap, i) => (
                          <li key={i}>
                            <calcite-icon icon="check" scale="s"></calcite-icon>
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {sub.idealFor && (
                    <div className="subsection-list">
                      <h4>Ideal For</h4>
                      <ul>
                        {sub.idealFor.map((item, i) => (
                          <li key={i}>
                            <calcite-icon icon="organization" scale="s"></calcite-icon>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </calcite-card>
            ))}
          </div>

          {/* Outcome Section */}
          <div className="outcome-section">
            <calcite-card>
              <h3 slot="heading">Outcome</h3>
              <span slot="description">{activeData.outcome}</span>
              <div slot="footer-end">
                <calcite-button appearance="solid" scale="l" icon-end="arrow-right">
                  {activeData.cta}
                </calcite-button>
              </div>
            </calcite-card>
          </div>

          {/* Shared Footer Content */}
          <div className="shared-framework-section">
            <h2>Tailored GIS Solutions Built on a Proven Framework</h2>
            <p className="framework-intro">
              Every organization has unique spatial challenges. Our solutions are delivered using a structured
              framework that ensures scalability and long-term value:
            </p>

            <div className="framework-steps">
              {[
                'Spatial Needs Assessment',
                'GIS & Data Architecture Design',
                'Web & GIS Integration',
                'Analytics & Visualization',
                'Deployment, Training & Support'
              ].map((step, index) => (
                <calcite-card key={index} className="framework-step-card">
                  <div className="step-number">{index + 1}</div>
                  <h4 slot="heading">{step}</h4>
                </calcite-card>
              ))}
            </div>

            <div className="why-choose-section">
              <h3>Why Choose GIS Solutions Pvt Ltd</h3>
              <div className="why-choose-grid">
                {[
                  'Deep ESRI & ArcGIS expertise',
                  'Strong GIS + web integration capability',
                  'Proven government and enterprise deployments',
                  'Local domain knowledge with global standards',
                  'Secure, scalable, future-ready architectures'
                ].map((item, index) => (
                  <div key={index} className="why-item">
                    <calcite-icon icon="check-circle" scale="s"></calcite-icon>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}