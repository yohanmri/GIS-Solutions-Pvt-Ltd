import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-input';
import '@esri/calcite-components/components/calcite-label';
import '@esri/calcite-components/components/calcite-select';
import '@esri/calcite-components/components/calcite-option';
import '@esri/calcite-components/components/calcite-text-area';
import '@esri/calcite-components/components/calcite-chip';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-notice';
import '../../styles/adminStyles/serviceAdd.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const CATEGORY_OPTIONS = [
    { value: 'mapping', label: 'Mapping' },
    { value: 'analysis', label: 'Analysis' },
    { value: 'remote-sensing', label: 'Remote Sensing' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'development', label: 'Development' },
    { value: 'data', label: 'Data' }
];

const ICON_OPTIONS = [
    'map', 'layers', 'satellite-3', 'gear', 'code', 'data-check',
    'globe', 'pin', 'graph-bar-horizontal', 'dashboard', 'analysis'
];

const COLOR_PRESETS = [
    '#35ac46', '#149ece', '#a6ce39', '#007ac2', '#8b4789', '#f89927',
    '#d84315', '#00897b', '#0079c1'
];

export default function ProfessionalServiceAdd() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        icon: 'map',
        title: '',
        category: 'mapping',
        description: '',
        color: '#35ac46',
        features: [''],
        benefits: [''],
        applications: [''],
        technologies: ['']
    });

    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [expandedPreview, setExpandedPreview] = useState(false);

    useEffect(() => {
        if (isEdit) {
            fetchService();
        }
    }, [id]);

    const fetchService = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/services/professional/${id}`);
            setFormData(response.data);
        } catch (err) {
            setError('Failed to load service');
            console.error(err);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleArrayChange = (field, index, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    };

    const addArrayItem = (field) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    const removeArrayItem = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Filter out empty strings from arrays
        const cleanedData = {
            ...formData,
            features: formData.features.filter(f => f.trim()),
            benefits: formData.benefits.filter(b => b.trim()),
            applications: formData.applications.filter(a => a.trim()),
            technologies: formData.technologies.filter(t => t.trim())
        };

        try {
            setSaving(true);
            const token = localStorage.getItem('adminToken');

            if (isEdit) {
                await axios.put(`${API_URL}/api/services/professional/${id}`, cleanedData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`${API_URL}/api/services/professional`, cleanedData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }

            navigate('/admin/services/professional');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save service');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <calcite-shell>
            <AdminNavbar />
            <AdminSidebar />
            <div className="admin-page service-add-page">
                <div className="admin-page-header">
                    <div>
                        <h1>{isEdit ? 'Edit' : 'Add'} Professional Service</h1>
                        <p>Fill in the details and see a live preview</p>
                    </div>
                    <calcite-button
                        appearance="outline"
                        icon-start="arrow-left"
                        onClick={() => navigate('/admin/services/professional')}
                    >
                        Back to List
                    </calcite-button>
                </div>

                {error && (
                    <calcite-notice kind="danger" open>
                        <div slot="message">{error}</div>
                    </calcite-notice>
                )}

                <div className="service-add-grid">
                    {/* Left Side - Form */}
                    <div className="service-form-container">
                        <form onSubmit={handleSubmit}>
                            {/* Basic Info */}
                            <div className="form-section">
                                <h3>Basic Information</h3>

                                <calcite-label>
                                    Icon
                                    <div className="icon-selector">
                                        {ICON_OPTIONS.map(icon => (
                                            <div
                                                key={icon}
                                                className={`icon-option ${formData.icon === icon ? 'selected' : ''}`}
                                                onClick={() => handleChange('icon', icon)}
                                                style={{
                                                    backgroundColor: formData.icon === icon ? `${formData.color}15` : 'transparent',
                                                    border: formData.icon === icon ? `2px solid ${formData.color}` : '2px solid var(--calcite-ui-border-1)'
                                                }}
                                            >
                                                <calcite-icon
                                                    icon={icon}
                                                    scale="m"
                                                    style={{ color: formData.icon === icon ? formData.color : 'inherit' }}
                                                ></calcite-icon>
                                            </div>
                                        ))}
                                    </div>
                                </calcite-label>

                                <calcite-label>
                                    Title
                                    <calcite-input
                                        value={formData.title}
                                        onInput={(e) => handleChange('title', e.target.value)}
                                        placeholder="e.g., GIS Mapping & Cartography"
                                        required
                                    ></calcite-input>
                                </calcite-label>

                                <calcite-label>
                                    Category
                                    <calcite-select
                                        value={formData.category}
                                        onChange={(e) => handleChange('category', e.target.value)}
                                    >
                                        {CATEGORY_OPTIONS.map(cat => (
                                            <calcite-option key={cat.value} value={cat.value}>
                                                {cat.label}
                                            </calcite-option>
                                        ))}
                                    </calcite-select>
                                </calcite-label>

                                <calcite-label>
                                    Description
                                    <calcite-text-area
                                        value={formData.description}
                                        onInput={(e) => handleChange('description', e.target.value)}
                                        placeholder="Brief description of the service"
                                        rows="3"
                                        required
                                    ></calcite-text-area>
                                </calcite-label>

                                <calcite-label>
                                    Color
                                    <div className="color-picker-container">
                                        <input
                                            type="color"
                                            value={formData.color}
                                            onChange={(e) => handleChange('color', e.target.value)}
                                            className="color-input"
                                        />
                                        <div className="color-presets">
                                            {COLOR_PRESETS.map(color => (
                                                <div
                                                    key={color}
                                                    className="color-preset"
                                                    style={{ backgroundColor: color }}
                                                    onClick={() => handleChange('color', color)}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                </calcite-label>
                            </div>

                            {/* Features */}
                            <div className="form-section">
                                <h3>Key Features</h3>
                                {formData.features.map((feature, index) => (
                                    <div key={index} className="array-input-row">
                                        <calcite-input
                                            value={feature}
                                            onInput={(e) => handleArrayChange('features', index, e.target.value)}
                                            placeholder={`Feature ${index + 1}`}
                                        ></calcite-input>
                                        {formData.features.length > 1 && (
                                            <calcite-button
                                                appearance="outline"
                                                kind="danger"
                                                icon-start="minus"
                                                scale="s"
                                                onClick={() => removeArrayItem('features', index)}
                                            ></calcite-button>
                                        )}
                                    </div>
                                ))}
                                <calcite-button
                                    appearance="outline"
                                    icon-start="plus"
                                    scale="s"
                                    onClick={() => addArrayItem('features')}
                                >
                                    Add Feature
                                </calcite-button>
                            </div>

                            {/* Benefits */}
                            <div className="form-section">
                                <h3>Benefits</h3>
                                {formData.benefits.map((benefit, index) => (
                                    <div key={index} className="array-input-row">
                                        <calcite-input
                                            value={benefit}
                                            onInput={(e) => handleArrayChange('benefits', index, e.target.value)}
                                            placeholder={`Benefit ${index + 1}`}
                                        ></calcite-input>
                                        {formData.benefits.length > 1 && (
                                            <calcite-button
                                                appearance="outline"
                                                kind="danger"
                                                icon-start="minus"
                                                scale="s"
                                                onClick={() => removeArrayItem('benefits', index)}
                                            ></calcite-button>
                                        )}
                                    </div>
                                ))}
                                <calcite-button
                                    appearance="outline"
                                    icon-start="plus"
                                    scale="s"
                                    onClick={() => addArrayItem('benefits')}
                                >
                                    Add Benefit
                                </calcite-button>
                            </div>

                            {/* Applications */}
                            <div className="form-section">
                                <h3>Applications</h3>
                                {formData.applications.map((app, index) => (
                                    <div key={index} className="array-input-row">
                                        <calcite-input
                                            value={app}
                                            onInput={(e) => handleArrayChange('applications', index, e.target.value)}
                                            placeholder={`Application ${index + 1}`}
                                        ></calcite-input>
                                        {formData.applications.length > 1 && (
                                            <calcite-button
                                                appearance="outline"
                                                kind="danger"
                                                icon-start="minus"
                                                scale="s"
                                                onClick={() => removeArrayItem('applications', index)}
                                            ></calcite-button>
                                        )}
                                    </div>
                                ))}
                                <calcite-button
                                    appearance="outline"
                                    icon-start="plus"
                                    scale="s"
                                    onClick={() => addArrayItem('applications')}
                                >
                                    Add Application
                                </calcite-button>
                            </div>

                            {/* Technologies */}
                            <div className="form-section">
                                <h3>Technologies</h3>
                                {formData.technologies.map((tech, index) => (
                                    <div key={index} className="array-input-row">
                                        <calcite-input
                                            value={tech}
                                            onInput={(e) => handleArrayChange('technologies', index, e.target.value)}
                                            placeholder={`Technology ${index + 1}`}
                                        ></calcite-input>
                                        {formData.technologies.length > 1 && (
                                            <calcite-button
                                                appearance="outline"
                                                kind="danger"
                                                icon-start="minus"
                                                scale="s"
                                                onClick={() => removeArrayItem('technologies', index)}
                                            ></calcite-button>
                                        )}
                                    </div>
                                ))}
                                <calcite-button
                                    appearance="outline"
                                    icon-start="plus"
                                    scale="s"
                                    onClick={() => addArrayItem('technologies')}
                                >
                                    Add Technology
                                </calcite-button>
                            </div>

                            {/* Submit Button */}
                            <div className="form-actions">
                                <calcite-button
                                    type="submit"
                                    appearance="solid"
                                    kind="brand"
                                    width="full"
                                    loading={saving}
                                >
                                    {isEdit ? 'Update' : 'Create'} Service
                                </calcite-button>
                            </div>
                        </form>
                    </div>

                    {/* Right Side - Live Preview */}
                    <div className="service-preview-container">
                        <div className="preview-header">
                            <h3>Live Preview</h3>
                            <p>This is how it will appear to users</p>
                        </div>

                        <div className={`service-card preview-card ${expandedPreview ? 'expanded' : ''}`}>
                            {/* Card Header */}
                            <div className="service-header">
                                <div
                                    className="service-icon"
                                    style={{ backgroundColor: `${formData.color}15` }}
                                >
                                    <calcite-icon
                                        icon={formData.icon}
                                        scale="l"
                                        style={{ color: formData.color }}
                                    ></calcite-icon>
                                </div>

                                <h3 className="service-title">{formData.title || 'Service Title'}</h3>
                                <p className="service-description">{formData.description || 'Service description will appear here'}</p>
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
                                        {formData.features.filter(f => f.trim()).map((feature, idx) => (
                                            <calcite-chip key={idx} scale="m" appearance="solid">
                                                {feature}
                                            </calcite-chip>
                                        ))}
                                        {formData.features.filter(f => f.trim()).length === 0 && (
                                            <p style={{ color: 'var(--calcite-ui-text-3)', fontSize: '14px' }}>
                                                Add features to see them here
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                {expandedPreview && (
                                    <>
                                        {/* Benefits */}
                                        <div className="service-section">
                                            <h4 className="section-heading">
                                                <calcite-icon icon="lightbulb" scale="s"></calcite-icon>
                                                Benefits
                                            </h4>
                                            <ul className="benefits-list">
                                                {formData.benefits.filter(b => b.trim()).map((benefit, idx) => (
                                                    <li key={idx}>
                                                        <calcite-icon
                                                            icon="check"
                                                            scale="s"
                                                            style={{ color: formData.color }}
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
                                                {formData.applications.filter(a => a.trim()).map((app, idx) => (
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
                                                {formData.technologies.filter(t => t.trim()).map((tech, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="tech-tag"
                                                        style={{
                                                            backgroundColor: `${formData.color}15`,
                                                            color: formData.color
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
                                    icon-end={expandedPreview ? "chevron-up" : "chevron-down"}
                                    onClick={() => setExpandedPreview(!expandedPreview)}
                                >
                                    {expandedPreview ? 'Show Less' : 'Learn More'}
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
                    </div>
                </div>
            </div>
        </calcite-shell>
    );
}
