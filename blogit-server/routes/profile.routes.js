const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profile.controller');
const authenticate = require('../middlewares/auth.middleware');

router.get('/', authenticate, getProfile);
router.patch('/', authenticate, updateProfile);

module.exports = router;
