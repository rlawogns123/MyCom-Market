import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import RepleContent from './RepleContent';

function RepleList({ productId }) {
  const [repleList, setRepleList] = useState([]);
  let body = {
    productId: productId,
  };

  useEffect(() => {
    axios.post('/api/reple/getreple', body).then((res) => {
      if (res.data.success) {
        setRepleList([...res.data.repleList]);
      }
    });
  }, []);

  return (
    <RepleContainer>
      {repleList.map((reple, idx) => {
        return <RepleContent reple={reple} key={idx} />;
      })}
    </RepleContainer>
  );
}

export default RepleList;

const RepleContainer = styled.div`
  margin: 0 auto;
  width: 50%;
  @media (max-width: 756px) {
    width: 90%;
  }
`;
