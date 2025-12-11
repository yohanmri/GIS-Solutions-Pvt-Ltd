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
import '@esri/calcite-components/components/calcite-card';
import '../../styles/adminStyles/eventsList.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export default function EventsList() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/services/events`);
            setEvents(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load events');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;

        try {
            const token = localStorage.getItem('adminToken') || 'default-token';

            // Immediately remove from UI for instant feedback
            setEvents(prevEvents => prevEvents.filter(e => e._id !== id));
            setError(null);

            // Delete from server
            await axios.delete(`${API_URL}/api/services/events/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Refresh from server to ensure consistency
            setTimeout(() => {
                fetchEvents();
            }, 300);

        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to delete event';
            setError(errorMessage);
            console.error('Delete error:', err);
            // Refresh to restore the item if delete failed
            fetchEvents();
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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
                        <h1>Events</h1>
                        <p>Manage your events and competitions</p>
                    </div>
                    <calcite-button
                        icon-start="plus"
                        onClick={() => navigate('/admin/services/events/add')}
                    >
                        Add New Event
                    </calcite-button>
                </div>

                {error && (
                    <calcite-notice kind="danger" open>
                        <div slot="message">{error}</div>
                    </calcite-notice>
                )}

                <div className="events-list">
                    {events.map((event) => (
                        <calcite-card key={event._id} className="event-main-card">
                            <div className="event-card-grid">
                                {/* Left Side - Event Details */}
                                <div className="event-details-side">
                                    <div className="event-celebration-header">
                                        <calcite-icon icon="globe" scale="s"></calcite-icon>
                                        {event.celebrationHeader}
                                        <calcite-icon icon="star" scale="s"></calcite-icon>
                                    </div>

                                    <h3 className="event-card-title">{event.title}</h3>
                                    <p className="event-theme">"{event.theme}"</p>

                                    <div className="event-card-description">
                                        <p>{event.description}</p>
                                    </div>

                                    <div className="event-info-grid">
                                        <div className="event-info-item">
                                            <calcite-icon icon="organization" scale="s"></calcite-icon>
                                            <div className="event-info-text">
                                                <h4>Organized By</h4>
                                                <p>{event.organizer}</p>
                                            </div>
                                        </div>

                                        <div className="event-info-item">
                                            <calcite-icon icon="calendar" scale="s"></calcite-icon>
                                            <div className="event-info-text">
                                                <h4>Date</h4>
                                                <p>{formatDate(event.eventDate)}</p>
                                            </div>
                                        </div>

                                        <div className="event-info-item">
                                            <calcite-icon icon="gift" scale="s"></calcite-icon>
                                            <div className="event-info-text">
                                                <h4>Prizes</h4>
                                                <p>{event.prizes}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="event-card-actions">
                                        <calcite-button
                                            appearance="outline"
                                            kind="brand"
                                            icon-start="pencil"
                                            onClick={() => navigate(`/admin/services/events/edit/${event._id}`)}
                                        >
                                            Edit Event
                                        </calcite-button>
                                        <calcite-button
                                            appearance="outline"
                                            kind="danger"
                                            icon-start="trash"
                                            onClick={() => handleDelete(event._id)}
                                        >
                                            Delete Event
                                        </calcite-button>
                                    </div>
                                </div>

                                {/* Right Side - Event Poster */}
                                <div className="event-poster-side">
                                    <img
                                        src={event.posterImage}
                                        alt={event.title}
                                        className="event-poster-image"
                                        onError={(e) => {
                                            e.target.src = "https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-storymaps/assets/arcgis-storymaps.jpg";
                                        }}
                                    />
                                </div>
                            </div>
                        </calcite-card>
                    ))}
                </div>

                {events.length === 0 && !loading && (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <calcite-icon icon="information" scale="l"></calcite-icon>
                        <h3>No events yet</h3>
                        <p>Click "Add New Event" to create your first event</p>
                    </div>
                )}
            </div>
        </calcite-shell>
    );
}
