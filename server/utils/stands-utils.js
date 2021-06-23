const { Stands } = require("../models");

const createNewStand = async (req, res) => {
  const { body } = req;
  Stands.create(body).then(() => res.send("new stand created!"));
};

const getAllStands = async (req, res) => {
  const { uid } = req.params;
  Stands.findAll({
    where: { owner: uid },
  }).then((result) => {
    const allStands = result.map((stand) => stand.toJSON());
    res.json(allStands);
  });
};

const deleteStand = async (req, res) => {
  const { o, n } = req.query;
  console.log(o, n);
  Stands.destroy({
    where: {
      owner: o,
      name: n,
    },
  })
    .then((_) => {
      Stands.findAll({
        where: { owner: o },
      }).then((result) => {
        const allStands = result.map((stand) => stand.toJSON());
        res.json(allStands);
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json(err.message);
    });
};

module.exports = { createNewStand, getAllStands, deleteStand };
