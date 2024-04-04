// Desc: Middleware to verify JWT token
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
export const auth = (req, res, next) => {
    try {
        // Find the JWT token in the request headers
        const token = req.cookies.ACCESS_TOKEN;
        // Decode the token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // Extract the user ID from the token
        req.auth = {
            id: decodedToken.id,
        };
        next();
    } catch (error) { res.status(401).json({message: 'User must be connected'}); }
}