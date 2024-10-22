"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = verifyToken;
const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
            console.warn('JWT has expired!');
            return res.status(401).json({ message: 'Your session has expired. Please log in again.' });
        }
        else {
        }
        next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}
