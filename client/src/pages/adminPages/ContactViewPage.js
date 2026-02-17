import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import { adminAPI as API } from '../../api/axios';

// Import Calcite Components
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-loader';
import '@esri/calcite-components/components/calcite-input';
import '@esri/calcite-components/components/calcite-select';
import '@esri/calcite-components/components/calcite-option';
import '@esri/calcite-components/components/calcite-text-area';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-chip';

import '../../styles/adminStyles/contactView.css';

export default function ContactViewPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all, new, read, replied
  const [selectedContact, setSelectedContact] = useState(null);

  // Filters
  const [filterService, setFilterService] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Email Config
  const [emailConfig, setEmailConfig] = useState(null);
  const [editingRecipient, setEditingRecipient] = useState(false);
  const [newRecipient, setNewRecipient] = useState('');
  const [newCcEmail, setNewCcEmail] = useState('');
  const [configSaving, setConfigSaving] = useState(false);

  // Reply
  const [isReplyMode, setIsReplyMode] = useState(false);
  const replyTextAreaRef = useRef(null);

  useEffect(() => {
    fetchContacts();
    fetchEmailConfig();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await API.get('/contact/messages');
      const data = response.data || [];
      setContacts(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmailConfig = async () => {
    try {
      const response = await API.get('/contact/email-config');
      setEmailConfig(response.data);
      setNewRecipient(response.data?.recipientEmail || '');
    } catch (err) {
      console.error('Error fetching email config:', err);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch =
      contact.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = activeTab === 'all' || contact.status === activeTab;
    const matchesService = filterService === 'all' || contact.service === filterService;

    // Date filtering
    let matchesDate = true;
    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      matchesDate = matchesDate && new Date(contact.createdAt) >= start;
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      matchesDate = matchesDate && new Date(contact.createdAt) <= end;
    }

    return matchesSearch && matchesStatus && matchesService && matchesDate;
  });

  const handleSelectMessage = (contact) => {
    setSelectedContact(contact);
    setIsReplyMode(false);
    if (contact.status === 'new') {
      handleMarkAsRead(contact._id);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await API.put(`/contact/messages/${id}/status`, { status: 'read' });
      setContacts(prev => prev.map(c => c._id === id ? { ...c, status: 'read' } : c));
    } catch (err) { console.error(err); }
  };

  const handleSendReply = async () => {
    const replyContent = replyTextAreaRef.current?.value || '';
    if (!replyContent.trim()) return alert('Please enter a reply');

    try {
      setLoading(true);
      await API.post(`/contact/messages/${selectedContact._id}/reply`, {
        replyContent: replyContent.trim()
      });
      setIsReplyMode(false);
      fetchContacts();
      alert('Reply sent successfully!');
    } catch (err) {
      alert('Failed to send reply');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedContact) return;
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      setLoading(true);
      await API.delete(`/contact/messages/${selectedContact._id}`);
      setContacts(contacts.filter(c => c._id !== selectedContact._id));
      setSelectedContact(null);
    } catch (err) {
      alert('Failed to delete message');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRecipient = async () => {
    try {
      console.log('Updating recipient to:', newRecipient);
      setConfigSaving(true);
      const res = await API.put('/contact/email-config', { recipientEmail: newRecipient });
      console.log('Update response:', res.data);
      setEmailConfig(res.data);
      setEditingRecipient(false);
      alert('Recipient email updated successfully');
    } catch (err) {
      console.error('Update error:', err);
      alert('Update failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setConfigSaving(false);
    }
  };

  const handleAddCc = async () => {
    if (!newCcEmail || !newCcEmail.trim()) {
      alert('Please enter a valid email address');
      return;
    }
    try {
      console.log('Adding CC email:', newCcEmail.trim());
      setConfigSaving(true);
      const res = await API.post('/contact/email-config/cc', { email: newCcEmail.trim() });
      console.log('Add CC response:', res.data);
      setEmailConfig(res.data);
      setNewCcEmail('');
      alert('CC email added successfully');
    } catch (err) {
      console.error('Add CC error:', err);
      alert('Add CC failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setConfigSaving(false);
    }
  };

  const handleRemoveCc = async (email) => {
    if (!window.confirm(`Remove ${email} from CC list?`)) return;
    try {
      setConfigSaving(true);
      const res = await API.delete(`/contact/email-config/cc/${email}`);
      setEmailConfig(res.data);
      alert('CC email removed successfully');
    } catch (err) {
      alert('Remove CC failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setConfigSaving(false);
    }
  };

  const getStats = () => {
    return {
      total: contacts.length,
      new: contacts.filter(c => c.status === 'new').length,
    };
  };

  const stats = getStats();

  return (
    <calcite-shell>
      <AdminNavbar />
      <AdminSidebar />

      <div className="contact-view-page">
        <div className="contact-view-container">
          <div className="contact-app-grid">

            {/* Column 1: Navigation */}
            <div className="nav-sidebar">
              <div className="user-profile-header">
                <calcite-icon icon="user" scale="m" />
                <b>admin@gis-solutions.lk</b>
              </div>

              <div className="folder-list">
                <div className={`folder-item ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
                  <calcite-icon icon="inbox" scale="s" />
                  <span>Inbox</span>
                  <span className="badge-count">{stats.total}</span>
                </div>
                <div className={`folder-item ${activeTab === 'new' ? 'active' : ''}`} onClick={() => setActiveTab('new')}>
                  {/* Using envelope icon for New messages for better compatibility */}
                  <calcite-icon icon="envelope" scale="s" />
                  <span>New</span>
                  {stats.new > 0 && <span className="badge-count" style={{ background: '#f89927' }}>{stats.new}</span>}
                </div>
                <div className={`folder-item ${activeTab === 'read' ? 'active' : ''}`} onClick={() => setActiveTab('read')}>
                  {/* Using circle-check-mark for Read messages */}
                  <calcite-icon icon="check-circle" scale="s" />
                  <span>Read</span>
                </div>
                <div className={`folder-item ${activeTab === 'replied' ? 'active' : ''}`} onClick={() => setActiveTab('replied')}>
                  {/* Using sharp-left icon for Replied messages as requested */}
                  <calcite-icon icon="sharp-left" scale="s" />
                  <span>Replied</span>
                </div>
                <div className="folder-item">
                  <calcite-icon icon="trash" scale="s" />
                  <span>Trash</span>
                </div>
              </div>

              {/* Email Delivery Settings - Enhanced visibility with clear buttons */}
              <div className="sidebar-settings">
                <span className="settings-title">📧 Email Delivery</span>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '12px', color: '#0079c1', fontWeight: '700', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Primary Recipient
                  </label>
                  {editingRecipient ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                      <input
                        type="email"
                        value={newRecipient}
                        onChange={e => setNewRecipient(e.target.value)}
                        placeholder="admin@example.com"
                        style={{
                          padding: '8px 12px',
                          border: '2px solid #0079c1',
                          borderRadius: '4px',
                          fontSize: '13px',
                          width: '100%'
                        }}
                      />
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={handleUpdateRecipient}
                          disabled={configSaving}
                          style={{
                            flex: 1,
                            padding: '8px 12px',
                            background: '#0079c1',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: configSaving ? 'not-allowed' : 'pointer',
                            opacity: configSaving ? 0.6 : 1
                          }}
                        >
                          {configSaving ? 'Saving...' : '✓ Save'}
                        </button>
                        <button
                          onClick={() => { setEditingRecipient(false); setNewRecipient(emailConfig?.recipientEmail || ''); }}
                          style={{
                            flex: 1,
                            padding: '8px 12px',
                            background: '#fff',
                            color: '#666',
                            border: '2px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          ✕ Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ marginTop: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', padding: '10px 12px', borderRadius: '6px', border: '2px solid #e0e0e0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <span style={{ fontSize: '13px', color: '#1a1a1a', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, fontWeight: '500' }}>{emailConfig?.recipientEmail || 'info@gislk.com'}</span>
                      </div>
                      <button
                        onClick={() => setEditingRecipient(true)}
                        style={{
                          width: '100%',
                          marginTop: '6px',
                          padding: '8px 12px',
                          background: '#f0f7ff',
                          color: '#0079c1',
                          border: '2px solid #0079c1',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        ✏️ Edit Primary Email
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: '#0079c1', fontWeight: '700', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    CC Recipients
                  </label>
                  <div style={{ maxHeight: '140px', overflowY: 'auto', margin: '6px 0 12px 0', background: '#f8f9fa', padding: '8px', borderRadius: '6px', border: '1px solid #e0e0e0' }}>
                    {emailConfig?.ccEmails?.map(email => (
                      <div key={email} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', fontSize: '12px', padding: '8px 10px', border: '1px solid #e0e0e0', marginBottom: '6px', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, fontWeight: '500' }}>{email}</span>
                        <button
                          onClick={() => handleRemoveCc(email)}
                          style={{
                            padding: '4px 8px',
                            background: '#fff',
                            color: '#d32f2f',
                            border: '1px solid #d32f2f',
                            borderRadius: '3px',
                            fontSize: '11px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            marginLeft: '8px'
                          }}
                        >
                          ✕ Remove
                        </button>
                      </div>
                    ))}
                    {(!emailConfig?.ccEmails || emailConfig.ccEmails.length === 0) && (
                      <span style={{ fontSize: '12px', color: '#999', fontStyle: 'italic', display: 'block', padding: '12px 8px', textAlign: 'center' }}>No CC recipients added</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
                    <input
                      type="email"
                      placeholder="Enter CC email address..."
                      value={newCcEmail}
                      onChange={e => setNewCcEmail(e.target.value)}
                      onKeyPress={(e) => { if (e.key === 'Enter') handleAddCc(); }}
                      style={{
                        padding: '8px 12px',
                        border: '2px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '13px',
                        width: '100%'
                      }}
                    />
                    <button
                      onClick={handleAddCc}
                      disabled={configSaving}
                      style={{
                        padding: '8px 12px',
                        background: '#0079c1',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: configSaving ? 'not-allowed' : 'pointer',
                        opacity: configSaving ? 0.6 : 1
                      }}
                    >
                      {configSaving ? 'Adding...' : '+ Add CC Email'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Message List */}
            <div className="message-list-column">
              <div className="list-toolbar">
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <div className="search-box-wrapper" style={{ border: '1px solid #ccc' }}>
                      <calcite-icon icon="search" scale="s" />
                      <input
                        type="text"
                        className="search-input-minimal"
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <button className="toolbar-button" style={{ minWidth: '40px', padding: '6px 12px' }} onClick={fetchContacts}>
                    <calcite-icon icon="refresh" scale="s" />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>

              {/* Scroll area with filters */}
              <div className="list-scroll-area">
                <div style={{ padding: '12px 16px', background: '#fbfbfb', borderBottom: '1px solid #f0f0f0' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <calcite-select scale="s" value={filterService} onCalciteSelectChange={e => setFilterService(e.target.selectedOption.value)} style={{ flex: 1 }}>
                      <calcite-option value="all">All Services</calcite-option>
                      <calcite-option value="GIS Mapping & Cartography">GIS Mapping</calcite-option>
                      <calcite-option value="Spatial Analysis">Spatial Analysis</calcite-option>
                      <calcite-option value="Remote Sensing">Remote Sensing</calcite-option>
                    </calcite-select>
                  </div>

                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginBottom: '8px' }}>
                    <input type="date" style={{ fontSize: '11px', border: '1px solid #ccc', borderRadius: '4px', padding: '4px', flex: 1 }} value={startDate} onChange={e => setStartDate(e.target.value)} />
                    <span style={{ fontSize: '11px' }}>to</span>
                    <input type="date" style={{ fontSize: '11px', border: '1px solid #ccc', borderRadius: '4px', padding: '4px', flex: 1 }} value={endDate} onChange={e => setEndDate(e.target.value)} />
                  </div>

                  <div className="tiny-stats">
                    <span className="tiny-stat-item">Total: <b>{stats.total}</b></span>
                    <span className="tiny-stat-item">New: <b style={{ color: stats.new > 0 ? '#f89927' : 'inherit' }}>{stats.new}</b></span>
                  </div>
                </div>

                {loading && <div style={{ padding: '20px', textAlign: 'center' }}><calcite-loader active scale="m"></calcite-loader></div>}
                {!loading && filteredContacts.map(contact => (
                  <div
                    key={contact._id}
                    className={`message-item ${selectedContact?._id === contact._id ? 'selected' : ''} ${contact.status === 'new' ? 'unread' : ''}`}
                    onClick={() => handleSelectMessage(contact)}
                  >
                    <div className="message-item-top">
                      <span className="message-sender">{contact.name}</span>
                      <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="message-subject">
                      {contact.status === 'new' && <span className="unread-dot"></span>}
                      {contact.service || 'General Inquiry'}
                    </div>
                    <div className="message-preview">
                      {contact.message}
                    </div>
                  </div>
                ))}
                {!loading && filteredContacts.length === 0 && (
                  <div style={{ padding: '40px', textAlign: 'center', color: '#999', fontSize: '13px' }}>
                    No messages found
                  </div>
                )}
              </div>
            </div>

            {/* Column 3: Detail View */}
            <div className="detail-column">
              {selectedContact ? (
                <>
                  <div className="detail-toolbar">
                    <button className="toolbar-button" onClick={() => setIsReplyMode(true)}>
                      <calcite-icon icon="chevron-left" scale="s" />
                      <span>Reply</span>
                    </button>
                    <button className="toolbar-button" onClick={() => { setIsReplyMode(true); if (replyTextAreaRef.current) replyTextAreaRef.current.value = 'Reply All: '; }}>
                      <calcite-icon icon="chevrons-left" scale="s" />
                      <span>Reply all</span>
                    </button>
                    <button className="toolbar-button" onClick={handleDelete}>
                      <calcite-icon icon="trash" scale="s" />
                      <span>Delete</span>
                    </button>
                  </div>

                  <div className="detail-content">
                    <div className="message-header">
                      <h2 className="message-title">{selectedContact.service || 'Inquiry regarding GIS Solutions'}</h2>
                      <div className="sender-info-row">
                        <div className="sender-avatar" style={{ border: '1px solid #ccc' }}>
                          <calcite-icon icon="user" scale="l" />
                        </div>
                        <div className="sender-text">
                          <h4 style={{ color: '#1a1a1a' }}>{selectedContact.name}</h4>
                          <p>From: <span style={{ color: '#0079c1' }}>{selectedContact.email}</span> • {new Date(selectedContact.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="message-body" style={{ color: '#333' }}>
                      {selectedContact.message}
                      {selectedContact.company && (
                        <div style={{ marginTop: '24px', fontSize: '14px', color: '#666', borderTop: '1px solid #eee', paddingTop: '12px' }}>
                          <b>Company:</b> {selectedContact.company}
                        </div>
                      )}
                    </div>

                    {selectedContact.replies && selectedContact.replies.length > 0 && (
                      <div style={{ marginTop: '40px', borderTop: '2px solid #eee', paddingTop: '20px' }}>
                        <h4 style={{ fontSize: '15px', marginBottom: '16px', fontWeight: 'bold' }}>Communication History</h4>
                        {selectedContact.replies.map((reply, idx) => (
                          <div key={idx} style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', marginBottom: '16px', borderLeft: '4px solid #35ac46' }}>
                            <div style={{ fontSize: '11px', color: '#777', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                              <span>Sent by Admin</span>
                              <span>{new Date(reply.repliedAt).toLocaleString()}</span>
                            </div>
                            <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#222' }}>{reply.replyContent}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {isReplyMode && (
                      <div className="reply-comp-box" style={{ marginTop: '32px' }}>
                        <calcite-label style={{ fontWeight: 'bold' }}>
                          Compose Reply to {selectedContact.email}
                          <calcite-text-area
                            ref={replyTextAreaRef}
                            rows="8"
                            placeholder="Type your reply here..."
                            style={{ marginTop: '8px', width: '100%', minHeight: '150px', resize: 'vertical' }}
                          />
                        </calcite-label>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
                          <calcite-button scale="m" onClick={handleSendReply} loading={loading}>Send Reply</calcite-button>
                          <calcite-button scale="m" appearance="outline" onClick={() => setIsReplyMode(false)}>Cancel</calcite-button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="empty-detail">
                  <calcite-icon icon="envelope" scale="l" style={{ opacity: 0.1, width: '120px', height: '120px' }} />
                  <p style={{ marginTop: '16px', fontSize: '16px' }}>Select a message to view its contents</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </calcite-shell>
  );
}