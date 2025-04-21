const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require("../controllers/map.controller");
const { query } = require('express-validator');

// /maps/get-coordinates
router.get('/get-coordinates', query('address').isLength({ min: 3 }), authMiddleware.authUser, mapController.getCoordinates);

// /maps/get-distance-time
router.get('/get-distance-time', query('origin').isLength({ min: 3 }), query('destination').isLength({ min: 3 }), authMiddleware.authUser, mapController.getDistanceTime);

// /maps/get-suggestions
router.get('/get-suggestions', query('input').isLength({ min: 3 }), authMiddleware.authUser, mapController.getSuggestions);

module.exports = router;