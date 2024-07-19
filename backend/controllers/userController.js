const User = require('../models/User');

const getProfile = (req, res) => {
  const userId = req.user.id;
  User.findById(userId, (err, results) => {
    if (err || results.length === 0) return res.status(404).send('User not found');
    res.json(results[0]);
  });
};

const updateProfile = (req, res) => {
  const userId = req.user.id;
  const { name, email } = req.body;
  const updatedData = { name, email };
  User.update(userId, updatedData, (err, result) => {
    if (err) return res.status(400).send('Error updating profile');
    res.send('Profile updated');
  });
};

module.exports = { getProfile, updateProfile };
