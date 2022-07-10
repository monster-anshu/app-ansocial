import React from 'react';
import { Friends, SidebarIcon } from 'Helper';
import {
  Container,
  Friend,
  FriendImg,
  FriendList,
  FriendName,
  Hr,
  LI,
  LiText,
  ShowMore,
  UL,
} from './style';

const Sidebar = () => {
  return (
    <Container>
      <UL>
        {SidebarIcon.map((X, i) => (
          <LI key={i}>
            <X.icon />
            <LiText> {X['text']} </LiText>
          </LI>
        ))}
      </UL>
      <ShowMore>Show More</ShowMore>
      <Hr />

      <FriendList>
        <h2>Friends</h2>
        {Friends.map((X, i) => (
          <Friend key={i}>
            <FriendImg src={X['profilePicture']} />
            <FriendName> {X['name']} </FriendName>
          </Friend>
        ))}
      </FriendList>
    </Container>
  );
};

export default Sidebar;
