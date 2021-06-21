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
  res.json(allStands);
};

const deleteStand = async (req, res) => {
  const { o, n } = req.query;
  Stands.destroy({
    where: {
      owner: o,
      name: n,
    },
  })
    .then((_) => {
      console.log(_);
      res.json({ message: "Stand deleted successfully" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json(err.message);
    });
};

module.exports = { createNewStand, getAllStands, deleteStand };
