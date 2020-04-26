const User = require('../Models/users')
const passport = require('passport')
require('../../Config/passport-config')
const bcrypt = require('bcrypt')

function postRegister(req, res){
    const { username, password, passwordConf, email } = req.body;
  let errors = [];

  if (!username || !password || !passwordConf || !email) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != passwordConf) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      username,
      email,
      password,
      passwordConf
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          username,
          email,
          password,
          passwordConf
        });
      } else {
        const newUser = new User({
          username,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/store');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
};

function getRegister(req, res){
    res.render('register', {data:{}})
};
function getLogin (req, res) {
    res.render('login', {data:{}})
};

module.exports = {
    getLogin:getLogin,
    getRegister:getRegister,
    postRegister:postRegister
};