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


    module.exports.getFare=async(req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                status:'fail',
                errors:errors.array()
            });
        }
        const {pickup,destination}=req.query;

        try {
            const fare = await rideService.getFare({pickup,destination});
            res.status(200).json({
                status: 'success',
                data: {
                    fare
                }
            });
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }

    module.exports.confirmRide=async(req,res,next)=>{

    }

    module.exports.startRide=async(req,res,next)=>{

    }

    module.exports.endRide=async(req,res,next)=>{

    }


