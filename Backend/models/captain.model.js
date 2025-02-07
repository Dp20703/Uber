const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            require: true,
            minlength: [3, "Firstname must be at least have 3 characters long"],
        },
        lastname: {
            type: String,
            require: true,
            minlength: [3, "Lastname must be at least have 3 characters long"],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        math: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehical: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 characters long"]
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate must be at least 3 characters long"]
        },
        capacity: {
            type: String,
            required: true,
            min: [1, "Capacity must be at least 1"]
        },
        vehicalType: {
            type: String,
            required: true,
            enum: ['car', 'auto', 'motorcycle'],
        },
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: String,
        }
    }

})
//for generating authetication token usingn jwt:
captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRECT, { expiresIn: '24h' });
    return token;
}
//for comparing the hashpassword with password using bcrypt;
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
//for hashing the password using bcrypt:
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('captain', captainSchema);
module.exports = captainModel;