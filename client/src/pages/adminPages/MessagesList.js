import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-loader';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-chip';
import '@esri/calcite-components/components/calcite-modal';
import '@esri/calcite-components/components/calcite-text-area';
import '@esri/calcite-components/components/calcite-label';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export default function MessagesList() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [sending, setSending] = useState(false);
    const [expandedMessage, setExpandedMessage] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/contact/messages`);
            setMessages(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load messages');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await axios.put(`${API_URL}/api/contact/messages/${id}/status`, { status: 'read' });
            fetchMessages();
        } catch (err) {
            console.error('Failed to mark as read:', err);
        }
    };

    const handleReply = async () => {
        if (!replyContent.trim()) return;

        try {
            setSending(true);
            await axios.post(`${API_URL}/api/contact/messages/${selectedMessage._id}/reply`, {
                replyContent
            });
            setSelectedMessage(null);
            setReplyContent('');
            fetchMessages();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send reply');
            console.error(err);
        } finally {
            setSending(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;

        try {
            await axios.delete(`${API_URL}/api/contact/messages/${id}`);
            fetchMessages();
        } catch (err) {
            setError('Failed to delete message');
            console.error(err);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'new': return 'blue';
            case 'read': return 'yellow';
            case 'replied': return 'green';
            default: return 'gray';
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
                        <h1>Messages</h1>
                        <p>Manage contact form submissions</p>
                    </div>
                </div>

                {error && (
                    <calcite-notice kind="danger" open>
                        <div slot="message">{error}</div>
                    </calcite-notice>
                )}

                <div style={{ display: 'grid', gap: '16px' }}>
                    {messages.map((message) => (
                        <div
                            key={message._id}
                            style={{
                                background: 'var(--calcite-ui-foreground-1)',
                                border: '1px solid var(--calcite-ui-border-2)',
                                borderRadius: '8px',
                                padding: '20px'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                                <div>
                                    <h3 style={{ margin: '0 0 8px 0' }}>{message.name}</h3>
                                    <p style={{ margin: '0', color: 'var(--calcite-ui-text-3)', fontSize: '14px' }}>
                                        {message.email} {message.company && `• ${message.company}`}
                                    </p>
                                </div>
                                <calcite-chip kind={getStatusColor(message.status)} scale="s">
                                    {message.status}
                                </calcite-chip>
                            </div>

                            {message.service && (
                                <p style={{ margin: '8px 0', fontSize: '14px' }}>
                                    <strong>Service:</strong> {message.service}
                                </p>
                            )}

                            <p style={{ margin: '12px 0', color: 'var(--calcite-ui-text-2)' }}>
                                {expandedMessage === message._id ? message.message : message.message.substring(0, 150) + (message.message.length > 150 ? '...' : '')}
                            </p>

                            {message.message.length > 150 && (
                                <calcite-button
                                    appearance="transparent"
                                    scale="s"
                                    onClick={() => setExpandedMessage(expandedMessage === message._id ? null : message._id)}
                                >
                                    {expandedMessage === message._id ? 'Show Less' : 'Show More'}
                                </calcite-button>
                            )}

                            {message.reply && (
                                <div style={{ background: '#e8f5e9', padding: '12px', borderRadius: '4px', marginTop: '12px' }}>
                                    <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#2e7d32', fontWeight: '600' }}>
                                        <calcite-icon icon="check-circle" scale="s"></calcite-icon> Replied on {new Date(message.reply.sentAt).toLocaleString()}
                                    </p>
                                    <p style={{ margin: '0', fontSize: '14px' }}>{message.reply.content}</p>
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                                {message.status === 'new' && (
                                    <calcite-button
                                        appearance="outline"
                                        kind="brand"
                                        scale="s"
                                        icon-start="check"
                                        onClick={() => handleMarkAsRead(message._id)}
                                    >
                                        Mark as Read
                                    </calcite-button>
                                )}
                                {message.status !== 'replied' && (
                                    <calcite-button
                                        appearance="outline"
                                        kind="brand"
                                        scale="s"
                                        icon-start="email"
                                        onClick={() => setSelectedMessage(message)}
                                    >
                                        Reply
                                    </calcite-button>
                                )}
                                <calcite-button
                                    appearance="outline"
                                    kind="danger"
                                    scale="s"
                                    icon-start="trash"
                                    onClick={() => handleDelete(message._id)}
                                >
                                    Delete
                                </calcite-button>
                            </div>

                            <p style={{ margin: '12px 0 0 0', fontSize: '12px', color: 'var(--calcite-ui-text-3)' }}>
                                Received: {new Date(message.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))}

                    {messages.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '40px' }}>
                            <calcite-icon icon="information" scale="l"></calcite-icon>
                            <h3>No messages yet</h3>
                            <p>Messages from the contact form will appear here</p>
                        </div>
                    )}
                </div>

                {/* Reply Modal */}
                {selectedMessage && (
                    <calcite-modal open onCalciteModalClose={() => setSelectedMessage(null)}>
                        <div slot="header">Reply to {selectedMessage.name}</div>
                        <div slot="content">
                            <div style={{ marginBottom: '16px' }}>
                                <p><strong>To:</strong> {selectedMessage.email}</p>
                                <p><strong>Original Message:</strong></p>
                                <div style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px', marginTop: '8px' }}>
                                    {selectedMessage.message}
                                </div>
                            </div>
                            <calcite-label>
                                Your Reply
                                <calcite-text-area
                                    value={replyContent}
                                    onInput={(e) => setReplyContent(e.target.value)}
                                    rows="6"
                                    placeholder="Type your reply here..."
                                ></calcite-text-area>
                            </calcite-label>
                        </div>
                        <calcite-button
                            slot="primary"
                            onClick={handleReply}
                            loading={sending}
                            disabled={!replyContent.trim()}
                        >
                            Send Reply
                        </calcite-button>
                        <calcite-button
                            slot="secondary"
                            appearance="outline"
                            onClick={() => setSelectedMessage(null)}
                        >
                            Cancel
                        </calcite-button>
                    </calcite-modal>
                )}
            </div>
        </calcite-shell>
    );
}
