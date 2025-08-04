const express = require("express");
const { body } = require("express-validator"); // Validation imports
const userController = require("../controller/userController");

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("firstname")
      .isLength({ min: 0 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser
);

module.exports = router;
