require('dotenv').config();
const { Router } = require('express');
const auth = Router();
const { validateRefreshToken } = require('../utils/auth-utils');

auth.post('/refresh', validateRefreshToken);

module.exports = auth;