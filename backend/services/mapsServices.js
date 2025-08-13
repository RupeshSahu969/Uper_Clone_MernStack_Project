const axios = require("axios");

module.exports.getAddressCoordinater = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
   
    try {
        const response = await axios.get(url);

        console.log("Google Maps API Response:", response.data);  // Log the response for debugging

        if (response.data.status === "OK") {
            const { lat, lng } = response.data.results[0].geometry.location;
            return { lat, lng };
        }

        // Handle different status codes from Google Maps API
        if (response.data.status === "ZERO_RESULTS") {
            throw new Error("No results found for the provided address.");
        } else if (response.data.status === "OVER_QUERY_LIMIT") {
            throw new Error("API rate limit exceeded.");
        } else {
            throw new Error(`Google Maps API Error: ${response.data.status}`);
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        throw new Error("Error fetching coordinates");
    }
};

module.exports.getDistanceTime=async(origin, destination) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        console.log("Google Maps API Response:", response.data);  // Log the response for debugging

        if (response.data.status === "OK") {
            const { distance, duration } = response.data.rows[0].elements[0];
            return { distance, duration };
        }

        // Handle different status codes from Google Maps API
        if (response.data.status === "ZERO_RESULTS") {
            throw new Error("No results found for the provided addresses.");
        } else if (response.data.status === "OVER_QUERY_LIMIT") {
            throw new Error("API rate limit exceeded.");
        } else {
            throw new Error(`Google Maps API Error: ${response.data.status}`);
        }
    } catch (error) {
        console.error("Error fetching distance and duration:", error.message);
        throw new Error("Error fetching distance and duration");
    }
};


module.exports.getAutoCompleteSuggestion=async(input)=>{
    if(!input){
        throw new Error("Query  is required.");
    }

        const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    


}