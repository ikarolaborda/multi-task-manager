const { User, RefreshToken, BlacklistedToken } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

class UserController {
    // User Registration
    static async register(req, res) {
        try {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, password: hashedPassword });
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // User Authentication (login)
    static async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username } });
            if (user && await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
                const refreshToken = jwt.sign({ userId: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

                // Store the refresh token in the database
                await RefreshToken.create({ userId: user.id, token: refreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });

                res.status(200).json({ message: 'Logged in successfully', token, refreshToken });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async logout(req, res) {
        try {
            const token = req.headers['authorization'];
            const refreshToken = req.body.refreshToken;

            // Blacklist the current access token
            await BlacklistedToken.create({ token, expiresAt: jwt.decode(token).exp * 1000 });

            // Remove the refresh token
            await RefreshToken.destroy({ where: { token: refreshToken } });

            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async refreshToken(req, res) {
        const refreshToken = req.body.refreshToken;

        // Find the refresh token in the database
        const storedToken = await RefreshToken.findOne({ where: { token: refreshToken } });

        if (!storedToken) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        try {
            const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
            const newAccessToken = jwt.sign({ userId: decoded.userId }, SECRET_KEY, { expiresIn: '1h' });

            res.status(200).json({ accessToken: newAccessToken });
        } catch (error) {
            res.status(401).json({ message: 'Invalid refresh token' });
        }
    }

}

module.exports = UserController;
