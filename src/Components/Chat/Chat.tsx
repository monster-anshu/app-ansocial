import { GetAgo } from 'Helper';
import React from 'react';
import { MessageType } from 'Types';
import { Container } from './style';

interface Proptypes {
  message: MessageType;
  userId: string;
}

const Chat: React.FC<Proptypes> = ({ message, userId }) => {
  const isMine = userId == message.sender;
  return (
    <Container isMine={isMine}>
      <div>
        <img src={isMine ? '/assets/person/1.jpeg' : '/assets/person/6.jpeg'} />
        <p>
          {message.text}
          <span> {GetAgo(message.createdAt)} </span>
        </p>
      </div>
    </Container>
  );
};

export default Chat;
