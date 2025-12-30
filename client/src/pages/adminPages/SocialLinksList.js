import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-loader';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-modal';
import '@esri/calcite-components/components/calcite-input';
import '@esri/calcite-components/components/calcite-label';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export default function SocialLinksList() {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingLink, setEditingLink] = useState(null);
    const [formData, setFormData] = useState({
        platform: '',
        icon: 'share',
        url: '',
        color: '#2d5f8d'
    });

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/contact/social`);
            setLinks(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load social links');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingLink(null);
        setFormData({ platform: '', icon: 'share', url: '', color: '#2d5f8d' });
        setShowModal(true);
    };

    const handleEdit = (link) => {
        setEditingLink(link);
        setFormData(link);
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            if (editingLink) {
                await axios.put(`${API_URL}/api/contact/social/${editingLink._id}`, formData);
            } else {
                await axios.post(`${API_URL}/api/contact/social`, formData);
            }
            setShowModal(false);
            fetchLinks();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save link');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this link?')) return;

        try {
            await axios.delete(`${API_URL}/api/contact/social/${id}`);
            fetchLinks();
        } catch (err) {
            setError('Failed to delete link');
            console.error(err);
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
                        <h1>Connect With Us</h1>
                        <p>Manage social media links</p>
                    </div>
                    <calcite-button icon-start="plus" onClick={handleAdd}>
                        Add Social Link
                    </calcite-button>
                </div>

                {error && (
                    <calcite-notice kind="danger" open>
                        <div slot="message">{error}</div>
                    </calcite-notice>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
                    {links.map((link) => (
                        <div
                            key={link._id}
                            style={{
                                background: 'var(--calcite-ui-foreground-1)',
                                border: '1px solid var(--calcite-ui-border-2)',
                                borderRadius: '8px',
                                padding: '20px',
                                textAlign: 'center'
                            }}
                        >
                            <div
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    background: link.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 12px'
                                }}
                            >
                                <calcite-icon icon={link.icon} scale="l" style={{ color: '#fff' }}></calcite-icon>
                            </div>
                            <h3 style={{ margin: '0 0 8px 0' }}>{link.platform}</h3>
                            <p style={{ margin: '8px 0', fontSize: '12px', color: 'var(--calcite-ui-text-3)', wordBreak: 'break-all' }}>
                                {link.url}
                            </p>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '16px', justifyContent: 'center' }}>
                                <calcite-button
                                    appearance="outline"
                                    kind="brand"
                                    scale="s"
                                    icon-start="pencil"
                                    onClick={() => handleEdit(link)}
                                >
                                    Edit
                                </calcite-button>
                                <calcite-button
                                    appearance="outline"
                                    kind="danger"
                                    scale="s"
                                    icon-start="trash"
                                    onClick={() => handleDelete(link._id)}
                                >
                                    Delete
                                </calcite-button>
                            </div>
                        </div>
                    ))}
                </div>

                {links.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <calcite-icon icon="information" scale="l"></calcite-icon>
                        <h3>No social links yet</h3>
                        <p>Click "Add Social Link" to create your first link</p>
                    </div>
                )}

                {/* Add/Edit Modal */}
                {showModal && (
                    <calcite-modal open onCalciteModalClose={() => setShowModal(false)}>
                        <div slot="header">{editingLink ? 'Edit' : 'Add'} Social Link</div>
                        <div slot="content">
                            <calcite-label style={{ marginBottom: '16px' }}>
                                Platform Name
                                <calcite-input
                                    value={formData.platform}
                                    onInput={(e) => setFormData({ ...formData, platform: e.target.value })}
                                    placeholder="e.g., LinkedIn, Facebook"
                                    required
                                ></calcite-input>
                            </calcite-label>

                            <calcite-label style={{ marginBottom: '16px' }}>
                                Icon (Calcite icon name)
                                <calcite-input
                                    value={formData.icon}
                                    onInput={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    placeholder="e.g., organization, share"
                                ></calcite-input>
                            </calcite-label>

                            <calcite-label style={{ marginBottom: '16px' }}>
                                URL
                                <calcite-input
                                    value={formData.url}
                                    onInput={(e) => setFormData({ ...formData, url: e.target.value })}
                                    placeholder="https://..."
                                    required
                                ></calcite-input>
                            </calcite-label>

                            <calcite-label>
                                Color (Hex)
                                <calcite-input
                                    value={formData.color}
                                    onInput={(e) => setFormData({ ...formData, color: e.target.value })}
                                    placeholder="#2d5f8d"
                                ></calcite-input>
                                <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '30px', height: '30px', borderRadius: '4px', background: formData.color, border: '1px solid #ccc' }}></div>
                                    <span style={{ fontSize: '12px', color: 'var(--calcite-ui-text-3)' }}>Preview</span>
                                </div>
                            </calcite-label>
                        </div>
                        <calcite-button
                            slot="primary"
                            onClick={handleSave}
                            disabled={!formData.platform || !formData.url}
                        >
                            Save
                        </calcite-button>
                        <calcite-button
                            slot="secondary"
                            appearance="outline"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </calcite-button>
                    </calcite-modal>
                )}
            </div>
        </calcite-shell>
    );
}
