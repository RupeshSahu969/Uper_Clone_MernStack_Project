const express = require("express");
const mapsController = require("../controller/mapsController");
const authMiddleware = require("../middlewares/authMiddlewares");
const router = express.Router();
const {query}=require("express-validator");
router.get("/get-coordinates",
    query('address').isString().isLength({ min: 3 }),
    mapsController.getCoordinates);


    router.get("/get-distance-time",
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    mapsController.getDistanceTime);


    router.get("/get-suggestions", query('input').isString().isLength({ min: 3 }),
     mapsController.getSuggestions);


module.exports = router;
