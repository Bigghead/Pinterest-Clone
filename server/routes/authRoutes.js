const express = require('express');
const Router  = express.Router();
const User    = require('../models/User.js');
const passport = require('passport');

// =========AUTH0 LOGIN=======
Router.get('/auth',
  passport.authenticate('auth0'), function(req, res){
    console.log('Testing Auth, 1');
  });

Router.get('/auth/callback',
  passport.authenticate('auth0'), function (req, res) {
    reqUser = req.user;
    //req.session.save(function(err){
      res.redirect('/');
    //});
});

Router.get('/logout', ((req, res) =>{
  req.logout();
  res.redirect('/');
}));

module.exports = Router;