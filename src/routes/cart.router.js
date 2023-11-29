const { getAll, create, getOne, remove, update } = require('../controllers/cart.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const cartRoruter = express.Router();

cartRoruter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

cartRoruter.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = cartRoruter;