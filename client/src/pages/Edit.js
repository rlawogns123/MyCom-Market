import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ImageUpload from '../components/ImageUpload';
import { Link } from 'react-router-dom';

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
    <div>
      <form>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          value={title || ''}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ImageUpload setImage={setImage} />
        <label htmlFor="content">내용</label>
        <input
          type="text"
          id="content"
          value={content || ''}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={(e) => onSubmit(e)}>제출</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          취소
        </button>
      </form>
    </div>
  );
}

export default Edit;
