import { Context } from 'Context';
import React, { useContext } from 'react';
import { Container } from './style';
import User from './User';

interface Proptypes {
  onlineUsersId: {
    userId: string;
    socketId: string;
  }[];
}

const Active: React.FC<Proptypes> = ({ onlineUsersId }) => {
  const { user } = useContext(Context);

  return (
    <Container>
      {onlineUsersId.map(
        (i) => user?._id !== i.userId && <User id={i.userId} key={i.userId} />,
      )}
    </Container>
  );
};

export default Active;
