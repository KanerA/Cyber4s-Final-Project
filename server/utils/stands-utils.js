const { Stands } = require("../models");
const jwt = require('jsonwebtoken');
const { hashSync, compare } = require('bcrypt');
const randomString = require('randomString');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const createNewStand = async (req, res) => {
  if(req.stand !== undefined) return res.json({ message: 'Restaurant already registered!' });
  const password = req.body.password;
    if(password.length < 6) return res.json({ message: 'Password is too short, please choose another' }); // validating length of password
    const hashedPW = hashSync(password, 10); // hashing the password for DB
  const user_name = randomString.generate(6); // creating the restaurant's user name
  const stand = await Stands.create({
    user_name,
    name: req.body.restaurant_name,
    password: hashedPW,
  });

  const payload = {
    name: stand.name,
    password: stand.password,
    user_name: stand.user_name,
}
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET);
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
  const id = stand.id;
  res.status(201).json({ accessToken, refreshToken, id, user_name });
};

const getAllStands = async (req, res) => { // only with JWT authentication
  const stands = await Stands.findAll({});
  res.json(stands);
};

const standLogin = async (req, res) => {
  const stand = req.stand;
  const payload = {
    name: stand.name,
    password: stand.password,
    user_name: stand.user_name,
  }
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET);
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: '10m'
  });
  const { id, user_name } = stand;
  res.status(201).json({ accessToken, refreshToken, id, user_name });
};

const deleteStand = async (req, res) => { // only with JWT authentication
  const stand = req.stand;
  Stands.destroy({
    where: {
      user_name: stand.user_name,
    },
  })
    .then((_) => {
      if(_ === 1) return res.json({ message: "Stand deleted successfully" });
      res.sendStatus(500);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json(err.message);
    });
};

module.exports = { createNewStand, getAllStands, deleteStand, standLogin };
