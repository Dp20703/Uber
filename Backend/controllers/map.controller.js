const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');



//  Controller function to get the coordinates of a given address
module.exports.getCoordinates = async (req, res, next) => {
    // Check if there are any errors in the request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // If there are errors, return a 400 status code with the errors
        return res.status(400).json({ errors: errors.array() });
    }

    // Get the address from the request query
    const { address } = req.query;

    try {
        // Call the map service to get the coordinates of the given address
        const coordinates = await mapService.getAddressCoordinate(address);
        // Return the coordinates with a 200 status code
        res.status(200).json(coordinates);
    } catch (error) {
        // If there is an error, return a 404 status code with an error message
        res.status(404).json({ message: 'Coordinates not found' });
    }
}

// Controller function to get the distance and time between two addresses
module.exports.getDistanceTime = async (req, res, next) => {
    // Check if there are any errors in the request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // If there are errors, return a 400 status code with the errors
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Get the addresses from the request query
        const { origin, destination } = req.query;
        const distanceTime = await mapService.getDistanceTime(origin, destination);

        // Return the distance and time with a 200 status code
        res.status(200).json(distanceTime);
    }
    catch (error) {
        // If there is an error, return a 404 status code with an error message
        res.status(404).json({ message: 'Distance and time not found' });
    }
}

// Controller function to get suggestions for a given address
module.exports.getSuggestions = async (req, res, next) => {
    // Check if there are any errors in the request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // If there are errors, return a 400 status code with the errors
        return res.status(400).json({ errors: errors.array() });
    }

    // Get the address from the request query
    const { input } = req.query;

    try {
        // Call the map service to get suggestions for the given address
        const suggestions = await mapService.getSuggestions(input);

        // Return the suggestions with a 200 status code
        res.status(200).json(suggestions);
    } catch (error) {
        // If there is an error, return a 500 status code with an error message
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

