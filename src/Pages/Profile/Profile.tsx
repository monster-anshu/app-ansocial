import { ChatContainer, Follow, Loader, Post, Share } from 'Components';
import { Context } from 'Context';
import React, { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { PostType, UserType } from 'Types';

import {
  CContainer,
  Container,
  CoverPicture,
  Details,
  PM,
  Posts,
  ProfileData,
  ProfileInfo,
  ProfilePicture,
} from './style';

const Profile = () => {
  const { user: loggedUser, fetchAxios } = useContext(Context);

  const { username } = useParams();
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isCurrent = user?._id === loggedUser?._id;
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<PostType[]>([]);

  const fetchPosts = (id: string, currentPage: number) => {
    fetchAxios({
      url: `/post/userId/${id}?page=${currentPage}`,
    }).then(({ data }) => {
      setPosts(data.post);
    });
  };
  const fetchPostsMore = (id: string, currentPage: number) => {
    fetchAxios({
      url: `/post/userId/${id}?page=${currentPage}`,
    }).then(({ data }) => {
      setPosts((post) => [post, ...data.post]);
    });
  };

  const handleDelete = (id: string) => {
    if (!user) return;
    const newPost = posts.filter((item) => item['_id'] !== id);
    setPosts(newPost);
    const newUser = {
      ...user,
      userPosts: user.userPosts - 1,
    };
    setUser(newUser);
  };

  const handleShare = (newPost: PostType) => {
    if (!user) return;
    const updatedPost = [newPost, ...posts];
    setPosts(updatedPost);
    setUser({ ...user, userPosts: user.userPosts + 1 });
  };

  const fetchDetails = () => {
    fetchAxios({
      url: `/user/username/${username}`,
    })
      .then(({ data }) => {
        setUser(data.user);
        fetchPosts(data.user._id, 1);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setPosts([]);
    setUser(null);
    setIsLoading(true);
    fetchDetails();
  }, [username]);

  return isLoading ? (
    <>
      <Loader />
    </>
  ) : user ? (
    <Container id="profileScoller">
      <ProfileData>
        <CoverPicture src={'/assets/post/3.jpeg'} />
        <ProfilePicture src={user.profilePicture} />
        <ProfileInfo>
          <h2>{user.name}</h2>
          <p>Hello my friends</p>
        </ProfileInfo>
      </ProfileData>

      <Details>
        {isCurrent && <Share onShare={handleShare} />}
        {<Follow user={user} isCurrent={isCurrent} setUser={setUser} />}
      </Details>
      <PM>
        {posts.length ? (
          <Posts>
            <InfiniteScroll
              dataLength={posts.length}
              loader={<></>}
              next={() => {
                fetchPostsMore(user._id, page + 1);
                setPage((page) => page + 1);
              }}
              hasMore={posts.length < user.userPosts}
              scrollableTarget={'profileScoller'}
              style={{
                overflow: 'unset',
              }}
            >
              {posts.map((X) => (
                <Post key={X['_id']} post={X} onDelete={handleDelete} />
              ))}
            </InfiniteScroll>
          </Posts>
        ) : (
          <div
            style={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 10,
              padding: 10,
              height: 400,
            }}
          >
            <h4>No Post Yet</h4>
            <img src="/assets/nopost.svg" height={100} width={100} />
          </div>
        )}
        {!isCurrent && (
          <CContainer>
            <ChatContainer reciver={user} />
          </CContainer>
        )}
      </PM>
    </Container>
  ) : (
    <>User not found</>
  );
};

export default Profile;
