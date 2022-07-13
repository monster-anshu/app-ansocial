import { Context } from 'Context';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Name, Unread } from './style';

interface Proptypes {
  onClick?: (id: string) => void;
  name: string;
  img: string;
  id: string;
  isSelected?: boolean;
}

const Conversation: React.FC<Proptypes> = ({
  onClick,
  name,
  id,
  isSelected,
  img,
}) => {
  const { unreadMsg } = useContext(Context);
  const [unRead, setUnRead] = useState(0);
  const getUnread = () => {
    const length = unreadMsg.filter((msg) => msg.sender === id).length;
    setUnRead(length);
  };

  const handleClick = () => {
    onClick?.(id);
  };

  useEffect(() => {
    getUnread();
  }, [unreadMsg]);

  return (
    <Container onClick={handleClick} isSelected={isSelected}>
      <img src={img} />
      <Name>{name}</Name>
      {unRead > 0 && <Unread>{unRead}</Unread>}
    </Container>
  );
};

export default Conversation;
