const express = require('express');
const router = express.Router();
const multer = require('multer');

const { Product } = require('../model/Product.js');
const { Counter } = require('../model/Counter.js');
const { User } = require('../model/User.js');

const setUpload = require('../util/upload.js');

router.post('/submit', (req, res) => {
  let temp = req.body;
  Counter.findOne({ name: 'counter' })
    .exec()
    .then((counter) => {
      temp.productNum = counter.productNum;
      User.findOne({ uid: req.body.uid })
        .exec()
        .then((userInfo) => {
          temp.author = userInfo._id;
          const product = new Product(temp);
          product.save().then(() => {
            Counter.updateOne(
              { name: 'counter' },
              { $inc: { productNum: 1 } }
            ).then(() => {
              res.status(200).json({ success: true });
            });
          });
        })
        .catch((err) => res.status(400).json({ success: false }));
    });
});

router.post('/list', (req, res) => {
  Product.find()
    .populate('author')
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, productList: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post('/detail', (req, res) => {
  Product.findOne({ productNum: Number(req.body.productNum) })
    .populate('author')
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json({ success: true, product: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post('/edit', (req, res) => {
  const temp = {
    title: req.body.title,
    content: req.body.content,
  };
  Product.updateOne(
    { productNum: Number(req.body.productNum) },
    {
      $set: temp,
    }
  )
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post('/delete', (req, res) => {
  Product.deleteOne({ productNum: Number(req.body.productNum) })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post(
  '/image/upload',
  setUpload('mycom-market/product'),
  (req, res, next) => {
    res.status(200).json({ success: true, filePath: res.req.file.location });
  }
);

module.exports = router;
