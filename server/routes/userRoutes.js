const express = require('express');
const Router = express.Router();
const User = require('../models/User.js');
const Images = require('../models/Images.js');

Router.get('/verifyUser', ((req, res) => {
  console.log('Hitting verify route: ' + req.user);
  res.send(req.user);
}));


Router.get('/images', (req, res) => {

  Images.find({}).sort('-created').exec(function (err, allImages) {
    if (err) console.log(err);
    res.send(allImages);
  });
});

Router.post('/images/new', ((req, res) => {

  User.findById(req.user._id)
    .then((foundUser) => {
      Images.create({
        link: req.body.link,
        addedBy: req.user.username,
        addedById: req.user._id
      })
        .then((newImage) => {
          foundUser.images.push(newImage);
          foundUser.save();
          res.send(newImage);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500);
    });

}));

Router.post('/images/delete', ((req, res) => {
  console.log(req.body.imageId);
  Images.findByIdAndRemove(req.body.imageId,
    function (err, image) {
      if (err) console.log(err);
      User.findById(req.user._id, (err, foundUser) => {
        if (err) console.log(err);
        foundUser.images.splice(foundUser.images.indexOf(image), 1);
        res.status(201).send('success');

      });
    });
}));

Router.post('/images/:id/update', (req, res) => {
  Images.findByIdAndUpdate(req.params.id, { new: true }, (err, image) => {
    if (err) console.log(err);
    if (image.likedBy.indexOf(req.user._id) === -1) {
      image.likedBy.push(req.user._id);
      image.markModified('likedBy');
    } else {
      image.likedBy.splice(image.likedBy.indexOf(req.user._id), 1);
      image.markModified('likedBy');
    }
    image.save().then(() => {
      res.status(200).send('Success');
    });
  });
});

Router.get('/images/:userId', ((req, res) => {
  User.findById(req.params.userId).populate('images').exec((err, foundUser) => {
    if (err) res.status(400).send('No User Found');
    res.send(foundUser.images);
  });
}));


module.exports = Router;
