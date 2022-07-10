import styled from 'styled-components';

export const Container = styled.div`
  background-color: aliceblue;
  display: flex;
  height: 100%;
  align-items: center;
`;
export const ChatContainer = styled.div`
  flex: 2;
  height: 100%;
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
