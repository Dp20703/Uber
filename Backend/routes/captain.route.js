const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// /captains/register:
router.post('/register',
    [
        body('email').isEmail().withMessage("Invalid email"),
        body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('vehical.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters'),
        body('vehical.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters'),
        body('vehical.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
        body('vehical.vehicalType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid Vehical type'),
    ], captainController.registerCaptain)

// /captains/login:
router.post('/login', [
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], captainController.loginCaptain)

// /captains/profile:
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)

// /captains/logout:
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)

module.exports = router;