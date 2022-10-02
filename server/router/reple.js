const express = require('express');
const router = express.Router();

const { Product } = require('../model/Product.js');
const { Reple } = require('../model/Reple.js');
const { User } = require('../model/User.js');

router.post('/submit', (req, res) => {
  let temp = {
    reple: req.body.reple,
    productId: req.body.productId,
  };
  User.findOne({ uid: req.body.uid })
    .exec()
    .then((userInfo) => {
      temp.author = userInfo._id;
      const newReple = new Reple(temp);
      newReple.save(() => {
        Product.findOneAndUpdate(
          {
            _id: req.body.productId,
          },
          { $inc: { repleNum: 1 } }
        )
          .exec()
          .then(() => {
            return res.status(200).json({ success: true });
          });
      });
    })
    .catch((err) => {
      return res.status(400).json({ success: false });
    });
});

router.post('/getreple', (req, res) => {
  Reple.find({ productId: req.body.productId })
    .populate('author')
    .exec()
    .then((repleInfo) => {
      return res.status(200).json({ success: true, repleList: repleInfo });
    })
    .catch((err) => {
      return res.status(400).json({ success: false });
    });
});

router.post('/edit', (req, res) => {
  let temp = {
    productId: req.body.productId,
    reple: req.body.reple,
    uid: req.body.uid,
  };
  Reple.findOneAndUpdate({ _id: req.body.repleId }, { $set: temp })
    .exec()
    .then(() => {
      return res.status(200).json({ success: true });
    })
    .catch((err) => {
      return res.status(400).json({ success: false });
    });
});

router.post('/delete', (req, res) => {
  Reple.deleteOne({ _id: req.body.repleId })
    .exec()
    .then(() => {
      Product.findOneAndUpdate(
        { _id: req.body.productId },
        { $inc: { repleNum: -1 } }
      )
        .exec()
        .then(() => {
          return res.status(200).json({ success: true });
        });
    })
    .catch((err) => {
      return res.status(400).json({ success: false });
    });
});

module.exports = router;
