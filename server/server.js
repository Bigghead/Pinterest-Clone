const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const path       = require('path');
const keys       = require('./apiKeys.js');

const app = express();

//mongoose connect
mongoose.connect(`mongodb://${Keys.mlabUser}:${Keys.mlabPass}@ds113670.mlab.com:13670/pinterest`);

//Model Requires
const User = require('./models/user.js');

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

app.get('/test', (req, res) => {
  res.send('hello');
});


// app.get('*', (req, res) => {
//   //res.render('index');
//   res.sendFile(path.join(__dirname , '../index.html'));
// });

app.listen(8000, () => console.log('Pinterest Starting!'));
