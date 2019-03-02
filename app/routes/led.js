const express = require('express');
const router = express.Router();
const jsonParser = express.json();

const { manipulateStrip } = require('../actions/led.js');

router.post('/',jsonParser, (req, res) => {
    manipulateStrip(req.body);
    res.status(204).end();
});

module.exports = router;