import React from 'react';

import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SignUp() {
  return (
    <LoginDiv>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>닉네임</Form.Label>
          <Form.Control type="email" placeholder="닉네임" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control type="email" placeholder="이메일" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호(8자리 이상)</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호(8자리 이상)"
            minLength={8}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호(8자리 이상)"
            minLength={8}
          />
        </Form.Group>
        <ButtonDiv>
          <Button variant="outline-dark" type="submit">
            회원가입
          </Button>
        </ButtonDiv>
      </Form>
    </LoginDiv>
  );
}

export default SignUp;

const LoginDiv = styled.div`
  width: 50%;
  max-width: 300px;
  margin: 0 auto;
  margin-top: 5rem;
`;

const ButtonDiv = styled.div`
  margin-top: 40px;
  text-align: center;
`;
