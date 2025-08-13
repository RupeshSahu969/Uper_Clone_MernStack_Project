const mapsServices=require("../services/mapsServices");


// mapsController.js
module.exports.getCoordinates = async (req, res, next) => {
    const { address } = req.query;
    try {
        const coordinates = await mapsServices.getAddressCoordinater(address);
        res.json(coordinates);
    } catch (error) {
        next(error);
    }
};

module.exports.getDistanceTime=async(req,res,next)=>{
    const { origin, destination } = req.query;
    try {
        if(!origin || ! destination){
            throw new Error("Origin and destination are required.");
        }
        const distanceTime = await mapsServices.getDistanceTime(origin, destination);
        res.json(distanceTime);
    } catch (error) {
        next(error);
    }
};


module.exports.getSuggestions=async(req,res,next)=>{
try{
const errors=validationResult(req)
if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
}
const { input } = req.query;
const suggestions = await mapsServices.getAutoCompleteSuggestion(input);
res.json(suggestions);
}
catch(err){
    next(err);
}

};
