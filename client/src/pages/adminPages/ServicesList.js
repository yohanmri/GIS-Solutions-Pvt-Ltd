import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import { usePermissions } from '../../context/PermissionContext';
import API from '../../api/axios';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-chip';
import '@esri/calcite-components/components/calcite-input';
import '@esri/calcite-components/components/calcite-tabs';
import '@esri/calcite-components/components/calcite-tab';
import '@esri/calcite-components/components/calcite-tab-nav';
import '@esri/calcite-components/components/calcite-tab-title';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-loader';

export default function ServicesList() {
    const navigate = useNavigate();
    const { canCreate, canEdit, canDelete } = usePermissions();

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('professional');
    const [showInactive, setShowInactive] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await API.get('/admin/services');
            setServices(Array.isArray(response.data?.data) ? response.data.data : []);
            setError(null);
        } catch (err) {
            console.error('Error fetching services:', err);
            setError('Failed to load services. Please try again.');
            setServices([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredServices = useMemo(() => {
        return services.filter(service => {
            const matchesType = service.serviceType === activeTab;
            const matchesSearch =
                (service.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                (service.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
            const matchesActive = showInactive || service.isActive;

            return matchesType && matchesSearch && matchesActive;
        });
    }, [services, activeTab, searchQuery, showInactive]);

    const handleDelete = async (service) => {
        if (!window.confirm(`Are you sure you want to delete "${service.title}"?`)) return;

        try {
            await API.delete(`/admin/services/${service._id}`);
            setServices(services.filter(s => s._id !== service._id));
        } catch (err) {
            alert('Failed to delete service. Please try again.');
        }
    };

    const handleToggleStatus = async (service) => {
        try {
            const response = await API.patch(`/admin/services/${service._id}/toggle-status`);
            setServices(services.map(s =>
                s._id === service._id ? response.data.data : s
            ));
        } catch (err) {
            alert('Failed to update service status. Please try again.');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getServiceTypeLabel = (type) => {
        const labels = {
            professional: 'Professional Services',
            event: 'Events'
        };
        return labels[type] || type;
    };

    return (
        <calcite-shell>
            <AdminNavbar />
            <AdminSidebar />

            <div style={{ padding: '24px', height: '100%', overflow: 'auto' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    {/* Header */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '24px'
                    }}>
                        <div>
                            <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '600' }}>
                                Services Management
                            </h1>
                            <p style={{ margin: 0, fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
                                Manage professional services and events
                            </p>
                        </div>
                        {canCreate('services') && (
                            <calcite-button
                                appearance="solid"
                                icon-start="plus"
                                onClick={() => navigate('/admin/services/add')}
                            >
                                Add New Service
                            </calcite-button>
                        )}
                    </div>

                    {error && (
                        <calcite-notice open icon="exclamation-mark-triangle" kind="danger" style={{ marginBottom: '20px' }}>
                            <div slot="title">Error</div>
                            <div slot="message">{error}</div>
                        </calcite-notice>
                    )}

                    {/* Search and Filters */}
                    <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <calcite-input
                            type="text"
                            placeholder="Search services..."
                            value={searchQuery}
                            onCalciteInputInput={(e) => setSearchQuery(e.target.value)}
                            icon="search"
                            clearable
                            style={{ flex: 1 }}
                        />
                        <calcite-button
                            appearance={showInactive ? 'solid' : 'outline'}
                            icon-start={showInactive ? 'check' : 'x'}
                            onClick={() => setShowInactive(!showInactive)}
                        >
                            {showInactive ? 'Showing All' : 'Active Only'}
                        </calcite-button>
                    </div>

                    {/* Tabs */}
                    <calcite-tabs style={{ marginBottom: '24px' }}>
                        <calcite-tab-nav slot="title-group">
                            <calcite-tab-title
                                active={activeTab === 'professional'}
                                onClick={() => setActiveTab('professional')}
                            >
                                Professional Services
                            </calcite-tab-title>
                            <calcite-tab-title
                                active={activeTab === 'event'}
                                onClick={() => setActiveTab('event')}
                            >
                                Events
                            </calcite-tab-title>
                        </calcite-tab-nav>
                    </calcite-tabs>

                    {/* Results Count */}
                    <div style={{ marginBottom: '16px' }}>
                        <calcite-chip icon="list" kind="brand">
                            {filteredServices.length} {getServiceTypeLabel(activeTab)}
                        </calcite-chip>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div style={{ textAlign: 'center', padding: '40px' }}>
                            <calcite-loader scale="l"></calcite-loader>
                            <p style={{ marginTop: '16px', color: 'var(--calcite-ui-text-3)' }}>
                                Loading services...
                            </p>
                        </div>
                    )}

                    {/* Services List */}
                    {!loading && (
                        <div>
                            {filteredServices.map((service, index) => (
                                <div
                                    key={service._id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '16px',
                                        borderBottom: index !== filteredServices.length - 1 ? '1px solid #f1f5f9' : 'none',
                                        backgroundColor: service.isActive ? 'transparent' : '#f9fafb',
                                        transition: 'background-color 0.2s',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        marginBottom: '12px'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = service.isActive ? 'transparent' : '#f9fafb'}
                                >
                                    {/* Status Indicator */}
                                    <div style={{ marginRight: '16px', minWidth: '80px' }}>
                                        <calcite-chip
                                            scale="s"
                                            kind={service.isActive ? 'success' : 'neutral'}
                                            icon={service.isActive ? 'check-circle' : 'x-circle'}
                                        >
                                            {service.isActive ? 'Active' : 'Inactive'}
                                        </calcite-chip>
                                    </div>

                                    {/* Service Info */}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '4px' }}>
                                            {service.title || 'Untitled Service'}
                                        </div>
                                        <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                                            {service.description?.substring(0, 100) || 'No description'}
                                            {service.description?.length > 100 && '...'}
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                                            Created: {formatDate(service.createdAt)} • By: {service.createdBy?.username || 'Unknown'}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                                        <calcite-button
                                            appearance="outline"
                                            icon-start="information"
                                            scale="s"
                                            onClick={() => navigate(`/admin/services/${service._id}`)}
                                        >
                                            View
                                        </calcite-button>
                                        {canEdit('services') && (
                                            <calcite-button
                                                appearance="outline"
                                                icon-start={service.isActive ? 'x-circle' : 'check-circle'}
                                                scale="s"
                                                onClick={() => handleToggleStatus(service)}
                                            >
                                                {service.isActive ? 'Deactivate' : 'Activate'}
                                            </calcite-button>
                                        )}
                                        {canDelete('services') && (
                                            <calcite-button
                                                appearance="outline"
                                                kind="danger"
                                                icon-start="trash"
                                                scale="s"
                                                onClick={() => handleDelete(service)}
                                            >
                                                Delete
                                            </calcite-button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && filteredServices.length === 0 && (
                        <calcite-notice open icon="information" kind="info">
                            <div slot="title">No services found</div>
                            <div slot="message">
                                {searchQuery ? 'Try adjusting your search terms' : `No ${getServiceTypeLabel(activeTab).toLowerCase()} available`}
                            </div>
                        </calcite-notice>
                    )}
                </div>
            </div>
        </calcite-shell>
    );
}
