import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
    const token = req.cookies.token || (req.header('Authorization') && req.header('Authorization').split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token is missing" });
    }

    // Check if the token is blacklisted (assuming you store blacklisted tokens in the User model)
    const isBlackList = await User.findOne({ token: token });
    // If you want to blocklist all tokens after logout, you should maintain a blacklist collection or array.
    // Here, you can check against a blacklist collection (e.g., BlacklistedToken model).
    // Example:
    // const BlacklistedToken = require('../models/blacklistModel');
    // const isBlacklisted = await BlacklistedToken.findOne({ token });
    // if (isBlacklisted) {
    //     return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
    // }
    if (isBlackList) {
        return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
    }
    try {
        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the user associated with the token
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        // Attach user to the request object
        req.user = user;
        return next();
    } catch (err) {
        console.error('Token verification error:', err.message);
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};






