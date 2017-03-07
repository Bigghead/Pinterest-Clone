const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const path       = require('path');
const Keys       = require('../apiKeys');
const axios      = require('axios');
const jwt        = require('jsonwebtoken');
const passport   = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt  = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const Auth0Strategy       = require('passport-auth0');
const TwitterStrategy     = require('passport-twitter');

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


//=========JWT STRATEGY=========
var jwtStrategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
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

//=========TWITTER STRATEGY=====
const twitterStrategy = new TwitterStrategy({
    consumerKey: Keys.twitterKey,
    consumerSecret: Keys.twitterSecret,
    callbackURL: "http://localhost:8000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    User.findOne({username: profile.nickname}, function(err, foundUser){
      if(err){
        console.log('noob');
      } else if(foundUser === null){
        User.create({
          username: profile.nickname
        }, function(err, madeUser){
          if(err){
            console.log(err);
          } else {
            return done(null, madeUser);
          }
        });
      } else {
        return done(null, foundUser);
      }
    });
  }
});

//=========AUTH0 STRATEGY=========
const auth0Strategy = new Auth0Strategy({
    domain:       Keys.authDomain,
    clientID:     Keys.auth0Client,
    clientSecret: Keys.auth0Secret,
    callbackURL:  Keys.authCallback
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    // console.log(profile);
    User.findOne({username: profile.nickname}, function(err, foundUser){
      if(err){
        console.log('noob');
      } else if(foundUser === null){
        User.create({
          username: profile.nickname
        }, function(err, madeUser){
          if(err){
            console.log(err);
          } else {
            return done(null, madeUser);
          }
        });
      } else {
        return done(null, foundUser);
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
passport.use(auth0Strategy);
passport.use(jwtStrategy);
passport.use(twitterStrategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


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

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(allowCrossDomain);



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

// =========AUTH0 LOGIN=======
app.get('/auth',
  passport.authenticate('auth0'), function (req, res) {
    console.log(req.user);
  res.send(jwt.sign({id: req.user._id}, jwtOptions.secretOrKey));
});

app.get('/auth/callback',
  passport.authenticate('auth0'), function (req, res) {
    console.log(req);
  res.json("/successful");
});

app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/images', (req, res) => {
  const images = [];
  return new Promise((resolve, reject) => {
    axios.get('https://www.instagram.com/daquan/media/').then((res) => {

      for (let post of res.data.items) {
                images.push(post.images.standard_resolution.url);
              }
        resolve(images);
      });
  }).then((images) => {
    res.send(images);
  });
});

app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  console.log(req.user);
  res.json("Success! You can not see this without a token");
});


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname , '../index.html'));
// });

app.listen(8000, () => console.log('Pinterest Starting!'));
