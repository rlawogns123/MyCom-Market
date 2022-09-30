import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

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
    <div>
      {productList?.map((item, idx) => {
        return (
          <div key={idx}>
            <Link to={`/product/${item.productNum}`}>
              <p>제목 : {item.title}</p>
              <p>작성자 : {item.author.displayName}</p>
              <p>내용 : {item.content}</p>
              <hr />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default List;

const ListDiv = styled.div``;

const ListItem = styled.div``;
