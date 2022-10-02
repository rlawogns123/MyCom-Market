import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../../components/product/ImageUpload';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Upload() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.isLoading && !user.accessToken) {
      alert('로그인한 회원만 글을 작성할 수 있습니다.');
      navigate('/login');
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === '' || content === '') {
      return alert('모든 항목을 채워주세요!');
    }

    let body = {
      title: title,
      content: content,
      image: image,
      uid: user.uid,
    };

    axios
      .post('/api/product/submit', body)
      .then((res) => {
        if (res.data.success) {
          alert('글 작성이 완료되었습니다.');
          navigate('/');
        } else {
          alert('글 작성에 실패하였습니다');
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
        </ButtonDiv>
      </Form.Group>
    </UploadContainer>
  );
}

export default Upload;

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
