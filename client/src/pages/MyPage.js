import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import axios from 'axios';
import firebase from '../firebase.js';

import Button from 'react-bootstrap/Button';

function MyPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    if (user.isLoading && !user.accessToken) {
      navigate('/login');
    } else {
      setCurrentImage(user.photoURL);
    }
  }, [user]);

  const imageUpload = (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    axios.post('/api/user/profile/img', formData).then((res) => {
      setCurrentImage(res.data.filePath);
    });
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().currentUser.updateProfile({
        photoURL: currentImage,
      });
    } catch (err) {
      return alert('프로필 사진 저장에 실패하였습니다.');
    }
    let body = {
      photoURL: currentImage,
      uid: user.uid,
    };
    axios.post('/api/user/profile/update', body).then((res) => {
      if (res.data.success) {
        alert('프로필 사진 저장에 성공하였습니다.');
        window.location.reload();
      } else {
        return alert('프로필 사진 저장에 실패하였습니다.');
      }
    });
  };

  return (
    <AvatarForm>
      <label>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => imageUpload(e)}
        />
        <Avatar
          size="200"
          round={true}
          src={currentImage}
          style={{ cursor: 'pointer' }}
        />
      </label>
      <Button
        variant="outline-dark"
        style={{ marginTop: '20px' }}
        onClick={(e) => saveProfile(e)}
      >
        저장
      </Button>
    </AvatarForm>
  );
}

export default MyPage;

const AvatarForm = styled.form`
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
`;
