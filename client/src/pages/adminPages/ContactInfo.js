import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-input';
import '@esri/calcite-components/components/calcite-label';
import '@esri/calcite-components/components/calcite-loader';
import '@esri/calcite-components/components/calcite-notice';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export default function ContactInfo() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyName: '',
        address: '',
        hotline: '',
        mobile: '',
        email: '',
        website: '',
        mapUrl: '',
        businessHours: {
            weekdays: '',
            saturday: '',
            sunday: ''
        }
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchContactInfo();
    }, []);

    const fetchContactInfo = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/contact/info`);
            setFormData(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load contact information');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            setSuccess(false);
            await axios.put(`${API_URL}/api/contact/info`, formData);
            setSuccess(true);
            setError(null);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save contact information');
            console.error(err);
        } finally {
            setSaving(false);
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
                        <h1>Contact Information</h1>
                        <p>Manage your company contact details</p>
                    </div>
                </div>

                {error && (
                    <calcite-notice kind="danger" open>
                        <div slot="message">{error}</div>
                    </calcite-notice>
                )}

                {success && (
                    <calcite-notice kind="success" open>
                        <div slot="message">Contact information updated successfully!</div>
                    </calcite-notice>
                )}

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <form onSubmit={handleSubmit}>
                        {/* Company Details */}
                        <div style={{ background: 'var(--calcite-ui-foreground-1)', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                            <h3 style={{ marginBottom: '16px' }}>Company Details</h3>

                            <calcite-label style={{ marginBottom: '16px' }}>
                                Company Name
                                <calcite-input
                                    value={formData.companyName}
                                    onInput={(e) => handleChange('companyName', e.target.value)}
                                    required
                                ></calcite-input>
                            </calcite-label>

                            <calcite-label style={{ marginBottom: '16px' }}>
                                Address
                                <calcite-input
                                    value={formData.address}
                                    onInput={(e) => handleChange('address', e.target.value)}
                                    required
                                ></calcite-input>
                            </calcite-label>
                        </div>

                        {/* Contact Details */}
                        <div style={{ background: 'var(--calcite-ui-foreground-1)', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                            <h3 style={{ marginBottom: '16px' }}>Contact Details</h3>

                            <calcite-label style={{ marginBottom: '16px' }}>
                                Hotline
                                <calcite-input
                                    value={formData.hotline}
                                    onInput={(e) => handleChange('hotline', e.target.value)}
                                    required
                                ></calcite-input>
                            </calcite-label>

                            <calcite-label style={{ marginBottom: '16px' }}>
                                Mobile
                                <calcite-input
                                    value={formData.mobile}
                                    onInput={(e) => handleChange('mobile', e.target.value)}
                                    required
                                ></calcite-input>
                            </calcite-label>

                            <calcite-label style={{ marginBottom: '16px' }}>
                                Email
                                <calcite-input
                                    type="email"
                                    value={formData.email}
                                    onInput={(e) => handleChange('email', e.target.value)}
                                    required
                                ></calcite-input>
                            </calcite-label>

                            <calcite-label style={{ marginBottom: '16px' }}>
                                Website
                                <calcite-input
                                    value={formData.website}
                                    onInput={(e) => handleChange('website', e.target.value)}
                                    required
                                ></calcite-input>
                            </calcite-label>

                            <calcite-label>
                                Google Maps URL
                                <calcite-input
                                    value={formData.mapUrl}
                                    onInput={(e) => handleChange('mapUrl', e.target.value)}
                                ></calcite-input>
                            </calcite-label>
                        </div>

                        {/* Business Hours */}
                        <div style={{ background: 'var(--calcite-ui-foreground-1)', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                            <h3 style={{ marginBottom: '16px' }}>Business Hours</h3>

                            <calcite-label style={{ marginBottom: '16px' }}>
                                Monday - Friday
                                <calcite-input
                                    value={formData.businessHours.weekdays}
                                    onInput={(e) => handleChange('businessHours.weekdays', e.target.value)}
                                    placeholder="e.g., 8:30 AM - 5:00 PM"
                                ></calcite-input>
                            </calcite-label>

                            <calcite-label style={{ marginBottom: '16px' }}>
                                Saturday
                                <calcite-input
                                    value={formData.businessHours.saturday}
                                    onInput={(e) => handleChange('businessHours.saturday', e.target.value)}
                                    placeholder="e.g., 8:30 AM - 1:00 PM"
                                ></calcite-input>
                            </calcite-label>

                            <calcite-label>
                                Sunday
                                <calcite-input
                                    value={formData.businessHours.sunday}
                                    onInput={(e) => handleChange('businessHours.sunday', e.target.value)}
                                    placeholder="e.g., Closed"
                                ></calcite-input>
                            </calcite-label>
                        </div>

                        <calcite-button
                            type="submit"
                            appearance="solid"
                            kind="brand"
                            width="full"
                            loading={saving}
                        >
                            Save Changes
                        </calcite-button>
                    </form>
                </div>
            </div>
        </calcite-shell>
    );
}
