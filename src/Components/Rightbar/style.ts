import styled from 'styled-components';

export const Container = styled.div`
  flex: 3.5;
  overflow-y: scroll;
  overflow-x: visible;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(179, 179, 179);
  }
`;
export const Birthday = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
`;
export const BirthdayImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;
export const BirthdayText = styled.span`
  font-weight: 300;
  font-size: 15px;
`;
export const OnlineFriends = styled.div`
  padding: 10px;
  h4 {
    font-size: 1.5rem;
    margin: 5px 0;
  }
`;
export const FriendList = styled.ul``;
export const Friend = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
`;

export const FriendImg = styled.div`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 10px;
    aspect-ratio: 1 / 1;
    background-color: greenyellow;
    border-radius: 50%;
    top: 0;
    right: 0;
    box-shadow: 0 0 0 1px #ffffff;
  }
  img {
    object-fit: cover;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;
export const FriendName = styled.span`
  font-weight: 500;
`;
