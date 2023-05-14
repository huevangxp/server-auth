const express = require('express');
const router = express.Router();

const userRoute = require('./user.routes');
const optRoute = require('./opt.routes');

userRoute(router);
optRoute(router);

module.exports = router;