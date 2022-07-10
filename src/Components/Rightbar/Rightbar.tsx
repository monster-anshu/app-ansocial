import Ad from 'Components/Ad';
import { OnlineFriend } from 'Helper';
import React from 'react';
import {
  Birthday,
  BirthdayImg,
  BirthdayText,
  Container,
  Friend,
  FriendImg,
  FriendList,
  FriendName,
  OnlineFriends,
} from './style';

const Rightbar = () => {
  return (
    <Container>
      <Birthday>
        <BirthdayImg src={'/assets/gift.png'} />
        <BirthdayText>
          <b>Pola Foster</b> and Other <b> 3 friend </b> have birthday today.
        </BirthdayText>
      </Birthday>
      <Ad />
      <OnlineFriends>
        <h4>Online Friends</h4>
        <FriendList>
          {OnlineFriend.map((X, i) => (
            <Friend key={i}>
              <FriendImg>
                <img src={X['img']} alt="" />
              </FriendImg>
              <FriendName> {X['name']} </FriendName>
            </Friend>
          ))}
        </FriendList>
      </OnlineFriends>
    </Container>
  );
};

export default Rightbar;
