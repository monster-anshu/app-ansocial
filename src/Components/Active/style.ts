import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const Profile = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  gap: 10px;
  div {
    position: relative;
    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 50%;
      cursor: pointer;
    }
    &::after {
      content: '';
      top: 0;
      right: 0;
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: limegreen;
      border-radius: 50%;
    }
  }
`;
