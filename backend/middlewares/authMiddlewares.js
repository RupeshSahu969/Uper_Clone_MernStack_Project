const  { User } =require("../models/userModel")
const jwt = require('jsonwebtoken');
const captainModel=require("../models/captainModel");
const blacklistTokenModel=require("../models/blocklistTokenModels");


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || (req.header('Authorization') && req.header('Authorization').split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token is missing" });
    }

    const isBlackList = await blacklistTokenModel.findOne({ token: token });

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

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || (req.header('Authorization') && req.header('Authorization').split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token is missing" });
    }

    const isBlackList = await blacklistTokenModel.findOne({ token: token });

    if (isBlackList) {
        return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
    }
    try {
        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the user associated with the token
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(401).json({ message: "Unauthorized: captain not found" });
        }

        // Attach captain to the request object
        req.captain = captain;
        return next();
    } catch (err) {
        console.error('Token verification error:', err.message);
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};




