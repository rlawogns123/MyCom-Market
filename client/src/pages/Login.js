import React from 'react';

import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
  return (
    <LoginDiv>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control type="email" placeholder="이메일" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" placeholder="비밀번호" />
        </Form.Group>
        <ButtonDiv>
          <Button variant="outline-dark" type="submit">
            로그인
          </Button>
        </ButtonDiv>
      </Form>
    </LoginDiv>
  );
}

export default Login;

const LoginDiv = styled.div`
  width: 50%;
  max-width: 300px;
  margin: 0 auto;
  margin-top: 5rem;
`;

const ButtonDiv = styled.div`
  margin-top: 50px;
  text-align: center;
`;
