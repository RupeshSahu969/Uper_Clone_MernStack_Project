import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
    const token = req.cookies.token || (req.header('Authorization') && req.header('Authorization').split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token is missing" });
    }

    
    const isBlackList = await User.findOne({ token: token });
   
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






