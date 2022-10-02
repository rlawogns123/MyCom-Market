import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ImageUpload from '../components/ImageUpload';
import styled from 'styled-components';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Edit() {
  const params = useParams();
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({});
  const [flag, setFlag] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

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

  useEffect(() => {
    setTitle(productInfo.title);
    setContent(productInfo.content);
    setImage(productInfo.image);
  }, [productInfo]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (title === '' || content === '') {
      return alert('모든 항목을 채워주세요!');
    }

    let body = {
      title: title,
      content: content,
      image: image,
      productNum: params.productNum,
    };

    axios
      .post('/api/product/edit', body)
      .then((res) => {
        if (res.data.success) {
          alert('글 수정이 완료되었습니다.');
          navigate(`/product/${params.productNum}`);
        } else {
          alert('글 수정에 실패하였습니다');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UploadContainer>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>제목</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <ImageUpload setImage={setImage} />
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{ marginTop: '20px' }}>내용</Form.Label>
        <Form.Control
          as="textarea"
          rows={14}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <ButtonDiv>
          <Button
            variant="outline-dark"
            type="submit"
            onClick={(e) => onSubmit(e)}
          >
            등록
          </Button>
          <Button
            variant="outline-dark"
            style={{ marginLeft: '15px' }}
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            취소
          </Button>
        </ButtonDiv>
      </Form.Group>
    </UploadContainer>
  );
}

export default Edit;

const UploadContainer = styled.div`
  margin: 30px auto;
  width: 60%;
  @media (max-width: 756px) {
    width: 70%;
  }
`;

const ButtonDiv = styled.div`
  margin-top: 15px;
  text-align: right;
`;
