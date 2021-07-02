const { Router } = require("express");
const { validatePassword } = require("../middlewares");
const stands = Router();

const { createNewStand, getAllStands, deleteStand, standLogin } = require("../utils/stands-utils");

stands.get("/:uid", getAllStands);
stands.post("/create", validatePassword, createNewStand);
stands.delete('/remove', validatePassword, deleteStand);
stands.post('/login', validatePassword, standLogin);

module.exports = stands;