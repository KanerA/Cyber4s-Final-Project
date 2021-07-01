const { Stands } = require("../models");
const jwt = require('jsonwebtoken');
const { hashSync, compare } = require('bcrypt');
const randomString = require('randomString');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const createNewStand = async (req, res) => {
  const { body: { restaurant_name, password} } = req;
  const isExist = await Stands.findOne({ // checking if the restaurant's name already registered in the DB
    where: {
      name: restaurant_name
    }
  })
  if(isExist) return res.json({ message: 'Restaurant name is already registered'});
  if(password.length < 6) return res.json({ message: 'Password is too short, please choose another'}); // validating length of password
  const hashedPW = hashSync(password, 10); // hashing the password for DB
  const user_name = randomString.generate(6); // creating the restaurant's user name
  const stand = await Stands.create({
    user_name,
    name: restaurant_name,
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

const standLogin = async (req, res) => {
  const { body: { restaurant_name, password }} = req;
  const stand = await Stands.findOne({
    where: {
      name: restaurant_name,
    }
  });
  if(!stand) return res.status(201).json({message: 'Restaurant doesn\'t exist, please sign up'}); // check if the stand exists
  const isPWCorrect = await compare(password, stand.password);
  if(!isPWCorrect) return res.sendStatus(403); // check if the password matches
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

const deleteStand = async (req, res) => {
  const { p, u } = req.query; // requires the password and the restaurant's user name from client to delete
  const stand = await Stands.findOne({
    where: {
      user_name: u,
    }
  })
  if(!stand) return res.status(201).json({message: 'Restaurant doesn\'t exist, please sign up'}); // check if the stand exists
  const isPWCorrect = await compare(p, stand.password);
  if(!isPWCorrect) return res.sendStatus(403); // check if the password matches
  Stands.destroy({
    where: {
      user_name: u,
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
