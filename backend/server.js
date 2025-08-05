const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const userRouter = require("./routes/userRouter");
const captainRouter=require("./routes/captainRouter");

const cookieParser = require('cookie-parser')

connectDB();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser())
// Basic route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/user", userRouter);
app.use("/captain",captainRouter)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
