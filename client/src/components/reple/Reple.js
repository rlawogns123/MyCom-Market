import React from 'react';
import RepleUpload from './RepleUpload';
import RepleList from './RepleList';
import { useSelector } from 'react-redux';

function Reple({ productId }) {
  const user = useSelector((state) => state.user);
  return (
    <div>
      {user.accessToken && <RepleUpload productId={productId} />}
      <RepleList productId={productId} />
    </div>
  );
}

export default Reple;
