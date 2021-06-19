const { Orders } = require('../models');

const getOrderHistory = async (req, res) => {
    console.log('dickFace');
    const limit = +req.query.h; // turn to Number
    const orderHistory = await Orders.findAll({
        limit,
    })
    res.json(orderHistory);
};

module.exports = {getOrderHistory};