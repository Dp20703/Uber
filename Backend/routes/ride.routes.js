const express = require("express");
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require("../controllers/ride.controller");
const authmiddleware = require('../middlewares/auth.middleware');

// /rides/create
router.post('/create',
    authmiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
    body('destination').isString().isLength({ min: 3 }).withMessage("Invalid destination address"),
    body('vehicalType').isString().isIn(['auto', 'car', 'motorcycle']).withMessage('Invalid vehicalType'), rideController.createRide
)

// /rides/get-fare
router.get('/get-fare',
    authmiddleware.authUser, query('pickup').isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
    query('destination').isString().isLength({ min: 3 }).withMessage("Invalid destination address"),
    rideController.getFare);
module.exports = router;