require("dotenv").config();
const { Router } = require("express");
const auth = Router();
const { refreshToken } = require("../utils/auth-utils");

auth.post("/refresh", refreshToken);
// auth.use('*', sendNotFound);

module.exports = auth;
