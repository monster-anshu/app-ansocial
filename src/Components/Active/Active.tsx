import { Context } from 'Context';
import React, { useContext } from 'react';
import { Container, Profile } from './style';

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
        (i) =>
          user?._id !== i.userId && (
            <Profile key={i.userId}>
              <div>
                <img src={'/assets/person/1.jpeg'} />
              </div>
              <p>{i.userId}</p>
            </Profile>
          ),
      )}
    </Container>
  );
};

export default Active;
