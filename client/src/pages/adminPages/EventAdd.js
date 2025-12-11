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
        celebrationHeader: 'Upcoming Event',
        eventDate: '',
        organizer: '',
        prizes: '',
        posterImage: '',
        registrationLink: '',
        websiteLink: ''
    });

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
            // Convert date to input format
            const eventData = {
                ...response.data,
                eventDate: new Date(response.data.eventDate).toISOString().split('T')[0]
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            const token = localStorage.getItem('adminToken');

            if (isEdit) {
                await axios.put(`${API_URL}/api/services/events/${id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`${API_URL}/api/services/events`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
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

    const formatDateForDisplay = (dateString) => {
        if (!dateString) return 'Event Date';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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
                                    Celebration Header
                                    <calcite-input
                                        value={formData.celebrationHeader}
                                        onInput={(e) => handleChange('celebrationHeader', e.target.value)}
                                        placeholder="e.g., Celebrate GIS Day 2025!"
                                        required
                                    ></calcite-input>
                                </calcite-label>

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

                                <calcite-label>
                                    Event Date
                                    <input
                                        type="date"
                                        value={formData.eventDate}
                                        onChange={(e) => handleChange('eventDate', e.target.value)}
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
                                    Poster Image URL
                                    <calcite-input
                                        value={formData.posterImage}
                                        onInput={(e) => handleChange('posterImage', e.target.value)}
                                        placeholder="https://example.com/poster.jpg or /assets/poster.jpg"
                                        required
                                    ></calcite-input>
                                </calcite-label>

                                <calcite-label>
                                    Registration Link (Optional)
                                    <calcite-input
                                        value={formData.registrationLink}
                                        onInput={(e) => handleChange('registrationLink', e.target.value)}
                                        placeholder="https://example.com/register"
                                    ></calcite-input>
                                </calcite-label>

                                <calcite-label>
                                    Website Link (Optional)
                                    <calcite-input
                                        value={formData.websiteLink}
                                        onInput={(e) => handleChange('websiteLink', e.target.value)}
                                        placeholder="https://example.com"
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
                                    <div className="event-celebration-header">
                                        <calcite-icon icon="globe" scale="s"></calcite-icon>
                                        {formData.celebrationHeader || 'Upcoming Event'}
                                        <calcite-icon icon="まつり" scale="s"></calcite-icon>
                                    </div>

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
                                                <p>{formatDateForDisplay(formData.eventDate)}</p>
                                            </div>
                                        </div>

                                        <div className="event-info-item">
                                            <calcite-icon icon="award" scale="s"></calcite-icon>
                                            <div className="event-info-text">
                                                <h4>Prizes</h4>
                                                <p>{formData.prizes || 'Prize Information'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="event-card-actions">
                                        <calcite-button
                                            appearance="solid"
                                            kind="brand"
                                            scale="l"
                                            icon-end="rocket"
                                        >
                                            Register Now
                                        </calcite-button>
                                        <calcite-button
                                            appearance="outline"
                                            kind="brand"
                                            scale="l"
                                            icon-end="launch"
                                        >
                                            Event Website
                                        </calcite-button>
                                    </div>
                                </div>

                                {/* Right Side - Event Poster */}
                                <div className="event-poster-side">
                                    {formData.posterImage ? (
                                        <img
                                            src={formData.posterImage}
                                            alt="Event Poster"
                                            className="event-poster-image"
                                            onError={(e) => {
                                                e.target.src = "https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-storymaps/assets/arcgis-storymaps.jpg";
                                            }}
                                        />
                                    ) : (
                                        <div className="event-poster-placeholder">
                                            <calcite-icon icon="image" scale="l"></calcite-icon>
                                            <p>Poster Preview</p>
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
