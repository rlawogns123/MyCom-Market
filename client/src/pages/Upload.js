import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';
import { useSelector } from 'react-redux';

function Upload() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.accessToken) {
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
    <div>
      <form>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ImageUpload setImage={setImage} />
        <label htmlFor="content">내용</label>
        <input
          type="text"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={(e) => onSubmit(e)}>제출</button>
      </form>
    </div>
  );
}

export default Upload;
