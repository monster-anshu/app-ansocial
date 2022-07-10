import React, { useContext, useEffect, useState } from 'react';
import { Container, Details } from './style';
import { Share, Post } from 'Components';
import { PostType } from 'Types';
import { Context } from 'Context';
import InfiniteScroll from 'react-infinite-scroll-component';
const Feed = () => {
  const { fetchAxios } = useContext(Context);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const fetchPost = () => {
    fetchAxios({
      url: `/post?page=${page}`,
    }).then(({ data }) => {
      setTotal(data.total);
      const arr = [...posts, ...data.posts];
      // .sort(
      //   (a, b) =>
      //     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      // );
      setPosts(arr);
      setPage((page) => page + 1);
    });
  };

  const handelShare = (newPost: PostType) => {
    setPosts([newPost, ...posts]);
    setTotal((total) => total + 1);
  };

  const handelDelete = (id: string) => {
    const newPost = posts.filter((item) => item['_id'] !== id);
    setPosts(newPost);
    setTotal((total) => total - 1);
  };

  useEffect(() => {
    setPosts([]);
    fetchPost();
    setPage(0);
  }, []);

  return (
    <Container id="scrollable">
      <Share onShare={handelShare} />
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPost}
        hasMore={posts.length < total}
        loader={<></>}
        scrollableTarget={'scrollable'}
      >
        <Details>
          {posts.map((x) => (
            <Post post={x} key={x['_id']} onDelete={handelDelete} />
          ))}
        </Details>
      </InfiniteScroll>
    </Container>
  );
};

export default Feed;
