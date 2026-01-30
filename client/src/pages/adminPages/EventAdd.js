import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-input';
import '@esri/calcite-components/components/calcite-label';
import '@esri/calcite-components/components/calcite-text-area';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-card';
import '../../styles/adminStyles/eventAdd.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export default function EventAdd() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        title: '',
        theme: '',
        description: '',
        startDate: '',
        endDate: '',
        organizer: '',
        prizes: '',
        posterImage: '',
        registrationLink: '',
        websiteLink: '',
        showRegisterButton: true,
        showWebsiteButton: true
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isEdit) {
            fetchEvent();
        }
    }, [id]);

    const fetchEvent = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/services/events/${id}`);
            // Convert dates to input format
            const eventData = {
                ...response.data,
                startDate: new Date(response.data.startDate).toISOString().split('T')[0],
                endDate: new Date(response.data.endDate).toISOString().split('T')[0]
            };
            setFormData(eventData);
        } catch (err) {
            setError('Failed to load event');
            console.error(err);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
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
                if (key !== 'posterImage' && formData[key]) {
                    submitData.append(key, formData[key]);
                }
            });

            // Add image file if selected
            if (imageFile) {
                submitData.append('posterImage', imageFile);
            } else if (formData.posterImage && !isEdit) {
                // If no file but has URL (shouldn't happen in new form)
                submitData.append('posterImage', formData.posterImage);
            }

            if (isEdit) {
                await axios.put(`${API_URL}/api/services/events/${id}`, submitData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post(`${API_URL}/api/services/events`, submitData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            navigate('/admin/services/events');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save event');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    // Helper function to determine event status based on date range
    const getEventStatus = (startDate, endDate) => {
        if (!startDate || !endDate) {
            return {
                text: 'Upcoming Event',
                backgroundColor: 'linear-gradient(135deg, #0079c1 0%, #005a8f 100%)',
                color: '#ffffff'
            };
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);

        const end = new Date(endDate);
        end.setHours(0, 0, 0, 0);

        if (today > end) {
            return {
                text: 'Previous Event',
                backgroundColor: '#ff6b35',
                color: '#ffffff'
            };
        } else if (today >= start && today <= end) {
            return {
                text: 'Ongoing Event',
                backgroundColor: '#28a745',
                color: '#ffffff'
            };
        } else {
            return {
                text: 'Upcoming Event',
                backgroundColor: 'linear-gradient(135deg, #0079c1 0%, #005a8f 100%)',
                color: '#ffffff'
            };
        }
    };

    const formatDateForDisplay = (startDate, endDate) => {
        if (!startDate || !endDate) return 'Event Date Range';
        const start = new Date(startDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
        const end = new Date(endDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        return `${start} - ${end}`;
    };

    return (
        <calcite-shell>
            <AdminNavbar />
            <AdminSidebar />
            <div className="admin-page event-add-page">
                <div className="admin-page-header">
                    <div>
                        <h1>{isEdit ? 'Edit' : 'Add'} Event</h1>
                        <p>Fill in the details and see a live preview</p>
                    </div>
                    <calcite-button
                        appearance="outline"
                        icon-start="arrow-left"
                        onClick={() => navigate('/admin/services/events')}
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
                                <h3>Event Information</h3>

                                <calcite-label>
                                    Event Title
                                    <calcite-input
                                        value={formData.title}
                                        onInput={(e) => handleChange('title', e.target.value)}
                                        placeholder="e.g., Online Webinar & StoryMaps Competition"
                                        required
                                    ></calcite-input>
                                </calcite-label>

                                <calcite-label>
                                    Theme
                                    <calcite-input
                                        value={formData.theme}
                                        onInput={(e) => handleChange('theme', e.target.value)}
                                        placeholder="e.g., Mapping the Beauty of Sri Lanka"
                                        required
                                    ></calcite-input>
                                </calcite-label>

                                <calcite-label>
                                    Description
                                    <calcite-text-area
                                        value={formData.description}
                                        onInput={(e) => handleChange('description', e.target.value)}
                                        placeholder="Detailed description of the event"
                                        rows="4"
                                        required
                                    ></calcite-text-area>
                                </calcite-label>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <calcite-label>
                                        Start Date
                                        <input
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => handleChange('startDate', e.target.value)}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '8px',
                                                border: '1px solid var(--calcite-ui-border-1)',
                                                borderRadius: '4px',
                                                fontSize: '14px'
                                            }}
                                        />
                                    </calcite-label>

                                    <calcite-label>
                                        End Date
                                        <input
                                            type="date"
                                            value={formData.endDate}
                                            onChange={(e) => handleChange('endDate', e.target.value)}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '8px',
                                                border: '1px solid var(--calcite-ui-border-1)',
                                                borderRadius: '4px',
                                                fontSize: '14px'
                                            }}
                                        />
                                    </calcite-label>
                                </div>
                            </div>

                            {/* Organization Details */}
                            <div className="form-section">
                                <h3>Organization Details</h3>

                                <calcite-label>
                                    Organizer
                                    <calcite-input
                                        value={formData.organizer}
                                        onInput={(e) => handleChange('organizer', e.target.value)}
                                        placeholder="e.g., GIS Solutions (Pvt) Ltd"
                                        required
                                    ></calcite-input>
                                </calcite-label>

                                <calcite-label>
                                    Prizes
                                    <calcite-input
                                        value={formData.prizes}
                                        onInput={(e) => handleChange('prizes', e.target.value)}
                                        placeholder="e.g., Valuable Awards & Certificates"
                                        required
                                    ></calcite-input>
                                </calcite-label>
                            </div>

                            {/* Media & Links */}
                            <div className="form-section">
                                <h3>Media & Links</h3>

                                <calcite-label>
                                    Event Poster Image
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
                                        Upload a square image (recommended: 800x800px, max 5MB)
                                    </div>
                                </calcite-label>

                                {/* Image Preview */}
                                {(imagePreview || formData.posterImage) && (
                                    <div style={{ marginTop: '12px' }}>
                                        <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                                            Image Preview:
                                        </div>
                                        <div style={{
                                            width: '200px',
                                            height: '200px',
                                            border: '2px solid var(--calcite-ui-border-1)',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#f8f9fa'
                                        }}>
                                            <img
                                                src={imagePreview || `${API_URL}${formData.posterImage}`}
                                                alt="Event Poster Preview"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                                onError={(e) => {
                                                    e.target.src = "https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-storymaps/assets/arcgis-storymaps.jpg";
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                <calcite-label>
                                    Registration Link (Optional)
                                    <calcite-input
                                        value={formData.registrationLink}
                                        onInput={(e) => handleChange('registrationLink', e.target.value)}
                                        placeholder="https://example.com/register"
                                    ></calcite-input>
                                </calcite-label>

                                <calcite-label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                                    <input
                                        type="checkbox"
                                        checked={formData.showRegisterButton}
                                        onChange={(e) => handleChange('showRegisterButton', e.target.checked)}
                                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                    />
                                    <span>Show "Register Now" button</span>
                                </calcite-label>

                                <calcite-label>
                                    Website Link (Optional)
                                    <calcite-input
                                        value={formData.websiteLink}
                                        onInput={(e) => handleChange('websiteLink', e.target.value)}
                                        placeholder="https://example.com"
                                    ></calcite-input>
                                </calcite-label>

                                <calcite-label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                                    <input
                                        type="checkbox"
                                        checked={formData.showWebsiteButton}
                                        onChange={(e) => handleChange('showWebsiteButton', e.target.checked)}
                                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                    />
                                    <span>Show "Event Website" button</span>
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
                                    {isEdit ? 'Update' : 'Create'} Event
                                </calcite-button>
                            </div>
                        </form>
                    </div>

                    {/* Right Side - Live Preview */}
                    <div className="service-preview-container">
                        <div className="preview-header">
                            <h3>Live Preview</h3>
                            <p>Event card as it will appear to users</p>
                        </div>

                        <calcite-card className="event-main-card preview-card">
                            <div className="event-card-grid">
                                {/* Left Side - Event Details */}
                                <div className="event-details-side">
                                    {(() => {
                                        const eventStatus = getEventStatus(formData.startDate, formData.endDate);
                                        return (
                                            <div
                                                className="event-celebration-header"
                                                style={{
                                                    background: eventStatus.backgroundColor,
                                                    color: eventStatus.color
                                                }}
                                            >
                                                <calcite-icon icon="globe" scale="s"></calcite-icon>
                                                {eventStatus.text}
                                                <calcite-icon icon="star" scale="s"></calcite-icon>
                                            </div>
                                        );
                                    })()}

                                    <h3 className="event-card-title">
                                        {formData.title || 'Event Title'}
                                    </h3>
                                    <p className="event-theme">
                                        "{formData.theme || 'Event Theme'}"
                                    </p>

                                    <div className="event-card-description">
                                        <p>{formData.description || 'Event description will appear here'}</p>
                                    </div>

                                    <div className="event-info-grid">
                                        <div className="event-info-item">
                                            <calcite-icon icon="organization" scale="s"></calcite-icon>
                                            <div className="event-info-text">
                                                <h4>Organized By</h4>
                                                <p>{formData.organizer || 'Organizer Name'}</p>
                                            </div>
                                        </div>

                                        <div className="event-info-item">
                                            <calcite-icon icon="calendar" scale="s"></calcite-icon>
                                            <div className="event-info-text">
                                                <h4>Date</h4>
                                                <p>{formatDateForDisplay(formData.startDate, formData.endDate)}</p>
                                            </div>
                                        </div>

                                        <div className="event-info-item">
                                            <calcite-icon icon="star" scale="s"></calcite-icon>
                                            <div className="event-info-text">
                                                <h4>Prizes</h4>
                                                <p>{formData.prizes || 'Prize Information'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="event-card-actions">
                                        {formData.showRegisterButton && (
                                            <calcite-button
                                                appearance="solid"
                                                kind="brand"
                                                scale="l"
                                                icon-end="rocket"
                                            >
                                                Register Now
                                            </calcite-button>
                                        )}
                                        {formData.showWebsiteButton && (
                                            <calcite-button
                                                appearance="outline"
                                                kind="brand"
                                                scale="l"
                                                icon-end="launch"
                                            >
                                                Event Website
                                            </calcite-button>
                                        )}
                                    </div>
                                </div>

                                {/* Right Side - Event Poster */}
                                <div className="event-poster-side">
                                    {(imagePreview || formData.posterImage) ? (
                                        <img
                                            src={imagePreview || `${API_URL}${formData.posterImage}`}
                                            alt="Event Poster"
                                            className="event-poster-image"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                aspectRatio: '1/1'
                                            }}
                                            onError={(e) => {
                                                e.target.src = "https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-storymaps/assets/arcgis-storymaps.jpg";
                                            }}
                                        />
                                    ) : (
                                        <div className="event-poster-placeholder">
                                            <calcite-icon icon="image" scale="l"></calcite-icon>
                                            <p>Poster Preview</p>
                                            <p style={{ fontSize: '12px', color: '#6a6a6a' }}>Upload an image to see preview</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </calcite-card>
                    </div>
                </div>
            </div>
        </calcite-shell>
    );
}
