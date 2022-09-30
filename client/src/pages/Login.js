import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  useEffect(() => {
    let body = {
      text: 'hello',
    };
    axios
      .post('/api/test', body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert('요청실패');
        console.log(err);
      });
  }, []);

  return (
    <LoginDiv>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </Form.Group>
        <ButtonDiv>
          <Button variant="outline-dark" type="submit">
            로그인
          </Button>
        </ButtonDiv>
        <ButtonDiv>
          <Button
            variant="outline-dark"
            type="submit"
            onClick={() => {
              navigate('/signup');
            }}
          >
            회원가입
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
  margin-top: 30px;
  text-align: center;
`;
