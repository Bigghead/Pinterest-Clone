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
  User.findOne({_id: jwt_payload.id}, function(err, user){
    //next(user) will be req.user
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
});

// User.create({
//   username : 'Dodo',
//   password: 'hello'
// }, (err, savedUser) => {
//   if(err) console.log(err);
//   console.log(savedUser);
// });
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
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.post("/login", function(req, res) {
  if(req.body.username && req.body.password){
    var name = req.body.username;
    var password = req.body.password;
  }
  // usually this would be a database call:
  User.findOne({username : name}, (err, user) => {
    if( ! user ){
      res.status(401).json({message:"no such user found"});
    }
      else {
        if(user.password === req.body.password) {
          // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
          var payload = {id: user._id};
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({message: "ok", token: token, user: user});
        } else {
          res.status(401).json({message:"passwords did not match"});
        }
      }
  });
});



app.get('/images', (req, res) => {
  const images = [];
  return new Promise((resolve, reject) => {
    axios.get('https://www.instagram.com/daquan/media/').then((res) => {
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

app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  console.log(req.user);
  res.json("Success! You can not see this without a token");
});


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname , '../index.html'));
});

app.listen(8000, () => console.log('Pinterest Starting!'));
