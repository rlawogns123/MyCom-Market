import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import Reple from '../components/reple/Reple';
import axios from 'axios';

import Spinner from 'react-bootstrap/Spinner';

function Product() {
  const params = useParams();
  const [productInfo, setProductInfo] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const body = {
      productNum: params.productNum,
    };
    axios
      .post('/api/product/detail', body)
      .then((res) => {
        if (res.data.success) {
          setProductInfo(res.data.product);
          setFlag(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {flag ? (
        <>
          <ProductDetail productInfo={productInfo} />
          <Reple productId={productInfo._id} />
        </>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
}

export default Product;
