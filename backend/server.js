const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
connectDB();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Basic route
app.get("/", (req, res) => {
  res.send("API is running...");
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
