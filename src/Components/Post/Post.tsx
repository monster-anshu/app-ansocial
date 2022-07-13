import React, { useContext, useState } from 'react';
import { MoreVert, Favorite, FavoriteBorder } from '@material-ui/icons';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import {
  Bottom,
  Center,
  ProfileName,
  ProfilePicture,
  Time,
  Top,
  TopLeft,
  TopRight,
  Container,
  PostText,
  TimeContainer,
  Love,
  Count,
  PostImgContainer,
  Options,
} from './style';
import { PostType } from 'Types';
import { Context } from 'Context';
import { GetAgo } from 'Helper';
import { useNavigate } from 'react-router-dom';
import Loader from 'Components/Loader';

interface Proptypes {
  post: PostType;
  onDelete?: (id: string) => void;
}

const Post: React.FC<Proptypes> = ({ post, onDelete }) => {
  const { fetchAxios } = useContext(Context);
  const [isActive, setIsActive] = useState(false);
  const [isLiked, setIsLiked] = useState(post.isAlreadyLiked);
  const [likeCount, setLikeCount] = useState(post.postLikes);
  const [animation, setAnimation] = useState(false);
  const [commentCount, setCommentCount] = useState(post.postComments);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const handlelike = () => {
    setAnimation(true);
    if (isLiked) return;
    setIsLiked(true);
    setLikeCount(likeCount + 1);
    fetchAxios({
      method: 'PUT',
      url: `/post/like/${post._id}`,
    });
    setCommentCount(commentCount);
  };
  const handleUnlike = () => {
    if (!isLiked) return;
    setIsLiked(false);
    setLikeCount(likeCount - 1);
    fetchAxios({
      method: 'PUT',
      url: `/post/unlike/${post._id}`,
    });
  };

  const handleProfileClick = () => {
    navigate(`/profile/${post.user.username}`);
  };

  const handleDelete = () => {
    onDelete?.(post._id);
    fetchAxios({
      method: 'DELETE',
      url: `/post/${post._id}`,
    });
  };

  return (
    <Container>
      <Top>
        <TopLeft>
          <ProfilePicture
            src={post.user.profilePicture}
            onClick={handleProfileClick}
          />
          <TimeContainer>
            <ProfileName>{post.user.name}</ProfileName>
            <Time>{GetAgo(post.createdAt)}</Time>
          </TimeContainer>
        </TopLeft>
        <TopRight>
          {post.isOwner ? (
            <MoreVert onClick={() => setIsActive(!isActive)} />
          ) : null}
          <Options isActive={isActive}>
            <li onClick={handleDelete}>Delete</li>
            <li>Edit</li>
          </Options>
        </TopRight>
      </Top>
      <Center>
        {post?.image?.length > 5 && (
          <PostImgContainer
            clicked={animation}
            onAnimationEnd={() => setAnimation(false)}
            onDoubleClick={handlelike}
          >
            {isLoading && <Loader />}
            <img
              src={post.image}
              loading={'lazy'}
              onLoad={() => setIsLoading(false)}
              style={{
                display: isLoading ? 'none' : 'block',
              }}
            />
          </PostImgContainer>
        )}
      </Center>
      <PostText>{post.description}</PostText>
      <Bottom>
        <Love>
          <FormControlLabel
            control={
              <Checkbox
                checked={isLiked}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                name="checkedH"
                onClick={isLiked ? handleUnlike : handlelike}
              />
            }
            label={likeCount}
          />
        </Love>
        <Love>
          <i className={'bx bx-message-rounded-dots'}></i>
          <Count>{commentCount}</Count>
        </Love>
      </Bottom>
    </Container>
  );
};

export default Post;
