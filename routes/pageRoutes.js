const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');



router.get('/', authMiddleware, (req, res) => {
  const user = req?.user || null;
  res.render('home', { title: 'Home Page', error: null, user });
});

router.get('/login', (req, res) => {
  res.render('auth/login', { error: null, user: null });
});

router.get('/signup', (req, res) => {
  res.render('auth/signup', { error: null, user: null });
});

router.get('/settings', authMiddleware, (req, res) => {
  res.render('auth/userSetting', { error: null, user: req.user });
});

router.get('/reset-password/:token', (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    if (decoded.tokenType !== 'reset') {
      throw new Error('Invalid token type');
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      throw new Error('Token has expired');
    }

    const user = decoded.user;

    res.render('auth/reset-password', { user, token });
  } catch (err) {

    console.error('Error verifying token:', err);
    res.status(400).send('Invalid or expired reset link');
  }
});

router.get('/secret-angel', authMiddleware, (req, res) => {
  const colors = [
    '#FF9F68',
    '#72BDA3',
    '#A16AE8',
    '#FF6B6B',
    '#FFD700',
    '#4CAF50',
    '#2196F3',
    '#FF5722',
    '#8E44AD',
    '#F39C12',
    '#2ECC71',
    '#E74C3C',
    '#1ABC9C',
    '#3498DB',
    '#F1C40F',
    '#9B59B6',
    '#34495E',
    '#ECF0F1',
    '#D35400',
    '#BDC3C7',
    '#34495E'
  ];


  const rooms = [
    { id: 'room1', host: 'Alice' },
    { id: 'room2', host: 'Bob' },
    { id: 'room3', host: 'Charlie' },
    { id: 'room4', host: 'David' },
    { id: 'room5', host: 'Eve' },
    { id: 'room6', host: 'Frank' },
    { id: 'room7', host: 'Grace' },
    { id: 'room8', host: 'Hannah' },
    { id: 'room9', host: 'Isaac' },
    { id: 'room10', host: 'Jack' },
    { id: 'room11', host: 'Kathy' },
    { id: 'room12', host: 'Liam' },
    { id: 'room13', host: 'Mona' },
    { id: 'room14', host: 'Nathan' },
    { id: 'room15', host: 'Olivia' },
    { id: 'room16', host: 'Paul' },
    { id: 'room17', host: 'Quinn' },
    { id: 'room18', host: 'Rachel' },
    { id: 'room19', host: 'Steve' },
    { id: 'room20', host: 'Tracy' }
  ].map(room => ({
    ...room,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));


  res.render('secretAngel/index', { error: null, user: req.user, rooms });
});


module.exports = router;
