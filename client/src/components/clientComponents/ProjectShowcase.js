import React from 'react';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-card';
import '@esri/calcite-components/components/calcite-chip';
import '@esri/calcite-components/components/calcite-list';
import '@esri/calcite-components/components/calcite-list-item';
import '../../styles/clientStyles/projectShowcase.css';

/**
 * ProjectShowcase - Displays a featured project with image and highlights
 * @param {Object} props
 * @param {Object} props.project - Project data
 * @param {string} props.theme - Color theme ('green', 'blue', 'red', 'orange')
 */
export default function ProjectShowcase({ project, theme = 'green' }) {
    if (!project) return null;

    return (
        <div className={`project-showcase-wrapper theme-${theme}`}>
            <calcite-card className="project-showcase-card">
                <div slot="heading" className="showcase-heading">
                    <calcite-chip icon="bookmark" appearance="solid" kind="brand" scale="s">
                        Featured Project
                    </calcite-chip>
                </div>

                <div slot="description" className="showcase-description">
                    <div
                        className="showcase-image"
                        style={{ backgroundImage: `url(${project.image})` }}
                    >
                        <div className="image-gradient"></div>
                    </div>

                    <div className="showcase-details">
                        <h3>{project.title}</h3>
                        <p className="project-description">{project.description}</p>

                        {project.highlights && project.highlights.length > 0 && (
                            <div className="project-highlights">
                                <h4>Key Highlights</h4>
                                <calcite-list>
                                    {project.highlights.map((highlight, index) => (
                                        <calcite-list-item key={index} non-interactive>
                                            <calcite-icon slot="content-start" icon="check-circle" scale="s"></calcite-icon>
                                            <span>{highlight}</span>
                                        </calcite-list-item>
                                    ))}
                                </calcite-list>
                            </div>
                        )}
                    </div>
                </div>
            </calcite-card>
        </div>
    );
}
