import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Card from 'react-bootstrap/Card';

function List() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios
      .post('/api/product/list')
      .then((res) => {
        setProductList([...res.data.productList]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <ListDiv>
      {productList?.map((item, idx) => {
        return (
          <Card key={idx} style={{ margin: '30px' }}>
            <Link
              to={`/product/${item.productNum}`}
              style={{ color: 'black', textDecoration: 'none' }}
            >
              <p>{item.title}</p>
              <p>{item.author.displayName}</p>
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
  @media (max-width: 756px) {
    width: 90%;
  }
  @media (max-width: 1024px) {
    width: 90%;
  }
`;
