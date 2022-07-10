import React from 'react';
import { Feed, Rightbar } from 'Components';
import { Container } from './style';
const Home = () => {
  return (
    <Container>
      <Feed />
      <Rightbar />
    </Container>
  );
};

export default Home;
