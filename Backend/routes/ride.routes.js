const express = require("express");
const router = express.Router();
const { body } = require('express-validator');
const rideController = require("../controllers/ride.controller");
const authmiddleware = require('../middlewares/auth.middleware');

// /rides/create
router.post('/create',
    authmiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
    body('destination').isString().isLength({ min: 3 }).withMessage("Invalid destination address"),
    body('vehicalType').isString().isIn(['auto', 'car', 'motorcycle']).withMessage('Invalid vehicalType'), rideController.createRide
)

module.exports = router;