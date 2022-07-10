import { Context } from 'Context';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Empty = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  useEffect(() => {
    if (!user?.username) return;
    navigate(`/profile/${user.username}`);
  }, [user]);
  return <></>;
};

export default Empty;
