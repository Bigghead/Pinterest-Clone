const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

const app = express();


app.get('*', (req, res) => {
  //res.render('index');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8000, () => console.log('Pinterest Starting!'));
