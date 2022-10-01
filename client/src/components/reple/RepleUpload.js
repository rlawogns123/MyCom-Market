import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function RepleUpload({ productId }) {
  const [reple, setReple] = useState('');
  const user = useSelector((state) => state.user);

  const repleUploadFunc = (e) => {
    e.preventDefault();

    if (!reple) {
      return alert('댓글을 작성해주세요');
    }

    let body = {
      reple: reple,
      uid: user.uid,
      productId: productId,
    };

    axios.post('/api/reple/submit', body).then((res) => {
      if (res.data.success) {
        alert('댓글 작성이 성공하였습니다.');
        window.location.reload();
      } else {
        alert('댓글 작성에 실패하였습니다');
      }
    });
  };

  return (
    <RepleContainer>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>댓글</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={reple}
          onChange={(e) => setReple(e.target.value)}
        />
        <ButtonDiv>
          <Button
            variant="outline-dark"
            type="submit"
            onClick={(e) => repleUploadFunc(e)}
          >
            등록
          </Button>
        </ButtonDiv>
      </Form.Group>
    </RepleContainer>
  );
}

export default RepleUpload;

const RepleContainer = styled.div`
  margin: 0 auto;
  width: 40%;
  @media (max-width: 756px) {
    width: 70%;
  }
`;

const ButtonDiv = styled.div`
  margin-top: 15px;
  text-align: right;
`;
