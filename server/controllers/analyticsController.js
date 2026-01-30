const Analytics = require('../models/Analytics');
const crypto = require('crypto');

// Track page view
exports.trackPageView = async (req, res) => {
    try {
        const { page, referrer } = req.body;
        const userAgent = req.headers['user-agent'] || 'Unknown';
        const ipAddress = req.ip || req.connection.remoteAddress || 'Unknown';

        // Get or create session ID from cookie
        let sessionId = req.cookies?.sessionId;
        if (!sessionId) {
            sessionId = crypto.randomBytes(16).toString('hex');
            res.cookie('sessionId', sessionId, {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                httpOnly: true
            });
        }

        // Parse user agent
        const { browser, device, os } = Analytics.parseUserAgent(userAgent);

        // Create analytics record
        const analyticsData = {
            sessionId,
            ipAddress,
            page,
            referrer: referrer || '',
            userAgent,
            browser,
            device,
            os
        };

        const analytics = new Analytics(analyticsData);
        await analytics.save();

        res.status(201).json({ success: true, message: 'Page view tracked' });
    } catch (error) {
        console.error('Error tracking page view:', error);
        res.status(500).json({ success: false, message: 'Error tracking page view', error: error.message });
    }
};

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
    try {
        const stats = await Analytics.getDashboardStats();

        // Format recent activity
        const formattedActivity = stats.recentActivity.map(activity => ({
            page: activity.page,
            time: activity.timestamp,
            device: activity.device,
            location: activity.location?.city && activity.location?.country
                ? `${activity.location.city}, ${activity.location.country}`
                : 'Unknown',
            browser: activity.browser
        }));

        res.json({
            success: true,
            data: {
                totalVisitors: stats.totalVisitors,
                todaysVisitors: stats.todaysVisitors,
                weekVisitors: stats.weekVisitors,
                monthVisitors: stats.monthVisitors,
                totalProducts: 0, // Will be populated from products collection
                totalBundles: 0,  // Will be populated from bundles collection
                browserStats: stats.browserStats,
                deviceStats: stats.deviceStats,
                recentActivity: formattedActivity
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ success: false, message: 'Error fetching dashboard statistics', error: error.message });
    }
};

// Get visitor details with pagination
exports.getVisitors = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;

        const visitors = await Analytics.find()
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit)
            .select('-__v');

        const total = await Analytics.countDocuments();

        res.json({
            success: true,
            data: {
                visitors,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        console.error('Error fetching visitors:', error);
        res.status(500).json({ success: false, message: 'Error fetching visitors', error: error.message });
    }
};

// Get visitor trends (daily counts for last 30 days)
exports.getVisitorTrends = async (req, res) => {
    try {
        const days = parseInt(req.query.days) || 30;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const trends = await Analytics.aggregate([
            {
                $match: {
                    timestamp: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$timestamp' },
                        month: { $month: '$timestamp' },
                        day: { $dayOfMonth: '$timestamp' }
                    },
                    uniqueVisitors: { $addToSet: '$sessionId' },
                    pageViews: { $sum: 1 }
                }
            },
            {
                $project: {
                    date: {
                        $dateFromParts: {
                            year: '$_id.year',
                            month: '$_id.month',
                            day: '$_id.day'
                        }
                    },
                    uniqueVisitors: { $size: '$uniqueVisitors' },
                    pageViews: 1
                }
            },
            {
                $sort: { date: 1 }
            }
        ]);

        res.json({
            success: true,
            data: trends
        });
    } catch (error) {
        console.error('Error fetching visitor trends:', error);
        res.status(500).json({ success: false, message: 'Error fetching visitor trends', error: error.message });
    }
};
