const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    productNum: Number,
    image: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    repleNum: {
      type: Number,
      default: 0,
    },
  },
  { collection: 'products', timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
