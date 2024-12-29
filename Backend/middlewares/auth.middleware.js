const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//this middleware function will authenticate the user:
module.exports.authUser = async (req, res, next) => {

    //get the token from the cookies or headers:
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    // console.log(req.headers.authorization)

    //if token is not found it will return unauthorized:
    if (!token) {
        console.log("token not found")
        return res.status(401).json({ message: "Unauthorized" })
    }
    try {
        //if token is found it will decode the token using jwt.verify:
        const decoded = jwt.verify(token, process.env.JWT_SECRECT);
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