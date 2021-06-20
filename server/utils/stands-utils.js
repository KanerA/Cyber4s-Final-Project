const { Stands } = require("../models");

const createNewStand = async (req, res) => {
  const { body } = req;
  Stands.create(body).then(() => res.send("new stand created!"));
};

module.exports = { createNewStand };
