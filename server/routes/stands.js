const { Router } = require("express");
const stands = Router();

const { createNewStand, getAllStands, deleteStand } = require("../utils/stands-utils");

stands.get("/:uid", getAllStands);
stands.post("/", createNewStand);
stands.delete('/remove', deleteStand)

module.exports = stands;
