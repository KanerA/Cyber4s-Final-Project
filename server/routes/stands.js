const { Router } = require("express");
const stands = Router();

const { createNewStand } = require("../utils/stands-utils");

stands.post("/", createNewStand);

module.exports = stands;
