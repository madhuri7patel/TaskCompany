const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).send('Server error');
    const newUser = { name, email, password: hash };
    User.create(newUser, (err, result) => {
      if (err) return res.status(400).send('Error creating user');
      res.status(201).send('User registered');
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, (err, results) => {
    if (err || results.length === 0) return res.status(400).send('User not found');
    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) return res.status(400).send('Invalid credentials');
      const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true }).send('Logged in');
    });
  });
};


const verifyToken = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send('No token provided');
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) return res.status(401).send('Token is not valid');
    User.findById(decoded.id, (err, results) => {
      if (err || results.length === 0) return res.status(404).send('User not found');
      res.json(results[0]);
    });
  });
};

module.exports = { register, login, verifyToken };
