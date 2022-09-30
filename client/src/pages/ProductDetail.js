import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Spinner from 'react-bootstrap/Spinner';

function ProductDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({});
  const [flag, setFlag] = useState(false);
  const user = useSelector((state) => state.user);

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

  const deleteHandler = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      const body = {
        productNum: params.productNum,
      };
      axios
        .post('/api/product/delete', body)
        .then((res) => {
          if (res.data.success) {
            alert('게시글이 삭제되었습니다.');
            navigate('/');
          }
        })
        .catch((err) => alert('게시글 삭제가 실패하였습니다.'));
    }
  };

  return (
    <div>
      {flag ? (
        <>
          <div>
            {' '}
            <h1>{productInfo.title}</h1>
            <h2>{productInfo.author.displayName}</h2>
            {productInfo.image ? (
              <img
                src={productInfo.image}
                alt=""
                style={{ width: '100%', height: 'auto' }}
              />
            ) : null}
            <p>{productInfo.content}</p>
          </div>

          {user.uid === productInfo.author.uid && (
            <div>
              <Link to={`/edit/${productInfo.productNum}`}>
                <button>수정</button>
              </Link>
              <button
                onClick={() => {
                  deleteHandler();
                }}
              >
                삭제
              </button>
            </div>
          )}
        </>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
}

export default ProductDetail;
