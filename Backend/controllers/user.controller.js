const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator')

//this function will register the user using required fields:
module.exports.registerUser = async (req, res, next) => {
    //check errors in the data using express-validator:
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body)
    //if there are no errors it will createUser using user service:

    //destructuring data from req:
    const { fullname, email, password } = req.body;

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
    res.status(200).json({ token, user });
}