const express = require("express");
const { body } = require("express-validator"); // Validation imports
const userController = require("../controller/userController");
const authMiddleware=require("../middlewares/authMiddlewares")
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

router.post('/login',[
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({min:6}).withMessage('password')
],
userController.loginUser
)

router.get('/profile', authMiddleware.authUser,userController.getUserProfile);
router.get('/logout', authMiddleware.authUser,userController.logoutUser);


module.exports = router;
