const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
router.get('/', authMiddleware, (req, res) => {
    const user = req?.user || null;
    console.log('User:', user);
    res.render('home', { title: 'Home Page', error: null, user });
});


router.get('/login', (req, res) => {
    res.render('login', { error: null, user: null });
});

router.get('/signup', (req, res) => {
    res.render('signup', { error: null, user: null });
});


module.exports = router;
