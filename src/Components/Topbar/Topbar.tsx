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
  const { handelLogout } = useContext(Context);
  const [text, setText] = useState('');

  const navigate = useNavigate();

  const handelNavigateHome = () => {
    navigate('/home');
  };
  const handelNavigateChat = () => {
    navigate('/messenger');
  };

  const handelSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    navigate(`/profile/${text}`);
  };

  return (
    <Container>
      <Left>
        <Logo onClick={handelNavigateHome}>Ansocial</Logo>
      </Left>
      <Center>
        <SearchBar onSubmit={handelSubmit}>
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
          <Icon data-count={8}>
            <Person />
          </Icon>
          <Icon onClick={handelNavigateChat} data-count={8}>
            <Chat />
          </Icon>
          {/* <Icon data-count={8}>
            <Notifications />
          </Icon> */}
          <Icon onClick={handelLogout}>
            <i className="bx bx-log-out"></i>
          </Icon>
        </Icons>
        <Img src="/assets/person/1.jpeg" />
      </Right>
    </Container>
  );
};

export default Topbar;
