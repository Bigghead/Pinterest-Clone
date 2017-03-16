const express = require('express');
const Router  = express.Router();

Router.get('/verifyUser', ((req, res) => {
  console.log(req.session);
  res.send(req.user);
}));


module.exports = Router;
