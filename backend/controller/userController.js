const { User } = require("../models/userModel");
const userService = require("../services/userServices");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  // Validate incoming request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Access the fields correctly from the request body
  const { fullname, email, password } = req.body;
  const { firstname, lastname } = fullname; // Access nested fields

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

    // Send the user and token as response
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
      return res.status(400).json({ message: "Email is already in use, please try another one." });
    }
    next(error); // Pass errors to the error-handling middleware
  }
};
