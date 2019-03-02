const express = require('express');
const router = express.Router();

// about/
router.get('/', (req,res) => {
    res.send('пішов нахуй, я ще не зробив це');
});

module.exports = router;