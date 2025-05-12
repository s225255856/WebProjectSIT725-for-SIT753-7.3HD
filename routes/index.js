const express = require('express');
const router = express.Router();

const usersRouter = require('./userRoutes');

const pageRouter = require('./pageRoutes');

const secretAngelRouter = require('./secretAngelRoutes');

router.use('/', pageRouter);

router.use('/api/users', usersRouter);

router.use('/api/secretAngel', secretAngelRouter);



module.exports = router;
