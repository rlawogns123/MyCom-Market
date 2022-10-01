import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Avatar from 'react-avatar';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function RepleContent({ reple }) {
  const user = useSelector((state) => state.user);
  const [editFlag, setEdigFlag] = useState(false);
  const [modalFlag, setModalFlag] = useState(false);
  const [editReple, setEditReple] = useState('');

  const repleEditFunc = (e) => {
    e.preventDefault();

    let body = {
      uid: user.uid,
      reple: editReple,
      productId: reple.productId,
      repleId: reple._id,
    };

    axios.post('/api/reple/edit', body).then((res) => {
      if (res.data.success) {
        alert('댓글을 수정하였습니다.');
      } else {
        alert('댓글 수정에 실패하였습니다');
      }
      return window.location.reload();
    });
  };

  const repleDeleteFunc = (e) => {
    e.preventDefault();

    if (window.confirm('정말로 삭제하시겠습니까?')) {
      let body = {
        repleId: reple._id,
        productId: reple.productId,
      };
      axios
        .post('/api/reple/delete', body)
        .then((res) => {
          if (res.data.success) {
            alert('댓글이 삭제되었습니다.');
            window.location.reload();
          }
        })
        .catch((err) => {
          alert('댓글 삭제에 실패하였습니다.');
        });
    }
  };

  return (
    <Card border="secondary" style={{ width: '80%', margin: '40px auto' }}>
      <Card.Header>
        <Avatar
          size="30"
          round={true}
          src={reple.author.photoURL}
          style={{ marginRight: '10px' }}
        />
        {reple.author.displayName}
        {reple.author.uid === user.uid && (
          <span
            style={{
              position: 'absolute',
              top: '-5px',
              right: '10px',
              cursor: 'pointer',
            }}
            onClick={() => setModalFlag(!modalFlag)}
          >
            ...
          </span>
        )}
        {modalFlag && (
          <ModalDiv>
            <Button
              variant="outline-dark"
              style={{ marginRight: '10px' }}
              onClick={() => {
                setEdigFlag(true);
                setModalFlag(false);
              }}
            >
              수정
            </Button>
            <Button
              variant="outline-dark"
              onClick={(e) => {
                repleDeleteFunc(e);
              }}
            >
              삭제
            </Button>
          </ModalDiv>
        )}
      </Card.Header>
      <Card.Body>
        {editFlag ? (
          <RepleContainer>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              style={{ marginTop: '20px' }}
            >
              <Form.Control
                as="textarea"
                rows={3}
                value={editReple}
                onChange={(e) => setEditReple(e.target.value)}
              />
              <ButtonDiv>
                <Button
                  variant="outline-dark"
                  type="submit"
                  style={{ marginRight: '15px' }}
                  onClick={(e) => repleEditFunc(e)}
                >
                  등록
                </Button>
                <Button
                  variant="outline-dark"
                  onClick={(e) => {
                    e.preventDefault();
                    setEdigFlag(false);
                  }}
                >
                  취소
                </Button>
              </ButtonDiv>
            </Form.Group>
          </RepleContainer>
        ) : (
          <Card.Text>{reple.reple}</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}

export default RepleContent;

const RepleContainer = styled.div`
  margin: 0 auto;
  width: 90%;
  @media (max-width: 756px) {
    width: 90%;
  }
`;

const ButtonDiv = styled.div`
  margin-top: 15px;
  text-align: right;
`;

const ModalDiv = styled.span`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
