const { Router } = require("express");
const { validateToken, validatePassword } = require("../middlewares");
const stands = Router();
const { 
    createNewStand,
    deleteStand,
    standLogin,
} = require("../utils/stands-utils");

stands.post("/create", validatePassword, createNewStand);
stands.delete("/remove", validateToken, validatePassword, deleteStand);
stands.post("/login", validatePassword, standLogin);

module.exports = stands;
