const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service')
const { validationResult } = require('express-validator');

//this controller function will register the captain using required fields:
module.exports.registerCaptain = async (req, res, next) => {

    //check errors in the data using express-validator:
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body)


    //if there are no errors it will createCaptain using captain service:
    //destructuring data from req:
    const { fullname, email, password, vehical } = req.body;

    //Checking if the any captain is already loggedin with this email:
    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    // console.log(isCaptainAlreadyExist)
    // console.log(email)
    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exist' })
    }

    //converting the password into hashPassword:
    const hashPassword = await captainModel.hashPassword(password);

    //creating captain using captainService:
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color: vehical.color,
        plate: vehical.plate,
        capacity: vehical.capacity,
        vehicalType: vehical.vehicalType,
    });

    //generating a token using captain's id: 
    const token = await captain.generateAuthToken();
    console.log(captain)
    res.status(201).json({ token, captain });
}

//this controller function will login the captain using required fields:
module.exports.loginCaptain = async (req, res, next) => {

    //check errors in the data using express-validator:
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    //destructuring data from req:
    const { email, password } = req.body;

    //Checking if the captain is already exist or not:
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }

    //comparing the password with the hashPassword:
    const isMatch = await captainModel.comparePassword(password);

    //if password is not matched:
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }

    //generating a token using captain's id:
    const token = await captain.generateAuthToken();

    //Storing the token in the cookie:
    res.cookie('token', token)

    //sending the token and captain data in response: 
    res.status(200).json({ token, captain })
}

