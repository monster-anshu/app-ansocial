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

interface Proptypes {
  user: UserType;
  isCurrent: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}
const Follow: React.FC<Proptypes> = ({ user, isCurrent, setUser }) => {
  if (!user) return <>User not found</>;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState<boolean | undefined>(
    user.amIFollowing,
  );
  const { fetchAxios } = useContext(Context);

  const handelRedirect = () => {
    navigate('/messenger', { state: user });
  };

  const handelFollow = () => {
    setIsLoading(true);
    fetchAxios({
      url: `/user/follow/${user._id}`,
      method: 'PUT',
    })
      .then(() => {
        setIsFollowed(true);
        setUser({ ...user, userFollowers: user.userFollowers + 1 });
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
        setUser({ ...user, userFollowers: user.userFollowers - 1 });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Container>
      <Details>
        <Item>
          <H2>Follower</H2>
          <span>{user.userFollowers}</span>
        </Item>
        <Item>
          <H2>Following</H2>
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
