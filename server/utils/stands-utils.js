const { Stands } = require("../models");

const createNewStand = async (req, res) => {
  const { body } = req;
  Stands.create(body).then(() => res.send("new stand created!"));
};

const getAllStands = async (req, res) => {
  const { uid } = req.params;
  const allStands = await Stands.findAll({
    where: { owner: uid },
  }).then((res) => res.map((stand) => stand.toJSON()));
  res.send(allStands);
};

module.exports = { createNewStand, getAllStands };
