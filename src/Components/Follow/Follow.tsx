import React, { useContext, useState } from 'react';
import { Loader } from 'Components';
import {
  Container,
  H2,
  Item,
  Details,
  Message,
  FollowBTN,
  MsgBTN,
  AlreadyFollowBtn,
} from './style';
import { Context } from 'Context';
import { UserType } from 'Types';
import { useNavigate } from 'react-router-dom';
import TransitionsModal from './Model';

interface Proptypes {
  user: UserType;
  isCurrent: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}
const Follow: React.FC<Proptypes> = ({ user, isCurrent, setUser }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState<boolean | undefined>(
    user.amIFollowing,
  );
  const [open, setOpen] = useState(false);
  const { fetchAxios } = useContext(Context);
  const [type, setType] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };
  const handelClose = () => {
    setOpen(false);
  };

  const handelRedirect = () => {
    navigate('/messenger', { state: user });
  };

  const increaseFollow = (
    increase: boolean,
    key: 'userFollowers' | 'userFollowing',
  ) => {
    setUser({ ...user, userFollowers: user[key] + (increase ? 1 : -1) });
  };

  const handelFollow = () => {
    setIsLoading(true);
    fetchAxios({
      url: `/user/follow/${user._id}`,
      method: 'PUT',
    })
      .then(() => {
        setIsFollowed(true);
        increaseFollow(true, 'userFollowers');
      })
      .finally(() => setIsLoading(false));
  };
  const handelUnFollow = () => {
    setIsLoading(true);
    setIsLoading(true);
    fetchAxios({
      url: `/user/unfollow/${user._id}`,
      method: 'PUT',
    })
      .then(() => {
        setIsFollowed(false);
        increaseFollow(false, 'userFollowers');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Container>
      {open && (
        <TransitionsModal
          isFollower={type}
          handleClose={handelClose}
          open={open}
          user={user}
        />
      )}
      <Details>
        <Item
          onClick={() => {
            setType(true);
            handleOpen();
          }}
        >
          <H2>Followers</H2>
          <span>{user.userFollowers}</span>
        </Item>
        <Item
          onClick={() => {
            setType(false);
            handleOpen();
          }}
        >
          <H2>Followings</H2>
          <span>{user.userFollowing}</span>
        </Item>
        <Item>
          <H2>Post</H2>
          <span>{user.userPosts}</span>
        </Item>
      </Details>
      {!isCurrent && (
        <Message>
          {isFollowed ? (
            <AlreadyFollowBtn onClick={handelUnFollow}>
              {isLoading ? <Loader /> : 'Following'}
            </AlreadyFollowBtn>
          ) : (
            <FollowBTN onClick={handelFollow}>
              {isLoading ? <Loader /> : 'Follow'}
            </FollowBTN>
          )}

          <MsgBTN onClick={handelRedirect}>Message </MsgBTN>
        </Message>
      )}
    </Container>
  );
};

export default Follow;
