const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema(
  {
    name: String,
    productNum: Number,
    userNum: Number,
  },
  { collection: 'counter' }
);

const Counter = mongoose.model('Counter', counterSchema);

module.exports = { Counter };
