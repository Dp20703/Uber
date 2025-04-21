const rideModel = require('../models/ride.model');
const mapService = require('../services/maps.service');
const crypto = require('crypto');

// Function to calculate the fare
async function getFare(pickup, destination) {

    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };



    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.motorcycle + ((distanceTime.distance.value / 1000) * perKmRate.motorcycle) + ((distanceTime.duration.value / 60) * perMinuteRate.motorcycle))
    };
    console.log("FARE:", fare)
    return fare;


}

module.exports.getFare = getFare;

// Function to generate OTP
function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

//Create Ride:
module.exports.createRide = async ({ user, pickup, destination, vehicalType }) => {
    //throw error if the mandatory fields are empty:
    if (!user || !pickup || !destination || !vehicalType) {
        throw new Error('All fields are required');
    }
    //get fare:
    const fare = await getFare(pickup, destination);
    //create Ride:
    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicalType]
    })
    console.log("Ride:", ride)
    return ride;
}


