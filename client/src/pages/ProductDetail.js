import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Avatar from 'react-avatar';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProductDetail({ productInfo }) {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

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
    <ProductContainer>
      <Card>
        <Card.Title style={{ marginLeft: '10px' }}>
          <h1>{productInfo.title}</h1>
          <h2 style={{ marginTop: '20px' }}>
            <Avatar
              size="40"
              round={true}
              src={productInfo.author.photoURL}
              style={{ marginRight: '10px' }}
            />
            {productInfo.author.displayName}
          </h2>
        </Card.Title>
        {productInfo.image ? (
          <Card.Img
            variant="top"
            src={productInfo.image}
            alt=""
            style={{ width: '100%', height: 'auto' }}
          />
        ) : null}
        <Card.Body>
          <Card.Text>{productInfo.content}</Card.Text>
        </Card.Body>
        {user.uid === productInfo.author.uid && (
          <ButtonDiv>
            <Link to={`/edit/${productInfo.productNum}`}>
              <Button variant="outline-dark">수정</Button>
            </Link>
            <Button
              variant="outline-dark"
              style={{ marginLeft: '15px' }}
              onClick={() => {
                deleteHandler();
              }}
            >
              삭제
            </Button>
          </ButtonDiv>
        )}
      </Card>
    </ProductContainer>
  );
}

export default ProductDetail;

const ProductContainer = styled.div`
  margin: 40px auto;
  width: 40%;
  @media (max-width: 756px) {
    width: 70%;
  }
`;

const ButtonDiv = styled.div`
  /* margin-top: 15px; */
  margin: 15px;
  text-align: right;
`;
