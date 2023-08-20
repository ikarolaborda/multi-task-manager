const jwt = require('jsonwebtoken');
const { BlacklistedToken } = require('../models');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

const jwtAuth = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Authentication token is required' });
    }

    const blacklistedToken = await BlacklistedToken.findOne({ where: { token } });
    if (blacklistedToken) {
        return res.status(401).json({ message: 'Token is blacklisted' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid authentication token' });
    }
};

module.exports = jwtAuth;
