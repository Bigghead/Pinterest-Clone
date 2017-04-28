const express    = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose   = require('mongoose');
const path       = require('path');
//const Keys       = require('../apiKeys');
const axios      = require('axios');
const jwt        = require('jsonwebtoken');
const passport   = require("passport");
const Auth0Strategy       = require('passport-auth0');
const session             = require('express-session');
const MongoStore = require('connect-mongo')(session);
const serveStatic = require('serve-static');


const app = express();
var reqUser;

mongoose.Promise = global.Promise;

//mongoose connect
mongoose.connect(`mongodb://${process.env.mlabUser}:${process.env.mlabPass}@ds113670.mlab.com:13670/pinterest`);

//Model Requires
const User = require('./models/User.js');
const Images = require('./models/Images.js');


//ROUTE Requires
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes.js');
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

app.use(serveStatic(path.join(__dirname, '../dist')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(allowCrossDomain);



passport.serializeUser(function(user, done) {
  done(null, user) }
);
passport.deserializeUser(function(user, done) { done(null, user) });


//=========AUTH0 STRATEGY=========
const auth0Strategy = new Auth0Strategy({
    domain:       process.env.authDomain,
    clientID:     process.env.auth0Client,
    clientSecret: process.env.auth0Secret,
    callbackURL:  process.env.authCallback
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    // console.log(profile);
    User.findOne({username: profile.nickname}, function(err, foundUser){
      if(err){
        return done(err);
      } else if(foundUser === null){
        User.create({
          username: profile.nickname
        }, function(err, madeUser){
          if(err){
            console.log(err);
          } else {
            return done(err, madeUser);
          }
        });
      } else {
        return done(err, foundUser);
      }
    });
  });

passport.use(auth0Strategy);


//USE ROUTES
app.use(userRoutes);
app.use(authRoutes);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(process.env.port, () => console.log('Pinterest Starting!'));
