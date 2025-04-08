const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('home', { error: null });
});


router.get('/login', (req, res) => {
    res.render('login', { error: null });
});

router.get('/signup', (req, res) => {
    res.render('signup', { error: null });
});


module.exports = router;
