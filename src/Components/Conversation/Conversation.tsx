import React from 'react';
import { Container, Name } from './style';

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
}) => {
  const handelClick = () => {
    onClick?.(id);
  };

  return (
    <Container onClick={handelClick} isSelected={isSelected}>
      <img src={'/assets/person/1.jpeg'} />
      <Name>{name}</Name>
    </Container>
  );
};

export default Conversation;
