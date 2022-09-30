const express = require('express');
const router = express.Router();

const { User } = require('../model/User.js');
// const { Counter } = require('../Model/Counter.js');

router.post('/signup', (req, res) => {
  console.log(req.body);
});

module.exports = router;
