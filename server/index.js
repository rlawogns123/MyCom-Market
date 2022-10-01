const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 4000;
const config = require('./config/key.js');

// mongodb+srv://rlawogns:950326@mycommarket.18rbvi2.mongodb.net/?retryWrites=true&w=majority

app.use(express.static(path.join(__dirname, '../client/build'))); // static파일 경로ㅍ
// 클라이언트로 부터 받은 http 요청 메세지 형식에서 body 데이터를 해석
app.use(express.json()); // JSON 형태의 데이터를 해석
app.use(express.urlencoded({ extended: true })); // x-www.form-urlencoded 형태의 데이터를 해석
app.use('/api/product', require('./router/product.js'));
app.use('/api/user', require('./router/user.js'));
app.use('/api/reple', require('./router/reple.js'));
app.use('/image', express.static('./image'));

// const { Product } = require('./model/Product.js');
// const { Counter } = require('./model/Counter.js');

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
