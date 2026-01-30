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
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-notice';
import '../../styles/adminStyles/notificationAdd.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export default function NotificationAdd() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        badge: 'Upcoming Event',
        image: '',
        serviceType: 'event',
        serviceId: '',
        startDate: '',
        endDate: '',
        displayTimes: [],
        buttons: [{ label: 'View Details', link: '', type: 'internal' }]
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isEdit) {
            fetchNotification();
        }
        fetchServices();
    }, [id, formData.serviceType]);

    const fetchNotification = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(`${API_URL}/api/notifications/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = {
                ...response.data,
                startDate: new Date(response.data.startDate).toISOString().split('T')[0],
                endDate: new Date(response.data.endDate).toISOString().split('T')[0]
            };
            setFormData(data);
        } catch (err) {
            setError('Failed to load notification');
            console.error(err);
        }
    };

    const fetchServices = async () => {
        try {
            let endpoint = '';
            switch (formData.serviceType) {
                case 'professional':
                    endpoint = '/api/services/professional';
                    break;
                case 'event':
                    endpoint = '/api/services/events';
                    break;
            }
            const response = await axios.get(`${API_URL}${endpoint}`);
            setServices(response.data);
        } catch (err) {
            console.error('Failed to fetch services:', err);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const addTimeSlot = () => {
        setFormData(prev => ({
            ...prev,
            displayTimes: [...prev.displayTimes, { startTime: '09:00', endTime: '17:00' }]
        }));
    };

    const removeTimeSlot = (index) => {
        setFormData(prev => ({
            ...prev,
            displayTimes: prev.displayTimes.filter((_, i) => i !== index)
        }));
    };

    const updateTimeSlot = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            displayTimes: prev.displayTimes.map((slot, i) =>
                i === index ? { ...slot, [field]: value } : slot
            )
        }));
    };

    const addButton = () => {
        setFormData(prev => ({
            ...prev,
            buttons: [...prev.buttons, { label: '', link: '', type: 'external' }]
        }));
    };

    const removeButton = (index) => {
        setFormData(prev => ({
            ...prev,
            buttons: prev.buttons.filter((_, i) => i !== index)
        }));
    };

    const updateButton = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            buttons: prev.buttons.map((btn, i) =>
                i === index ? { ...btn, [field]: value } : btn
            )
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            const token = localStorage.getItem('adminToken');

            if (isEdit) {
                await axios.put(`${API_URL}/api/notifications/${id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`${API_URL}/api/notifications`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }

            navigate('/admin/notifications');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save notification');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const selectedService = services.find(s => s._id === formData.serviceId);

    return (
        <calcite-shell>
            <AdminNavbar />
            <AdminSidebar />
            <div className="admin-page notification-add-page">
                <div className="admin-page-header">
                    <div>
                        <h1>{isEdit ? 'Edit' : 'Add'} Notification</h1>
                        <p>Configure notification with service linking</p>
                    </div>
                    <calcite-button
                        appearance="outline"
                        icon-start="arrow-left"
                        onClick={() => navigate('/admin/notifications')}
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
                                <h3>Notification Content</h3>

                                <calcite-label>
                                    Badge Text
                                    <calcite-input
                                        value={formData.badge}
                                        onInput={(e) => handleChange('badge', e.target.value)}
                                        placeholder="e.g., Upcoming Event"
                                        required
                                    ></calcite-input>
                                </calcite-label>

                                <calcite-label>
                                    Title
                                    <calcite-input
                                        value={formData.title}
                                        onInput={(e) => handleChange('title', e.target.value)}
                                        placeholder="e.g., GIS Day 2025 Celebration"
                                        required
                                    ></calcite-input>
                                </calcite-label>

                                <calcite-label>
                                    Description
                                    <calcite-text-area
                                        value={formData.description}
                                        onInput={(e) => handleChange('description', e.target.value)}
                                        placeholder="Brief description"
                                        rows="3"
                                        required
                                    ></calcite-text-area>
                                </calcite-label>

                                <calcite-label>
                                    Notification Image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            border: '1px solid var(--calcite-ui-border-1)',
                                            borderRadius: '4px'
                                        }}
                                    />
                                    {imagePreview && (
                                        <div style={{ marginTop: '8px' }}>
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                style={{
                                                    maxWidth: '200px',
                                                    maxHeight: '150px',
                                                    borderRadius: '4px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </div>
                                    )}
                                </calcite-label>
                            </div>

                            {/* Service Linking */}
                            <div className="form-section">
                                <h3>Link to Service</h3>

                                <calcite-label>
                                    Service Type
                                    <calcite-select
                                        value={formData.serviceType}
                                        onChange={(e) => {
                                            handleChange('serviceType', e.target.value);
                                            handleChange('serviceId', '');
                                        }}
                                    >
                                        <calcite-option value="professional">Professional Service</calcite-option>
                                        <calcite-option value="event">Event</calcite-option>
                                    </calcite-select>
                                </calcite-label>

                                <calcite-label>
                                    Select Service
                                    <calcite-select
                                        value={formData.serviceId}
                                        onChange={(e) => handleChange('serviceId', e.target.value)}
                                        required
                                    >
                                        <calcite-option value="">-- Select --</calcite-option>
                                        {services.map(service => (
                                            <calcite-option key={service._id} value={service._id}>
                                                {service.title}
                                            </calcite-option>
                                        ))}
                                    </calcite-select>
                                </calcite-label>
                            </div>

                            {/* Date Range */}
                            <div className="form-section">
                                <h3>Display Period</h3>

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
                                            borderRadius: '4px'
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
                                            borderRadius: '4px'
                                        }}
                                    />
                                </calcite-label>
                            </div>

                            {/* Time Slots */}
                            <div className="form-section">
                                <h3>Time Slots (Optional)</h3>
                                <p style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginBottom: '12px' }}>
                                    Leave empty to show all day
                                </p>

                                {formData.displayTimes.map((slot, index) => (
                                    <div key={index} className="time-slot-row">
                                        <input
                                            type="time"
                                            value={slot.startTime}
                                            onChange={(e) => updateTimeSlot(index, 'startTime', e.target.value)}
                                            className="time-input"
                                        />
                                        <span>to</span>
                                        <input
                                            type="time"
                                            value={slot.endTime}
                                            onChange={(e) => updateTimeSlot(index, 'endTime', e.target.value)}
                                            className="time-input"
                                        />
                                        <calcite-button
                                            appearance="outline"
                                            kind="danger"
                                            icon-start="minus"
                                            scale="s"
                                            onClick={() => removeTimeSlot(index)}
                                        ></calcite-button>
                                    </div>
                                ))}

                                <calcite-button
                                    appearance="outline"
                                    icon-start="plus"
                                    scale="s"
                                    onClick={addTimeSlot}
                                >
                                    Add Time Slot
                                </calcite-button>
                            </div>

                            {/* Action Buttons */}
                            <div className="form-section">
                                <h3>Action Buttons</h3>

                                {formData.buttons.map((button, index) => (
                                    <div key={index} className="button-config-row">
                                        <calcite-input
                                            value={button.label}
                                            onInput={(e) => updateButton(index, 'label', e.target.value)}
                                            placeholder="Button Label"
                                            required
                                        ></calcite-input>
                                        <calcite-input
                                            value={button.link}
                                            onInput={(e) => updateButton(index, 'link', e.target.value)}
                                            placeholder="URL or path"
                                            required
                                        ></calcite-input>
                                        <calcite-select
                                            value={button.type}
                                            onChange={(e) => updateButton(index, 'type', e.target.value)}
                                        >
                                            <calcite-option value="internal">Internal</calcite-option>
                                            <calcite-option value="external">External</calcite-option>
                                        </calcite-select>
                                        {formData.buttons.length > 1 && (
                                            <calcite-button
                                                appearance="outline"
                                                kind="danger"
                                                icon-start="minus"
                                                scale="s"
                                                onClick={() => removeButton(index)}
                                            ></calcite-button>
                                        )}
                                    </div>
                                ))}

                                <calcite-button
                                    appearance="outline"
                                    icon-start="plus"
                                    scale="s"
                                    onClick={addButton}
                                >
                                    Add Button
                                </calcite-button>
                            </div>

                            {/* Submit */}
                            <div className="form-actions">
                                <calcite-button
                                    type="submit"
                                    appearance="solid"
                                    kind="brand"
                                    width="full"
                                    loading={saving}
                                >
                                    {isEdit ? 'Update' : 'Create'} Notification
                                </calcite-button>
                            </div>
                        </form>
                    </div>

                    {/* Right Side - Live Preview */}
                    <div className="service-preview-container">
                        <div className="preview-header">
                            <h3>Live Preview</h3>
                            <p>Notification popup as it appears on homepage</p>
                        </div>

                        <div className="event-notification-popup preview-notification">
                            <div className="event-notification-content">
                                <div className="event-notification-grid">
                                    <div className="event-notification-image">
                                        {(imagePreview || formData.image) ? (
                                            <img
                                                src={imagePreview || formData.image}
                                                alt="Notification"
                                                onError={(e) => {
                                                    e.target.src = "https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-storymaps/assets/arcgis-storymaps.jpg";
                                                }}
                                            />
                                        ) : (
                                            <div className="image-placeholder">
                                                <calcite-icon icon="image" scale="l"></calcite-icon>
                                            </div>
                                        )}
                                    </div>

                                    <div className="event-notification-text">
                                        <div className="event-notification-header">
                                            <calcite-icon icon="star" scale="s"></calcite-icon>
                                            <span className="event-notification-badge">
                                                {formData.badge || 'Badge'}
                                            </span>
                                        </div>

                                        <h3 className="event-notification-title">
                                            {formData.title || 'Notification Title'}
                                        </h3>

                                        <p className="event-notification-description">
                                            {formData.description || 'Notification description will appear here'}
                                        </p>

                                        {selectedService && (
                                            <div className="event-notification-details">
                                                <div className="event-detail-item">
                                                    <calcite-icon icon="link" scale="s"></calcite-icon>
                                                    <span>Linked to: {selectedService.title}</span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="event-notification-actions">
                                            {formData.buttons.map((button, index) => (
                                                <calcite-button
                                                    key={index}
                                                    appearance={index === 0 ? 'solid' : 'outline'}
                                                    kind="brand"
                                                    scale="s"
                                                    icon-end={button.type === 'external' ? 'launch' : 'arrow-right'}
                                                >
                                                    {button.label || `Button ${index + 1}`}
                                                </calcite-button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </calcite-shell>
    );
}
