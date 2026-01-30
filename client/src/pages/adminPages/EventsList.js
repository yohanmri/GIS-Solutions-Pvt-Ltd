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
    const [activeEventCategory, setActiveEventCategory] = useState('all');

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
            // Immediately remove from UI for instant feedback
            setEvents(prevEvents => prevEvents.filter(e => e._id !== id));
            setError(null);

            // Delete from server (no auth required)
            await axios.delete(`${API_URL}/api/services/events/${id}`);

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

    // Helper function to determine event status based on date range
    const getEventStatus = (startDate, endDate) => {
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

    const eventCategories = [
        { id: 'all', label: 'All Events', icon: 'apps' },
        { id: 'ongoing', label: 'Ongoing Events', icon: 'play' },
        { id: 'upcoming', label: 'Upcoming Events', icon: 'clock' },
        { id: 'previous', label: 'Previous Events', icon: 'check-circle' }
    ];

    // Filter events based on selected category
    const filteredEvents = events.filter(event => {
        if (activeEventCategory === 'all') return true;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const start = new Date(event.startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(event.endDate);
        end.setHours(0, 0, 0, 0);

        if (activeEventCategory === 'ongoing') {
            return today >= start && today <= end;
        } else if (activeEventCategory === 'upcoming') {
            return today < start;
        } else if (activeEventCategory === 'previous') {
            return today > end;
        }
        return true;
    });

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

                {/* Event Category Filter */}
                <div className="category-filter" style={{ marginBottom: '24px' }}>
                    {eventCategories.map((category) => (
                        <calcite-button
                            key={category.id}
                            appearance={activeEventCategory === category.id ? 'solid' : 'outline'}
                            kind="brand"
                            scale="m"
                            icon-start={category.icon}
                            onClick={() => setActiveEventCategory(category.id)}
                        >
                            {category.label}
                        </calcite-button>
                    ))}
                </div>

                <div className="events-list">
                    {filteredEvents.map((event) => {
                        const eventStatus = getEventStatus(event.startDate, event.endDate);

                        return (
                            <calcite-card key={event._id} className="event-main-card">
                                <div className="event-card-grid">
                                    {/* Left Side - Event Details */}
                                    <div className="event-details-side">
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
                                                    <p>{(() => {
                                                        const start = new Date(event.startDate).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric'
                                                        });
                                                        const end = new Date(event.endDate).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        });
                                                        return `${start} - ${end}`;
                                                    })()}</p>
                                                </div>
                                            </div>

                                            <div className="event-info-item">
                                                <calcite-icon icon="globe" scale="s"></calcite-icon>
                                                <div className="event-info-text">
                                                    <h4>Theme</h4>
                                                    <p>{event.theme}</p>
                                                </div>
                                            </div>

                                            <div className="event-info-item">
                                                <calcite-icon icon="star" scale="s"></calcite-icon>
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
                                                scale="l"
                                                icon-start="pencil"
                                                onClick={() => navigate(`/admin/services/events/edit/${event._id}`)}
                                            >
                                                Edit Event
                                            </calcite-button>
                                            <calcite-button
                                                appearance="outline"
                                                kind="danger"
                                                scale="l"
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
                                            src={event.posterImage?.startsWith('/uploads/') ? `${API_URL}${event.posterImage}` : event.posterImage}
                                            alt={event.title}
                                            className="event-poster-image"
                                            onError={(e) => {
                                                e.target.src = "https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-storymaps/assets/arcgis-storymaps.jpg";
                                            }}
                                        />
                                    </div>
                                </div>
                            </calcite-card>
                        );
                    })}
                </div>

                {filteredEvents.length === 0 && !loading && (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <calcite-icon icon="information" scale="l"></calcite-icon>
                        <h3>No {activeEventCategory !== 'all' ? eventCategories.find(c => c.id === activeEventCategory)?.label : 'Events'} Available</h3>
                        <p>{activeEventCategory === 'all' ? 'Click "Add New Event" to create your first event' : 'Try selecting a different category or add a new event'}</p>
                    </div>
                )}
            </div>
        </calcite-shell>
    );
}
