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
import '@esri/calcite-components/components/calcite-text-area';
import '@esri/calcite-components/components/calcite-label';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export default function DepartmentalContactsList() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const [formData, setFormData] = useState({
        department: '',
        icon: 'organization',
        email: '',
        phone: '',
        description: ''
    });

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/contact/departments`);
            setContacts(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load departmental contacts');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingContact(null);
        setFormData({ department: '', icon: 'organization', email: '', phone: '', description: '' });
        setShowModal(true);
    };

    const handleEdit = (contact) => {
        setEditingContact(contact);
        setFormData(contact);
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            if (editingContact) {
                await axios.put(`${API_URL}/api/contact/departments/${editingContact._id}`, formData);
            } else {
                await axios.post(`${API_URL}/api/contact/departments`, formData);
            }
            setShowModal(false);
            fetchContacts();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save contact');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this contact?')) return;

        try {
            await axios.delete(`${API_URL}/api/contact/departments/${id}`);
            fetchContacts();
        } catch (err) {
            setError('Failed to delete contact');
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
                        <h1>Departmental Contacts</h1>
                        <p>Manage department contact information</p>
                    </div>
                    <calcite-button icon-start="plus" onClick={handleAdd}>
                        Add Department
                    </calcite-button>
                </div>

                {error && (
                    <calcite-notice kind="danger" open>
                        <div slot="message">{error}</div>
                    </calcite-notice>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                    {contacts.map((contact) => (
                        <div
                            key={contact._id}
                            style={{
                                background: 'var(--calcite-ui-foreground-1)',
                                border: '1px solid var(--calcite-ui-border-2)',
                                borderRadius: '8px',
                                padding: '20px'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                                <calcite-icon icon={contact.icon} scale="m" style={{ marginRight: '12px' }}></calcite-icon>
                                <h3 style={{ margin: 0 }}>{contact.department}</h3>
                            </div>
                            <p style={{ margin: '8px 0', fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
                                {contact.description}
                            </p>
                            <p style={{ margin: '8px 0', fontSize: '14px' }}>
                                <strong>Email:</strong> {contact.email}
                            </p>
                            {contact.phone && (
                                <p style={{ margin: '8px 0', fontSize: '14px' }}>
                                    <strong>Phone:</strong> {contact.phone}
                                </p>
                            )}
                            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                                <calcite-button
                                    appearance="outline"
                                    kind="brand"
                                    scale="s"
                                    icon-start="pencil"
                                    onClick={() => handleEdit(contact)}
                                >
                                    Edit
                                </calcite-button>
                                <calcite-button
                                    appearance="outline"
                                    kind="danger"
                                    scale="s"
                                    icon-start="trash"
                                    onClick={() => handleDelete(contact._id)}
                                >
                                    Delete
                                </calcite-button>
                            </div>
                        </div>
                    ))}
                </div>

                {contacts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <calcite-icon icon="information" scale="l"></calcite-icon>
                        <h3>No departmental contacts yet</h3>
                        <p>Click "Add Department" to create your first contact</p>
                    </div>
                )}

                {/* Add/Edit Modal */}
                {showModal && (
                    <calcite-modal open onCalciteModalClose={() => setShowModal(false)}>
                        <div slot="header">{editingContact ? 'Edit' : 'Add'} Department</div>
                        <div slot="content">
                            <calcite-label style={{ marginBottom: '16px' }}>
                                Department Name
                                <calcite-input
                                    value={formData.department}
                                    onInput={(e) => setFormData({ ...formData, department: e.target.value })}
                                    required
                                ></calcite-input>
                            </calcite-label>

                            <calcite-label style={{ marginBottom: '16px' }}>
                                Icon (Calcite icon name)
                                <calcite-input
                                    value={formData.icon}
                                    onInput={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    placeholder="e.g., organization, wrench"
                                ></calcite-input>
                            </calcite-label>

                            <calcite-label style={{ marginBottom: '16px' }}>
                                Email
                                <calcite-input
                                    type="email"
                                    value={formData.email}
                                    onInput={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                ></calcite-input>
                            </calcite-label>

                            <calcite-label style={{ marginBottom: '16px' }}>
                                Phone (Optional)
                                <calcite-input
                                    value={formData.phone}
                                    onInput={(e) => setFormData({ ...formData, phone: e.target.value })}
                                ></calcite-input>
                            </calcite-label>

                            <calcite-label>
                                Description
                                <calcite-text-area
                                    value={formData.description}
                                    onInput={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows="3"
                                    required
                                ></calcite-text-area>
                            </calcite-label>
                        </div>
                        <calcite-button
                            slot="primary"
                            onClick={handleSave}
                            disabled={!formData.department || !formData.email || !formData.description}
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
