require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Stands } = require('../models');
const { compare } = require('bcrypt');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const validateToken = (req, res, next) => {
    const bearerToken = req.headers['authorization']; // get the token from the request
    // console.log(bearerToken);
    if(!bearerToken) return res.sendStatus(403);
    req.token = bearerToken.slice(7); // trim the 'bearer' from token
    return jwt.verify(req.token, ACCESS_TOKEN_SECRET, (err, decoded) => { // verify the token with the SECRET
        if(err){
            if(err.message === 'jwt expired') {
                return res.status(401).json({ expired: true })
            }
            return res.status(403).json({ message: 'Invalid Access Token' });
        }
        req.user = decoded;
        next();
    });
};

const validatePassword = async (req, res, next) => {
    const path = req.route.path;
    // the password given in the request
    const PW = 
        path === '/create' || path === '/login' ? req.body.password : req.query.p;
    // the value we want to compare
    const checkFieldValue = 
        path === '/create' || path === '/login' ? req.body.user_name : req.query.u;

    const stand = await Stands.findOne({
        where: {
          user_name: checkFieldValue,
        }
      });
      req.stand = stand;
      if(path === '/create' && !stand) return next(); // for creating a new stand - the stand will be undefined
      if(!stand) return res.status(201).json({message: 'Restaurant doesn\'t exist, please sign up'}); // check if the stand exists
      const isPWCorrect = await compare(PW, stand.password);
      if(!isPWCorrect) return res.sendStatus(403); // check if the password matches
      next();
};

module.exports = { validateToken, validatePassword };