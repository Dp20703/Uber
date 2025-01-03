const captainModel = require('../models/captain.model');

//this function is used to create a captain:
module.exports.createCaptain = async ({
    firstname, lastname, email, password, color, plate, capacity, vehicalType
}) => {
    //throw error if the mandatory fields are empty:
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicalType) {
        throw new Error('All fields are required')
    }
    //if all fields are not empty:
    //createCaptain:
    const captain =  captainModel.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
        vehical: {
            color,
            plate,
            capacity,
            vehicalType
        }
    })
    return captain;
};