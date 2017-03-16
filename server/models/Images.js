const mongoose = require('mongoose');


const imageSchema = new mongoose.Schema({
  link: String,
  addedBy: String,
  likedBy: Array
});

const Images = mongoose.model('Image', imageSchema);

module.exports =  Images;
