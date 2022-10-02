import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from 'react-avatar';
import moment from 'moment';
import 'moment/locale/ko';

import Card from 'react-bootstrap/Card';

function List({ productList }) {
  const setTime = (createdAt, updatedAt) => {
    if (createdAt !== updatedAt) {
      return moment(updatedAt).format('YYYY년 MMMM Do') + ' (수정됨)';
    } else {
    }
    return moment(createdAt).format('YYYY년 MMMM Do');
  };

  return (
    <ListDiv>
      {productList?.map((item, idx) => {
        return (
          <Card key={idx} style={{ margin: '30px' }}>
            <Link
              to={`/product/${item.productNum}`}
              style={{
                color: 'black',
                textDecoration: 'none',
                marginLeft: ' 10px',
              }}
            >
              <p>
                {item.title} ({item.repleNum})
              </p>
              <Avatar
                size="40"
                round={true}
                src={item.author.photoURL}
                style={{ marginBottom: '10px' }}
              />
              <p>{item.author.displayName} </p>
              <p>{setTime(item.createdAt, item.updatedAt)}</p>
              {item.image ? (
                <img
                  src={item.image}
                  alt=""
                  style={{ width: '100%', height: 'auto' }}
                />
              ) : null}
            </Link>
          </Card>
        );
      })}
    </ListDiv>
  );
}

export default List;

const ListDiv = styled.div`
  margin: 50px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 50%;
  @media (max-width: 1024px) {
    width: 90%;
  }
`;
