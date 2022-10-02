const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 4000;
const config = require('./config/key.js');

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/product', require('./router/product.js'));
app.use('/api/user', require('./router/user.js'));
app.use('/api/reple', require('./router/reple.js'));
app.use('/image', express.static('./image'));

app.listen(port, () => {
  mongoose
    .connect(config.mongoURI)
    .then(() => {
      console.log(`Example app listening on port ${port}`);
      console.log('Connecting MongoDB...');
    })
    .catch((err) => {
      console.log(`${err}`);
    });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
