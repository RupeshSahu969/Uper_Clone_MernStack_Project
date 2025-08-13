const express=require("express");
const rideController=require("../controller/rideControllers")

const router=express.Router()
const {body}=require("express-validator")
const authmiddleware=require("../middlewares/authMiddlewares")

router.post('/create',authmiddleware.authUser,
    body('pickupLocation').notEmpty().withMessage("Pickup location is required."),
    body('dropoffLocation').notEmpty().withMessage("Dropoff location is required."),
    body('userId').notEmpty().withMessage("User ID is required."),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage("Invalid vehicle type."),
    (req,res,next)=>{
        rideController.createRide(req,res,next);
    }
)

module.exports=router;
