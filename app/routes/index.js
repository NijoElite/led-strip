const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
    res.redirect('/led');
});

// /led
router.use('/led', require('./led.js'));

// /about
router.use('/about', require('./about.js'));

// 404 error
router.all('*', (req, res) => {
   res.status(404).send('що шукаєш, еблан?');
});

module.exports = router;