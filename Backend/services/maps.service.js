const axios = require("axios");
const captainModel = require("../models/captain.model");
// Function to get the coordinates of a given address
module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAP_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            // console.log("Location :",location);
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Function to get the distance and time between two addresses
module.exports.getDistanceTime = async (origin, destination) => {
    const apiKey = process.env.GOOGLE_MAP_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No route found');
            }
            return response.data.rows[0].elements[0];
        }
        else {
            throw new Error('Unable to fetch distance and time');
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Function to get suggestions for a given input
module.exports.getSuggestions = async (input) => {
    const apiKey = process.env.GOOGLE_MAP_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        }
        else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Function to get captains in the radius
module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km
    const captains = await captainModel.find().where('location').near({
        center: [ltd, lng],
        maxDistance: radius,
        spherical: true
    })


    // const captains = await captainModel.find({
    //     location: {
    //         $geoWithin: {
    //             $centerSphere: [[ltd, lng], radius / 6371]
    //         }
    //     }
    // });
    return captains;
}