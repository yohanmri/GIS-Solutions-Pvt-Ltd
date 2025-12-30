import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-loader';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-chip';
import '../../styles/adminStyles/projectsList.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export default function ProjectsList() {
    const navigate = useNavigate();
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
            const response = await axios.get(`${API_URL}/api/projects`);
            setProjects(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load projects');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;

        try {
            // Immediately remove from UI for instant feedback
            setProjects(prevProjects => prevProjects.filter(p => p._id !== id));
            setError(null);

            // Delete from server (no auth required)
            await axios.delete(`${API_URL}/api/projects/${id}`);

            // Refresh from server to ensure consistency
            setTimeout(() => {
                fetchProjects();
            }, 300);

        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to delete project';
            setError(errorMessage);
            console.error('Delete error:', err);
            // Refresh to restore the item if delete failed
            fetchProjects();
        }
    };

    if (loading) {
        return (
            <calcite-shell>
                <AdminNavbar />
                <AdminSidebar />
                <div className="admin-page">
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                        <calcite-loader active></calcite-loader>
                    </div>
                </div>
            </calcite-shell>
        );
    }

    return (
        <calcite-shell>
            <AdminNavbar />
            <AdminSidebar />
            <div className="admin-page">
                <div className="admin-page-header">
                    <div>
                        <h1>App Projects</h1>
                        <p>Manage your success stories and project showcases</p>
                    </div>
                    <calcite-button
                        icon-start="plus"
                        onClick={() => navigate('/admin/projects/add')}
                    >
                        Add New Project
                    </calcite-button>
                </div>

                {error && (
                    <calcite-notice kind="danger" open>
                        <div slot="message">{error}</div>
                    </calcite-notice>
                )}

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div
                            key={project._id}
                            className={`project-card ${expandedProject === index ? 'expanded' : ''}`}
                        >
                            {/* Card Header */}
                            <div className="project-header">
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

                                <div className="project-header-content">
                                    <calcite-chip scale="s" kind="brand">
                                        {project.category}
                                    </calcite-chip>
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-client">{project.client}</p>
                                    <p className="project-description">{project.description}</p>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="project-body">
                                {/* Technologies Preview */}
                                <div className="project-section">
                                    <h4 className="section-heading">
                                        <calcite-icon icon="gear" scale="s"></calcite-icon>
                                        Technologies
                                    </h4>
                                    <div className="tech-tags">
                                        {project.technologies.slice(0, 3).map((tech, idx) => (
                                            <span key={idx} className="tech-tag">
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="tech-tag more">
                                                +{project.technologies.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                {expandedProject === index && (
                                    <>
                                        {/* Challenge */}
                                        <div className="project-section">
                                            <h4 className="section-heading">
                                                <calcite-icon icon="exclamation-mark-triangle" scale="s"></calcite-icon>
                                                Challenge
                                            </h4>
                                            <p className="project-text">{project.challenge}</p>
                                        </div>

                                        {/* Solution */}
                                        <div className="project-section">
                                            <h4 className="section-heading">
                                                <calcite-icon icon="lightbulb" scale="s"></calcite-icon>
                                                Solution
                                            </h4>
                                            <p className="project-text">{project.solution}</p>
                                        </div>

                                        {/* Impact */}
                                        <div className="project-section">
                                            <h4 className="section-heading">
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

                                        {/* All Technologies */}
                                        <div className="project-section">
                                            <h4 className="section-heading">
                                                <calcite-icon icon="gear" scale="s"></calcite-icon>
                                                All Technologies
                                            </h4>
                                            <div className="tech-tags">
                                                {project.technologies.map((tech, idx) => (
                                                    <span key={idx} className="tech-tag">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Card Footer */}
                            <div className="project-footer">
                                <calcite-button
                                    appearance="outline"
                                    kind="neutral"
                                    width="full"
                                    icon-end={expandedProject === index ? "chevron-up" : "chevron-down"}
                                    onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                                >
                                    {expandedProject === index ? 'Show Less' : 'Show More'}
                                </calcite-button>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <calcite-button
                                        appearance="outline"
                                        kind="brand"
                                        icon-start="pencil"
                                        onClick={() => navigate(`/admin/projects/edit/${project._id}`)}
                                    >
                                        Edit
                                    </calcite-button>
                                    <calcite-button
                                        appearance="outline"
                                        kind="danger"
                                        icon-start="trash"
                                        onClick={() => handleDelete(project._id)}
                                    >
                                        Delete
                                    </calcite-button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {projects.length === 0 && !loading && (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <calcite-icon icon="information" scale="l"></calcite-icon>
                        <h3>No projects yet</h3>
                        <p>Click "Add New Project" to create your first project showcase</p>
                    </div>
                )}
            </div>
        </calcite-shell>
    );
}
