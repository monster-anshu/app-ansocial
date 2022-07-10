import styled from 'styled-components';

export const Container = styled.div`
  width: 15vw;
  min-width: 200px;
  padding: 20px;
  overflow-y: scroll;
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
export const UL = styled.ul`
  list-style: none;
`;
export const LI = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;
export const LiText = styled.span`
  margin-left: 10px;
`;
export const ShowMore = styled.button`
  width: 100%;
  max-width: 150px;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-weight: 600;
`;
export const Hr = styled.hr`
  margin: 20px 0;
`;
export const FriendList = styled.ul`
  list-style: none;
`;
export const Friend = styled.li`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;
export const FriendImg = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
`;
export const FriendName = styled.span``;
