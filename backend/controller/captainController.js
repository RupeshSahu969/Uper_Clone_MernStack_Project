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













