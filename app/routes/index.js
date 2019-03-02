const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
    res.send('Server /');
});

// /about
router.use('/about', require('./about.js'));

// 404 error
router.all('*', (req, res) => {
   res.status(404).send('що шукаєш, еблан?');
});


module.exports = router;