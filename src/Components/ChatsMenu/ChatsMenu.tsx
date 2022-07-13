import React from 'react';
import { Container, Search } from './style';
import { Conversation } from 'Components';

interface Proptypes {
  selected?: string | null;
  onSelect?: (id: string) => void;
  users?: {
    _id: string;
    name: string;
    profilePicture: string;
  }[];
}

const ChatsMenu: React.FC<Proptypes> = ({ selected, onSelect, users }) => {
  const handleSelect = (id: string) => {
    onSelect?.(id);
  };

  return (
    <Container>
      <Search type={'search'} />
      {users?.map((x) => (
        <Conversation
          name={x['name']}
          img={x['profilePicture']}
          key={x['_id']}
          id={x['_id']}
          onClick={handleSelect}
          isSelected={selected === x['_id']}
        />
      ))}
    </Container>
  );
};

export default ChatsMenu;
