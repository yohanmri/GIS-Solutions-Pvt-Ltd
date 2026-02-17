import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import API from '../../api/axios';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-card';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-loader';
import '@esri/calcite-components/components/calcite-notice';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalBundles: 0,
    totalVisitors: 0,
    todaysVisitors: 0,
    weekVisitors: 0,
    monthVisitors: 0
  });
  const [browserStats, setBrowserStats] = useState([]);
  const [deviceStats, setDeviceStats] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get('/analytics/dashboard-stats');

      if (response.data.success) {
        const data = response.data.data;

        // Update stats
        setStats({
          totalProducts: data.totalProducts || 0,
          totalBundles: data.totalBundles || 0,
          totalVisitors: data.totalVisitors || 0,
          todaysVisitors: data.todaysVisitors || 0,
          weekVisitors: data.weekVisitors || 0,
          monthVisitors: data.monthVisitors || 0
        });

        // Update browser and device stats
        setBrowserStats(data.browserStats || []);
        setDeviceStats(data.deviceStats || []);

        // Update recent activities
        if (data.recentActivity && data.recentActivity.length > 0) {
          const formattedActivities = data.recentActivity.map(activity => {
            const timeAgo = getTimeAgo(new Date(activity.time));
            return {
              text: `Page view: ${activity.page}`,
              time: timeAgo,
              icon: 'cursor-click',
              device: activity.device,
              location: activity.location,
              browser: activity.browser
            };
          });
          setRecentActivities(formattedActivities);
        }
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError('Failed to load dashboard statistics. Please ensure the analytics service is running.');
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  const getStatCards = () => [
    { title: 'Total Visitors', value: stats.totalVisitors.toLocaleString(), icon: 'users', color: '#2563eb' },
    { title: "Today's Visitors", value: stats.todaysVisitors.toString(), icon: 'clock', color: '#059669' },
    { title: 'This Week', value: stats.weekVisitors.toString(), icon: 'calendar', color: '#7c3aed' },
    { title: 'This Month', value: stats.monthVisitors.toString(), icon: 'graph-time-series', color: '#dc2626' }
  ];

  return (
    <calcite-shell>
      <AdminNavbar />
      <AdminSidebar />

      <div style={{
        padding: '24px',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'var(--calcite-ui-background)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              margin: '0 0 8px 0',
              fontSize: '32px',
              fontWeight: '600',
              color: 'var(--calcite-ui-text-1)'
            }}>
              Dashboard
            </h1>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: 'var(--calcite-ui-text-3)'
            }}>
              Welcome back! Here's what's happening today.
            </p>
          </div>

          {/* Error Notice */}
          {error && (
            <calcite-notice open icon="exclamation-mark-triangle" kind="danger" style={{ marginBottom: '24px' }}>
              <div slot="message">{error}</div>
            </calcite-notice>
          )}

          {/* Loading State */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <calcite-loader scale="l"></calcite-loader>
              <p style={{ marginTop: '16px', color: 'var(--calcite-ui-text-3)' }}>Loading dashboard...</p>
            </div>
          ) : (
            <>
              {/* Visitor Stats Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '20px',
                marginBottom: '32px'
              }}>
                {getStatCards().map((stat, index) => (
                  <calcite-card key={index}>
                    <div style={{ padding: '20px' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '12px'
                      }}>
                        <div>
                          <p style={{
                            margin: '0 0 8px 0',
                            fontSize: '14px',
                            color: 'var(--calcite-ui-text-3)',
                            fontWeight: '500'
                          }}>
                            {stat.title}
                          </p>
                          <h2 style={{
                            margin: 0,
                            fontSize: '28px',
                            fontWeight: '700',
                            color: 'var(--calcite-ui-text-1)'
                          }}>
                            {stat.value}
                          </h2>
                        </div>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '8px',
                          backgroundColor: `${stat.color}20`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <calcite-icon
                            icon={stat.icon}
                            scale="m"
                            style={{ color: stat.color }}
                          ></calcite-icon>
                        </div>
                      </div>
                    </div>
                  </calcite-card>
                ))}
              </div>

              {/* Browser & Device Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '32px'
              }}>
                {/* Browser Stats */}
                <calcite-card style={{ '--calcite-card-footer-padding': '0' }}>
                  <div slot="title">Browser Usage</div>
                  <div slot="subtitle">Breakdown by browser type</div>
                  <div style={{ padding: '16px' }}>
                    {browserStats.length > 0 ? (
                      browserStats.map((browser, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px 0',
                          borderBottom: index < browserStats.length - 1 ? '1px solid var(--calcite-ui-border-3)' : 'none'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <calcite-icon icon="browser" scale="s" style={{ color: 'var(--calcite-ui-brand)' }}></calcite-icon>
                            <span style={{ fontSize: '14px', color: 'var(--calcite-ui-text-1)' }}>
                              {browser._id || 'Unknown'}
                            </span>
                          </div>
                          <span style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: 'var(--calcite-ui-text-1)'
                          }}>
                            {browser.count}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: 'var(--calcite-ui-text-3)', textAlign: 'center', padding: '20px' }}>
                        No browser data available
                      </p>
                    )}
                  </div>
                </calcite-card>

                {/* Device Stats */}
                <calcite-card style={{ '--calcite-card-footer-padding': '0' }}>
                  <div slot="title">Device Usage</div>
                  <div slot="subtitle">Breakdown by device type</div>
                  <div style={{ padding: '16px' }}>
                    {deviceStats.length > 0 ? (
                      deviceStats.map((device, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px 0',
                          borderBottom: index < deviceStats.length - 1 ? '1px solid var(--calcite-ui-border-3)' : 'none'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <calcite-icon
                              icon={device._id === 'Mobile' ? 'mobile' : device._id === 'Tablet' ? 'tablet' : 'monitor'}
                              scale="s"
                              style={{ color: 'var(--calcite-ui-brand)' }}
                            ></calcite-icon>
                            <span style={{ fontSize: '14px', color: 'var(--calcite-ui-text-1)' }}>
                              {device._id || 'Unknown'}
                            </span>
                          </div>
                          <span style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: 'var(--calcite-ui-text-1)'
                          }}>
                            {device.count}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: 'var(--calcite-ui-text-3)', textAlign: 'center', padding: '20px' }}>
                        No device data available
                      </p>
                    )}
                  </div>
                </calcite-card>
              </div>
            </>
          )}
        </div>
      </div>
    </calcite-shell>
  );
}