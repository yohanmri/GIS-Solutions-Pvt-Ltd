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
import '../../styles/adminStyles/servicesList.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export default function ProfessionalServicesList() {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedService, setExpandedService] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/services/professional`);
            setServices(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load services');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;

        try {
            const token = localStorage.getItem('adminToken') || 'default-token';

            // Immediately remove from UI for instant feedback
            setServices(prevServices => prevServices.filter(s => s._id !== id));
            setError(null);

            // Delete from server
            await axios.delete(`${API_URL}/api/services/professional/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Refresh from server to ensure consistency
            setTimeout(() => {
                fetchServices();
            }, 300);

        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to delete service';
            setError(errorMessage);
            console.error('Delete error:', err);
            // Refresh to restore the item if delete failed
            fetchServices();
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
                        <h1>Professional Services</h1>
                        <p>Manage your professional GIS services</p>
                    </div>
                    <calcite-button
                        icon-start="plus"
                        onClick={() => navigate('/admin/services/professional/add')}
                    >
                        Add New Service
                    </calcite-button>
                </div>

                {error && (
                    <calcite-notice kind="danger" open>
                        <div slot="message">{error}</div>
                    </calcite-notice>
                )}

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div
                            key={service._id}
                            className={`service-card ${expandedService === index ? 'expanded' : ''}`}
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

                                <calcite-chip scale="s" kind="brand">
                                    {service.category}
                                </calcite-chip>
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
                                        {service.features.slice(0, 3).map((feature, idx) => (
                                            <calcite-chip key={idx} scale="s" appearance="solid">
                                                {feature}
                                            </calcite-chip>
                                        ))}
                                        {service.features.length > 3 && (
                                            <calcite-chip scale="s" appearance="outline">
                                                +{service.features.length - 3} more
                                            </calcite-chip>
                                        )}
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
                                    kind="neutral"
                                    width="full"
                                    icon-end={expandedService === index ? "chevron-up" : "chevron-down"}
                                    onClick={() => setExpandedService(expandedService === index ? null : index)}
                                >
                                    {expandedService === index ? 'Show Less' : 'Show More'}
                                </calcite-button>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <calcite-button
                                        appearance="outline"
                                        kind="brand"
                                        icon-start="pencil"
                                        onClick={() => navigate(`/admin/services/professional/edit/${service._id}`)}
                                    >
                                        Edit
                                    </calcite-button>
                                    <calcite-button
                                        appearance="outline"
                                        kind="danger"
                                        icon-start="trash"
                                        onClick={() => handleDelete(service._id)}
                                    >
                                        Delete
                                    </calcite-button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {services.length === 0 && !loading && (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <calcite-icon icon="information" scale="l"></calcite-icon>
                        <h3>No services yet</h3>
                        <p>Click "Add New Service" to create your first professional service</p>
                    </div>
                )}
            </div>
        </calcite-shell>
    );
}
