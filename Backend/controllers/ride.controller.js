const rideService = require('../services/ride.service');
const { validationResult } = require("express-validator");

// Controller function to create a new ride
module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination, vehicalType } = req.body;
    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicalType });
        return res.status(201).json(ride);
    } catch (error) {
        console.error("Create Ride Error:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Controller function to get the fare for a ride
module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination } = req.query;
    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (error) {
        console.error("Get Fare Error:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
