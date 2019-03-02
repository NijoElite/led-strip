const express = require('express');
const router = express.Router();

const { manipulateStrip } = require('../actions/led.js');

router.get('/', (req, res) => {
    const result = manipulateStrip(req.query);

    res.send(result ? 'норм' : 'хуита');
});

module.exports = router;