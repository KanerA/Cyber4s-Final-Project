const { Router } = require("express");
const { validateToken, validatePassword } = require("../middlewares");
const stands = Router();
const {
  createNewStand,
  getAllStands,
  deleteStand,
  standLogin,
} = require("../utils/stands-utils");

stands.get("/:uid", getAllStands);
stands.post("/create", validatePassword, createNewStand);
stands.delete("/remove", validateToken, validatePassword, deleteStand);
stands.post("/login", validatePassword, standLogin);

module.exports = stands;
