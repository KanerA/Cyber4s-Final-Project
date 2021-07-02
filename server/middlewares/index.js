const { Stands } = require('../models');
const { compare } = require('bcrypt');

const validatePassword = async (req, res, next) => {
    const path = req.route.path;
    // the password given in the request
    const PW = 
        path === '/create' || path === '/login' ? req.body.password : req.query.p;
    // the value we want to compare
    const checkFieldValue = 
        path === '/create' ? req.body.restaurant_name
        : path === '/login' ? req.body.user_name
        : req.query.u;
    // the MySQL attribute
    const checkField =  
        path === '/create' ? 'name' : 'user_name';
    const stand = await Stands.findOne({
        where: {
          [checkField]: checkFieldValue,
        }
      });
      if(path === '/create' && !stand) return next(); // for creating a new stand - the stand will be undefined
      if(!stand) return res.status(201).json({message: 'Restaurant doesn\'t exist, please sign up'}); // check if the stand exists
      const isPWCorrect = await compare(PW, stand.password);
      if(!isPWCorrect) return res.sendStatus(403); // check if the password matches
      req.stand = stand;
      next();
};

module.exports = { validatePassword };