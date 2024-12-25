const userModel = require("../models/user.model")

//this function is used to create a user:
module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    //throw error if the mandatory fields are empty:
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }
    //if all fields are not empty:
    //createuser:
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}