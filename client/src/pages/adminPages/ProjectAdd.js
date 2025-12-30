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
import '../../styles/adminStyles/projectAdd.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const CATEGORY_OPTIONS = [
    { value: 'Government', label: 'Government' },
    { value: 'Municipal', label: 'Municipal' },
    { value: 'Utilities', label: 'Utilities' },
    { value: 'Agriculture', label: 'Agriculture' },
    { value: 'Private', label: 'Private' },
    { value: 'NGO', label: 'NGO' },
    { value: 'Other', label: 'Other' }
];

export default function ProjectAdd() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        title: '',
        client: '',
        description: '',
        challenge: '',
        solution: '',
        impact: [''],
        image: '',
        dashboardImage: '',
        technologies: [''],
        year: new Date().getFullYear().toString(),
        category: 'Government'
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [expandedPreview, setExpandedPreview] = useState(false);

    useEffect(() => {
        if (isEdit) {
            fetchProject();
        }
    }, [id]);

    const fetchProject = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/projects/${id}`);
            setFormData(response.data);
        } catch (err) {
            setError('Failed to load project');
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please select an image file');
                return;
            }
            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size should be less than 5MB');
                return;
            }
            setImageFile(file);
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setError(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            // Create FormData for file upload
            const submitData = new FormData();

            // Add all form fields
            Object.keys(formData).forEach(key => {
                if (key === 'impact' || key === 'technologies') {
                    // Filter and add arrays
                    const filtered = formData[key].filter(item => item.trim());
                    filtered.forEach(item => {
                        submitData.append(key, item);
                    });
                } else if (key !== 'image' && formData[key]) {
                    submitData.append(key, formData[key]);
                }
            });

            // Add image file if selected
            if (imageFile) {
                submitData.append('projectImage', imageFile);
            } else if (formData.image && !isEdit) {
                // If no file but has URL (shouldn't happen in new form)
                submitData.append('image', formData.image);
            }

            if (isEdit) {
                await axios.put(`${API_URL}/api/projects/${id}`, submitData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post(`${API_URL}/api/projects`, submitData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            navigate('/admin/projects');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save project');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <calcite-shell>
            <AdminNavbar />
            <AdminSidebar />
            <div className="admin-page project-add-page">
                <div className="admin-page-header">
                    <div>
                        <h1>{isEdit ? 'Edit' : 'Add'} App Project</h1>
                        <p>Fill in the details and see a live preview</p>
                    </div>
                    <calcite-button
                        appearance="outline"
                        icon-start="arrow-left"
                        onClick={() => navigate('/admin/projects')}
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
                                <h3>Project Information</h3>

                                <calcite-label>
                                    Project Title
                                    <calcite-input
                                        value={formData.title}
                                        onInput={(e) => handleChange('title', e.target.value)}
                                        placeholder="e.g., MRV System for Environmental Ministry"
                                        required
                                    ></calcite-input>
                                </calcite-label>

                                <calcite-label>
                                    Client
                                    <calcite-input
                                        value={formData.client}
                                        onInput={(e) => handleChange('client', e.target.value)}
                                        placeholder="e.g., Ministry of Environment, Sri Lanka"
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
                                    Year
                                    <calcite-input
                                        value={formData.year}
                                        onInput={(e) => handleChange('year', e.target.value)}
                                        placeholder="e.g., 2023"
                                        required
                                    ></calcite-input>
                                </calcite-label>

                                <calcite-label>
                                    Description
                                    <calcite-text-area
                                        value={formData.description}
                                        onInput={(e) => handleChange('description', e.target.value)}
                                        placeholder="Brief description of the project"
                                        rows="3"
                                        required
                                    ></calcite-text-area>
                                </calcite-label>
                            </div>

                            {/* Challenge & Solution */}
                            <div className="form-section">
                                <h3>Challenge & Solution</h3>

                                <calcite-label>
                                    Challenge
                                    <calcite-text-area
                                        value={formData.challenge}
                                        onInput={(e) => handleChange('challenge', e.target.value)}
                                        placeholder="What problem did this project solve?"
                                        rows="3"
                                        required
                                    ></calcite-text-area>
                                </calcite-label>

                                <calcite-label>
                                    Solution
                                    <calcite-text-area
                                        value={formData.solution}
                                        onInput={(e) => handleChange('solution', e.target.value)}
                                        placeholder="How was the problem solved?"
                                        rows="3"
                                        required
                                    ></calcite-text-area>
                                </calcite-label>
                            </div>

                            {/* Impact */}
                            <div className="form-section">
                                <h3>Impact</h3>
                                {formData.impact.map((item, index) => (
                                    <div key={index} className="array-input-row">
                                        <calcite-input
                                            value={item}
                                            onInput={(e) => handleArrayChange('impact', index, e.target.value)}
                                            placeholder={`Impact ${index + 1}`}
                                        ></calcite-input>
                                        {formData.impact.length > 1 && (
                                            <calcite-button
                                                appearance="outline"
                                                kind="danger"
                                                icon-start="minus"
                                                scale="s"
                                                onClick={() => removeArrayItem('impact', index)}
                                            ></calcite-button>
                                        )}
                                    </div>
                                ))}
                                <calcite-button
                                    appearance="outline"
                                    icon-start="plus"
                                    scale="s"
                                    onClick={() => addArrayItem('impact')}
                                >
                                    Add Impact Item
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

                            {/* Images */}
                            <div className="form-section">
                                <h3>Images</h3>

                                <calcite-label>
                                    Project Image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            border: '1px solid var(--calcite-ui-border-1)',
                                            borderRadius: '4px',
                                            fontSize: '14px',
                                            cursor: 'pointer'
                                        }}
                                    />
                                    <div style={{ fontSize: '12px', color: '#6a6a6a', marginTop: '4px' }}>
                                        Upload a project image (recommended: 1200x800px, max 5MB)
                                    </div>
                                </calcite-label>

                                {/* Image Preview */}
                                {(imagePreview || formData.image) && (
                                    <div style={{ marginTop: '12px' }}>
                                        <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                                            Image Preview:
                                        </div>
                                        <div style={{
                                            width: '100%',
                                            maxWidth: '400px',
                                            height: '250px',
                                            border: '2px solid var(--calcite-ui-border-1)',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#f8f9fa'
                                        }}>
                                            <img
                                                src={imagePreview || (formData.image?.startsWith('/uploads/') ? `${API_URL}${formData.image}` : formData.image)}
                                                alt="Project Preview"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                                onError={(e) => {
                                                    e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80";
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                <calcite-label>
                                    Or use Image URL
                                    <calcite-input
                                        value={formData.image}
                                        onInput={(e) => handleChange('image', e.target.value)}
                                        placeholder="https://images.unsplash.com/..."
                                    ></calcite-input>
                                </calcite-label>
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
                                    {isEdit ? 'Update' : 'Create'} Project
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

                        <div className={`project-card preview-card ${expandedPreview ? 'expanded' : ''}`}>
                            {/* Card Header */}
                            <div className="project-header">
                                <div className="project-image-wrapper">
                                    <img
                                        src={imagePreview || (formData.image?.startsWith('/uploads/') ? `${API_URL}${formData.image}` : formData.image) || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"}
                                        alt={formData.title || "Project"}
                                        className="project-image"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80";
                                        }}
                                    />
                                    <div className="project-year-badge">
                                        {formData.year}
                                    </div>
                                </div>

                                <div className="project-header-content">
                                    <calcite-chip scale="s" kind="brand">
                                        {formData.category}
                                    </calcite-chip>
                                    <h3 className="project-title">{formData.title || 'Project Title'}</h3>
                                    <p className="project-client">{formData.client || 'Client Name'}</p>
                                    <p className="project-description">{formData.description || 'Project description will appear here'}</p>
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
                                        {formData.technologies.filter(t => t.trim()).map((tech, idx) => (
                                            <span key={idx} className="tech-tag">
                                                {tech}
                                            </span>
                                        ))}
                                        {formData.technologies.filter(t => t.trim()).length === 0 && (
                                            <p style={{ color: 'var(--calcite-ui-text-3)', fontSize: '14px' }}>
                                                Add technologies to see them here
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                {expandedPreview && (
                                    <>
                                        {/* Challenge */}
                                        <div className="project-section">
                                            <h4 className="section-heading">
                                                <calcite-icon icon="exclamation-mark-triangle" scale="s"></calcite-icon>
                                                Challenge
                                            </h4>
                                            <p className="project-text">{formData.challenge || 'Challenge description'}</p>
                                        </div>

                                        {/* Solution */}
                                        <div className="project-section">
                                            <h4 className="section-heading">
                                                <calcite-icon icon="lightbulb" scale="s"></calcite-icon>
                                                Solution
                                            </h4>
                                            <p className="project-text">{formData.solution || 'Solution description'}</p>
                                        </div>

                                        {/* Impact */}
                                        <div className="project-section">
                                            <h4 className="section-heading">
                                                <calcite-icon icon="graph-bar-horizontal" scale="s"></calcite-icon>
                                                Impact
                                            </h4>
                                            <ul className="impact-list">
                                                {formData.impact.filter(i => i.trim()).map((item, idx) => (
                                                    <li key={idx}>
                                                        <calcite-icon icon="check" scale="s"></calcite-icon>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Card Footer */}
                            <div className="project-footer">
                                <calcite-button
                                    appearance="outline"
                                    kind="brand"
                                    width="full"
                                    icon-end={expandedPreview ? "chevron-up" : "chevron-down"}
                                    onClick={() => setExpandedPreview(!expandedPreview)}
                                >
                                    {expandedPreview ? 'Show Less' : 'View Case Study'}
                                </calcite-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </calcite-shell>
    );
}
