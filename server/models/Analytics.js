const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    // Visitor Information
    sessionId: {
        type: String,
        required: true,
        index: true
    },
    ipAddress: {
        type: String,
        required: true
    },

    // Page View Information
    page: {
        type: String,
        required: true
    },
    referrer: {
        type: String,
        default: ''
    },

    // Device & Browser Information
    userAgent: {
        type: String,
        required: true
    },
    browser: {
        type: String,
        default: 'Unknown'
    },
    device: {
        type: String,
        enum: ['Desktop', 'Mobile', 'Tablet', 'Unknown'],
        default: 'Unknown'
    },
    os: {
        type: String,
        default: 'Unknown'
    },

    // Geographic Information (optional)
    location: {
        country: String,
        city: String,
        region: String
    },

    // Timestamp
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    }
}, {
    timestamps: true
});

// Index for efficient queries
analyticsSchema.index({ timestamp: -1 });
analyticsSchema.index({ sessionId: 1, timestamp: -1 });

// Static method to get dashboard statistics
analyticsSchema.statics.getDashboardStats = async function () {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get total unique visitors (unique sessions)
    const totalVisitors = await this.distinct('sessionId').then(sessions => sessions.length);

    // Get today's unique visitors
    const todaysVisitors = await this.distinct('sessionId', {
        timestamp: { $gte: todayStart }
    }).then(sessions => sessions.length);

    // Get this week's unique visitors
    const weekVisitors = await this.distinct('sessionId', {
        timestamp: { $gte: weekStart }
    }).then(sessions => sessions.length);

    // Get this month's unique visitors
    const monthVisitors = await this.distinct('sessionId', {
        timestamp: { $gte: monthStart }
    }).then(sessions => sessions.length);

    // Get browser breakdown
    const browserStats = await this.aggregate([
        {
            $group: {
                _id: '$browser',
                count: { $sum: 1 }
            }
        },
        {
            $sort: { count: -1 }
        }
    ]);

    // Get device breakdown
    const deviceStats = await this.aggregate([
        {
            $group: {
                _id: '$device',
                count: { $sum: 1 }
            }
        },
        {
            $sort: { count: -1 }
        }
    ]);

    // Get recent activity (last 10 page views)
    const recentActivity = await this.find()
        .sort({ timestamp: -1 })
        .limit(10)
        .select('page timestamp device location.city location.country browser');

    return {
        totalVisitors,
        todaysVisitors,
        weekVisitors,
        monthVisitors,
        browserStats,
        deviceStats,
        recentActivity
    };
};

// Helper function to parse user agent
analyticsSchema.statics.parseUserAgent = function (userAgent) {
    const ua = userAgent.toLowerCase();

    // Detect browser
    let browser = 'Unknown';
    if (ua.includes('chrome') && !ua.includes('edg')) browser = 'Chrome';
    else if (ua.includes('safari') && !ua.includes('chrome')) browser = 'Safari';
    else if (ua.includes('firefox')) browser = 'Firefox';
    else if (ua.includes('edg')) browser = 'Edge';
    else if (ua.includes('opera') || ua.includes('opr')) browser = 'Opera';

    // Detect device
    let device = 'Desktop';
    if (ua.includes('mobile')) device = 'Mobile';
    else if (ua.includes('tablet') || ua.includes('ipad')) device = 'Tablet';

    // Detect OS
    let os = 'Unknown';
    if (ua.includes('windows')) os = 'Windows';
    else if (ua.includes('mac')) os = 'macOS';
    else if (ua.includes('linux')) os = 'Linux';
    else if (ua.includes('android')) os = 'Android';
    else if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) os = 'iOS';

    return { browser, device, os };
};

module.exports = mongoose.model('Analytics', analyticsSchema);
