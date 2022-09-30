import React, { useState } from 'react';
import firebase from '../firebase.js';
import axios from 'axios';

import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');
  const [flag, setFlag] = useState(false);

  const signupFunc = async (e) => {
    setFlag(true);
    e.preventDefault();

    if (!(name && email && pwd && pwdConfirm)) {
      setFlag(false);
      alert('모든 값을 채워주세요');
    }

    if (pwd !== pwdConfirm) {
      setFlag(false);
      alert('비밀번호와 비밀번호 확인 값이 다릅니다.');
    }

    const createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, pwd);

    await createdUser.user.updateProfile({
      displayName: name,
    });

    console.log(createdUser.user);

    const body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
    };

    axios.post('/api/user/signup', body).then((res) => {
      setFlag(false);
      if (res.data.success) {
        navigate('/login');
      } else {
        return alert('회원가입이 실패하였습니다.');
      }
    });
  };

  return (
    <LoginDiv>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>닉네임</Form.Label>
          <Form.Control
            type="text"
            placeholder="닉네임"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
          <Form.Label>비밀번호(8자리 이상)</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호(8자리 이상)"
            minLength={8}
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호(8자리 이상)"
            minLength={8}
            value={pwdConfirm}
            onChange={(e) => setPwdConfirm(e.target.value)}
          />
        </Form.Group>
        <ButtonDiv>
          <Button
            disabled={flag}
            variant="outline-dark"
            onClick={(e) => {
              e.preventDefault();
              signupFunc(e);
            }}
          >
            회원가입
          </Button>
        </ButtonDiv>
      </Form>
    </LoginDiv>
  );
}

export default Signup;

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
