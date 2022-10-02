import React, { useEffect, useState } from 'react';
import firebase from '../../firebase.js';

import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const loginFunc = async (e) => {
    e.preventDefault();

    if (!(email && pwd)) {
      return alert('모든 값을 채워주세요');
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(email, pwd);
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setErrMsg('존재하지 않는 이메일입니다.');
      } else if (err.code === 'auth/wrong-password') {
        setErrMsg('비밀번호가 일치하지 않습니다.');
      } else {
        setErrMsg('로그인에 실패하였습니다.');
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrMsg('');
    }, 5000);
  }, [errMsg]);

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
        {errMsg !== '' && <p>{errMsg}</p>}
        <ButtonDiv>
          <Button
            variant="outline-dark"
            type="submit"
            style={{ width: '100%' }}
            onClick={(e) => {
              loginFunc(e);
            }}
          >
            로그인
          </Button>
        </ButtonDiv>
        <ButtonDiv>
          <Button
            variant="outline-dark"
            type="submit"
            style={{ width: '100%' }}
            onClick={(e) => {
              e.preventDefault();
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
