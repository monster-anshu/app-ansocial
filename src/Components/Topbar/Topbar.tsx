import React, { useContext, useState } from 'react';
import { Chat, Person, Search } from '@material-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import {
  Center,
  Container,
  InputSearch,
  Left,
  Right,
  SearchBar,
  Linkes,
  Icons,
  Icon,
  Logo,
  Img,
} from './style';
import { Context } from 'Context';
const Topbar = () => {
  const { handleLogout, user, unreadMsg } = useContext(Context);
  const [text, setText] = useState('');

  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/home');
  };
  const handleNavigateChat = () => {
    navigate('/messenger');
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    navigate(`/profile/${text}`);
  };

  return (
    <Container>
      <Left>
        <Logo onClick={handleNavigateHome}>Ansocial</Logo>
      </Left>
      <Center>
        <SearchBar onSubmit={handleSubmit}>
          <Search fontSize={'small'} />
          <InputSearch
            placeholder={'Search For Users'}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </SearchBar>
      </Center>
      <Right>
        <Linkes>
          <Link to={'/home'}>Home</Link>
          <Link to={'/profile'}>Profile</Link>
        </Linkes>
        <Icons>
          <Icon>
            <Person />
          </Icon>
          <Icon
            onClick={handleNavigateChat}
            data-count={unreadMsg.length}
            count={unreadMsg.length}
          >
            <Chat />
          </Icon>
          {/* <Icon data-count={8}>
            <Notifications />
          </Icon> */}
          <Icon onClick={handleLogout}>
            <i className="bx bx-log-out"></i>
          </Icon>
        </Icons>
        <Img src={user?.profilePicture} />
      </Right>
    </Container>
  );
};

export default Topbar;
