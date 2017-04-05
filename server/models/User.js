const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image'
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
