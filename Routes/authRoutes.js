const express = require('express');
const router = express.Router();

router.post('/login', (req, res, next) => {
    res.json({ message: "Login (pendiente)" });
});

module.exports = router;
