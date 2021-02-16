const express = require('express');
const bodyParser = require('body-parser');
const User = require('../schema/User');
const passport = require('passport');
const authenticate = require('../authenticate');
const router = express.Router();

router.use(bodyParser.json());

router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.firstName)
        user.firstName = req.body.firstName;
      if (req.body.lastName)
        user.lastName = req.body.lastName;
      if (req.body.email)
        user.email = req.body.email;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({isSuccess: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({isSuccess: true, token: token, status: 'You are successfully logged in!'});
});

router.post('/verifyToken', authenticate.verifyUser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({isSuccess: true, user: {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
  }});
});

module.exports = router;
