const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require("../controllers/map.controller");
const { query } = require('express-validator');

// /maps/get-coordinates
router.get('/get-coordinates', query('address').isLength({ min: 3 }), authMiddleware.authUser, mapController.getCoordinates);

module.exports = router;