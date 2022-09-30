const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    productNum: Number,
    image: String,
  },
  { collection: 'products' }
);

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
