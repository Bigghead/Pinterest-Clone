const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const path       = require('path');
const Keys       = require('../apiKeys.js');
const axios      = require('axios');
const jwt        = require('jsonwebtoken');
const passport   = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt  = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const app = express();

mongoose.Promise = global.Promise;

//mongoose connect
mongoose.connect(`mongodb://${Keys.mlabUser}:${Keys.mlabPass}@ds113670.mlab.com:13670/pinterest`);

//Model Requires
const User = require('./models/user.js');

//Passport config
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  User.findOne({id: jwt_payload.id}, function(err, user){
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });  
});

passport.use(strategy);

var allowCrossDomain = function(req, res, next) {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // intercept OPTIONS method
if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
};

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/login', (req, res) => {
  console.log(req.body);
  res.send('Success');
});

app.get('/images', (req, res) => {
  const images = [];
  return new Promise((resolve, reject) => {
    axios.get('https://www.instagram.com/kingjames/media/').then((res) => {
      const images = [];

      for (let post of res.data.items) {
                images.push(post.images.standard_resolution.url);
              }
        resolve(images);
      });
  }).then((images) => {
    console.log(images);
    res.send(images);
  });
});


// app.get('*', (req, res) => {
//   //res.render('index');
//   res.sendFile(path.join(__dirname , '../index.html'));
// });

app.listen(8000, () => console.log('Pinterest Starting!'));
