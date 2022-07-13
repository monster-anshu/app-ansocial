import { GetAgo } from 'Helper';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageType } from 'Types';
import { Container } from './style';

interface Proptypes {
  message: MessageType;
  isMine: boolean;
  profilePicture: string;
  username: string;
}

const Chat: React.FC<Proptypes> = ({
  message,
  isMine,
  profilePicture,
  username,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/id/${username}`);
  };

  return (
    <Container isMine={isMine}>
      <div>
        <img src={profilePicture} onClick={handleClick} />
        <p>
          {message.text}
          <span> {GetAgo(message.createdAt)} </span>
        </p>
      </div>
    </Container>
  );
};

export default Chat;
