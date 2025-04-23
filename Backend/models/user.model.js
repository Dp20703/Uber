const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters!"]
        },
        lastname: {
            type: String,
            minlength: [3, "Last name must be at least 3 characters!"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email name must be at least 5 characters!"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String,
    }
})
//for generating authetication token usingn jwt:
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}
//for comparing the hashpassword with password using bcrypt;
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
//for hashing the password using bcrypt:
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;