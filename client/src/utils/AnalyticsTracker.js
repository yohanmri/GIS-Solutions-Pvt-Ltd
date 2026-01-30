import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

class AnalyticsTracker {
    constructor() {
        this.isEnabled = true;
        this.trackingQueue = [];
    }

    /**
     * Track a page view
     * @param {string} page - The page path (e.g., '/home', '/services')
     * @param {string} referrer - The referrer URL (optional)
     */
    async trackPageView(page, referrer = '') {
        if (!this.isEnabled) return;

        try {
            const trackingData = {
                page: page || window.location.pathname,
                referrer: referrer || document.referrer || ''
            };

            await axios.post(`${API_URL}/api/analytics/track`, trackingData, {
                withCredentials: true
            });

            console.log('Page view tracked:', trackingData.page);
        } catch (error) {
            console.error('Error tracking page view:', error);
            // Fail silently - don't disrupt user experience
        }
    }

    /**
     * Track multiple page views in batch
     * @param {Array} pages - Array of page objects with page and referrer
     */
    async trackBatch(pages) {
        if (!this.isEnabled || !pages || pages.length === 0) return;

        for (const pageData of pages) {
            await this.trackPageView(pageData.page, pageData.referrer);
        }
    }

    /**
     * Enable or disable tracking
     * @param {boolean} enabled - Whether tracking should be enabled
     */
    setEnabled(enabled) {
        this.isEnabled = enabled;
    }

    /**
     * Track custom event (for future expansion)
     * @param {string} eventName - Name of the event
     * @param {object} eventData - Additional event data
     */
    async trackEvent(eventName, eventData = {}) {
        if (!this.isEnabled) return;

        try {
            console.log('Custom event tracked:', eventName, eventData);
            // This can be expanded in the future to track custom events
        } catch (error) {
            console.error('Error tracking event:', error);
        }
    }
}

// Create a singleton instance
const analyticsTracker = new AnalyticsTracker();

export default analyticsTracker;
