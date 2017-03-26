const mongoose = require('mongoose');


const imageSchema = new mongoose.Schema({
  link: String,
  addedBy: String,
  likedBy: Array,
  created: { type: Date, default: Date.now }
});

const Images = mongoose.model('Image', imageSchema);

module.exports =  Images;
