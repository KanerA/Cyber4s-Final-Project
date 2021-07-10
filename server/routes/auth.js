require("dotenv").config();
const { Router } = require("express");
const auth = Router();
const { refreshingAccessToken, refreshToken } = require("../utils/auth-utils");

auth.post("/refresh", refreshToken);

module.exports = auth;
