const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const BlacklistTokenModel = require('../models/blacklistToken.model')

//this controller function will register the user using required fields:
module.exports.registerUser = async (req, res, next) => {

    //check errors in the data using express-validator:
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body)

    //if there are no errors it will createUser using user service:
    //destructuring data from req:
    const { fullname, email, password } = req.body;

    //Checking if the any user is already loggedin with this email:
    const isUserAlreadyExist = await userModel.findOne({ email });
    if (isUserAlreadyExist) {
        return res.status(409).json({ message: 'User already exist' })
    }

    //converting the password into hashPassword:
    const hashPassword = await userModel.hashPassword(password);

    //creating user using userService:
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    });
    console.log(user)

    //generating a token using user's id: 
    const token = await user.generateAuthToken();
    console.log(token)
    res.status(201).json({ token, user });
}

// this controller function will login the user using email and password:
module.exports.loginUser = async (req, res, next) => {

    //check errors in the data using express-validator:
    const errors = validationResult(req);

    //if there are errors it will return the errors:
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //if there are no errors it will find the user using email:
    const { email, password } = req.body;
    // console.log(email, password);

    const user = await userModel.findOne({ email }).select('+password');
    // console.log(user);

    //if user is not found it will return invalid email or password:
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" })
    }
    //if user is found it will compare the password using comparePassword:
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    //if email and password is correct it will generate a token using user's id:
    const token = user.generateAuthToken();
    //it will set the token in the cookies:
    res.cookie('token', token);
    res.status(200).json({ token, user });
};

//this controller function will get the user profile using user's id:
module.exports.getUserProfile = async (req, res, next) => {
    const user = req.user;
    return res.status(200).json(user);
}

//this controller function will logout the user:
module.exports.logoutUser = async (req, res, next) => {

    module.exports.logoutUser = async (req, res) => {
        try {
            // Get token from cookies or Authorization header
            const token = req.cookies.token || req.headers?.authorization?.split(' ')[1];

            if (token) {
                // Check if token is already blacklisted to avoid duplicate key error
                const alreadyBlacklisted = await BlacklistTokenModel.findOne({ token });

                if (!alreadyBlacklisted) {
                    // Store token in blacklist with auto-expiry (handled by schema)
                    await BlacklistTokenModel.create({ token });
                }
            }

            // Clear token cookie
            res.clearCookie('token');

            return res.status(200).json({ message: "User logout successful" });
        } catch (error) {
            console.error("Logout error:", error);
            return res.status(500).json({ message: "Error logging out", error });
        }
    };

}
