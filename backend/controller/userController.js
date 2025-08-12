const { User } = require("../models/userModel");
const userService = require("../services/userServices");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blocklistTokenModels");

module.exports.registerUser = async (req, res, next) => {
  // Validate incoming request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Access the fields correctly from the request body
  const { fullname, email, password } = req.body;
  const { firstname, lastname } = fullname; // Access nested fields
  const isuserAlreadyExits = await User.findOne({ email });

  if (isuserAlreadyExits) {
    return res.status(400).json({ message: "user already exist" });
  }
  try {
    // Hash the password before saving
    const hashedPassword = await User.hashPassword(password);

    // Create the user
    const user = await userService.createUser({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    // Generate the authentication token
    const token = user.generateAuthToken();

    // status the user and token as response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        firstname: user.fullname.firstname,
        lastname: user.fullname.lastname,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    if (error.message.includes("User with this email already exists")) {
      return res
        .status(400)
        .json({ message: "Email is already in use, please try another one." });
    }
    next(error); // Pass errors to the error-handling middleware
  }
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find user by email and include password field (using select('+password'))
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = user.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true, // Helps prevent XSS attacks
      secure: process.env.NODE_ENV === "production", // Only set secure cookies in production (HTTPS)
      maxAge: 3600000, // 1 hour expiration time
      sameSite: "None", // Allow cross-origin requests if required (ensure HTTPS)
    });
    // Return success response
    return res.status(200).json({
      message: "Login Successfully",
      token,
      user: {
        firstname: user.fullname.firstname,
        lastname: user.fullname.lastname,
        email: user.email,
      },
    });
  } catch (err) {
    return next(err); // Let express error handler catch unexpected errors
  }
};

module.exports.getUserProfile = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user found" });
  }

  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token =
    req.cookies.token ||
    (req.header("Authorization") && req.header("Authorization").split(" ")[1]);

  if (!token) {
    return res.status(400).json({ message: "No token provided for logout." });
  }

  try {
    const exists = await blacklistTokenModel.findOne({ token });
    if (!exists) {
      await blacklistTokenModel.create({ token });
    }
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    next(error);
  }
};
