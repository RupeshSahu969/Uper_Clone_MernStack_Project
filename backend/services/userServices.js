const {User} = require("../models/userModel");

module.exports.createUser = async ({ firstname, lastname, email, password }) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Create a new user
  const user = new User({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  await user.save();
  return user;
};
