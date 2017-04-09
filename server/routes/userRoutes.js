const express = require('express');
const Router  = express.Router();
const User    = require('../models/User.js');

Router.get('/verifyUser', ((req, res) => {
  console.log('Hitting verify route: ' + req.user);
  res.send(req.user);
}));

Router.get('/images/:userID', ((req, res) => {
  User.findById(req.params.userID).populate('images').exec((err, foundUser) =>{
    res.json(foundUser.images);
  });
}))


module.exports = Router;
