// Simple auth middleware placeholder
// Replace with your actual authentication logic

const protect = (req, res, next) => {
    // Check for admin token
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        // TODO: Verify JWT token here and extract admin info
        // For now, use a mock admin object for development
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // req.admin = decoded;

        // Mock admin for development (replace with actual JWT verification)
        req.admin = {
            _id: '507f1f77bcf86cd799439011', // Mock MongoDB ObjectId
            name: 'Admin User',
            email: 'admin@gis-solutions.com'
        };

        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

module.exports = { protect };
