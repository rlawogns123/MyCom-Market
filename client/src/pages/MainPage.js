import React, { useState, useEffect } from 'react';
import List from '../components/product/List';
import axios from 'axios';
import styled from 'styled-components';

import { Dropdown, DropdownButton, Form, Button } from 'react-bootstrap';

function MainPage() {
  const [productList, setProductList] = useState([]);
  const [sort, setSort] = useState('최신순');
  const [searchTerm, setSearchTerm] = useState('');
  const [skip, setSkip] = useState(0);
  const [loadMore, setLoadMore] = useState(true);

  const getPostList = () => {
    setSkip(0);

    let body = {
      sort: sort,
      searchTerm: searchTerm,
      skip: 0,
    };

    axios
      .post('/api/product/list', body)
      .then((res) => {
        if (res.data.success) {
          setProductList([...res.data.productList]);
          setSkip(res.data.productList.length);
          if (res.data.productList.length < 9) {
            setLoadMore(false);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const getPostLoadMore = () => {
    let body = {
      sort: sort,
      searchTerm: searchTerm,
      skip: skip,
    };

    axios
      .post('/api/product/list', body)
      .then((res) => {
        if (res.data.success) {
          setProductList([...productList, ...res.data.productList]);
          setSkip(skip + res.data.productList.length);
          if (res.data.productList.length < 9) {
            setLoadMore(false);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPostList();
  }, [sort, searchTerm]);

  return (
    <div>
      <SearchDiv>
        <Form.Control
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 27) {
              setSearchTerm('');
              setLoadMore(true);
            }
          }}
        />
        <DropdownButton variant="outline-secondary" title={sort}>
          <Dropdown.Item
            onClick={() => {
              setSort('최신순');
              setLoadMore(true);
            }}
          >
            최신순
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setSort('댓글순');
              setLoadMore(true);
            }}
          >
            댓글순
          </Dropdown.Item>
        </DropdownButton>
      </SearchDiv>
      <List productList={productList} />
      {loadMore && (
        <ButtonDiv>
          <Button
            variant="outline-dark"
            onClick={(e) => {
              getPostLoadMore();
            }}
          >
            더 불러오기
          </Button>
        </ButtonDiv>
      )}
    </div>
  );
}

export default MainPage;

const SearchDiv = styled.div`
  padding-top: 20px;
  width: 40%;
  margin: 0 auto;

  display: flex;

  input {
    margin-right: 30px;
  }
  @media (max-width: 1024px) {
    width: 80%;
  }
`;

const ButtonDiv = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;
