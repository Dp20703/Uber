const rideService = require('../services/ride.service');
const { validationResult } = require("express-validator");
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');

// Controller function to create a new ride
module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination, vehicalType } = req.body;
    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicalType });
        res.status(201).json(ride);

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        console.log("Pickup Coordinates:", pickupCoordinates)
        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);
        console.log("Captain Radius:", captainsInRadius)
        ride.otp = ""

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
        console.log("RidewithUser: ", rideWithUser)

        captainsInRadius.map(captain => {
            console.log("Inside the socket of create ride controller: ", captain.socketId)

            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })
        console.log("Ride with user after socket emitted:", rideWithUser)

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

// Controller function to confirm a ride
module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

// Controller function to start a ride
module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId, otp } = req.query;
    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });
        //   console.log(ride);
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Controller function to end a ride
module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;
    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}