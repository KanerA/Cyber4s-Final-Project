const { Router } = require("express");
const stands = Router();

const { createNewStand, getAllStands, deleteStand, standLogin } = require("../utils/stands-utils");

stands.get("/:uid", getAllStands);
stands.post("/create", createNewStand);
stands.delete('/remove', deleteStand);
stands.post('/login', standLogin);

module.exports = stands;