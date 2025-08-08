const captainModel  = require("../models/captainModel");
const captainService = require("../services/captainServices"); 

const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  
  const isCaptainAlreadyExits = await captainModel.findOne({ email });

  if (isCaptainAlreadyExits) {
    return res.status(400).json({ message: "Captain already exist" });
  }

  const hashedPassword = await captainModel.hashPassword(password); // <-- Use model static method

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();


  res.status(201).json({ captain, token });
};


module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find user by email and include password field (using select('+password'))
        const captain = await captainModel.findOne({ email }).select('+password');

        if (!captain) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = captain.generateAuthToken();

         res.cookie('token', token, {
            httpOnly: true,                // Helps prevent XSS attacks
            secure: process.env.NODE_ENV === 'production',  // Only set secure cookies in production (HTTPS)
            maxAge: 3600000,               // 1 hour expiration time
            sameSite: 'None',              // Allow cross-origin requests if required (ensure HTTPS)
        });
        // Return success response
        return res.status(200).json({
            message: "Login Successfully",
            token,
            captain: {
                firstname: captain.fullname.firstname,
                lastname: captain.fullname.lastname,
                email: captain.email,
            },
        });
    } catch (err) {
        return next(err); // Let express error handler catch unexpected errors
    }
};












