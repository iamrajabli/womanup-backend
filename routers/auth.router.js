const express = require('express');
const {
    register,
    login,
    logout
} = require('../controllers/auth.controller');

const router = express.Router();

const auth = require('../middlewares/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', auth, logout);

module.exports = router;