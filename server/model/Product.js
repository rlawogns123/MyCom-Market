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
  },
  { collection: 'products' }
);

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
