const express=require("express");
const rideController=require("../controller/rideControllers")

const router=express.Router()
const {body,query}=require("express-validator")
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
router.get('/get-fare',
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    (req,res,next)=>{
        rideController.getFare(req,res,next);
    }
)
    

router.post('/confirm',
    authmiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide
)

router.get('/start-ride',
    authmiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    rideController.startRide
)

router.post('/end-ride',
    authmiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)

module.exports=router;
