const { Stands } = require("../models");
const jwt = require("jsonwebtoken");
const { hashSync, compare } = require("bcrypt");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const createNewStand = async (req, res) => {
  const {
    body: { owner, restaurant_name, password },
  } = req;
  const hashedPW = hashSync(password, 10);
  const stand = await Stands.create({
    owner,
    name: restaurant_name,
    password: hashedPW,
  });
  const payload = {
    name: stand.name,
    password: stand.password,
  };
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET);
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
  const id = stand.id;
  res.status(201).json({ accessToken, refreshToken, id });
};

const getAllStands = (req, res) => {
  const {
    body: { restaurant_name, password },
  } = req;
  Stands.findAll({
    // where: { owner: uid },
  }).then((result) => {
    const allStands = result.map((stand) => stand.toJSON());
    res.json(allStands);
  });
};

const deleteStand = (req, res) => {
  const { o, n } = req.query;
  Stands.destroy({
    where: {
      owner: o,
      name: n,
    },
  })
    .then((_) => {
      res.json({ message: "Stand deleted successfully" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json(err.message);
    });
};

module.exports = { createNewStand, getAllStands, deleteStand };
