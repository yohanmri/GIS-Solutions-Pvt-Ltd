import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import API from '../../api/axios';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-input';
import '@esri/calcite-components/components/calcite-label';
import '@esri/calcite-components/components/calcite-select';
import '@esri/calcite-components/components/calcite-option';
import '@esri/calcite-components/components/calcite-text-area';
import '@esri/calcite-components/components/calcite-card';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-switch';

export default function ServiceAdd() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        serviceType: 'professional',
        title: '',
        description: '',
        image: '',
        // Professional specific
        category: 'consulting',
        features: '',
        benefits: '',
        applications: '',
        technologies: '',
        // Training specific
        trainingType: 'WEB COURSE',
        duration: '',
        date: '',
        level: 'Beginner',
        difficulty: 1,
        isFree: false,
        requiresMaintenance: false,
        // Event specific
        eventDate: '',
        theme: '',
        organizer: 'GIS Solutions (Pvt) Ltd',
        prizes: '',
        registrationLink: '',
        websiteLink: '',
        location: 'Online'
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);

            // Process array fields
            const processedData = {
                ...formData,
                features: formData.features.split('\n').filter(i => i.trim()),
                benefits: formData.benefits.split('\n').filter(i => i.trim()),
                applications: formData.applications.split('\n').filter(i => i.trim()),
                technologies: formData.technologies.split('\n').filter(i => i.trim()),
            };

            await API.post('/admin/services', processedData);
            navigate('/admin/services');
        } catch (err) {
            console.error('Error creating service:', err);
            setError(err.response?.data?.message || 'Failed to create service. Please check all fields.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <calcite-shell>
            <AdminNavbar />
            <AdminSidebar />

            <div style={{ padding: '24px', height: '100%', overflow: 'auto', backgroundColor: '#f8f8f8' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>Add New Service</h1>
                        <calcite-button appearance="outline" onClick={() => navigate('/admin/services')}>
                            Cancel
                        </calcite-button>
                    </div>

                    {error && (
                        <calcite-notice open icon="exclamation-mark-triangle" kind="danger" style={{ marginBottom: '20px' }}>
                            <div slot="title">Error</div>
                            <div slot="message">{error}</div>
                        </calcite-notice>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* Basic Info */}
                        <calcite-card>
                            <div style={{ padding: '20px' }}>
                                <h3 style={{ margin: '0 0 16px 0' }}>Basic Information</h3>

                                <calcite-label>
                                    Service Type
                                    <calcite-select
                                        value={formData.serviceType}
                                        onCalciteSelectChange={(e) => handleChange('serviceType', e.target.value)}
                                    >
                                        <calcite-option value="professional">Professional Service</calcite-option>
                                        <calcite-option value="training">Training Program</calcite-option>
                                        <calcite-option value="event">Event</calcite-option>
                                    </calcite-select>
                                </calcite-label>

                                <calcite-label>
                                    Title
                                    <calcite-input
                                        value={formData.title}
                                        onCalciteInputInput={(e) => handleChange('title', e.target.value)}
                                        placeholder="Service title"
                                    />
                                </calcite-label>

                                <calcite-label>
                                    Description
                                    <calcite-text-area
                                        value={formData.description}
                                        onCalciteTextAreaInput={(e) => handleChange('description', e.target.value)}
                                        placeholder="Detailed description"
                                        rows={4}
                                    />
                                </calcite-label>

                                <calcite-label>
                                    Image URL
                                    <calcite-input
                                        value={formData.image}
                                        onCalciteInputInput={(e) => handleChange('image', e.target.value)}
                                        placeholder="https://..."
                                    />
                                </calcite-label>
                            </div>
                        </calcite-card>

                        {/* Professional Service Fields */}
                        {formData.serviceType === 'professional' && (
                            <calcite-card>
                                <div style={{ padding: '20px' }}>
                                    <h3 style={{ margin: '0 0 16px 0' }}>Professional Service Details</h3>

                                    <calcite-label>
                                        Category
                                        <calcite-select
                                            value={formData.category}
                                            onCalciteSelectChange={(e) => handleChange('category', e.target.value)}
                                        >
                                            <calcite-option value="consulting">Consulting</calcite-option>
                                            <calcite-option value="development">Development</calcite-option>
                                            <calcite-option value="analysis">Analysis</calcite-option>
                                            <calcite-option value="mapping">Mapping</calcite-option>
                                            <calcite-option value="remote-sensing">Remote Sensing</calcite-option>
                                            <calcite-option value="data">Data Services</calcite-option>
                                        </calcite-select>
                                    </calcite-label>

                                    <calcite-label>
                                        Features (One per line)
                                        <calcite-text-area
                                            value={formData.features}
                                            onCalciteTextAreaInput={(e) => handleChange('features', e.target.value)}
                                            rows={3}
                                        />
                                    </calcite-label>

                                    <calcite-label>
                                        Benefits (One per line)
                                        <calcite-text-area
                                            value={formData.benefits}
                                            onCalciteTextAreaInput={(e) => handleChange('benefits', e.target.value)}
                                            rows={3}
                                        />
                                    </calcite-label>

                                    <calcite-label>
                                        Applications (One per line)
                                        <calcite-text-area
                                            value={formData.applications}
                                            onCalciteTextAreaInput={(e) => handleChange('applications', e.target.value)}
                                            rows={3}
                                        />
                                    </calcite-label>

                                    <calcite-label>
                                        Technologies (One per line)
                                        <calcite-text-area
                                            value={formData.technologies}
                                            onCalciteTextAreaInput={(e) => handleChange('technologies', e.target.value)}
                                            rows={3}
                                        />
                                    </calcite-label>
                                </div>
                            </calcite-card>
                        )}

                        {/* Training Program Fields */}
                        {formData.serviceType === 'training' && (
                            <calcite-card>
                                <div style={{ padding: '20px' }}>
                                    <h3 style={{ margin: '0 0 16px 0' }}>Training Details</h3>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <calcite-label>
                                            Training Type
                                            <calcite-select
                                                value={formData.trainingType}
                                                onCalciteSelectChange={(e) => handleChange('trainingType', e.target.value)}
                                            >
                                                <calcite-option value="WEB COURSE">Web Course</calcite-option>
                                                <calcite-option value="INSTRUCTOR-LED">Instructor-Led</calcite-option>
                                                <calcite-option value="TRAINING SEMINAR">Training Seminar</calcite-option>
                                                <calcite-option value="ARCGIS LAB">ArcGIS Lab</calcite-option>
                                            </calcite-select>
                                        </calcite-label>

                                        <calcite-label>
                                            Level
                                            <calcite-select
                                                value={formData.level}
                                                onCalciteSelectChange={(e) => handleChange('level', e.target.value)}
                                            >
                                                <calcite-option value="Beginner">Beginner</calcite-option>
                                                <calcite-option value="Intermediate">Intermediate</calcite-option>
                                                <calcite-option value="Advanced">Advanced</calcite-option>
                                            </calcite-select>
                                        </calcite-label>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <calcite-label>
                                            Duration
                                            <calcite-input
                                                value={formData.duration}
                                                onCalciteInputInput={(e) => handleChange('duration', e.target.value)}
                                                placeholder="e.g. 2 Hours"
                                            />
                                        </calcite-label>

                                        <calcite-label>
                                            Date/Schedule
                                            <calcite-input
                                                value={formData.date}
                                                onCalciteInputInput={(e) => handleChange('date', e.target.value)}
                                                placeholder="e.g. Self-paced"
                                            />
                                        </calcite-label>
                                    </div>

                                    <calcite-label>
                                        Difficulty (1-5)
                                        <calcite-input
                                            type="number"
                                            min="1"
                                            max="5"
                                            value={formData.difficulty}
                                            onCalciteInputInput={(e) => handleChange('difficulty', parseInt(e.target.value))}
                                        />
                                    </calcite-label>

                                    <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                                        <calcite-label layout="inline">
                                            <calcite-switch
                                                checked={formData.isFree}
                                                onCalciteSwitchChange={(e) => handleChange('isFree', e.target.checked)}
                                            />
                                            Free Course
                                        </calcite-label>

                                        <calcite-label layout="inline">
                                            <calcite-switch
                                                checked={formData.requiresMaintenance}
                                                onCalciteSwitchChange={(e) => handleChange('requiresMaintenance', e.target.checked)}
                                            />
                                            Requires Maintenance
                                        </calcite-label>
                                    </div>
                                </div>
                            </calcite-card>
                        )}

                        {/* Event Fields */}
                        {formData.serviceType === 'event' && (
                            <calcite-card>
                                <div style={{ padding: '20px' }}>
                                    <h3 style={{ margin: '0 0 16px 0' }}>Event Details</h3>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <calcite-label>
                                            Event Date
                                            <calcite-input
                                                type="date"
                                                value={formData.eventDate}
                                                onCalciteInputInput={(e) => handleChange('eventDate', e.target.value)}
                                            />
                                        </calcite-label>

                                        <calcite-label>
                                            Location
                                            <calcite-input
                                                value={formData.location}
                                                onCalciteInputInput={(e) => handleChange('location', e.target.value)}
                                            />
                                        </calcite-label>
                                    </div>

                                    <calcite-label>
                                        Theme
                                        <calcite-input
                                            value={formData.theme}
                                            onCalciteInputInput={(e) => handleChange('theme', e.target.value)}
                                        />
                                    </calcite-label>

                                    <calcite-label>
                                        Organizer
                                        <calcite-input
                                            value={formData.organizer}
                                            onCalciteInputInput={(e) => handleChange('organizer', e.target.value)}
                                        />
                                    </calcite-label>

                                    <calcite-label>
                                        Prizes/Awards
                                        <calcite-input
                                            value={formData.prizes}
                                            onCalciteInputInput={(e) => handleChange('prizes', e.target.value)}
                                        />
                                    </calcite-label>

                                    <calcite-label>
                                        Registration Link
                                        <calcite-input
                                            value={formData.registrationLink}
                                            onCalciteInputInput={(e) => handleChange('registrationLink', e.target.value)}
                                        />
                                    </calcite-label>

                                    <calcite-label>
                                        Website Link
                                        <calcite-input
                                            value={formData.websiteLink}
                                            onCalciteInputInput={(e) => handleChange('websiteLink', e.target.value)}
                                        />
                                    </calcite-label>
                                </div>
                            </calcite-card>
                        )}

                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                            <calcite-button
                                appearance="solid"
                                onClick={handleSubmit}
                                loading={loading}
                            >
                                Create Service
                            </calcite-button>
                        </div>
                    </div>
                </div>
            </div>
        </calcite-shell>
    );
}
