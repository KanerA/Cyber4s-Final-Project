const { Router } = require("express");
const stands = Router();

const { createNewStand, getAllStands } = require("../utils/stands-utils");

stands.get("/:uid", getAllStands);
stands.post("/", createNewStand);

module.exports = stands;
