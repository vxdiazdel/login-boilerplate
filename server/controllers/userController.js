const { User } = require('../models');

exports.get = (req, res) => {
  User.find({}).then(users => {
    res.json({users})
  }).catch(error => res.json({error}));
};

exports.getProfile = (req, res) => {
  res.json(req.user);
};

exports.signup = (req, res) => {
  const { email, password } = req.body;
  const user = new User({
    email,
    password
  });

  user.save().then(user => {
    return user.generateAuthToken()
  })
  .then(token => {
    res.header('x-auth', token).json({user})
  })
  .catch(error => res.json({error}));
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByCredentials(email, password)
  .then(user => {
    return user.generateAuthToken().then(token => {
      res.header('x-auth', token).json({user})
    })
  })
  .catch(error => res.status(400).json({error}));
};

exports.logout = (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  })
  .catch(error => res.status(400).json({error}));
};

exports.setup = (req, res) => {
  const user = new User({
    email: `user-${Date.now()}@gmail.com`,
    password: 'password'
  });

  user.save().then(user => {
    return user.generateAuthToken()
  })
  .then(token => {
    res.header('x-auth', token).json({user})
  })
  .catch(e => res.json(e));
};
