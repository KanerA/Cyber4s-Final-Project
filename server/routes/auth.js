require('dotenv').config();
const { Router } = require('express');
const auth = Router();
const { refreshingAccessToken } = require('../utils/auth-utils');

auth.post('/refresh', refreshingAccessToken);

module.exports = auth;