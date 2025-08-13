const express=require("express");

const rideService=require("../services/rideServices");
const {validationResult}=require("express-validator");

module.exports.createRide=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            status:'fail',
            errors:errors.array()
        });
    }
    const {userId,pickup,destination,vehicleType}=req.body;
    
    try {
        const ride = await rideService.createRide({
            user: userId,
            pickup,
            destination,
            vehicleType
        });
        res.status(201).json({
            status: 'success',
            data: {
                ride
            }
        });
    } catch (error) {
        res.status(500).json({error:error.message})
    }
    }


