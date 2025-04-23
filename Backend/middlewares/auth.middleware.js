const userModel = require('../models/user.model');
const captainModel = require("../models/captain.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BlacklistTokenModel = require('../models/blacklistToken.model')

//this middleware function will authenticate the user:
module.exports.authUser = async (req, res, next) => {

    //get the token from the cookies or headers:
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // console.log(req.headers.authorization)

    //check if token is blacklisted:
    const isTokenBlacklisted = await BlacklistTokenModel.findOne({ token: token });
    // console.log(isTokenBlacklisted)
    if (isTokenBlacklisted) {
        console.log("blacklisted token")
        return res.status(401).json({ message: "Unauthorized" })
    }

    //if token is not found it will return unauthorized:
    if (!token) {
        console.log("token not found")
        return res.status(401).json({ message: "Unauthorized" })
    }
    try {
        //if token is found it will decode the token using jwt.verify:
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded)

        //it will find user using the decoded id:
        const user = await userModel.findById(decoded._id);

        //if user is not found it will return unauthorized:
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        req.user = user;
        return next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}

//this middleware function will authorize the captain:
module.exports.authCaptain = async (req, res, next) => {

    //get the token from the cookies or headers:
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    //check if token is blacklisted:
    const isTokenBlacklisted = await BlacklistTokenModel.findOne({ token: token });
    // console.log(isTokenBlacklisted)
    if (isTokenBlacklisted) {
        console.log("blacklisted token")
        return res.status(401).json({ message: "Unauthorized" })
    }

    //if token is not found it will return unauthorized:
    if (!token) {
        console.log("token not found")
        return res.status(401).json({ message: "Unauthorized" })
    }
    try {
        //if token is found it will decode the token using jwt.verify:
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)

        //it will find captain using the decoded id:
        const captain = await captainModel.findById(decoded._id);

        //if captain is not found it will return unauthorized:
        if (!captain) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        req.captain = captain;
        // console.log("calling the next", req.captain)
        return next();

    } catch (error) {
        console.log("error in auth middleware:", error)
        return res.status(401).json({ message: "Unauthorized" })
    }

}