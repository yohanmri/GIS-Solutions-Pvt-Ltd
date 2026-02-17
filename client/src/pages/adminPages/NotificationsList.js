import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-loader';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-chip';
import '../../styles/adminStyles/notificationsList.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export default function NotificationsList() {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(`${API_URL}/api/notifications/admin/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotifications(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load notifications');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this notification?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`${API_URL}/api/notifications/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchNotifications();
        } catch (err) {
            alert('Failed to delete notification');
            console.error(err);
        }
    };

    const formatDateRange = (start, end) => {
        const startDate = new Date(start).toLocaleDateString();
        const endDate = new Date(end).toLocaleDateString();
        return `${startDate} - ${endDate}`;
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
                        <h1>Notifications</h1>
                        <p>Manage homepage notifications</p>
                    </div>
                    <calcite-button
                        icon-start="plus"
                        onClick={() => navigate('/admin/notifications/add')}
                    >
                        Add New Notification
                    </calcite-button>
                </div>

                {error && (
                    <calcite-notice kind="danger" open>
                        <div slot="message">{error}</div>
                    </calcite-notice>
                )}

                <div className="notifications-grid">
                    {notifications.map((notification) => (
                        <div key={notification._id} className="notification-card">
                            <div className="notification-header">
                                <calcite-chip kind={notification.isActive ? 'brand' : 'neutral'} scale="s">
                                    {notification.isActive ? 'Active' : 'Inactive'}
                                </calcite-chip>
                                <calcite-chip scale="s" appearance="outline">
                                    {notification.serviceType}
                                </calcite-chip>
                            </div>

                            <div className="notification-preview">
                                {notification.image ? (
                                    <img
                                        src={notification.image?.startsWith('/uploads/')
                                            ? `${API_URL}${notification.image}`
                                            : notification.image}
                                        alt={notification.title}
                                        className="notification-image"
                                        onError={(e) => {
                                            e.target.src = "https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-storymaps/assets/arcgis-storymaps.jpg";
                                        }}
                                    />
                                ) : (
                                    <div style={{
                                        width: '100%',
                                        height: '200px',
                                        background: 'linear-gradient(135deg, #0079c1 0%, #005a87 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '48px'
                                    }}>
                                        <calcite-icon icon="calendar" scale="l"></calcite-icon>
                                    </div>
                                )}
                                <div className="notification-content">
                                    <div className="notification-badge">{notification.badge}</div>
                                    <h3>{notification.title}</h3>
                                    <p>{notification.description}</p>
                                </div>
                            </div>

                            <div className="notification-details">
                                <div className="detail-row">
                                    <calcite-icon icon="calendar" scale="s"></calcite-icon>
                                    <span>{formatDateRange(notification.startDate, notification.endDate)}</span>
                                </div>
                                {notification.displayTimes && notification.displayTimes.length > 0 && (
                                    <div className="detail-row">
                                        <calcite-icon icon="clock" scale="s"></calcite-icon>
                                        <span>
                                            {notification.displayTimes.length} time slot(s)
                                        </span>
                                    </div>
                                )}
                                <div className="detail-row">
                                    <calcite-icon icon="link" scale="s"></calcite-icon>
                                    <span>Linked to: {notification.serviceId?.title || 'Service'}</span>
                                </div>
                            </div>

                            <div className="notification-actions">
                                <calcite-button
                                    appearance="outline"
                                    kind="brand"
                                    icon-start="pencil"
                                    scale="s"
                                    onClick={() => navigate(`/admin/notifications/edit/${notification._id}`)}
                                >
                                    Edit
                                </calcite-button>
                                <calcite-button
                                    appearance="outline"
                                    kind="danger"
                                    icon-start="trash"
                                    scale="s"
                                    onClick={() => handleDelete(notification._id)}
                                >
                                    Delete
                                </calcite-button>
                            </div>
                        </div>
                    ))}
                </div>

                {notifications.length === 0 && !loading && (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <calcite-icon icon="information" scale="l"></calcite-icon>
                        <h3>No notifications yet</h3>
                        <p>Click "Add New Notification" to create your first notification</p>
                    </div>
                )}
            </div>
        </calcite-shell>
    );
}
