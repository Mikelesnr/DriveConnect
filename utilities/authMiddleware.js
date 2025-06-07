const jwt = require ('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user-model');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        console.log('Token found in headers');
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
    
});

module.exports = { protect };