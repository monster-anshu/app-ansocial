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
  img,
}) => {
  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <Container onClick={handleClick} isSelected={isSelected}>
      <img src={img} />
      <Name>{name}</Name>
    </Container>
  );
};

export default Conversation;
